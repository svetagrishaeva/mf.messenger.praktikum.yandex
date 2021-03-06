import { RenderHelper } from "./utils/render-helper.js";
import { LoginPage } from "./pages/login/login.js";

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
        changePassword: any;
        inputOnblur: any;
        inputPasswordOnblur: any;
        inputEmailOnblur: any;
        inputOnfocus: any;
        applyValidation: any;
        cancelChange: any;
        checkOnValid: any;
        loginClick: any;
        signinClick: any;
    }
}

// точка входа приложения
const loginPage = new LoginPage();
RenderHelper.render('.app', loginPage);