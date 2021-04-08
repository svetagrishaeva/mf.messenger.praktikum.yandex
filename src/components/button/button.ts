import {Block} from '../../utils/block';

const template = '<a id="<%-id%>" class="<%-classNames%>" onclick="<%-onClick%>" style="<%-style%>"><%-text%></a>';

export type ButtonProps = {
    classNames?: string;
    id?: string;
    text: string;
    onClick?:string;
    style?: string;
};

export class Button extends Block {
	constructor({
		classNames = '',
		id = '',
		text = '',
		onClick = '',
		style = ''
	}: ButtonProps) {
		super('button', {
			text,
			classNames,
			onClick,
			id,
			style
		});
	}

	render() {
		return _.template(template)(this.props);
	}
}
