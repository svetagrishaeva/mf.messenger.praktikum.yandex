import { Block } from "./block.js";

export const APP_ROOT_QUERY = '.app';

export function renderToDom(query: string, block: Block| null) {
    const root = document.querySelector(query);
    root?.appendChild(block?.getContent());
    return root;
}

class Route {
    private pathname: string;
    private blockClass;
    private block: Block | null;
    private props: any;

    constructor(pathname: string, view: any, props: any) {
        this.pathname = pathname;
        this.blockClass = view;
        this.block = null;
        this.props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this.pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this.block) {
            this.block.hide();
        }
    }

    match(pathname?: string): boolean {
        return pathname === this.pathname;
    }

    render(): void {
        if (!this.block) {
            this.block = new this.blockClass(this.props);
            renderToDom(APP_ROOT_QUERY, this.block);
            return;
        }

        this.block.show();
    }
}

class Router {
    private history: History;
    private routes: Route[];

    private currentRoute: Route | null;

    constructor() {
        let instance = Object.getPrototypeOf(this).__instance;

        if (instance) {
            return instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;

        instance = this;
    }

    use(pathname: string, view: any, blockProps?: any): Router {
        const route = new Route(pathname, view, blockProps);
        this.routes.push(route);
        return this;
    } 

    start(): void  {
      window.onpopstate = ((event: { currentTarget: { location: { pathname: string; }; }; }) => {
        this._onRoute(event.currentTarget.location.pathname);
      }).bind(this);

      this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void  {
        const route = this.getRoute(pathname);

        // ToDo: do to default pathname
        if (!route) {
          return;
        }

        if (route !== this.currentRoute && this.currentRoute) {
          this.currentRoute.leave();
        }
      
        this.currentRoute = route;
        route.render();
     }

    go(pathname: string): void  {
      this.history.pushState({}, '', pathname);
      
      this._onRoute(pathname);
    }
  
    back(): void  {
        history.back();
    }

    forward(): void {
        history.forward();
    }

    private getRoute(pathname: string): Route | undefined  {
      return this.routes.find(route => route.match(pathname));
    }
}

export const router = new Router();