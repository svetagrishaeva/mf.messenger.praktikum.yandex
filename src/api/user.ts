import {HTTPTransport} from '../utils/http-transport';
import {API_URL} from './constants';

const USER_URL = `${API_URL}/user`;
const UPDATE_PROFILE_URL = `${USER_URL}/profile`;
const UPDATE_AVATAR_URL = `${USER_URL}/profile/avatar`;
const UPDATE_PASSWORD_URL = `${USER_URL}/password`;
const SEARCH_USER_URL = `${USER_URL}/search`;

export type TUpdateUserProfile = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export type TUpdateUserPassword = {
    oldPassword: string;
    newPassword: string
}

export type TUserInfo = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

class ApiUser {
    private readonly fetch: HTTPTransport;

    constructor() {
    	this.fetch = new HTTPTransport();
    }

    getUserById(id: number) {
    	return this.fetch.get(`${USER_URL}/${id}`);
    }

    searchUserByLogin(data: { login: string }) {
    	return this.fetch.post(SEARCH_USER_URL, {data});
    }

    updateUserProfile(data: TUpdateUserProfile) {
    	return this.fetch.put(UPDATE_PROFILE_URL, {data});
    }

    updateUserPassword(data: TUpdateUserPassword) {
    	return this.fetch.put(UPDATE_PASSWORD_URL, {data});
    }

    updateUserAvatar(data: FormData) {
    	return this.fetch.put(UPDATE_AVATAR_URL, {data});
    }
}

export const userService = new ApiUser();
