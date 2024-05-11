import axios from "axios";

const HOST = 'https://letienhung86.pythonanywhere.com'

export const endpoints = {
    'posts': '/posts/',
    'login': '/o/token/',
    'current_user': '/users/current-user/',
}

export const authApi = (accessToken) => axios.create({
    baseURL: HOST,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: HOST
})