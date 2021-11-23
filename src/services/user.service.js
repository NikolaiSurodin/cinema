import axios from "axios"
import { endpoints } from "@/endpoints"


const BASE = `https://api.themoviedb.org/3`
const API_KEY = 'a1a84ce3dd10a1eb326873af2b7d9e60'

export const getAccount = () => {
    return new Promise( ( resolve, reject ) => {
        let films = []
        axios
            .get( `${ BASE }${ endpoints.user.account }`.replace( '{:api_key}', API_KEY ) )
            .then( response => {
                films = response.data.results
                resolve( films )
            } )
            .catch( () => {
                reject()
            } )

    } )

}