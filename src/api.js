import axios from "axios"
import { jwtDecode } from "jwt-decode"

export const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "https://127.0..0:8000"

const api = axios.create({
    baseURL: MEDIA_URL,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")
        if (token) {
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date > current_time) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default api