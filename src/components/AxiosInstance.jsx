import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL : 'http://127.0.0.1:8000/',
    timeout : 2000,
    headers : {
        'Accept': 'application/json',
    }
})