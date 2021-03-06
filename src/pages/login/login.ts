import { Block } from "../../utils/block.js";
import { pageTmpl } from "./template.js"

export class LoginPage extends Block {
    constructor() {
      super('login-page', {});
    }

    render() {
      let pageHtml = _.template(pageTmpl)({ 
          onChange: 'window.onChange(this)',
          inputOnblur: 'window.inputOnblur(this)',
          inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
          inputOnfocus: 'window.inputOnfocus(this)',
          loginClick: 'window.loginClick()'
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