export class WSTransport {
    private apiBaseUrl: string;
    public socket: WebSocket | null;

    constructor(url: string) {
    	this.apiBaseUrl = url;
    	this.socket = null;
    }

    public open(chanel: string) {
      console.log('ws url',`${this.apiBaseUrl}${chanel}`);
    	this.socket = new WebSocket(`${this.apiBaseUrl}${chanel}`);
    }

    public send(message: string) {
    	if (this.socket !== null) {
    		this.socket.send(message);
    	}
    }

    public close() {
    	if (this.socket !== null) {
    		this.socket.close();
    	}
    }
}
