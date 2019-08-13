import axios from 'axios'
import env from '../config/enviroments'

const api = axios.create({
    baseURL: env.ApiUri
})

export default api