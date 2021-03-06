import { Block } from "../../utils/block.js";
import { RenderHelper } from "../../utils/render-helper.js";
import { pageTmpl } from "./template.js"

export class SigninPage extends Block {
    constructor() {
      super('signin-page');
    }

    render() {
      let pageHtml = _.template(pageTmpl)({ 
            onChange: 'window.onChange(this)',
            inputOnblur: 'window.inputOnblur(this)',
            inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
            inputEmailOnblur:' window.inputEmailOnblur(this)', 
            inputOnfocus: 'window.inputOnfocus(this)',
            signinClick: 'window.signinClick()'
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

  valid ? btnElement?.setAttribute('href', '/') : btnElement?.removeAttribute('href');
}

const signinPage = new SigninPage();
RenderHelper.render('.app', signinPage);