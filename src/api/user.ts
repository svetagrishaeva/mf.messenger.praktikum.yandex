import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL_API } from "./baseUrl.js";

const USER_URL = `${BASE_URL_API}/user`;
const UPDATE_PROFILE_URL = `${USER_URL}/profile`;
const UPDATE_AVATAR_URL = `${USER_URL}/profile/avatar`;
const UPDATE_PASSWORD_URL = `${USER_URL}/password`;
const SEARCH_USER_URL = `${USER_URL}/search`;

export class UpdateUserProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class UpdateUserPasswordData {
    oldPassword: string; 
    newPassword: string
}

class ApiUser {
    private fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    searchUserByLogin(formData: { login: string }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.post(SEARCH_USER_URL, { data, headers });
    }

    updateUserProfile(formData: UpdateUserProfileData) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.put(UPDATE_PROFILE_URL, { data, headers });
    }

    updateUserPassword(formData: UpdateUserPasswordData) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        let data = JSON.stringify(formData);
        return this.fetch.put(UPDATE_PASSWORD_URL, { data, headers });
    }
    
    updateUserAvatar(formData: FormData) {  
        return this.fetch.put(UPDATE_AVATAR_URL, { data: formData });
    }
}

export const userService = new ApiUser();