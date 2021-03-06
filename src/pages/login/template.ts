export const pageTmpl = 
       `<div class="form">
        <h2>Вход</h2>

        <div class="md-input">      
              <input id="login" type="text" onchange="<%-onChange%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
              <label>Логин</label>
              <div id="login_error" class="error"></div>
        </div>

        <div class="md-input">      
              <input id="password" type="password" onchange="<%-onChange%>" onblur="<%-inputPasswordOnblur%>" onfocus="<%-inputOnfocus%>">
              <label>Пароль</label>
              <div id="password_error" class="error"></div>
        </div>

        <%=button%>
        <a href="/signin">Нет аккаунта?</a>
        </div>`
        