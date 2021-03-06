import { Block } from "../../utils/block.js";
import { infoItems } from "./profile-data.js";
import { RenderHelper } from "../../utils/render-helper.js";
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from "./templates.js";

export class ProfilePage extends Block {
    constructor() {
        super('profile-page', infoItems);
    }

    render() {
        let name = this.props.find((x: { id: string; }) => x.id == 'display_name')?.value;
        let data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password'));

        let infoItemsHtml = _.template(infoItemsTmpl)({ 
            items: data,
            inputOnblur: 'window.inputOnblur(this)',
            inputOnfocus: 'window.inputOnfocus(this)',
            inputEmailOnblur: 'window.inputEmailOnblur(this)'
        });

        let pageHtml = _.template(pageTmpl)(
            { 
                name: name, 
                infos: infoItemsHtml, 
                changeData: 'window.changeData()',
                saveData: 'window.saveData()',
                changePassword: 'window.changePassword()',
                cancelChange: 'window.cancelChange()'
            });

        return pageHtml;
    }

    changeData = () => {
        setDisplayValueForElements('none');
        // отобразить кнопки
        (document.getElementById('saveButton') as HTMLElement).style.display = 'block'; 
        (document.getElementById('cancelButton') as HTMLElement).style.display = 'block'; 

        this.props.forEach((x: { id: string; }) => {
            let element = document.getElementById(x.id) as HTMLElement;
            if (element) {
                element.removeAttribute('disabled');
                element.onchange = window.onChange;
            }
        });
    }
    
    changePassword = () => {
        setDisplayValueForElements('none');
        // отобразить кнопки
        (document.getElementById('saveButton') as HTMLElement).style.display = 'block'; 
        (document.getElementById('cancelButton') as HTMLElement).style.display = 'block'; 
    
        const dataElements = document.getElementById('info-items')?.children;
        Array.prototype.forEach.call(dataElements, (x: HTMLElement) => x.style.display = 'none');
    
        // password items page render 
        let passwordItems = this.props.filter((x: { id: string }) => x.id.toLowerCase().includes('password'));
        render(passwordItems, passwordItemsTmpl, 'password-items');
    
        passwordItems.forEach((x: { id: string; }) => (document.getElementById(x.id) as HTMLElement).onchange = window.onChange);
    }

    cancelChange = () => {
        console.log('[dbg]: cancelChange');

        // "клонируем" пропсы (данные останутся прежними) 
        // установим "новые" пропсы для перерендеринга страницы
        let cloneprops: any[] = [];

        this.props.forEach((x: { id: string; title: string; value: string; }) => {
            cloneprops.push({ id: x.id, title: x.title, value: x.value });
        });

        this.setProps(cloneprops);
    }

    saveData = () => {  
        let valid = window.checkOnValid(this.props);
        if (!valid) return;

        // update props -> rerender page 
        let datas: any[] = [];

        this.props.forEach((x: { id: string; title: string; value: string; }) => {
            let element = document.getElementById(x.id) as HTMLInputElement
            datas.push({ id: x.id, title: x.title, value: element?.value || x.value });
        });

        this.setProps(datas);
    }
}

function setDisplayValueForElements(value: string) {
    let elements = document.getElementsByClassName('link-row');
    Array.prototype.forEach.call(elements, (x: HTMLElement) => x.style.display = value);

    (document.getElementById('circle-overlay') as HTMLElement).style.display = value;
    (document.getElementById('user-name') as HTMLElement).style.display = value;
}

// здесь для изменения паролей перерисовывает страницу (???)
function render(items: any[], tmpl: string, parentElementId: string) {
    let html = _.template(tmpl)({ 
        items: items,
        inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
        inputOnfocus: 'window.inputOnfocus(this)'});

    (document.getElementById(parentElementId) as HTMLElement).innerHTML = html;
}

const profilePage = new ProfilePage();

window.saveData = profilePage.saveData;
window.changeData = profilePage.changeData;
window.changePassword = profilePage.changePassword;
window.cancelChange = profilePage.cancelChange;

RenderHelper.render('.app', profilePage);