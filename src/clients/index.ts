import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'accountId': '9e34455a-5d49-4c8f-9207-2edec49af3d9',
    }
});