import { HTTPTransport } from "../utils/http-transport.js";
import { BASE_URL } from "./constants.js";

const USER_URL = `${BASE_URL}/user`;
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
    private readonly fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    searchUserByLogin(data: { login: string }) {
        return this.fetch.post(SEARCH_USER_URL, { data });
    }

    updateUserProfile(data: UpdateUserProfileData) {
        return this.fetch.put(UPDATE_PROFILE_URL, { data });
    }

    updateUserPassword(data: UpdateUserPasswordData) {
        return this.fetch.put(UPDATE_PASSWORD_URL, { data });
    }
    
    updateUserAvatar(data: FormData) {  
        return this.fetch.put(UPDATE_AVATAR_URL, { data });
    }
}

export const userService = new ApiUser();