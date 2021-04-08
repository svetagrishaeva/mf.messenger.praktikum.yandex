import {HTTPTransport} from '../utils/http-transport';
import {API_CHATS_URL, API_CHAT_USERS_URL} from './constants';

export type TChatInfo = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
      user: {
        first_name: string;
        second_name: string;
        avatar: string;
        email: string;
        login: string;
        phone: string;
      },
      time: string;
      content: string;
    }
}

export class ApiChat {
    private readonly fetch: HTTPTransport;

    constructor() {
    	this.fetch = new HTTPTransport();
    }

    getChats() {
    	return this.fetch.get(API_CHATS_URL);
    }

    createChat(data: { title: string }) {
    	return this.fetch.post(API_CHATS_URL, {data});
    }

    getUsersByChatID(id: number) {
    	return this.fetch.get(`${API_CHATS_URL}/${id}/users`);
    }

    addNewUsersToChat(data: { users: number[]; chatId: number }) {
    	return this.fetch.put(API_CHAT_USERS_URL, {data});
    }

    deleteUsersFromChat(data: { users: number[]; chatId: number }) {
    	return this.fetch.delete(API_CHAT_USERS_URL, {data});
    }

    deleteChatByID(data: { chatId: number; }) {
    	return this.fetch.delete(API_CHATS_URL, {data});
    }

    getToken(chatId: number) {
    	return this.fetch.post(`${API_CHATS_URL}/token/${chatId}`);
    }
}

export const chatService = new ApiChat();
