import { chats } from './chats-data.js';

render();

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = (event) => {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

new_user_login.onchange = onChange;

function onChatClick() {
    // render
    let tmpl = document.getElementById('messages-template').innerHTML; 
    let id = this.getAttribute('id');
    let chat = chats.find(x => x.id == id);

    console.log(this);

    document.getElementById('msg-info').style.display = 'none';
    document.getElementById('chat-messages').innerHTML = _.template(tmpl)({ name: chat.name });

    const chatElements = document.getElementsByClassName('chat-item');
    for (let i = 0; i < chatElements.length; i++) {
        chatElements[i].setAttribute('style', 'background-color: rgba(250, 250, 250);');     
    }

    this.setAttribute('style', 'background-color: rgba(122, 184, 243, 0.2);')

    let messages = chat.messages;
    if (!messages) {
        return;
    }

    messages.sort((a, b) => a.time > b.time ? 1 : -1);

    messages.forEach(message => {
        let tr = document.createElement('tr');
        let td = document.createElement('td'); 

        if (message.picture) {
            let img = document.createElement('img');
            img.setAttribute('src', message.picture); 
            img.className = !message.fromMe ? 'from-picture' : 'to-picture';
            td.appendChild(img);
        } else 
        {
            let div = document.createElement('div'); 
            div.className = !message.fromMe ? 'from-message' : 'to-message';
            div.textContent = !message.picture ? message.text + ' - ' + message.time : '';
            td.appendChild(div);
        }

        td.setAttribute('style', 'width: 50%;')
        if (!message.fromMe) {
            tr.appendChild(td);
            tr.appendChild(document.createElement('td'));
        } else {
            tr.appendChild(document.createElement('td'));
            tr.appendChild(td);
        }

        document.getElementById('messages').appendChild(tr);
    });

    document.getElementsByClassName('dropbtn')[0].onclick = myFunction;  
    document.getElementById('message').onchange = onChange; 
}

function onFilterChange() {
    const userNikElements = document.getElementsByClassName('user-nik');
    
    for (let i = 0; i < userNikElements.length; i++) {
        let elem = userNikElements[i].parentElement.parentElement.parentElement;
        let searchName = this.value.toLocaleUpperCase();
        
        if (!userNikElements[i].innerText.toLocaleUpperCase().includes(searchName)) {
            elem.classList.add('hidden');
            continue;
        } 

        if (elem.classList.contains('hidden')) {
            elem.classList.remove('hidden');
        } 
    }

    console.log(this, this.value);
}

function onChange() {
    console.log(this, this.value);
}

function render() {
    let tmpl = document.getElementById('chats-template').innerHTML;

    chats.forEach(chat => { 
        let lastMessage = chat.messages.sort((a, b) => a.time < b.time ? 1 : -1)[0];     
        chat.lastTime = lastMessage.time;
        chat.lastMessage = lastMessage.fromMe ? `Вы: ${lastMessage.text}` : lastMessage.text;
    });

    document.getElementById('chats').innerHTML += _.template(tmpl)({ items: chats });

    /// remove unnecessary elements
    
    let remove = [];
    let circleElements = document.getElementsByClassName('circle');
    Array.prototype.forEach.call(circleElements, circle => {
        if (circle.textContent == 0) {
            remove.push(circle);
        }
    });

    remove.forEach(element => {
        element.parentElement.removeChild(element);
    });

    let chatElements = document.getElementsByClassName('chat-item');
    Array.prototype.forEach.call(chatElements, chat => chat.onclick = onChatClick);

    /// set filter change event handler 
    filter.onchange = onFilterChange;
}