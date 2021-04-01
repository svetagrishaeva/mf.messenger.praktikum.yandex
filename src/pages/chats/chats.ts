import { BASE_URL_Resources } from "../../api/constants.js";
import { chatService } from "../../api/chats.js";
import { userService } from "../../api/user.js";
import { Block } from "../../utils/block.js";
import { APP_ROOT_ID, router } from "../../utils/router.js";
import { chatsTmpl, pageTmpl, messagesPanelTmpl, membersModalDialogTmpl, userListTmpl } from "./chats.tmpl.js";

export class ChatsPage extends Block {
    constructor(props: any = {}) {
        super('chats-page', props);

        // вынести в отдельный метод
        chatService.getChats().then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;
            let chatList = JSON.stringify(resp.response);
            localStorage.setItem('chatList', chatList);

            this.props = resp.response;
        });
    }

    render() {
        let isAuth = localStorage.getItem('isAuth');
        
        if (!isAuth) {
            router.go('');
            return '';
        }

        let chatList = JSON.parse(localStorage.getItem('chatList') as string) || [];
        let chatsHtml = _.template(chatsTmpl)({ items: chatList});
        let pageHtml = _.template(pageTmpl)({ chatsHtml: chatsHtml });

        return pageHtml;
    }
    
    onLoginChange(e: InputEvent) {
        let element: HTMLInputElement = e.target  as HTMLInputElement;

        userService.searchUserByLogin({ login: element.value }).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;

            let chatId = +(localStorage.getItem('curChatId') as string);
            let users = resp.response;

            chatService.getUsersByChatID(chatId).then((resp: { ok: boolean, response: any }) => {
                if (!resp.ok) return;

                let element = document.getElementById('users_by_login') as HTMLElement;
                let userIds = resp.response.map((x: { id: number }) => x.id);
                users = users.filter((x: { id: number }) => !userIds.includes(x.id));

                if (users.length === 0) {
                    element.textContent = 'Список пуст';
                    return;
                }

                let usersHtml = _.template(userListTmpl)({ users: users, baseUrl: BASE_URL_Resources });
                element.innerHTML = usersHtml;

                //
                this._addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
            });
        });
    }

    async createChat() {
        let elem = document.getElementById('chat_title') as HTMLInputElement;
        if (!elem) return;

        await chatService.createChat({ title: elem.value });

        // вынести в отдельный метод
        chatService.getChats().then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;
            let chatList = JSON.stringify(resp.response);
            localStorage.setItem('chatList', chatList);

            // обновить текущую страницу
            router.update();
        });
    }

    deleteChat() {
        let chatId = +(localStorage.getItem('curChatId') as string);

        chatService.deleteChatByID({ chatId }).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;

            // вынести в отдельный метод
            chatService.getChats().then((resp: { ok: boolean, response: any }) => {
                if (!resp.ok) return;
                let chatList = JSON.stringify(resp.response);
                localStorage.setItem('chatList', chatList);

                // обновить текущую страницу
                router.update();
            });
        });
    }

    addUserToChat(e: Event) {
        let element: HTMLElement = e.currentTarget as HTMLElement;
        let chatId = +(localStorage.getItem('curChatId') as string);
        let userId = +(element.getAttribute('id') as string);
        let userIds = [userId];
        let data = { users: userIds, chatId };

        chatService.addNewUsersToChat(data).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;
            element.removeAttribute('onclick');
            element.style.display = 'none';
        });
    }

    removeUserFromChat(e: Event) {
        let element: HTMLElement = e.currentTarget as HTMLElement;
        let chatId = +(localStorage.getItem('curChatId') as string);
        let userId = +(element.getAttribute('id') as string);
        let userIds = [userId];
        let data = { users: userIds, chatId };

        chatService.deleteUsersFromChat(data).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;
            element.parentNode?.parentNode?.removeChild(element?.parentNode);
        });
    }

    openChatMembersModalDialog() {
        let chatId = +(localStorage.getItem('curChatId') as string);

        chatService.getUsersByChatID(chatId).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;

            let users = resp.response.sort((a: { role: number; }, b: { role: number; }) => a.role > b.role ? 1 : -1);
            let usersHtml = _.template(userListTmpl)({
                users: users, 
                baseUrl: BASE_URL_Resources
            });

            let membersModalDialogHtml = _.template(membersModalDialogTmpl)({ usersHtml });

            let modalDialog = document.getElementById('chatMembersModalDialog') as HTMLElement;
            modalDialog.innerHTML = membersModalDialogHtml;
            modalDialog.style.display = 'block';

            //
            this._addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
        });
    }

    // render chat messages
    onChatClick(e: Event) {
        let element = e.target as HTMLElement;
        let id = element.getAttribute('id') as string;
        let chatList: any[] = JSON.parse(localStorage.getItem('chatList') as string);
        let chat = chatList.find(x => x.id === +id) || {};

        localStorage.setItem('curChatId', id);

        // скрыть сообщение  с информацией
        (document.getElementById('msg-info') as HTMLElement).style.display = 'none';

        let messagesPanelHtml = _.template(messagesPanelTmpl)({
             chat, avatar: `${BASE_URL_Resources}/${chat.avatar}`
        });

        let node = document.getElementById('chat-messages')
        if (!node) return;
        node.innerHTML = messagesPanelHtml;

        // снять подсветку для всех эл. чата
        // установить для текущего
        const chatElements = document.getElementsByClassName('chat-item');
        Array.prototype.forEach.call(chatElements, (chat: any) => chat.setAttribute('style', 'background-color: rgba(250, 250, 250);'));

        element.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);');
        
        //
        this._addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
    }

    onFilterChange(e: InputEvent) {
        let element: HTMLInputElement = e.target  as HTMLInputElement;
        console.log(`${element.id}: ${element.value}`)
    }
}

