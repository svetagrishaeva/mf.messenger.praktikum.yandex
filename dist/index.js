import { RenderHelper } from './lib/render-helper.js';
import { LoginPage } from './pages/login/login.js';
window.onChange = (event) => {
    console.log(`${event.id}: ${event.value}`);
};
// точка входа приложения
const loginPage = new LoginPage();
RenderHelper.render('.app', loginPage);
//# sourceMappingURL=index.js.map