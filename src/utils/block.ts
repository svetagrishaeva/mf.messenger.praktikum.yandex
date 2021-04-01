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

  componentDidMount() { }

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
    let el = this._element;
    const block = this.render();
    
    el.innerHTML = block;
    
    this._addHandlers(el);
  }

  _addHandlers(div: HTMLElement): void {
    var componentEval = function (str: string, $event: Event) {
      // @ts-ignore
      let _ = $event;
      return eval(str);
    }.bind(this);

    var elements = div.getElementsByTagName('*');

    for (let i = 0; i < elements.length; i++) {
      var element = elements[i];

      var attr = element.attributes.getNamedItem('onclick');
      if (attr != null) {
        let onClickValue = attr.value;
        if (onClickValue != null && onClickValue.startsWith("this.")) {
          element.attributes.removeNamedItem('onclick');
          element.addEventListener('click', function (e:Event) {
            componentEval(onClickValue, e);
          }.bind(this));
        }
      }

      var attr = element.attributes.getNamedItem('onchange');
      if (attr != null ) {
        let onChangeValue = attr.value;
        if (onChangeValue != null && onChangeValue.startsWith("this.")) {
          element.attributes.removeNamedItem('onchange');
          element.addEventListener('change', function (e:Event) {
            componentEval(onChangeValue, e);
          }.bind(this));
        }
      }

      var attr = element.attributes.getNamedItem('onfocus');
      if (attr != null ) {
        let onFocusValue = attr.value;
        if (onFocusValue != null && onFocusValue.startsWith("this.")) {
          element.attributes.removeNamedItem('onfocus');
          element.addEventListener('focus', function (e:Event) {
            componentEval(onFocusValue, e);
          }.bind(this));
        }
      }

      var attr = element.attributes.getNamedItem('onblur');
      if (attr != null ) {
        let onBlurValue = attr.value;
        if (onBlurValue != null && onBlurValue.startsWith("this.")) {
          element.attributes.removeNamedItem('onblur');
          element.addEventListener('blur', function (e:Event) {
            componentEval(onBlurValue, e);
          }.bind(this));
        }
      }
    }
  }

  render():string { return '' }

  getContent():HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        return target[prop];
      },
      set: function(target: { [x: string]: any; }, prop: string | number, value: any) {
        let oldValue = target[prop];
        target[prop] = value;
        this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, value);
        return true;
      }.bind(this),
      deleteProperty() {
        throw new Error('нет доступа');
      }
    })
  }

  _createDocumentElement(tagName: any) {
    return document.createElement(tagName);
  }

  remove(): void {
    this.getContent().outerHTML = '';
  }

  show(): void {
    this.getContent().style.display = '';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}
