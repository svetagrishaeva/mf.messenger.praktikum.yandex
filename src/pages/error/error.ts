import {errorTemplate} from './errror.tmpl';
import {Block} from '../../utils/block';

import './error.css';

export const error404 = {
	code: '404',
	message: 'Не туда попали.'
};

export const error500 = {
	code: '500',
	message: 'Мы уже фиксим.'
};

export class ErrorPage extends Block {
	constructor(props: { title: string, code: string, message: string }) {
		super('error', props);
	}

	render() {
		return _.template(errorTemplate)({
			code: this.props.code,
			message: this.props.message,
			onclick: 'goTo(\'#chats\')'
		});
	}
}
