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
        // ToDo: headers нигде не модифицируется, стоит использовать const 
        // и вот этот весь текст хорошо бы зашить куда-то отдельно, в родительский класс, 
        // чтобы httptransport и так знал про это, а сюда прокидывать только если нужны какие-то дополнительные заголовки
        let headers = {"Content-Type": "application/json", "Accept": "application/json"};
        let json = JSON.stringify(data);
        return this.fetch.post(`${API_AUTH}/signin`, { data: json, headers: headers });
    }
    
    signUp(data: SignUp) {
        let headers = {"Content-Type": "application/json", "Accept": "application/json"};
        let json = JSON.stringify(data);
        return this.fetch.post(`${API_AUTH}/signup`, { data: json, headers: headers });
    }

    logout() {
        return this.fetch.post(`${API_AUTH}/logout`);
    }

    getUser() {
        let headers = {"Accept": "application/json"};
        return this.fetch.get(`${API_AUTH}/user`, { headers: headers });
    }
}

export const authService = new ApiAuth(); 