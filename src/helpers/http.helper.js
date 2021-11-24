import axios from "axios"

export const instance = axios.create( {
    baseURL: process.env.VUE_APP_API_BASE_URL
} )
export const API_KEY = 'a1a84ce3dd10a1eb326873af2b7d9e60'