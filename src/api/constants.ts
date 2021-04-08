const WSS = 'wss';
const HTTP = 'https';
const HOST = 'ya-praktikum.tech';

export const API_URL = `${HTTP}://${HOST}/api/v2`;
export const API_RESOURCES_URL = `${API_URL}/resources`;
export const API_MESSAGES_URL = `${WSS}://${HOST}/ws/chats`;
export const API_AUTH_URL = `${API_URL}/auth`;
export const API_CHATS_URL = `${API_URL}/chats`;
export const API_CHAT_USERS_URL = `${API_CHATS_URL}/users`;
