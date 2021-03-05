export const pageTmpl = `<link rel="stylesheet" type="text/css" href="css/input.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">

        <div class="form">
        <h2>Вход</h2>

        <div class="md-input">      
        <input id="login" type="text" onchange="<%-onChange%>" required>
        <label>Логин</label>
        </div>

        <div class="md-input">      
        <input id="password" type="password"  onchange="<%-onChange%>" required>
        <label>Пароль</label>
        </div>

        <a href="chats" class="btn-confirm">Авторизоваться</a>
        <a href="signin">Нет аккаунта?</a>
        </div>`;
//# sourceMappingURL=template.js.map