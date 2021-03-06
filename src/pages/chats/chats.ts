import { Block } from "../../utils/block.js";
import { RenderHelper } from "../../utils/render-helper.js";
import { chats } from "./chats-data.js";
import { chatsTemplate, messagesTemplate, pageTemplate, messagesPanelTemplate } from "./templates.js";

export class ChatsPage extends Block {
    constructor() {
        super('chats-page');
    }

    render() {
        chats.forEach(chat => { 
            let lastMessage = chat.messages.sort((a, b) => a.time < b.time ? 1 : -1)[0];     
            chat.lastTime = lastMessage.time;
            chat.lastMessage = lastMessage.fromMe ? `Вы: ${lastMessage.text}` : lastMessage.text;
        });
    
        let chatsHtml = _.template(chatsTemplate)({ items: chats, onclick: 'window.onChatClick(this)' });

        let pageHtml = _.template(pageTemplate)({
            chats: chatsHtml,
            onfilterchange: 'window.onFilterChange(this)',
            onloginchange: 'window.onChange(this)'
        });

        return pageHtml;
    }
}

window.showDropdownMenu = () => {
    document.getElementById('myDropdown')?.classList.toggle('show');
}

window.onclick = (event: any) => {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        Array.prototype.forEach.call(dropdowns, (item: any) => {
            if (item.classList.contains('show')) {
                item.classList.remove('show');
            }
        });
    }
}

// render chat messages
window.onChatClick = (element: any) => {
    let id = element.getAttribute('id');
    let chat = chats.find(x => x.id == id);

    if (!chat) return;

    // скрыть сообщение  с информацией
    (document.getElementById('msg-info') as HTMLElement).style.display = 'none';

    let _messages = chat.messages;
    if (!_messages) return;

    _messages.sort((a, b) => a.time > b.time ? 1 : -1);
    let messagesHtml = _.template(messagesTemplate)({ messages: _messages });
    let messagesPanelHtml = _.template(messagesPanelTemplate)(
        { 
            messages: messagesHtml, 
            name: chat.name,
            onMessageChange: 'window.onChange(this)',
            onDropdownMenuClick: 'window.showDropdownMenu(this)'
        });

    (document.getElementById('chat-messages') as HTMLElement).innerHTML = messagesPanelHtml;

    // снять подсветку для всех эл. чата
    // установить для текущего
    const chatElements = document.getElementsByClassName('chat-item');
    Array.prototype.forEach.call(chatElements, (chat: any) => chat.setAttribute('style', 'background-color: rgba(250, 250, 250);'));

    element.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);')
}

window.onFilterChange = (element: any) => {
    const userNikElements = document.getElementsByClassName('user-nik');
    for (let i = 0; i < userNikElements.length; i++) {
        let elem = userNikElements[i]?.parentElement?.parentElement?.parentElement;
        if (!elem) continue;

        let searchName = element.value.toLocaleUpperCase();
        
        if (!userNikElements[i].textContent?.toLocaleUpperCase().includes(searchName)) {
            elem.classList.add('hidden');
            continue;
        } 

        if (elem.classList.contains('hidden')) {
            elem.classList.remove('hidden');
        } 
    }

    console.log(`${element.id}: ${element.value}`);
}

const chatsPage = new ChatsPage();
RenderHelper.render('.app', chatsPage);