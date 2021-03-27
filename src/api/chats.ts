import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL_API } from "./baseUrl.js";

const CHATS_URL = `${BASE_URL_API}/chats`;
const CHAT_USERS_URL = `${BASE_URL_API}/users`;

export class ApiChat {
    private fetch: HTTPTransport;
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    getChats() {
        let headers = {"Accept": "application/json"};
        return this.fetch.get(CHATS_URL, { headers: headers });
    };

    createChat(data: { title: string }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.post(CHATS_URL, { data: JSON.stringify(data), headers: headers });
    };

    getUsersByChatID(id: number) {
        const chatUrl = `${CHATS_URL}/${id}/users`;
        let headers = {"Accept": "application/json"};

        return this.fetch.get(chatUrl, { headers: headers });
    };

    addNewUsersToChat(formData: { users: number[]; chatId: number }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.put(CHAT_USERS_URL, { data: JSON.stringify(formData), headers: headers });
    };

    deleteUsersFromChat(formData: { users: number[]; chatId: number }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.delete(CHAT_USERS_URL, { data: JSON.stringify(formData), headers: headers });
    };

    deleteChatByID(formData: { chatId: number; }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.delete(CHATS_URL, { data: JSON.stringify(formData), headers: headers });
    };
}

export const chatService = new ApiChat();