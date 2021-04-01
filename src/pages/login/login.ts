import { authService, SignIn } from "../../api/authorization.js";
import { PageBase } from "../../components/page-base/page-base.js";
import { Button } from "../../components/button/button.js";
import { router } from "../../utils/router.js";
import { pageTmpl } from "./login.tpml.js";

type Indexed = Record<string, any>;

export class LoginPage extends PageBase {

  constructor(props: any = {}) {
    super('login-page', props);
  }

  render() {
    let button = new Button({
      classNames: 'btn-confirm',
      id: 'loginButton',
      text: 'Авторизоваться',
      onClick: 'this.loginClick($event)'
    });
    let buttonHtml = button.render();

    let pageHtml = _.template(pageTmpl)({
      button: buttonHtml,
      inputOnblur: 'this.inputOnblur($event)',
      inputPasswordOnblur: 'this.inputPasswordOnblur($event)',
      inputOnfocus: 'this.inputOnfocus($event)'
    });

    return pageHtml;
  }

  loginClick() {
    let inputElements = document.getElementsByTagName('input');
    let params: any[] = [];
    Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({ id: x.id, value: x.value }));

    let valid = this.checkOnValid(params);

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

  // скрыть сообщение об ошибке авторизации 
  private hideErrorMessage() {
    let loginErrorElement = (document.getElementById('auth_error') as HTMLElement);
    if (!loginErrorElement.classList.contains('hidden'))
      loginErrorElement.classList.add('hidden');
  }

  // отобразить сообщение об ошибке авторизации
  private showErrorMessage() {
    let loginErrorElement = (document.getElementById('auth_error') as HTMLElement);
    if (loginErrorElement.classList.contains('hidden'))
      loginErrorElement.classList.remove('hidden');
  }
}
