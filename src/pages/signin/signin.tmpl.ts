export const pageTmpl =
        `<div class="form" autocomplete="off">
           <h2>Регистрация</h2>
           
           <div class="md-input">      
             <input id="first_name" type="text" onblur="this.inputOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Имя</label>
             <div id="first_name_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="second_name" type="text" onblur="this.inputOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Фамилия</label>
             <div id="second_name_error" class="error"></div>
           </div>

           <div class="md-input">      
             <input id="phone" type="text" onblur="this.inputOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Телефон</label>
             <div id="phone_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="login" type="text" onblur="this.inputOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Логин</label>
             <div id="login_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="email" type="text" onblur="this.inputEmailOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Почта</label>
             <div id="email_error" class="error"></div>
           </div>
     
           <div class="md-input">      
               <input id="password" type="password" onblur="this.inputPasswordOnblur($event)" onfocus="this.inputOnfocus($event)">
               <label>Пароль</label>
               <div id="password_error" class="error"></div>
           </div>
     
           <div class="md-input">      
             <input id="passwordAgain" type="password" onblur="this.inputPasswordOnblur($event)" onfocus="this.inputOnfocus($event)">
             <label>Пароль (еще раз)</label>
             <div id="passwordAgain_error" class="error"></div>
           </div>
     
           <%=button%>
           <a onclick="goTo('#login')">Войти</a>
        </div>`;
