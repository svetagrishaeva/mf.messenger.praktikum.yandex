import {API_RESOURCES_URL} from '../../api/constants';
import {TUserInfo, userService} from '../../api/user';
import {Block} from '../../utils/block';
import {APP_ROOT_ID, router} from '../../utils/router';
import {chatsTmpl, pageTmpl, messagesPanelTmpl, membersModalDialogTmpl, userListTmpl, messagesTmpl} from './chats.tmpl';
import {chatService, TChatInfo} from '../../api/chats';
import {storage} from '../../storage/storage';
import {messageService} from '../../services/message-service';
import {TMessage} from '../../api/messages';
import * as _ from 'lodash';

import './chats.css';
import '../../css/style.css';

export class ChatsPage extends Block {
	constructor(props: any = {}) {
		super('chats-page', props);
	}

	render() {
		if (!storage.isAuth) {
			router.go('#login');
			return '';
		}

		let chats = storage.chatInfoList;
		for (let i = 0; i < chats.length; i++) {
			if (!chats[i].last_message) continue;

			chats[i].last_message = JSON.parse(chats[i].last_message);

			const now = new Date().toLocaleDateString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'});
			const date = new Date(chats[i].last_message.time).toLocaleDateString('ru', {day: 'numeric', month: 'numeric', year: 'numeric'});
			const time =  new Date(chats[i].last_message.time).toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric', second: 'numeric'});
			
			chats[i].last_message.time = date !== now ? date : time;
			chats[i].me = chats[i].last_message.user.login === storage.userInfo.login;
		}

		const chatsHtml = _.template(chatsTmpl)({items: chats});
		const pageHtml = _.template(pageTmpl)({chatsHtml: chatsHtml, user: storage.userInfo, baseUrl: API_RESOURCES_URL});

		return pageHtml;
	}

	async onLoginChange(e: InputEvent) {
		const element: HTMLInputElement = e.target as HTMLInputElement;

		let users: TUserInfo[] = (await userService.searchUserByLogin({login: element.value})).response;
		const userIds = (await chatService.getUsersByChatID(storage.currentChatId)).response.map((x: TUserInfo) => x.id);
		users = users.filter(x => !userIds.includes(x.id));

		if (users.length === 0) {
			element.textContent = 'Список пуст';
			return;
		}

		const elementUsers = document.getElementById('users_by_login') as HTMLElement;
		elementUsers.innerHTML = _.template(userListTmpl)({users: users, baseUrl: API_RESOURCES_URL});
		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	async createChat() {
		const element = document.getElementById('chat_title') as HTMLInputElement;
		if (!element) return;

		await chatService.createChat({title: element.value});
		storage.chatInfoList = (await chatService.getChats()).response;
		router.update();
	}

	async deleteChat() {
		await chatService.deleteChatByID({chatId: storage.currentChatId});
		storage.chatInfoList = (await chatService.getChats()).response;
		router.update();
	}

	async addUserToChat(e: Event) {
		const element: HTMLElement = e.currentTarget as HTMLElement;
		const userId = Number(element.getAttribute('id'));
		const userIds = [userId];

		await chatService.addNewUsersToChat({users: userIds, chatId: storage.currentChatId});
		element.style.display = 'none';
	}

	async removeUserFromChat(e: Event) {
		const element: HTMLElement = e.currentTarget as HTMLElement;
		const userId = Number(element.getAttribute('id'));

		await chatService.deleteUsersFromChat({users: [userId], chatId: storage.currentChatId});
		element.parentNode?.parentNode?.removeChild(element?.parentNode);
	}

	async openChatMembersModalDialog() {
		const users = (await chatService.getUsersByChatID(storage.currentChatId)).response
			.sort((a: { role: number; }, b: { role: number; }) => a.role > b.role ? 1 : -1);
		const usersHtml = _.template(userListTmpl)({users: users, baseUrl: API_RESOURCES_URL});

		const modalDialog = document.getElementById('chatMembersModalDialog');
		if (!modalDialog) return;
		modalDialog.innerHTML = _.template(membersModalDialogTmpl)({usersHtml});
		modalDialog.style.display = 'block';

		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	sendMessage() {
		const element = document.getElementById('message') as HTMLInputElement;

		messageService.sendMessage(element.value);
		element.value = '';
	}

	async onChatClick(e: Event) {
		const element = e.currentTarget as HTMLElement;
		const id = Number(element.getAttribute('id') as string);
		const chat: TChatInfo | undefined = storage.chatInfoList.find(x => x.id === id);

		storage.currentChatId = id;

		messageService.close();
		await messageService.connect(storage.userInfo.id, id, {
			message: this.setMessageChatHandler.bind(this),
			connect: this.setConnectUserChat.bind(this),
			error: this.setErrorWebSocket.bind(this),
			open: () => {}
		});

        messageService.getHistory();

		// Скрыть сообщение  с информацией
		(document.getElementById('msg-info') as HTMLElement).style.display = 'none';

		const messagesPanelHtml = _.template(messagesPanelTmpl)({
			chat,
			avatar: `${API_RESOURCES_URL}/${chat?.avatar}`, 
			created_by_admin: storage.chatInfoList.find(x => x.id === id)?.created_by === storage.userInfo.id
		});

		const node = document.getElementById('chat-messages');
		if (!node) return;
		node.innerHTML = messagesPanelHtml;

		// Снять подсветку для всех эл. чата
		// установить для текущего
		const chatElements = document.getElementsByClassName('chat-item');

		for (let i = 0; i < chatElements.length; i++) {
			chatElements[i].setAttribute('style', 'background-color: rgba(250, 250, 250);');
		}

		element.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);');

		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	async setConnectUserChat(id?: string) {
		const user: TUserInfo = (await userService.getUserById(Number(id))).response;
		console.log(`${user.first_name} ${user.second_name} is online`);
	}

	setErrorWebSocket(error?: string) {
		console.log('error WebSocket: ', error);
	}
	
	async setMessageChatHandler(data: TMessage | TMessage[]): Promise<void> {
		if (!Array.isArray(data)) {
			data.chat_id = storage.currentChatId;
			data = [data];
		} 

		const messageList = storage.messageList.filter(x => x.chat_id === storage.currentChatId);
		data = _.uniqWith([...data, ...messageList], (x, y) => _.isEqual(x.time, y.time));
		storage.messageList = data;

		let messages = [];
		for (let i = 0; i < data.length; i++) {
			const user: TUserInfo = (await userService.getUserById(data[i].user_id)).response;
			const date = new Date(data[i].time).toLocaleDateString('ru', {day: 'numeric', month: 'long', year: 'numeric'});
			const time = new Date(data[i].time).toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric', second: 'numeric'});

			messages.push({
					user: user, 
					date: date, 
					time: time, 
					is_read: data[i].is_read, 
					text: data[i].content, 
					me: data[i].user_id === storage.userInfo.id
				});
		}

		messages = messages.sort((a, b) => a.time > b.time ? 1 : -1);

		const groups = _.chain(messages).groupBy('date').map((value, key) => ({ date: key, messages: value })).value()
						.sort((a, b) => a.date > b.date ? 1 : -1);

		const element = document.getElementById('chat_messages');
		if (!element) return;
		element.innerHTML = _.template(messagesTmpl)({groups, baseUrl: API_RESOURCES_URL});

		// scroll уставить внизу
		element.scrollTop = element.scrollHeight;
	}

	onFilterChange(e: InputEvent) {
		const element: HTMLInputElement = e.target as HTMLInputElement;
		console.log(`${element.id}: ${element.value}`);
	}
}