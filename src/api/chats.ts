import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./constants.js";

const CHATS_URL = `${BASE_URL}/chats`;
const CHAT_USERS_URL = `${CHATS_URL}/users`;

export class ApiChat {
    private readonly fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    getChats() {
        let headers = {"Accept": "application/json"};
        return this.fetch.get(CHATS_URL, { headers });
    };

    createChat(formData: { title: string }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.post(CHATS_URL, { data, headers });
    };

    getUsersByChatID(id: number) {
        const chatUrl = `${CHATS_URL}/${id}/users`;
        let headers = {"Accept": "application/json"};

        return this.fetch.get(chatUrl, { headers: headers });
    };

    addNewUsersToChat(formData: { users: number[]; chatId: number }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.put(CHAT_USERS_URL, { data, headers });
    };

    deleteUsersFromChat(formData: { users: number[]; chatId: number }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.delete(CHAT_USERS_URL, { data, headers });
    };

    deleteChatByID(formData: { chatId: number; }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.delete(CHATS_URL, { data, headers });
    };
}

export const chatService = new ApiChat();