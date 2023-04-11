import axios from "axios"
//language=en-US
axios.defaults.params = {
    'api_key': 'a1a84ce3dd10a1eb326873af2b7d9e60',
    'language': localStorage.getItem('lang') || 'en-US'
}
export const instance = axios.create( {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    params: {},
    options: {}
} )