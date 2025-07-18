import axios from 'axios';
//const BASE_URL = 'http://192.168.133.31:8000/api';
const BASE_URL = 'http://192.168.1.4:8080/api';
export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})