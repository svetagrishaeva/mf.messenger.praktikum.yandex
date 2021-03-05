import { Block } from '../../blocks/Block.js';
import { infoItems } from './profile-data.js';
import { RenderHelper } from '../../lib/render-helper.js';
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from './templates.js';
export class ProfilePage extends Block {
    constructor() {
        super('profile-page', infoItems);
        this.changeData = () => {
            console.log('dbg: changeData');
            setDisplayValueForElements('none');
            document.getElementById('saveButton').style.display = 'block';
            this.props.forEach((x) => {
                let element = document.getElementById(x.id);
                if (element) {
                    element.removeAttribute('disabled');
                    element.onchange = window.onChange;
                }
            });
        };
        this.changePassword = () => {
            var _a;
            console.log('dbg: changePassword');
            setDisplayValueForElements('none');
            document.getElementById('saveButton').style.display = 'block';
            const dataElements = (_a = document.getElementById('info-items')) === null || _a === void 0 ? void 0 : _a.children;
            Array.prototype.forEach.call(dataElements, (x) => x.style.display = 'none');
            // password items page render 
            let passwordItems = this.props.filter((x) => x.id.toLowerCase().includes('password'));
            render(passwordItems, passwordItemsTmpl, 'password-items');
            passwordItems.forEach((x) => document.getElementById(x.id).onchange = window.onChange);
        };
        this.saveData = () => {
            // update props -> rerender page 
            console.log('dbg: saveData');
            let datas = [];
            this.props.forEach((x) => {
                var _a;
                let element = document.getElementById(x.id);
                if (element) {
                    if (x.id === 'oldPassword') {
                        // сохранить новый пароль
                        let _value = (_a = document.getElementById('newPassword')) === null || _a === void 0 ? void 0 : _a.value;
                        datas.push({ id: x.id, title: x.title, value: _value || x.value });
                        return;
                    }
                    let _value = element.value;
                    datas.push({ id: x.id, title: x.title, value: _value || x.value });
                }
            });
            this.setProps(datas);
        };
    }
    render() {
        var _a;
        let name = (_a = this.props.find((x) => x.id == 'display_name')) === null || _a === void 0 ? void 0 : _a.value;
        let data = this.props.filter((x) => !x.id.toLowerCase().includes('password'));
        let infoItemsHtml = _.template(infoItemsTmpl)({ items: data });
        let pageHtml = _.template(pageTmpl)({
            name: name,
            infos: infoItemsHtml,
            changeData: 'window.changeData()',
            saveData: 'window.saveData()',
            changePassword: 'window.changePassword()'
        });
        return pageHtml;
    }
}
function setDisplayValueForElements(value) {
    let elements = document.getElementsByClassName('link-row');
    Array.prototype.forEach.call(elements, (x) => x.style.display = value);
    document.getElementById('circle-overlay').style.display = value;
    document.getElementById('user-name').style.display = value;
}
/*
function onChange() {
    console.log(`${this.id}: ${this.value}`);
}*/
function render(items, tmpl, parentElementId) {
    console.log('dbg: render');
    let html = _.template(tmpl)({ items: items });
    document.getElementById(parentElementId).innerHTML = html;
}
const profilePage = new ProfilePage();
window.saveData = profilePage.saveData;
window.changeData = profilePage.changeData;
window.changePassword = profilePage.changePassword;
RenderHelper.render('.app', profilePage);
//# sourceMappingURL=profile.js.map