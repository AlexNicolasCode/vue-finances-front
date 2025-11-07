import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'accountId': '3211b261-fd8b-4987-abf8-2e85a293c265',
    }
});