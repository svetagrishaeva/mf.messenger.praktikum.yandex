export const pageTmpl: string =
`<div class="back-panel">
    <a onclick="goBack()" class="circle-back">
        <svg viewBox="0 0 24 24" fill="white" width="24px" height="24px" style="margin: 5px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    </a>
 </div>

 <div class="info-panel">
    <div class="avatar">
        <% if (user.avatar != null) { %>
            <img class="image" src="<%-baseUrl%><%-user.avatar%>">
        <% } else { %>
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="white" style="margin-top: 0px; border-radius: 50%;">
                <path d="M0 0h16v16H0V0z" fill="#DFE5E7" />
                <path style="stroke-width: 0px;"  d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path style="stroke: #DFE5E7;" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        <% } %>
        <div class="overlay">
            <a class="text" onclick="document.getElementById('openEditModal').style.display = 'block'"> Поменять<br>аватар </a>
        </div>
    </div>

    <h2 id="user-name"><%-user.display_name%></h2>

    <div id="info-items"><%=infos%></div>
    <div id="password-items"></div>

    <div id="btn-panel">
        <%=saveButton%>
        <%=cancelButton%>
    </div>

    <div class="link-row" onclick="this.changeData()">
        <a id="dataChangeLink">Изменить данные</a>
    </div>
    <div class="link-row" onclick="this.changePassword()">
        <a id="passwordChangeLink">Изменить пароль</a>
    </div>
    <div class="link-row" style="border: none;">
        <a id="exit" onclick="this.systemExitClick()" class="close">Выйти</a>
    </div>

    <div id="openEditModal" class="blackout">
        <form id="avatar_form" class="modalDialog" enctype="multipart/form-data">
            <h2>Загрузите файл</h2>
            <input id="fileInput" type="file" name="avatar" accept=".jpg, .jpeg, .png">
            <a onclick="this.saveAvatar()" class="btn-confirm">Поменять</a>
        </form>
    </div>
 </div>`

export const infoItemsTmpl: string = 
   `<% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <% if (item.id == 'email') { %>
            <input class="info-input" value="<%-item.value%>" id="<%-item.id%>" onblur="this.inputEmailOnblur($event)" onfocus="this.inputOnfocus($event)" autocomplete="off" disabled>
        <% } else { %>
            <input class="info-input" value="<%-item.value%>" id="<%-item.id%>" onblur="this.inputOnblur($event)" onfocus="this.inputOnfocus($event)" autocomplete="off" disabled>
        <% }  %>
    </div>
    <div id="<%-item.id%>_error" class="error" style="float:right"></div>
    <% }); %>`

export const passwordItemsTmpl: string = 
   `<% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <input class="password-input" type="password" id="<%-item.id%>" onblur="this.inputPasswordOnblur($event)" onfocus="this.inputOnfocus($event)">
    </div>
    <div id="<%-item.id%>_error" class="error" style="float:right"></div>
    <% }); %>`
