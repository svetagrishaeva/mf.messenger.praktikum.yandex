import { router } from "./utils/router.js";
import { SigninPage } from "./pages/signin/signin.js";
import { ChatsPage } from "./pages/chats/chats.js";
import { ProfilePage, } from "./pages/profile/profile.js";
import { error404, error500, ErrorPage } from "./pages/error/error.js";
import { chats } from "./pages/chats/chats-data.js";
import { infoItems } from "./pages/profile/profile.data.js";
import { LoginPage } from "./pages/login/login.js";

declare global {
    const _: import('../node_modules/@types/lodash/index').LoDashStatic;
    // объявление глобальных методов
    interface Window { 
        onChatClick: (element: HTMLElement) => void; 
        onFilterChange: (element: HTMLInputElement) => void; 
        onChange: any; 
        showDropdownMenu: () => void; 
        changeData: () => void; 
        saveData: () => void; 
        changePassword: () => void; 
        inputOnblur: (input: HTMLInputElement) => void; 
        inputPasswordOnblur: (input: HTMLInputElement) => void; 
        inputEmailOnblur: (input: HTMLInputElement) => void; 
        inputOnfocus: (input: HTMLInputElement) => void; 
        applyValidation: (inputs: HTMLInputElement[], invalid: boolean, message: string) => void; 
        cancelChange: () => void; 
        checkOnValid: (params: any[]) => boolean;
        loginClick: () => void; 
        signinClick: () => void; 
        openModalDialog: () => void;
        openAddModal: () => void;
        openRemoveModal: () => void;
        systemExitClick: () => void;
        
        userLogin: string;
        userId: number;
    }
}

router
    .use('/',  LoginPage)
    .use('/chats', ChatsPage, chats)
    .use('/profile', ProfilePage, infoItems)
    .use('/signin',  SigninPage)
    .use('/error500', ErrorPage, error500)
    .use('/*', ErrorPage, error404)
    .start();;
    