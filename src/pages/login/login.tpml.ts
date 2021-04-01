export const pageTmpl = 
      `<form class="form" autocomplete="off">
            <h2>Вход</h2>

            <div class="md-input">      
                  <input id="login" type="text" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
                  <label>Логин</label>
                  <div id="login_error" class="error"></div>
            </div>

            <div class="md-input">      
                  <input id="password" type="password" onblur="<%-inputPasswordOnblur%>" onfocus="<%-inputOnfocus%>">
                  <label>Пароль</label>
                  <div id="password_error" class="error"></div>
            </div>

            <%=button%>
            <div id="auth_error" class="error hidden">Не удаётся войти. Пожалуйста, проверьте правильность написания логина и пароля.</div>
            <a onclick="goTo('#signin')">Нет аккаунта?</a>
      </form>`
        