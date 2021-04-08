import {HTTPTransport} from '../utils/http-transport';
import {API_AUTH_URL} from './constants';

export type TSignUp = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export type TSignIn = {
    login: string;
    password: string;
};

class ApiAuth {
    private readonly fetch: HTTPTransport;

    constructor() {
    	this.fetch = new HTTPTransport();
    }

    signIn(data: TSignIn) {
    	return this.fetch.post(`${API_AUTH_URL}/signin`, {data});
    }

    signUp(data: TSignUp) {
    	return this.fetch.post(`${API_AUTH_URL}/signup`, {data});
    }

    logout() {
    	return this.fetch.post(`${API_AUTH_URL}/logout`);
    }

    getUser() {
    	return this.fetch.get(`${API_AUTH_URL}/user`);
    }
}

export const authService = new ApiAuth();
