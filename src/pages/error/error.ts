import { errorTemplate } from "./errror.tmpl.js"; 
import { Block } from "../../utils/block.js";

export const error404 = {
    title: '404 - страница не найдена',
    code: '404',
    message: 'Не туда попали.'
};

export const error500 = {
    title: '500 - ошибка приложения',
    code: '500',
    message: 'Мы уже фиксим.'
};


export class ErrorPage extends Block {
    constructor(props: { title: string, code: string, message: string }) {
        super('error', props);
    }

    render() {
        return _.template(errorTemplate)({
            title: this.props.title,
            code: this.props.code,
            message: this.props.message
        });
    }
}
