import {Block} from './block';

export const APP_ROOT_QUERY = '.app';
export const APP_ROOT_ID = 'app';

type TPathNames = string | string[];

export function renderToDom(query: string, block: Block| null) {
	const root = document.querySelector(query);
	if (block != null) {
		root?.appendChild(block.getContent());
	}

	return root;
}

export class Route {
    private pathname: TPathNames;
    private blockClass;
    private block: Block | null;
    private props: any;

    constructor(pathname: TPathNames, view: any, props: any) {
    	this.pathname = pathname;
    	this.blockClass = view;
    	this.block = null;
    	this.props = props;
    }

    leave(): void {
    	if (this.block) {
    		this.block.remove();
    	}
    }

    match(pathname?: string): boolean {
    	return Array.isArray(this.pathname) ?
    		this.pathname.some(path => path === pathname) : pathname === this.pathname;
    }

    render(update: boolean = false): void {
    	if (!this.block || update) {
    		this.leave();
    		this.block = new this.blockClass(this.props);
    	}

    	renderToDom(APP_ROOT_QUERY, this.block);
    }
}

export class Router {
    private static instance: Router;

    public static getInstance(): Router {
    	if (!Router.instance) {
    		Router.instance = new Router();
    	}

    	return Router.instance;
    }

    private history: History;
    private routes: Route[];
    private defaultPathname: string;

    private currentRoute: Route | null;

    private constructor() {
    	this.routes = [];
    	this.history = window.history;
    	this.currentRoute = null;
    }

    use(pathname: TPathNames, view: any, blockProps?: any): Router {
    	const route = new Route(pathname, view, blockProps);
    	this.routes.push(route);
    	return this;
    }

    default(pathname: string, component: any, defaultProps: any): this {
    	this.defaultPathname = pathname;
    	this.use(pathname, component, defaultProps);
    	return this;
    }

    start(): void {
    	window.onpopstate = () => {
    		this._onRoute(window.location.hash);
    	};

    	this._onRoute(window.location.hash);
    }

    private _onRoute(pathname: string, update: boolean = false): void {
    	const route = this.getRoute(pathname);

    	if (!route) {
    		// Go to default page
    		this.go(this.defaultPathname);
    		return;
    	}

    	if (this.currentRoute && route != this.currentRoute) {
    		this.currentRoute.leave();
    	}

    	this.currentRoute = route;
    	route.render(update);
    }

    // Обновить текущую страницу
    update() {
    	const update = true;
    	this._onRoute(window.location.hash, update);
    }

    go(pathname: string): void {
    	this.history.pushState({}, '', pathname);

    	this._onRoute(pathname);

    	location.reload();
    }

    back(): void {
    	window.history.back();
    }

    forward(): void {
    	window.history.forward();
    }

    private getRoute(pathname: string): Route | undefined {
    	return this.routes.find(route => route.match(pathname));
    }
}

export const router = Router.getInstance();

/**
 * Глобальные функции: роутинг (переход между страницами)
 */

window.goTo = (page: string) => {
	router.go(page);
};

window.goBack = () => {
	router.back();
};

