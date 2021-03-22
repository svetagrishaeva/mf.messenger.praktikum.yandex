import { Block } from "../../utils/block.js";
import { pageTmpl, infoItemsTmpl, passwordItemsTmpl } from "./profile.tmpl.js";
import { Button } from "../../components/button/button.js";
import { ApiAuth } from "../../api/authorization.js";
import { router } from "../../utils/router.js";
// import { ApiUser } from "../../api/user.js";

export class ProfilePage extends Block {
    private authService: ApiAuth;
    // private userService: ApiUser;

    constructor(props: any = {}) {
        super('profile-page', props);

        this.authService = new ApiAuth();
        // this.userService = new ApiUser();

        window.saveData = this.saveData;
        window.changeData = this.changeData;
        window.changePassword = this.changePassword;
        window.cancelChange = this.cancelChange;
        window.openModalDialog = this.openModalDialog;
    }

    render() {
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
        
        this.authService.getUser().then((data) => console.log(data));

        let name = this.props.find((x: { id: string; }) => x.id == 'display_name')?.value;
        let data = this.props.filter((x: { id: string; }) => !x.id.toLowerCase().includes('password'));

        let infoItemsHtml = _.template(infoItemsTmpl)({ 
                items: data,
                inputOnblur: 'window.inputOnblur(this)',
                inputOnfocus: 'window.inputOnfocus(this)',
                inputEmailOnblur: 'window.inputEmailOnblur(this)'
            });

        let pageHtml = _.template(pageTmpl)({ 
                name: name, 
                saveButton: saveButtonHtml,
                cancelButton: cancelButtonHtml,
                infos: infoItemsHtml, 
                changeData: 'window.changeData()',
                saveData: 'window.saveData()',
                changePassword: 'window.changePassword()',
                openEditModal: 'window.openModalDialog()'
            });

        return pageHtml;
    }

    systemExitClick() {
        this.authService.logout().then((data: { ok: boolean, response: any }) => {
            if (data.ok)
                console.log('[dbg]: logout'); 
                router.go('/');
          });
    }

    openModalDialog = () => {
        console.log('[dbg]: open modal dialog');
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
