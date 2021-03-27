import { EventBus } from "./event-bus.js";

export class Block {
    private _element: any = null;
    private _meta: any = null;

    eventBus: EventBus;
    props: any;

    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };

  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };

      this.props = this._makePropsProxy(props);
      this.eventBus = eventBus;
      
      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents(eventBus: any) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  
    init() {
      this._createResources();
      this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  
    _componentDidMount() {
      this.componentDidMount();
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  
    componentDidMount() {}
  
    _componentDidUpdate(oldProps: any, newProps: any) {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) {
        this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
      }
    }
  
    componentDidUpdate(oldProps: any, newProps: any) {
      return oldProps !== newProps;
    }
  
    setProps = (nextProps: any) => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      const block = this.render();
      this._element.innerHTML = block;
    }

    render() { }
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: any) {
      const self = this;

      return new Proxy(props, {
          get(target, prop) {
            return target[prop];
          },
          set(target, prop, value) {          
            let oldValue = target[prop];
            target[prop] = value;
            
            self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, value);
            
            return true;
          },
          deleteProperty() {
            throw new Error('нет доступа');
          }
        })
    }
  
    _createDocumentElement(tagName: any) {
      return document.createElement(tagName);
    }

    show(): void {
      this.getContent().style.display = '';
    }
  
    hide(): void {
      this.getContent().style.display = 'none';
    }
  }