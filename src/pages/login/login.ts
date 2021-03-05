import { Block } from '../../blocks/Block.js';
import { pageTmpl } from './template.js'

export class LoginPage extends Block {
    constructor() {
      super('login-page');
    }

    render() {
      let pageHtml = _.template(pageTmpl)({ onChange: 'window.onChange(this)' });
      return pageHtml;
  }
}