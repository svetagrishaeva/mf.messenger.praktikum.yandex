import { authService, SignUp } from "../../api/authorization.js";
import { PageBase }  from "../../components/page-base/page-base.js";
import { Button } from "../../components/button/button.js";
import { router } from "../../utils/router.js";
import { pageTmpl } from "./signin.tmpl.js"

type Indexed = Record<string, any>;

export class SigninPage extends PageBase {
    constructor(props: any = {}, ) {
      super('signin-page', props);
    }

    render() {
      let button = new Button({ classNames: 'btn-confirm', id: 'signinButton', text: 'Зарегестрироваться', onClick: 'this.signinClick($event)'});
      let buttonHtml = button.render();
      
      let pageHtml = _.template(pageTmpl)({ 
            button: buttonHtml,
            inputOnblur: 'this.inputOnblur($event)',
            inputPasswordOnblur: 'this.inputPasswordOnblur($event)',
            inputEmailOnblur:' this.inputEmailOnblur($event)', 
            inputOnfocus: 'this.inputOnfocus($event)'
        });

      return pageHtml;
    }

    signinClick() {
      let inputElements = document.getElementsByTagName('input');
      let params: any[] = [];
      Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));
    
      let valid = this.checkOnValid(params);

      if (!valid) return;
      let data: Indexed = {};

      for (let i = 0; i < params.length; i++) {
        if (params[i].id === 'passwordAgain') continue;
        data[params[i].id] = params[i].value;
      }
      
      authService.signUp(data as SignUp).then((data: {ok: boolean, response: {id: number}}) => {
        if (!data.ok) return;

        router.go('');
      })
    }
}

export const signinPage = new SigninPage();
