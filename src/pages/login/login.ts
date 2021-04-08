import {authService, TSignIn} from '../../api/auth';
import {PageBase} from '../../components/page-base/page-base';
import {Button} from '../../components/button/button';
import {router} from '../../utils/router';
import {pageTmpl} from './login.tpml';
import {TUserInfo} from '../../api/user';
import {storage} from '../../storage/storage';

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

		return _.template(pageTmpl)({
			button: buttonHtml,
			inputOnblur: 'this.inputOnblur($event)',
			inputPasswordOnblur: 'this.inputPasswordOnblur($event)',
			inputOnfocus: 'this.inputOnfocus($event)'
		});
	}

	loginClick() {
		const inputElements = document.getElementsByTagName('input');
		const params: any[] = [];
		Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));

		const valid = this.checkOnValid(params);

		if (!valid) {
			return;
		}

		const data: Indexed = {};

		for (let i = 0; i < params.length; i++) {
			data[params[i].id] = params[i].value;
		}

		authService.signIn(data as TSignIn).then((data: { ok: boolean, response: string }) => {
			if (data.ok || data.response.toLowerCase().includes('user already in system')) {
				this.hideErrorMessage();

				authService.getUser().then((data: { ok: boolean, response: TUserInfo }) => {
					if (!data.ok) {
						return;
					}

					storage.userInfo = data.response;
					storage.isAuth = true;
				}).finally(() => router.go('#chats'));
			} else {
				this.showErrorMessage();
			}
		});
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
