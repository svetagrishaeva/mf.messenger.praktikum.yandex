
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from './profile.tmpl';
import { Button } from '../../components/button/button';
import { authService } from '../../api/auth';
import { APP_ROOT_ID, router } from '../../utils/router';
import { TUpdateUserPassword, TUpdateUserProfile, userService } from '../../api/user';
import { API_RESOURCES_URL } from '../../api/constants';
import { PageBase } from '../../components/page-base/page-base';
import { storage } from '../../storage/storage';
import { template } from 'lodash';

import './profile.css';
import '../../css/style.css';


type Indexed = Record<string, any>;

export class ProfilePage extends PageBase {
	constructor(props: any = {}) {
		super('profile-page', props);

		const newProps: any[] = [];

		Object.entries(storage.userInfo).forEach(info => {
			const prop = this.props.find((x: {id: string}) => x.id === info[0]);
			if (!prop) {
				return;
			}

			newProps.push({id: prop.id, title: prop.title, value: info[1]});
		});

		this.setProps(newProps);
	}

	render() {
		if (!storage.isAuth) {
			router.go('#login');
			return '';
		}

		const saveButtonHtml = new Button({
			id: 'saveButton',
			classNames: 'btn-confirm',
			text: 'Сохранить',
			onClick: 'this.saveData($event)',
			style: 'display: none; width: 20%;'
		}).render();

		const cancelButtonHtml = new Button({
			id: 'cancelButton',
			classNames: 'btn-cancel',
			text: 'Отмена',
			onClick: 'this.cancelChange($event)',
			style: 'display: none; width: 20%;'
		}).render();

		// ToDo: в шаблон
		this.props.forEach((element: { id: string; value: any; }) => {
			if (element.id === 'display_name') {
				element.value = element.value || this.props.find((x: { id: string; }) => x.id == 'first_name')?.value;
			}
		});

		// ToDo: разделить данные
		const data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password') && x.id !== 'avatar');

		const infoItemsHtml = template(infoItemsTmpl)({
			items: data
		});

		const pageHtml = template(pageTmpl)({
			user: storage.userInfo,
			baseUrl: API_RESOURCES_URL,
			saveButton: saveButtonHtml,
			cancelButton: cancelButtonHtml,
			infos: infoItemsHtml
		});

		return pageHtml;
	}

	async systemExitClick() {
		try {
			await authService.logout();
		} catch (err) {
			console.log('error:', err);
		} finally {
			storage.clear();
			router.go('#login');
		}
	}

	changeData() {
		setDisplayValueForElements('none');
		// Отобразить кнопки
		(document.getElementById('saveButton') as HTMLElement).style.display = 'block';
		(document.getElementById('cancelButton') as HTMLElement).style.display = 'block';

		this.props.forEach((x: { id: string; }) => {
			const element = document.getElementById(x.id) as HTMLElement;
			if (element) {
				element.removeAttribute('disabled');
			}
		});
	}

	changePassword() {
		setDisplayValueForElements('none');
		// Отобразить кнопки
		(document.getElementById('saveButton') as HTMLElement).style.display = 'block';
		(document.getElementById('cancelButton') as HTMLElement).style.display = 'block';

		const dataElements = document.getElementById('info-items')?.children;
		Array.prototype.forEach.call(dataElements, (x: HTMLElement) => x.style.display = 'none');

		// Password items page render
		const passwordItems = this.props.filter((x: { id: string }) => x.id.toLowerCase().includes('password'));

		const html = template(passwordItemsTmpl)({items: passwordItems});

		(document.getElementById('password-items') as HTMLElement).innerHTML = html;

		this.addHandlers(document.getElementById(APP_ROOT_ID) as HTMLElement);
	}

	cancelChange() {
		// Обновить текущую страницу (для перерендеринга)
		router.update();
	}

	async saveAvatar() {
		let inputNode: any = document.querySelector('#avatar_form');
		let avatarData = new FormData(inputNode);

		await userService.updateUserAvatar(avatarData);

		storage.userInfo = (await authService.getUser()).response;
		router.update();
	}

	// ToDo: разделить данные
	async saveData() {
		const params: any[] = [];
		const data: Indexed = {};
		let isPassword = false;
		const passwordKeys = ['oldPassword', 'newPassword'];

		for (let i = 0; i < passwordKeys.length; i++) {
			const element = document.getElementById(passwordKeys[i]) as HTMLInputElement;
			if (!element) {
				continue;
			}

			params.push({id: element.id, value: element.value});
			data[params[i].id] = params[i].value;
			isPassword = true;
		}

		if (!isPassword) {
			const profileKeys = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

			for (let i = 0; i < profileKeys.length; i++) {
				const element = document.getElementById(profileKeys[i]) as HTMLInputElement;
				if (!element) {
					continue;
				}

				params.push({id: element.id, value: element.value});
				data[params[i].id] = params[i].value;
			}
		}

		let isPasswordChange = true;
		if (!this.checkOnValid(params, isPasswordChange)) {
			return;
		}

		isPassword ?
			await userService.updateUserPassword(data as TUpdateUserPassword) :
			await userService.updateUserProfile(data as TUpdateUserProfile);

		// Update local storage
		storage.userInfo = (await authService.getUser()).response;
		// Обновить текущую страницу
		router.update();
	}
}

function setDisplayValueForElements(value: string) {
	let elements = document.getElementsByClassName('link-row');
	Array.prototype.forEach.call(elements, (x: HTMLElement) => x.style.display = value);

	(document.getElementById('user-name') as HTMLElement).style.display = value;
}

