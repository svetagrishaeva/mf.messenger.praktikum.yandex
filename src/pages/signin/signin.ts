import { Block } from "../../blocks/Block.js";
import { RenderHelper } from "../../lib/render-helper.js";
import { pageTmpl } from "./template.js"

export class SigninPage extends Block {
    constructor() {
      super('signin-page');
    }

    render() {
      let pageHtml = _.template(pageTmpl)({ onChange: 'window.onChange(this)' });
      return pageHtml;
  }
}

const signinPage = new SigninPage();
RenderHelper.render('.app', signinPage);