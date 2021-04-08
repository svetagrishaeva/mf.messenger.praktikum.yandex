import {API_RESOURCES_URL} from '../../api/constants';
import {TUserInfo, userService} from '../../api/user';
import {Block} from '../../utils/block';
import {APP_ROOT_ID, router} from '../../utils/router';
import {chatsTmpl, pageTmpl, messagesPanelTmpl, membersModalDialogTmpl, userListTmpl, messagesTmpl} from './chats.tmpl';
import {chatService, TChatInfo} from '../../api/chats';
import {storage} from '../../storage/storage';
import {messageService} from '../../services/message-service';
import {TMessage} from '../../api/messages';

import './chats.css';
import '../../css/style.css';

export class ChatsPage extends Block {
	constructor(props: any = {}) {
		super('chats-page', props);

		chatService.getChats().then((resp: { ok: boolean, response: TChatInfo[] }) => {
			if (!resp.ok) {
				return;
			}

			storage.chatInfoList = resp.response;
		});
	}

	render() {
		if (!storage.isAuth) {
			router.go('#login');
			return '';
		}

		const chatsHtml = _.template(chatsTmpl)({items: storage.chatInfoList});
		const pageHtml = _.template(pageTmpl)({chatsHtml: chatsHtml});

		return pageHtml;
	}

	onLoginChange(e: InputEvent) {
		const element: HTMLInputElement = e.target as HTMLInputElement;

		userService.searchUserByLogin({login: element.value}).then((resp: { ok: boolean, response: any }) => {
			if (!resp.ok) {
				return;
			}

			let users = resp.response;

			chatService.getUsersByChatID(storage.currentChatId).then((resp: { ok: boolean, response: any }) => {
				if (!resp.ok) {
					return;
				}

				const element = document.getElementById('users_by_login') as HTMLElement;
				const userIds = resp.response.map((x: { id: number }) => x.id);
				users = users.filter((x: { id: number }) => !userIds.includes(x.id));

				if (users.length === 0) {
					element.textContent = 'Список пуст';
					return;
				}

				element.innerHTML = _.template(userListTmpl)({users: users, baseUrl: API_RESOURCES_URL});

				this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
			});
		});
	}

	async createChat() {
		const elem = document.getElementById('chat_title') as HTMLInputElement;
		if (!elem) {
			return;
		}

		await chatService.createChat({title: elem.value});
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
		const userId = Number(element.getAttribute('id') as string);
		const userIds = [userId];

		await chatService.addNewUsersToChat({users: userIds, chatId: storage.currentChatId});
		element.style.display = 'none';
	}

	async removeUserFromChat(e: Event) {
		const element: HTMLElement = e.currentTarget as HTMLElement;
		const userId = Number(element.getAttribute('id') as string);

		await chatService.deleteUsersFromChat({users: [userId], chatId: storage.currentChatId});
		element.parentNode?.parentNode?.removeChild(element?.parentNode);
	}

	async openChatMembersModalDialog() {
		const users = (await chatService.getUsersByChatID(storage.currentChatId)).response
			.sort((a: { role: number; }, b: { role: number; }) => a.role > b.role ? 1 : -1);
		const usersHtml = _.template(userListTmpl)({users: users, baseUrl: API_RESOURCES_URL});

		const modalDialog = document.getElementById('chatMembersModalDialog') as HTMLElement;
		modalDialog.innerHTML = _.template(membersModalDialogTmpl)({usersHtml});
		modalDialog.style.display = 'block';

		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	sendMessage() {
		const element = document.getElementById('message') as HTMLInputElement;

		messageService.sendMessage(element.value);
	}

	// Render chat messages
	async onChatClick(e: Event) {
		const element = e.currentTarget as HTMLElement;
		const id = Number(element.getAttribute('id') as string);
		const chat: TChatInfo | undefined = storage.chatInfoList.find(x => x.id === id);

		storage.currentChatId = id;

		// messageService.close();
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
			chat, avatar: `${API_RESOURCES_URL}/${chat?.avatar}`
		});

		const node = document.getElementById('chat-messages');
		if (!node) {
			return;
		}

		node.innerHTML = messagesPanelHtml;

		// Снять подсветку для всех эл. чата
		// установить для текущего
		const chatElements = document.getElementsByClassName('chat-item');

		// ToDo: forEach.call - везде заменить
		Array.prototype.forEach.call(chatElements, (chat: any) => chat.setAttribute('style', 'background-color: rgba(250, 250, 250);'));

		element.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);');

		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	async setConnectUserChat(id?: string) {
		const user: TUserInfo = (await userService.getUserById(Number(id))).response;
		console.log('setConnectUserChat, user: ', user);
	}

	setErrorWebSocket(error?: string) {
		console.log('setErrorWebSocket, error: ', error);
	}

	async setMessageChatHandler(data: TMessage | TMessage[]): Promise<void> {
		console.log('setMessageChatHandler, messages: ', data);

		if (!Array.isArray(data)) {
			data = [data];
		}

		let messages = [];

		for (let i = 0; i < data.length; i++) {
			const user: TUserInfo = (await userService.getUserById(data[i].user_id)).response;
			const time = new Date(data[i].time).toLocaleTimeString('ru', {hour: 'numeric', minute: 'numeric', second: 'numeric'});

			messages.push({user: user, time: time, text: data[i].content});
		}

		console.log('messages', messages);

		const element = document.getElementById('chat_messages') as HTMLElement;
		element.innerHTML = _.template(messagesTmpl)({messages});
	}

	onFilterChange(e: InputEvent) {
		const element: HTMLInputElement = e.target as HTMLInputElement;
		console.log(`${element.id}: ${element.value}`);
	}
}

