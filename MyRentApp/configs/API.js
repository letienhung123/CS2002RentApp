import axios from "axios";

const HOST = 'https://letienhung86.pythonanywhere.com'

export const endpoints = {
    'posts': '/posts/',
    'login': '/o/token/',
    'current_user': '/users/current-user/',
    'create_post': '/posts/create_post/',
    'user_room': (id) => `/users/${id}/room_user/`,
    'update_room': (id) => `/rooms/${id}/update_field/`,
    'post_cmt': (id) => `/posts/${id}/comments`,
    'create_cmt': (id) => `/posts/${id}/add_comment/`,
    'create_user': '/users/',
    'rooms': '/rooms/'
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