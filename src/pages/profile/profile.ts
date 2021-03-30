import { Block } from "../../utils/block.js";
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from "./profile.tmpl.js";
import { Button } from "../../components/button/button.js";
import { authService } from "../../api/authorization.js";
import { router } from "../../utils/router.js";
import { UpdateUserPasswordData, UpdateUserProfileData, userService } from "../../api/user.js";
import { BASE_URL_Resources } from "../../api/baseUrl.js";

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

        // ToDo: переделать, нельзя перекидывать функции в глобальную область видимости.
        window.saveData = this.saveData;
        window.changeData = this.changeData;
        window.changePassword = this.changePassword;
        window.cancelChange = this.cancelChange;
        window.openModalDialog = this.openModalDialog;
        window.systemExitClick = this.systemExitClick;
        window.saveAvatar = this.saveAvatar;
    }

    render() {
        let isAuth = localStorage.getItem('isAuth');

        if (!isAuth) {
            console.log(isAuth);
            router.go('/');
            return '';
        } 

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

        let data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password') && x.id !== 'avatar');

        let infoItemsHtml = _.template(infoItemsTmpl)({ 
                items: data,
                inputOnblur: 'window.inputOnblur(this)',
                inputOnfocus: 'window.inputOnfocus(this)',
                inputEmailOnblur: 'window.inputEmailOnblur(this)'
            });

        let pageHtml = _.template(pageTmpl)({ 
                user: userInfo,
                baseUrl: BASE_URL_Resources,
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

    async systemExitClick() {
        try {
            await authService.logout();
        } catch (err) {
            console.log('error:', err);
        } finally {
            localStorage.removeItem('isAuth');
            localStorage.removeItem('userInfo');
            router.go('/');
        }
       
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
        // обновить текущую страницу (для перерендеринга)
        router.update();
    }

    async saveAvatar() {
        let inputNode: any = document.querySelector('#avatar_form');
        let avatarData = new FormData(inputNode);

        await userService.updateUserAvatar(avatarData);

        authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
            localStorage.setItem('userInfo', JSON.stringify(data.response));

            // обновить текущую страницу
            router.update();
        });
    }

    // ToDo: Где-то await, где-то .then, лучще привести бы лучше к одному стилю
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

        let isPasswordChange = true;
        if (!window.checkOnValid(params, isPasswordChange)) return;

        isPassword 
            ? await userService.updateUserPassword(data as UpdateUserPasswordData) 
                : await userService.updateUserProfile(data as UpdateUserProfileData);

        // update local storage
        authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
            localStorage.setItem('userInfo', JSON.stringify(data.response));

            // обновить текущую страницу
            router.update();
        });
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
