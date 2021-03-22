import { ApiAuth, SignUp } from "../../api/authorization.js";
import { Button } from "../../components/button/button.js";
import { Block } from "../../utils/block.js";
import { router } from "../../utils/router.js";
import { pageTmpl } from "./signin.tmpl.js"

type Indexed = Record<string, any>;

export class SigninPage extends Block {
    private authService: ApiAuth;

    constructor(props: any = {}, ) {
      super('signin-page', props);
      this.authService = new ApiAuth();

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
      // let btnElement = document.getElementById('signinButton');
    
      if (valid) {
        let data: Indexed = {};

        for (let i = 0; i < params.length; i++) {
          if (params[i].id === 'passwordAgain') continue;
          data[params[i].id] = params[i].value;
        }

        // let data = params.reduce((res, cur) => res[cur.id] = cur.value, {});
        console.log(data as SignUp);
        
        this.authService.signUp(data as SignUp).then((data) => {
          console.log('Ok', data);
          router.go('/');
        }).catch((error) => {
          console.log(error);
        });;
      } 
      
      // valid ? btnElement?.setAttribute('href', '/error500') : btnElement?.removeAttribute('href');
    }
}

export const signinPage = new SigninPage();