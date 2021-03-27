import { chatService } from "../../api/chats.js";
import { userService } from "../../api/user.js";
import { Block } from "../../utils/block.js";
import { chatsTmpl, pageTemplate, messagesPanelTemplate, membersModalDialogTmpl, userListTmpl } from "./chats.tmpl.js";

export class ChatsPage extends Block {
    constructor(props: any = {}) {
        super('chats-page', props);

        window.deleteChat = this.deleteChat;

        // вынести в отдельный метод
        chatService.getChats().then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;
            let chatList = JSON.stringify(resp.response);
            localStorage.setItem('chatList', chatList);

            this.props = resp.response;
        });
    }

    render() {
        let chatList = JSON.parse(localStorage.getItem('chatList') as string);
        let chatsHtml = _.template(chatsTmpl)({ items: chatList, onclick: 'window.onChatClick(this)' });

        let pageHtml = _.template(pageTemplate)({
            chatsHtml: chatsHtml,
            onfilterchange: 'window.onFilterChange(this)',
            onloginchange: 'window.onLoginChange(this)',
            createChat: 'window.createChat(this)'
        });

        return pageHtml;
    }

    deleteChat = () => {
        let chatId = localStorage.getItem('curChatId') as string;

        chatService.deleteChatByID({ chatId: +chatId }).then((resp: { ok: boolean, response: any }) => {
            if (!resp.ok) return;

            // вынести в отдельный метод
            chatService.getChats().then((resp: { ok: boolean, response: any }) => {
                if (!resp.ok) return;
                let chatList = JSON.stringify(resp.response);
                localStorage.setItem('chatList', chatList);

                this.setProps(resp.response);
            });
        });
    }
}

window.onLoginChange = (element: HTMLInputElement) => {
    userService.searchUserByLogin({ login: element.value }).then((resp: {ok: boolean, response: any}) => {
        if (!resp.ok) return;

        let chatId = +(localStorage.getItem('curChatId') as string);
        let users = resp.response;

        chatService.getUsersByChatID(chatId).then((resp: {ok: boolean, response: any}) => {
            if (!resp.ok) return;

            let element = document.getElementById('users_by_login') as HTMLElement;
            let userIds = resp.response.map((x: {id: number}) => x.id);
            users = users.filter((x: {id: number}) => !userIds.includes(x.id));

            if (users.length === 0) {
                element.textContent = 'Список пуст';
                return;
            }

            let usersHtml = _.template(userListTmpl)({ users });
            element.innerHTML = usersHtml;
        });
    });
}

window.createChat = async () => {
    let elem = document.getElementById('chat_title') as HTMLInputElement;
    if (!elem) return;

    await chatService.createChat({ title: elem.value });
}

window.addUserToChat = (element: HTMLElement) => {
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

window.removeUserFromChat = (element: HTMLElement) => {
    let chatId = +(localStorage.getItem('curChatId') as string);
    let userId = +(element.getAttribute('id') as string);
    let userIds = [userId];
    let data = { users: userIds, chatId };

    chatService.deleteUsersFromChat(data).then((resp: { ok: boolean, response: any }) => {
        if (!resp.ok) return;
        element.parentNode?.parentNode?.removeChild(element?.parentNode);
    });
}

window.openAddUserModalDialog = () => {
    let elem = document.getElementById('userAdditionModalDialog');
    if (!elem) return;
    elem.style.display = 'block';
};

window.openAddChatModalDialog = () => {
    let elem = document.getElementById('chatAdditionModalDialog');
    if (!elem) return;
    elem.style.display = 'block';
};

window.openRemoveChatModalDialog = () => {
    let elem = document.getElementById('chatRemovementModalDialog');
    if (!elem) return;
    elem.style.display = 'block';
};

window.openChatMembersModalDialog = () => {
    let chatId = +(localStorage.getItem('curChatId') as string);

    chatService.getUsersByChatID(chatId).then((resp: { ok: boolean, response: any }) => {
        if (!resp.ok) return;

        let usersHtml = _.template(userListTmpl)({ users: resp.response });
        let membersModalDialogHtml = _.template(membersModalDialogTmpl)({ usersHtml });

        let modalDialog = document.getElementById('chatMembersModalDialog') as HTMLElement;
        modalDialog.innerHTML = membersModalDialogHtml;
        modalDialog.style.display = 'block';
    });
};

// render chat messages
window.onChatClick = (element: HTMLElement) => {
    let id = element.getAttribute('id') as string;
    let chatList: any[] = JSON.parse(localStorage.getItem('chatList') as string);
    let chat = chatList.find(x => x.id === +id);

    localStorage.setItem('curChatId', id);

    // скрыть сообщение  с информацией
    (document.getElementById('msg-info') as HTMLElement).style.display = 'none';

    let messagesPanelHtml = _.template(messagesPanelTemplate)({ 
            chat: chat,
            onMessageChange: 'window.onChange(this)',
            onDropdownMenuClick: 'window.showDropdownMenu()',
            openAddModal: 'window.openAddModal()',
            openRemoveModal: 'window.openRemoveModal()',
        });

    (document.getElementById('chat-messages') as HTMLElement).innerHTML = messagesPanelHtml;

    // снять подсветку для всех эл. чата
    // установить для текущего
    const chatElements = document.getElementsByClassName('chat-item');
    Array.prototype.forEach.call(chatElements, (chat: any) => chat.setAttribute('style', 'background-color: rgba(250, 250, 250);'));

    element.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);')
}

window.onFilterChange = (element: HTMLInputElement) => {
    console.log(`${element.id}: ${element.value}`);
}