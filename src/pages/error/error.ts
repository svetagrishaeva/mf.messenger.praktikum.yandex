import { errorTemplate } from "./errror.tmpl.js"; 
import { Block } from "../../utils/block.js";

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
            onclick: "window.goTo('#chats')"
        });
    }
}
