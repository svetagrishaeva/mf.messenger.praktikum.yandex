import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./constants.js";

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

class ApiAuth  {
    private readonly fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }

    signIn(data: SignIn) {
        return this.fetch.post(`${API_AUTH}/signin`, { data });
    }
    
    signUp(data: SignUp) {
        return this.fetch.post(`${API_AUTH}/signup`, { data });
    }

    logout() {
        return this.fetch.post(`${API_AUTH}/logout`);
    }

    getUser() {
        return this.fetch.get(`${API_AUTH}/user`);
    }
}

export const authService = new ApiAuth(); 