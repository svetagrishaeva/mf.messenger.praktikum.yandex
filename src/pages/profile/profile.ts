import { Block } from "../../blocks/Block.js";
import { infoItems } from "./profile-data.js";
import { RenderHelper } from "../../lib/render-helper.js";
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from "./templates.js";

declare global {
    interface Window { 
        changeData: any; 
        saveData: any;
        changePassword: any
    }
}

export class ProfilePage extends Block {
    constructor() {
        super('profile-page', infoItems);
    }

    render() {
        let name = this.props.find((x: { id: string; }) => x.id == 'display_name')?.value;
        let data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password'));
        let infoItemsHtml = _.template(infoItemsTmpl)({ items: data });
        let pageHtml = _.template(pageTmpl)(
            { 
                name: name, 
                infos: infoItemsHtml, 
                changeData: 'window.changeData()',
                saveData: 'window.saveData()',
                changePassword: 'window.changePassword()'
            });
        return pageHtml;
    }

    changeData = () => {
        console.log('dbg: changeData');
        setDisplayValueForElements('none');
        (document.getElementById('saveButton') as HTMLElement).style.display = 'block'; 
    
        this.props.forEach((x: { id: string; }) => {
            let element = document.getElementById(x.id) as HTMLElement;
            if (element) {
                element.removeAttribute('disabled');
                element.onchange = window.onChange;
            }
        });
    }
    
    changePassword = () => {
        console.log('dbg: changePassword');
        setDisplayValueForElements('none');
        (document.getElementById('saveButton') as HTMLElement).style.display = 'block'; 
    
        const dataElements = document.getElementById('info-items')?.children;
        Array.prototype.forEach.call(dataElements, (x: HTMLElement) => x.style.display = 'none');
    
        // password items page render 
        let passwordItems = this.props.filter((x: { id: string }) => x.id.toLowerCase().includes('password'));
        render(passwordItems, passwordItemsTmpl, 'password-items');
    
        passwordItems.forEach((x: { id: string; }) => (document.getElementById(x.id) as HTMLElement).onchange = window.onChange);
    }

    saveData = () => {  
        // update props -> rerender page 
        console.log('dbg: saveData');

        let datas: any = [];

        this.props.forEach((x: { id: string; title: any; value: any; }) => {
            let element = document.getElementById(x.id) as HTMLInputElement
            if (element) {
                if (x.id === 'oldPassword') {
                    // сохранить новый пароль
                    let _value = (document.getElementById('newPassword') as HTMLInputElement)?.value;
                    datas.push({ id: x.id, title: x.title, value: _value || x.value });
                    return;
                } 

                let _value = element.value;
                datas.push({ id: x.id, title: x.title, value: _value || x.value });
            }
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

function render(items: any[], tmpl: string, parentElementId: string) {
    console.log('dbg: render');
    let html = _.template(tmpl)({ items: items });
    (document.getElementById(parentElementId) as HTMLElement).innerHTML = html;
}

const profilePage = new ProfilePage();

window.saveData = profilePage.saveData;
window.changeData = profilePage.changeData;
window.changePassword = profilePage.changePassword;

RenderHelper.render('.app', profilePage);