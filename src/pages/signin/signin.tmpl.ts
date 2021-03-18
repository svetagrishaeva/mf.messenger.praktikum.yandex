export const pageTmpl = 
        `
        <div class="form" autocomplete="off">
           <h2>Регистрация</h2>
           
           <div class="md-input">      
             <input id="first_name" type="text" onchange="<%-onChange%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Имя</label>
             <div id="first_name_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="second_name" type="text" onchange="<%-onChange%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Фамилия</label>
             <div id="second_name_error" class="error"></div>
           </div>

           <div class="md-input">      
             <input id="phone" type="text" onchange="<%-onChange%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Телефон</label>
             <div id="phone_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="login" type="text" onchange="<%-onChange%>" onblur="<%-inputOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Логин</label>
             <div id="login_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="email" type="text" onchange="<%-onChange%>" onblur="<%-inputEmailOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Почта</label>
             <div id="email_error" class="error"></div>
           </div>
     
           <div class="md-input">      
               <input id="password" type="password" onchange="<%-onChange%>" onblur="<%-inputPasswordOnblur%>" onfocus="<%-inputOnfocus%>">
               <label>Пароль</label>
               <div id="password_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="passwordAgain" type="password" onchange="<%-onChange%>" onblur="<%-inputPasswordOnblur%>" onfocus="<%-inputOnfocus%>">
             <label>Пароль (еще раз)</label>
             <div id="passwordAgain_error" class="error"></div>
           </div>
     
           <%=button%>
           <a href="/">Войти</a>
        </div>`