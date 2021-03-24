import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./baseUrl.js";

const USER_URL = `${BASE_URL}/user`;
const UPDATE_PROFILE_URL = `${USER_URL}/profile`;
const UPDATE_AVATAR_URL = `${USER_URL}/profile/avatar`;
const UPDATE_PASSWORD_URL = `${USER_URL}/password`;
const SEARCH_USER_URL = `${USER_URL}/search`;

export class  UpdateUserProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class  UpdateUserPasswordData {
    oldPassword: string; 
    newPassword: string
}

class ApiUser {
    private fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    searchUserByLogin(data: { login: string }) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.post(SEARCH_USER_URL, { data: JSON.stringify(data), headers: headers });
    }

    updateUserProfile(formData: UpdateUserProfileData) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.put(UPDATE_PROFILE_URL, { data: JSON.stringify(formData), headers: headers });
    }

    updateUserPassword(formData: UpdateUserPasswordData) {
        let headers = {"Content-Type": "application/json; charset=utf-8", "Accept": "application/json"};
        return this.fetch.put(UPDATE_PASSWORD_URL, { data: JSON.stringify(formData), headers: headers });
    }
    
    updateUserAvatar(formData: FormData) {  
        return this.fetch.put(UPDATE_AVATAR_URL, { data: formData });
    }
}

export const userService = new ApiUser();