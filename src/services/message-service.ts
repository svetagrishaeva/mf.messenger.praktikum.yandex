import {ApiChat} from '../api/chats';
import {ApiMessages} from '../api/messages';

export class MessageService {
    private readonly apiChat: ApiChat;
    private readonly apiMessages: ApiMessages;

    constructor() {
    	this.apiChat = new ApiChat();
    	this.apiMessages = new ApiMessages();
    }

    public connect(userId: number, chatId: number, callbacks: any) {
    	return new Promise(() => {
    		this.apiChat.getToken(chatId).then((res: { response: { token: string } }) => {
    			const chanel = `/${userId}/${chatId}/${res.response.token}`;

                console.log('chanel', chanel);

    			this.apiMessages.initEventMessage((e: any) => {
    				let {data} = e;
                    console.log(data);
    				if (data.type !== 'error') {
    					data = JSON.parse(data);
    					switch (data.type) {
    						case 'user connected':
    							callbacks.connect(data.content);
    							break;

    						default:
    							callbacks.message(data);
    							break;
    					}
    				}
    			});

    			this.apiMessages.initEventOpen(() => {
    				callbacks.open();
    				// Resolve(data);
    			});

    			this.apiMessages.connect(chanel);
    		}).catch(error => {
    			console.log(error);
    			// Reject(t[error]);
    		});
    	});
    }

    public sendMessage(message: string): void {
    	this.apiMessages.send({content: message, type: 'message'});
    }

    public getHistory(count = 0): void {
    	return this.apiMessages.getHistory(count);
    }

    public close(): void {
    	this.apiMessages.close();
    }
}

export const messageService = new MessageService();
