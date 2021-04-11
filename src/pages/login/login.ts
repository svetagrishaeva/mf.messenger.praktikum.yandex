import { authService, TSignIn } from '../../api/auth';
import { PageBase } from '../../components/page-base/page-base';
import { Button } from '../../components/button/button';
import { router } from '../../utils/router';
import { pageTmpl } from './login.tpml';
import { storage } from '../../storage/storage';
import { template } from 'lodash';
import { chatService } from '../../api/chats';

import '../../css/style.css';

type Indexed = Record<string, any>;

export class LoginPage extends PageBase {
	constructor(props: any = {}) {
		super('login-page', props);
	}

	render() {
		const buttonHtml = new Button({
			classNames: 'btn-confirm',
			id: 'loginButton',
			text: 'Авторизоваться',
			onClick: 'this.loginClick($event)'
		}).render();

		return template(pageTmpl)({
			button: buttonHtml,
			inputOnblur: 'this.inputOnblur($event)',
			inputPasswordOnblur: 'this.inputPasswordOnblur($event)',
			inputOnfocus: 'this.inputOnfocus($event)'
		});
	}

	async loginClick() {
		const inputElements = document.getElementsByTagName('input');
		const params: any[] = [];
		Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));

		if (!this.checkOnValid(params)) return;

		const data: Indexed = {};
		for (let i = 0; i < params.length; i++) {
			data[params[i].id] = params[i].value;
		}

		const result = await authService.signIn(data as TSignIn);
		if (result.ok || result.response.toLowerCase().includes('user already in system')) {
			this.hideErrorMessage();
			storage.userInfo = (await authService.getUser()).response;
			storage.chatInfoList = (await chatService.getChats()).response;
			storage.isAuth = true;
			router.go('#chats');
		} else {
			this.showErrorMessage();
		}
	}

	// Скрыть сообщение об ошибке авторизации
	private hideErrorMessage() {
		const loginErrorElement = (document.getElementById('auth_error') as HTMLElement);
		if (!loginErrorElement.classList.contains('hidden')) {
			loginErrorElement.classList.add('hidden');
		}
	}

	// Отобразить сообщение об ошибке авторизации
	private showErrorMessage() {
		const loginErrorElement = (document.getElementById('auth_error') as HTMLElement);
		if (loginErrorElement.classList.contains('hidden')) {
			loginErrorElement.classList.remove('hidden');
		}
	}
}
