import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./baseUrl.js";

const CHATS_URL = `${BASE_URL}/chats`;
const CHAT_USERS_URL = `${CHATS_URL}/users`;

export class ApiChat {

    constructor(private fetch: HTTPTransport) {}
    
    getChats() {
        return this.fetch.get(CHATS_URL);
    };

    createChat(data: { title: string }) {
        return this.fetch.post(CHATS_URL, { data: JSON.stringify(data) });
    };

    getChatUsers(id: number) {
        const chatUrl = `${CHATS_URL}/${id}/users`;

        return this.fetch.get(chatUrl);
    };

    addNewUsersToChat(formData: { users: number[]; chatId: number }) {
        return this.fetch.put(CHAT_USERS_URL, { data: JSON.stringify(formData) });
    };

    deleteUsersFromChat(formData: { users: number[]; chatId: number }) {
        return this.fetch.delete(CHAT_USERS_URL, { data: JSON.stringify(formData) });
    };
}