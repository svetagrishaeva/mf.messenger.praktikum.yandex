import { HTTPTransport } from "../utils/http-transport";
import { BASE_URL } from "./baseUrl";

const USER_URL = `${BASE_URL}/user`;
const UPDATE_PROFILE_URL = `${USER_URL}/profile`;
const UPDATE_AVATAR_URL = `${USER_URL}/profile/avatar`;
const UPDATE_PASSWORD_URL = `${USER_URL}/password`;
const SEARCH_USER_URL = `${USER_URL}/search`;

type UpdateUserProfileData = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export class ApiUser {
    private fetch: HTTPTransport;
    
    constructor() {
        this.fetch = new HTTPTransport();
    }
    
    searchUserByLogin(formData: { login: string }) {
        return this.fetch.post(SEARCH_USER_URL, { data: JSON.stringify(formData) });
    }

    updateUserProfile(formData: UpdateUserProfileData) {
        return this.fetch.put(UPDATE_PROFILE_URL, { data: JSON.stringify(formData) });
    }

    updateUserPassword(formData: { oldPassword: string; newPassword: string }) {
        return this.fetch.put(UPDATE_PASSWORD_URL, { data: JSON.stringify(formData) });
    }
    
    updateUserAvatar(formData: FormData) {  
        return this.fetch.put(UPDATE_AVATAR_URL, { data: formData });
    }
}