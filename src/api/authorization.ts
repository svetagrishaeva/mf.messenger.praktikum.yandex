import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./baseUrl.js";

export const API_AUTH = `${BASE_URL}/auth`;

export class SignUp {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    phone: string;
};

export class SignIn {
    login: string;
    password: string;
};

export class ApiAuth  {
    private fetch: HTTPTransport;
    constructor() {
        this.fetch = new HTTPTransport();
    }

    signIn(data: SignIn) {
        return this.fetch.post(`${API_AUTH}/signin`, { data: JSON.stringify(data), headers: {"Content-Type": "application/json; charset=utf-8"} });
    }
    
    signUp(data: SignUp) {
        return this.fetch.post(`${API_AUTH}/signup`, { data: JSON.stringify(data), headers: {"Content-Type": "application/json; charset=utf-8"} });
    }

    logout() {
        return this.fetch.post(`${API_AUTH}/logout`);
    }

    getUser() {
        return this.fetch.get(`${API_AUTH}/user`);
    }
}