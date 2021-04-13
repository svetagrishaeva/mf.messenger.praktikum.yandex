import {TChatInfo} from '../api/chats';
import { TMessage } from '../api/messages';
import {TUserInfo} from '../api/user';

export const enum LOCAL_STORAGE_KEYS {
	IS_AUTH = 'isauth',
	USER_INFO = 'userinfo',
	CHAT_INFO_LIST = 'chatinfolist',
	CHAT_USER_LIST = 'chatuserlist',
	CURRENT_CHAT_ID = 'curchatid',
	MESSAGE_LIST = 'messagelist'
};

export class Storage {
	get isAuth(): boolean {
		return localStorage.getItem(LOCAL_STORAGE_KEYS.IS_AUTH) !== null;
	}

	set isAuth(value: boolean) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.IS_AUTH, String(value));
	}

	get chatInfoList(): TChatInfo[] {
		return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_INFO_LIST) as string) || [];
	}

	set chatInfoList(value: TChatInfo[]) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT_INFO_LIST, JSON.stringify(value));
	}

	get chatUserList(): TUserInfo[] {
		return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CHAT_USER_LIST) as string);
	}

	set chatUserList(value: TUserInfo[]) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.CHAT_USER_LIST, JSON.stringify(value));
	}

	get messageList(): TMessage[] {
		return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.MESSAGE_LIST) as string) || [];
	}

	set messageList(value: TMessage[]) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.MESSAGE_LIST, JSON.stringify(value));
	}

	get currentChatId(): number {
		return Number(localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_CHAT_ID) as string);
	}

	set currentChatId(value: number) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_CHAT_ID, String(value));
	}

	get userInfo(): TUserInfo {
		return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER_INFO) as string) || {};
	}

	set userInfo(value: TUserInfo) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.USER_INFO, JSON.stringify(value));
	}

	clear() {
		localStorage.clear();
	}
}

export const storage = new Storage();
