import axios from 'axios'
import env from '../config/index'

const api = axios.create({
    baseURL: env.API_HOST
})

export default api