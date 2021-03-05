import { errorTemplate } from './template.js';
import { Block } from '../../blocks/Block.js';
import { RenderHelper } from '../../lib/render-helper.js';
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
    constructor(props) {
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
const errorPage = new ErrorPage(error404);
RenderHelper.render('.app', errorPage);
//# sourceMappingURL=error.js.map