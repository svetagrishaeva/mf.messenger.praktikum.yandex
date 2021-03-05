export const pageTemplate = `<div id="chats" class="chats">
       <div class="chats-header">
           <a href="profile" class="profile-link">
               Профиль
               <svg viewBox="0 0 24 24" fill="rgb(80, 125, 252)" width="24px" height="24px">
                   <path d="M0 0h24v24H0z" fill="none"/>
                   <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
               </svg>
           </a>
           <br>
           <input id="filter" class="form-control" type="search" placeholder="Поиск" onchange="<%-onfilterchange%>"></input>
           <br>
       </div>
       <%=chats%>
   </div>

   <div id="msg-info">
       <div> Выберите чат, чтобы отправить сообщение. </div>
   </div>

   <div id="chat-messages"></div>

   <!-- Модальное окно -->
   <div id="openAddModal" class="blackout">
       <div class="modalDialog">
           <h2>Добавить пользователя</h2>

           <div style="position: relative; margin-bottom: 20px;">      
               <input id="new_user_login" type="text" required onchange="<%-onloginchange%>">
               <label>Логин</label>
           </div>

           <a href="chats/#close" class="btn-confirm">Добавить</a>
       </div>
   </div>

   <!-- Модальное окно -->
   <div id="openRemoveModal" class="blackout">
       <div class="modalDialog" style="padding-left: 30px; padding-right: 30px; width: 170px; height: 100px;">
           <h4>Удалить чат?</h4>

           <div style="display: flex;">
               <a href="chats/#close" class="btn-ok">Удалить</a>
               <a href="chats/#close" class="btn-сancel">Отмена</a>
           </div>
       </div>
    </div>`;
export const chatsTemplate = `<% items.forEach(function(item) { %>
    <table id="<%-item.id%>" class="chat-item" onclick="<%-onclick%>">
        <td rowspan="3" style="width: 60px; height: 60px; padding: 0 10px">
            <svg viewBox="0 0 16 16" width="60px" height="60px" fill="white" style="border-radius: 50%;">
                <path d="M0 0h16v16H0V0z" fill="#DFE5E7" />
                <path style="stroke-width: 0px;"  d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path style="stroke: #DFE5E7;" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </td>
        <tr>
            <td id="user-nik" class="user-nik"> <%-item.name%> </td> 
            <td class="last-time"> <%-item.lastTime%> </td>
        </tr>
        <td colspan="2"
            style="font-size: 16px; vertical-align: top; height: 45px; max-height: 45px; max-width: 250px; width: 250px;  display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;"> 
            <%-item.lastMessage%>
        </td>
        <td>
            <% if (item.messageCount !== 0) { %>
                <div id="circle" class="circle">
                    <%-item.messageCount%>
                </div>
            <% } %>
        </td>
    </table>
    <% }); %>`;
export const messagesPanelTemplate = `<div class="messages-header">
    <table>
        <tr>
            <td style="max-width: 70px; width: 70px;">
                <svg viewBox="0 0 16 16" width="50px" height="50px" fill="white" style="border-radius: 50%;">
                    <path d="M0 0h16v16H0V0z" fill="#DFE5E7" />
                    <path style="stroke-width: 0px;"  d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path style="stroke: #DFE5E7;" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
            </td>
            <td class="_user-nik" style="padding: 0;">
                <%-name%>
            </td>
            <td> 
                <div class="dropdown" style="float: right;">                 
                    <svg viewBox="0 0 24 24" fill="rgb(80, 125, 252)" width="30px" height="30px" class="dropbtn" onclick="<%-onDropdownMenuClick%>">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="chats/#openAddModal"> 
                            <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="rgb(80, 125, 252)" width="30px" height="30px" style="margin-right: 12px">
                                <rect fill="none" height="24" width="24"/>
                                <path d="M12,7L12,7c-0.55,0-1,0.45-1,1v3H8c-0.55,0-1,0.45-1,1l0,0c0,0.55,0.45,1,1,1h3v3c0,0.55,0.45,1,1,1l0,0 c0.55,0,1-0.45,1-1v-3h3c0.55,0,1-0.45,1-1l0,0c0-0.55-0.45-1-1-1h-3V8C13,7.45,12.55,7,12,7z M12,2C6.48,2,2,6.48,2,12 s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20z"/>
                            </svg>
                            Добавить пользователя
                        </a>
                        <a href="chats/#openRemoveModal">
                            <svg viewBox="0 0 24 24" fill="rgb(80, 125, 252)" width="30px" height="30px" style="margin-right: 12px">
                                <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/>
                                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>
                            </svg>
                            Удалить пользователя
                        </a>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</div>

<div style="max-height: 100%; overflow: auto;">
    <table id="messages">
        <%=messages%>
    </table>
</div>

<div class="footer">
    <table style="min-width: 100%;">
        <tr>
            <td style="width: 40px;">
                <svg viewBox="0 0 24 24" fill="rgba(180, 180, 180)" width="40px" height="40px">
                    <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"/>
                </svg>
            </td>
            <td>
                <input id="message" class="form-control" type="search" style="border-radius: 20px; min-width: 100%;"
                         placeholder="Сообщение" onchange="<%-onMessageChange%>"/>
            </td>
            <td style="width: 40px;">
                <a href="500-error">
                    <div class="circle-send">
                        <svg viewBox="0 0 24 24" fill="white" width="24px" height="24px" style="margin: 5px">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                    </div>
                </a>
            </td>
        </tr>
    </table>
<div>`;
export const messagesTemplate = `<% messages.forEach(function(message) { %>
    <tr>
        <td style="width: 50%;">
            <% if (!message.fromMe) { %>
                <% if (message.picture) { %>
                    <img class="from-picture" src="<%-message.picture%>">
                <% } else { %>
                    <div class="from-message">
                        <%-message.text%>
                        <div style="float: right; color: #aaa; font-size: 12px;">
                            <%-message.time%>
                        </div>
                    </div>
                <% }  %>
            <% }  %>
        </td>
        <td style="width: 50%;">
            <% if (message.fromMe) { %>
                <% if (message.picture) { %>
                    <img class="to-picture" src="<%-message.picture%>">
                <% } else { %>
                    <div class="to-message">
                        <%-message.text%>
                        <div style="float: right; color: rgb(80, 125, 252); font-size: 12px;">
                            <%-message.time%>
                        </div>
                    </div>
                <% }  %>
            <% }  %>
        </td>
    </tr>
<% }); %>`;
//# sourceMappingURL=templates.js.map