import {router} from './utils/router';
import {SigninPage} from './pages/signin/signin';
import {ChatsPage} from './pages/chats/chats';
import {ProfilePage} from './pages/profile/profile';
import {error404, error500, ErrorPage} from './pages/error/error';
import {infoItems} from './pages/profile/profile.data';
import {LoginPage} from './pages/login/login';

declare global {
    const _: import('../node_modules/@types/lodash/index').LoDashStatic;
    // Объявление глобальных методов
    interface Window {
        // Routing
        goTo: (page: string) => void;
        goBack: (page: string) => void;
    }
}

router
	.use(['', '#login'], LoginPage)
	.use('#chats', ChatsPage)
	.use('#profile', ProfilePage, infoItems)
	.use('#signin', SigninPage)
	.use('#error500', ErrorPage, error500)
	.default('#error404', ErrorPage, error404)
	.start();
