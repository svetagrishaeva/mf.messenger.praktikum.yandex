import { authService, TSignUp } from '../../api/auth';
import { PageBase } from '../../components/page-base/page-base';
import { Button } from '../../components/button/button';
import { router } from '../../utils/router';
import { pageTmpl } from './signin.tmpl';
import { template } from 'lodash';

import '../../css/style.css';

export class SigninPage extends PageBase {
	constructor(props: any = {}) {
		super('signin-page', props);
	}

	render() {
		const buttonHtml = new Button({
			classNames: 'btn-confirm',
			id: 'signinButton',
			text: 'Зарегестрироваться',
			onClick: 'this.signinClick($event)'
		}).render();

		return template(pageTmpl)({ button: buttonHtml });
	}

	async signinClick() {
		const keys = ['first_name', 'second_name', 'phone', 'login', 'email', 'password', 'passwordAgain'];
		const params: {id: string, value: string }[] = [];

		for(let i = 0; i < keys.length; i++) {
			const element = document.getElementById(keys[i]) as HTMLInputElement;
			params.push({id: keys[i], value: element.value});
		}

		if (!this.checkOnValid(params)) return;

		const data: Record<string, any> = {};
		for (let i = 0; i < params.length; i++) {
			if (params[i].id === 'passwordAgain') continue;

			data[params[i].id] = params[i].value;
		}

		await authService.signUp(data as TSignUp);
		router.go('#login');
	}
}

export const signinPage = new SigninPage();
