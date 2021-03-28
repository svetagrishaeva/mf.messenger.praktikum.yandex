import { assert } from "chai";
import { Block } from "./block";
import { Route } from "./router";

class MyBlock extends Block {
    constructor({ className }) {
        super('div', { attributes: { className } });
    }

    render() {
        return {
            type: 'span',
            props: {},
            children: []
        };
    }
};

const blockProps = { className: 'my-class' };
const rootQuery = '.app';

document.body.innerHTML = '<div class="app"> </div>';

describe('Route class basic functions', () => {
    const pathname = '/pathname';
    const route = new Route(pathname, MyBlock, { blockProps, rootQuery });

    test('should matches its pathname', () => {
        assert.isTrue(route.match(pathname));
        assert.isFalse(route.match('/someOtherPath'));
    });

    test('should render block', () => {
        route.render();
        assert.isNotNull(document.querySelector(rootQuery).innerHTML);
    });
});
