export const pageTmpl: string =
`
<div class="back-panel">
    <a href="/chats" class="circle-back">
        <svg viewBox="0 0 24 24" fill="white" width="24px" height="24px" style="margin: 5px">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    </a>
 </div>

 <div class="info-panel">
    <div class="avatar">
        <!--<div class="circle">
            <svg fill="#bbc3c5a8" width="65px" height="65px" viewBox="0 0 16 16" style="z-index: -1;">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
            </svg>
        </div>-->
        <img style="z-index: -1;" class="circle" src="<%-avatar%>">
        <a class="circle-overlay" id="circle-overlay" onclick="<%-openEditModal%>"> Поменять<br>аватар </a>
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

    <!-- Модальное окно -->
    <div id="openEditModal" class="blackout">
        <div class="modalDialog">
            <h2>Загрузите файл</h2>
            <input type="file" name="file" accept=".jpg, .jpeg, .png">
            <!-- <a href="profile" style="font-size: 18px;">
                Выберите файл на компьютере
            </a> --->
            <a href="profile" class="btn-confirm">Поменять</a>
        </div>
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
