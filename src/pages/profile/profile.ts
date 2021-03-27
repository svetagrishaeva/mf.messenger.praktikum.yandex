import { Block } from "../../utils/block.js";
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from "./profile.tmpl.js";
import { Button } from "../../components/button/button.js";
import { authService } from "../../api/authorization.js";
import { router } from "../../utils/router.js";
import { UpdateUserPasswordData, UpdateUserProfileData, userService } from "../../api/user.js";
import { BASE_URL } from "../../api/baseUrl.js";

type Indexed = Record<string, any>;

export class ProfilePage extends Block {
    constructor(props: any = {}) {
        super('profile-page', props);

        let userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
        let newProps: any[]  = [];
        
        Object.entries(userInfo).forEach(info => {
            let prop = this.props.find((x: {id: string}) => x.id === info[0]);
            if (!prop) return;
            newProps.push({ id: prop.id, title: prop.title, value: info[1] });
        })

        this.setProps(newProps);

        window.saveData = this.saveData;
        window.changeData = this.changeData;
        window.changePassword = this.changePassword;
        window.cancelChange = this.cancelChange;
        window.openModalDialog = this.openModalDialog;
        window.systemExitClick = this.systemExitClick;
        window.saveAvatar = this.saveAvatar;
    }

    render() {
        let userInfo = JSON.parse(localStorage.getItem('userInfo') as string);

        let saveButton = new Button({ 
            id: 'saveButton',
            classNames: 'btn-confirm', 
            text: 'Сохранить', 
            onClick: 'window.saveData()',
            style: 'display: none; width: 20%;'
         });
        let saveButtonHtml = saveButton.getContent().innerHTML; 

        let cancelButton = new Button({ 
            id: 'cancelButton',
            classNames: 'btn-cancel', 
            text: 'Отмена', 
            onClick: 'window.cancelChange()',
            style: 'display: none; width: 20%;'
        });
        let cancelButtonHtml = cancelButton.getContent().innerHTML;

        this.props.forEach((element: { id: string; value: any; }) => {
            if (element.id === 'display_name')
                element.value = element.value || this.props.find((x: { id: string; }) => x.id == 'first_name')?.value;
        });

        let name = this.props.find((x: { id: string; }) => x.id == 'display_name')?.value;
        let data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password') && x.id !== 'avatar');

        let infoItemsHtml = _.template(infoItemsTmpl)({ 
                items: data,
                inputOnblur: 'window.inputOnblur(this)',
                inputOnfocus: 'window.inputOnfocus(this)',
                inputEmailOnblur: 'window.inputEmailOnblur(this)'
            });

        let pageHtml = _.template(pageTmpl)({ 
                name, 
                avatar: `${BASE_URL}/${userInfo.avatar}`,
                saveButton: saveButtonHtml,
                cancelButton: cancelButtonHtml,
                infos: infoItemsHtml, 
                changeData: 'window.changeData()',
                saveData: 'window.saveData()',
                changePassword: 'window.changePassword()',
                openEditModal: 'window.openModalDialog()',
                systemExitClick: 'window.systemExitClick()',
                saveAvatar: 'window.saveAvatar()'
            });

        return pageHtml;
    }

    systemExitClick() {
        authService.logout().then((data: { ok: boolean }) => {
            if (!data.ok) return;

            router.go('/');
        });
    }

    openModalDialog = () => {
        let elem = document.getElementById('openEditModal');
        if (!elem) return;
        elem.style.display = 'block';
    };

    changeData = () => {
        setDisplayValueForElements('none');
        // отобразить кнопки
        (document.getElementById('saveButton') as HTMLElement).style.display = 'block'; 
        (document.getElementById('cancelButton') as HTMLElement).style.display = 'block'; 

        this.props.forEach((x: { id: string; }) => {
            let element = document.getElementById(x.id) as HTMLElement;
            if (element) {
                element.removeAttribute('disabled');
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
    }

    cancelChange = () => {
        // "клонируем" пропсы (данные останутся прежними) 
        // установим "новые" пропсы для перерендеринга страницы
        let cloneprops: any[] = [];

        this.props.forEach((x: { id: string; title: string; value: string; }) => {
            cloneprops.push({ id: x.id, title: x.title, value: x.value });
        });

        this.setProps(cloneprops);
    }

    async saveAvatar() {
        let inputNode: any = document.querySelector('#avatar_form');
        let avatarData = new FormData(inputNode);

        await userService.updateUserAvatar(avatarData);

        authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
            localStorage.setItem('userInfo', JSON.stringify(data.response));
        });

        this.cancelChange();
    }

    saveData = async () => {  
        let params: any[] = [];
        let data: Indexed = {};
        let isPassword = false;
        let passwordKeys = ['oldPassword', 'newPassword'];

        for (let i = 0; i < passwordKeys.length; i++) {
            let element = document.getElementById(passwordKeys[i]) as HTMLInputElement;
            if (!element) continue;

            params.push({id: element.id, value: element.value});
            data[params[i].id] = params[i].value;
            isPassword = true;
        }
        
        if (!isPassword) {
            let profileKeys = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone'];

            for (let i = 0; i < profileKeys.length; i++) {
                let element = document.getElementById(profileKeys[i]) as HTMLInputElement;
                if (!element) continue;

                params.push({id: element.id, value: element.value});
                data[params[i].id] = params[i].value;
            }
        }

        if (!window.checkOnValid(params)) return;

        isPassword 
            ? await userService.updateUserPassword(data as UpdateUserPasswordData) 
                : await userService.updateUserProfile(data as UpdateUserProfileData);

        let newprops: any[] = [];

        this.props.forEach((x: { id: string; title: string; value: string; }) => {
            let value = params.find(p => p.id === x.id)?.value;
            newprops.push({ id: x.id, title: x.title, value: value || x.value });
        });

        // update local storage
        authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
              localStorage.setItem('userInfo', JSON.stringify(data.response));
        });
    
        // update props -> rerender page
        this.setProps(newprops);
    }
}

function setDisplayValueForElements(value: string) {
    let elements = document.getElementsByClassName('link-row');
    Array.prototype.forEach.call(elements, (x: HTMLElement) => x.style.display = value);

    (document.getElementById('user-name') as HTMLElement).style.display = value;
}

function render(items: any[], tmpl: string, parentElementId: string) {
    let html = _.template(tmpl)({ 
        items: items,
        inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
        inputOnfocus: 'window.inputOnfocus(this)'});

    (document.getElementById(parentElementId) as HTMLElement).innerHTML = html;
}
