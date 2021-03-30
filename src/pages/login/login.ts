import { authService, SignIn } from "../../api/authorization.js";
import { Button } from "../../components/button/button.js";
import { Block } from "../../utils/block.js";
import { router } from "../../utils/router.js";
import { pageTmpl } from "./login.tpml.js";

type Indexed = Record<string, any>;

export class LoginPage extends Block {
    
    constructor(props: any = {}) {
      super('login-page', props);

      window.loginClick = this.loginClick;
    }

    render() {
      let button = new Button({ classNames: 'btn-confirm', id: 'loginButton', text: 'Авторизоваться', onClick: 'window.loginClick()' });
      let buttonHtml = button.getContent().innerHTML;

      let pageHtml = _.template(pageTmpl)({ 
          button: buttonHtml,
          inputOnblur: 'window.inputOnblur(this)',
          inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
          inputOnfocus: 'window.inputOnfocus(this)'
        });

      return pageHtml;
  }

  loginClick = () => {
    let inputElements = document.getElementsByTagName('input');
    let params: any[] = [];
    Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));
  
    let valid = window.checkOnValid(params);

    if (!valid) return;

    let data: Indexed = {};

    for (let i = 0; i < params.length; i++) {
      data[params[i].id] = params[i].value;
    }

    authService.signIn(data as SignIn).then((data: { ok: boolean, response: string }) => {
        if (data.response.includes('User already in system')) {
          authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
            localStorage.setItem('userInfo', JSON.stringify(data.response));
            localStorage.setItem('isAuth', 'true');
          });

          router.go('#chats');
          return;
        }

        data.ok ? this.hideErrorMessage() : this.showErrorMessage();

        if (!data.ok) return;

        authService.getUser().then((data: { ok: boolean, response: any }) => {
            if (!data.ok) return;
            localStorage.setItem('userInfo', JSON.stringify(data.response));
            localStorage.setItem('isAuth', 'true');
        });

        router.go('#chats');
      });
    }

  // скрыть сообщение об ошибки авторизации 
  private hideErrorMessage() {
    let loginErrorElement = (document.getElementById('auth_error') as HTMLElement);     
    if (!loginErrorElement.classList.contains('hidden')) 
      loginErrorElement.classList.add('hidden');
  }

  // отобразить сообщение об ошибки авторизации
  private showErrorMessage() {
    let loginErrorElement = (document.getElementById('auth_error') as HTMLElement);     
    if (loginErrorElement.classList.contains('hidden')) 
      loginErrorElement.classList.remove('hidden');
  }
}