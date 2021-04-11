import {WSTransport} from '../utils/ws-transport';
import {API_MESSAGES_URL} from './constants';

export type TMessage = {
  id: number,
  time: string,
  user_id: number,
  chat_id: number,
  content: string,
  type: string,
  is_read: boolean
};

export class ApiMessages {
  private readonly ws: WSTransport;

  private openHandler: () => void;

  private messageHandler: () => void;

  constructor() {
  	this.ws = new WSTransport(API_MESSAGES_URL);
  	this.openHandler = () => {};
  	this.messageHandler = (e?: any) => {
  		return e;
  	};
  }

  public connect(chanel: string) {
  	return new Promise(res => {
  		this.ws.open(chanel);
  		if (this.ws.socket !== null) {
  			this.ws.socket.addEventListener('open', this.openHandler);
  			this.ws.socket.addEventListener('message', this.messageHandler);
  			this.ws.socket.addEventListener('close', this.closeHandler);
  			this.ws.socket.addEventListener('error', this.errorHandler);
  		}

  		res(chanel);
  	});
  }

  public close(): void {
  	if (this.ws.socket !== null) {
  		this.ws.socket.close();
  	}
  }

  public send(message: { content: string; type: string }): void {
  	if (this.ws.socket !== null) {
  		this.ws.socket.send(JSON.stringify(message));
  	}
  }

  public getHistory(offset = 0) {
  	if (this.ws.socket !== null) {
  		this.ws.socket.send(JSON.stringify({content: String(offset), type: 'get old'}));
  	}
  }

  public initEventOpen(openHandler: () => void) {
  	this.openHandler = openHandler;
  }

  public initEventMessage(messageHandler: (e?: any) => void) {
    this.messageHandler = messageHandler;
  }

  public closeHandler(e: CloseEvent) {
  	if (e.wasClean) {
  		console.log('Соединение закрыто чисто');
  	} else {
  		console.log('Обрыв соединения');
  	}
  }

  public errorHandler(e: Event) {
  	console.error('Ошибка', e);
  }
}
