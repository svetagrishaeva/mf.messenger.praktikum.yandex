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
        return this.fetch.get(CHATS_URL);
    };

    createChat(data: { title: string }) {
        return this.fetch.post(CHATS_URL, { data });
    };

    getUsersByChatID(id: number) {
        const chatUrl = `${CHATS_URL}/${id}/users`;
        return this.fetch.get(chatUrl);
    };

    addNewUsersToChat(data: { users: number[]; chatId: number }) {
        return this.fetch.put(CHAT_USERS_URL, { data });
    };

    deleteUsersFromChat(data: { users: number[]; chatId: number }) {
        return this.fetch.delete(CHAT_USERS_URL, { data });
    };

    deleteChatByID(data: { chatId: number; }) {
        return this.fetch.delete(CHATS_URL, { data });
    };
}

export const chatService = new ApiChat();