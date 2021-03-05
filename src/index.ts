import { RenderHelper } from './lib/render-helper.js';
import { LoginPage } from './pages/login/login.js'

declare global {
    const _: import('../node_modules/@types/lodash/index').LoDashStatic;
    // объявление глобальных методов
    interface Window { 
        onChatClick: any; 
        onFilterChange: any;
        onChange: any;
        showDropdownMenu: any;
        changeData: any; 
        saveData: any;
        changePassword: any 
    }
}

window.onChange = (event: any) => {
    console.log(`${event.id}: ${event.value}`);
}

// точка входа приложения
const loginPage = new LoginPage();
RenderHelper.render('.app', loginPage);