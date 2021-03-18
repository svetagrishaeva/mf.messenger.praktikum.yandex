import { Block } from "../../utils/block.js";
import { chats } from "./chats-data.js";
import { chatsTemplate, messagesTemplate, pageTemplate, messagesPanelTemplate } from "./chats.tmpl.js";

export class ChatsPage extends Block {
    constructor(props: any = {}) {
        super('chats-page', props);
    }

    render() {
        chats.forEach(chat => { 
            let lastMessage = chat.messages.sort((a, b) => a.time < b.time ? 1 : -1)[0];     
            chat.lastTime = lastMessage.time;
            chat.lastMessage = lastMessage.fromMe ? `Вы: ${lastMessage.text}` : lastMessage.text;
        });
    
        let chatsHtml = _.template(chatsTemplate)({ items: this.props, onclick: 'window.onChatClick(this)' });

        let pageHtml = _.template(pageTemplate)({
            chats: chatsHtml,
            onfilterchange: 'window.onFilterChange(this)',
            onloginchange: 'window.onChange(this)'
        });

        return pageHtml;
    }
}

window.openAddModal = () => {
    console.log('[dbg]: open add modal dialog');
    let elem = document.getElementById('openAddModal');
    if (!elem) return;
    elem.style.display = 'block';
};

window.openRemoveModal = () => {
    console.log('[dbg]: open remove modal dialog');
    let elem = document.getElementById('openRemoveModal');
    if (!elem) return;
    elem.style.display = 'block';
};

window.showDropdownMenu = () => {
    console.log('[dbg]: show dropdown menu');
    let elem = document.getElementById('myDropdown');
    if (!elem) return;
    // elem.classList.toggle('show');
    elem.style.display = 'block';
    console.log(elem);
}

window.onclick = (event: any) => {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        Array.prototype.forEach.call(dropdowns, (item: any) => {
            item.style.display = 'none';
            //if (item.classList.contains('show')) {
            //    item.classList.remove('show');
            //}
        });
    }
}

// render chat messages
window.onChatClick = (element: HTMLElement) => {
    let id = element.getAttribute('id');

    let chat = chats.find(x => x.id == +(id as string));

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