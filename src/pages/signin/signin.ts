import { authService, SignUp } from "../../api/authorization.js";
import { Button } from "../../components/button/button.js";
import { Block } from "../../utils/block.js";
import { router } from "../../utils/router.js";
import { pageTmpl } from "./signin.tmpl.js"

type Indexed = Record<string, any>;

export class SigninPage extends Block {
    constructor(props: any = {}, ) {
      super('signin-page', props);

      window.signinClick = this.signinClick;
    }

    render() {
      let button = new Button({ classNames: 'btn-confirm', id: 'signinButton', text: 'Зарегестрироваться', onClick: 'window.signinClick()' });
      let buttonHtml = button.getContent().innerHTML;
      
      let pageHtml = _.template(pageTmpl)({ 
            button: buttonHtml,
            inputOnblur: 'window.inputOnblur(this)',
            inputPasswordOnblur: 'window.inputPasswordOnblur(this)',
            inputEmailOnblur:' window.inputEmailOnblur(this)', 
            inputOnfocus: 'window.inputOnfocus(this)'
        });

      return pageHtml;
    }

    signinClick = () => {
      let inputElements = document.getElementsByTagName('input');
      let params: any[] = [];
      Array.prototype.forEach.call(inputElements, (x: HTMLInputElement) => params.push({id: x.id, value: x.value}));
    
      let valid = window.checkOnValid(params);

      if (!valid) return;
      let data: Indexed = {};

      for (let i = 0; i < params.length; i++) {
        if (params[i].id === 'passwordAgain') continue;
        data[params[i].id] = params[i].value;
      }

      console.log(data as SignUp);
      
      authService.signUp(data as SignUp).then((data: {ok: boolean, response: {id: number}}) => {
        if (!data.ok) return;

        router.go('/');
      })
    }
}

export const signinPage = new SigninPage();