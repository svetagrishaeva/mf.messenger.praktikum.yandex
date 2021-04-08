import {authService, TSignUp} from '../../api/auth';
import {PageBase} from '../../components/page-base/page-base';
import {Button} from '../../components/button/button';
import {router} from '../../utils/router';
import {pageTmpl} from './signin.tmpl';

import '../../css/style.css';

type Indexed = Record<string, any>;

export class SigninPage extends PageBase {
	constructor(props: any = {}) {
		super('signin-page', props);
	}

	render() {
		const buttonHtml = new Button({
			classNames: 'btn-confirm',
			id: 'signinButton',
			text: 'Зарегестрироваться',
			onClick: 'this.signinClick($event)'}).render();

		return _.template(pageTmpl)({
			button: buttonHtml,
			inputOnblur: 'this.inputOnblur($event)',
			inputPasswordOnblur: 'this.inputPasswordOnblur($event)',
			inputEmailOnblur: 'this.inputEmailOnblur($event)',
			inputOnfocus: 'this.inputOnfocus($event)'
		});
	}

	async signinClick() {
		const inputElements = document.getElementsByTagName('input');
		const params: any[] = [];
		Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));

		const valid = this.checkOnValid(params);

		if (!valid) {
			return;
		}

		const data: Indexed = {};

		for (let i = 0; i < params.length; i++) {
			if (params[i].id === 'passwordAgain') {
				continue;
			}

			data[params[i].id] = params[i].value;
		}

		await authService.signUp(data as TSignUp);
		router.go('#login');
	}
}

export const signinPage = new SigninPage();
