import { Button } from "../../components/button/button.js";
import { Block } from "../../utils/block.js";
import { pageTmpl } from "./template.js"

export class LoginPage extends Block {
    constructor() {
      super('login-page', {});
    }

    render() {
      let button = new Button({ classNames: 'btn-confirm', id: 'loginButton', text: 'Авторизоваться', onClick: 'window.loginClick()' });
      let buttonHtml = button.getContent().innerHTML;

      let pageHtml = _.template(pageTmpl)({ 
          button: buttonHtml,
          onChange: 'window.onChange(this)',
          inputOnblur: 'window.inputOnblur(this)',
          inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
          inputOnfocus: 'window.inputOnfocus(this)'
        });

      return pageHtml;
  }
}

window.loginClick = () => {
  let inputElements = document.getElementsByTagName('input');
  let params: any[] = [];
  Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));

  let valid = window.checkOnValid(params);
  let btnElement = document.getElementById('loginButton');

  valid ? btnElement?.setAttribute('href', '/chats') : btnElement?.removeAttribute('href');
}