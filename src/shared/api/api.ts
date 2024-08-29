import axios from 'axios';

export const API_URL = 'https://hp-api.onrender.com/api/';

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});
