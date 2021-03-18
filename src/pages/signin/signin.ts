import { Button } from "../../components/button/button.js";
import { Block } from "../../utils/block.js";
import { pageTmpl } from "./signin.tmpl.js"

export class SigninPage extends Block {
    constructor(props: any = {}) {
      super('signin-page', props);
    }

    render() {
      let button = new Button({ classNames: 'btn-confirm', id: 'signinButton', text: 'Зарегестрироваться', onClick: 'window.signinClick()' });
      let buttonHtml = button.getContent().innerHTML;
      
      let pageHtml = _.template(pageTmpl)({ 
            button: buttonHtml,
            onChange: 'window.onChange(this)',
            inputOnblur: 'window.inputOnblur(this)',
            inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
            inputEmailOnblur:' window.inputEmailOnblur(this)', 
            inputOnfocus: 'window.inputOnfocus(this)'
        });

      return pageHtml;
  }
}

window.signinClick = () => {
  let inputElements = document.getElementsByTagName('input');
  let params: any[] = [];
  Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));

  let valid = window.checkOnValid(params);
  let btnElement = document.getElementById('signinButton');

  valid ? btnElement?.setAttribute('href', '/error500') : btnElement?.removeAttribute('href');
}

export const signinPage = new SigninPage();