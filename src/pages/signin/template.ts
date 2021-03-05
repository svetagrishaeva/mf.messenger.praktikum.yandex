export const pageTmpl = 
        `<div class="form">
           <h2>Регистрация</h2>
           
           <div class="md-input">      
             <input id="first_name" type="text" onchange="<%-onChange%>" required>
             <label>Имя</label>
           </div>
     
           <div class="md-input">      
             <input id="second_name" type="text" onchange="<%-onChange%>" required>
             <label>Фамилия</label>
           </div>
     
           <div class="md-input">      
             <input id="phone" type="text" onchange="<%-onChange%>" required>
             <label>Телефон</label>
           </div>
     
           <div class="md-input">      
             <input id="login" type="text" onchange="<%-onChange%>" required>
             <label>Логин</label>
           </div>
     
           <div class="md-input">      
             <input id="email" type="text" onchange="<%-onChange%>" required>
             <label>Почта</label>
           </div>
     
           <div class="md-input">      
               <input id="password" type="password" onchange="<%-onChange%>" required>
               <label>Пароль</label>
           </div>
     
           <div class="md-input">      
             <input id="passwordAgain" type="password" onchange="<%-onChange%>" required>
             <label>Пароль (еще раз)</label>
           </div>
     
           <a href="/500-error" class="btn-confirm">Зарегестрироваться</a>
           <a href="/">Войти</a>
        </div>`