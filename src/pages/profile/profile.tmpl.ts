export const pageTmpl: string =
`<div class="back-panel">
    <a onclick="window.goBack()" class="circle-back">
        <svg viewBox="0 0 24 24" fill="white" width="24px" height="24px" style="margin: 5px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    </a>
 </div>

 <div class="info-panel">
    <div class="avatar">
        <img class="image" src="<%-avatar%>">
        <div class="overlay">
            <a class="text" onclick="<%-openEditModal%>"> Поменять<br>аватар </a>
        </div>
    </div>

    <h2 id="user-name"><%-name%></h2>

    <div id="info-items"><%=infos%></div>
    <div id="password-items"></div>

    <div id="btn-panel">
        <%=saveButton%>
        <%=cancelButton%>
    </div>

    <div class="link-row" onclick="<%-changeData%>">
        <a id="dataChangeLink">Изменить данные</a>
    </div>
    <div class="link-row" onclick="<%-changePassword%>">
        <a id="passwordChangeLink">Изменить пароль</a>
    </div>
    <div class="link-row" style="border: none;">
        <a id="exit" onclick="<%-systemExitClick%>" class="close">Выйти</a>
    </div>

    <div id="openEditModal" class="blackout">
        <form id="avatar_form" class="modalDialog" enctype="multipart/form-data">
            <h2>Загрузите файл</h2>
            <input id="fileInput" type="file" name="avatar" accept=".jpg, .jpeg, .png">
            <a onclick="<%-saveAvatar%>" class="btn-confirm">Поменять</a>
        </form>
    </div>
 </div>`

export const infoItemsTmpl: string = 
   `<% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <% if (item.id == 'email') { %>
            <input class="info-input" value="<%-item.value%>" id="<%-item.id%>" onblur="<%-inputEmailOnblur%>" onfocus="<%-inputOnfocus%>" autocomplete="off" disabled>
        <% } else { %>
            <input class="info-input" value="<%-item.value%>" id="<%-item.id%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>" autocomplete="off" disabled>
        <% }  %>
    </div>
    <div id="<%-item.id%>_error" class="error" style="float:right"></div>
    <% }); %>`

export const passwordItemsTmpl: string = 
   `<% items.forEach(function(item) { %>
    <div class="row">
        <h4><%-item.title%></h4>
        <input class="password-input" type="password" id="<%-item.id%>" onblur="<%-inputPasswordOnblur%>" onfocus="<%-inputOnfocus%>">
    </div>
    <div id="<%-item.id%>_error" class="error" style="float:right"></div>
    <% }); %>`
