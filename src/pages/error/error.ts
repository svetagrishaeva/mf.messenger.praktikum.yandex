import { errorTemplate } from './template.js'; 
import { Block } from '../../blocks/Block.js';
import { Error } from '../../models/error.js';
const _ = require('lodash');

export const error404 = new Error({
    title: '404 - страница не найдена<',
    code: '404',
    message: 'Не туда попали.'
});

export const error500 = new Error({
    title: '500 - ошибка приложения<',
    code: '500',
    message: 'Мы уже фиксим.'
});


export class ErrorPage extends Block {
    private _data: Error;

    constructor(data) {
        // section ???
        super('section', data);

        this._data = data;
    }

    render() {
        console.log(errorTemplate);
        return _.template(errorTemplate)({
                title: this._data.title,
                code: this._data.code,
                message: this._data.message
            });
    }
}

