import { endpoints } from "@/endpoints"
import { instance } from "@/helpers/http.helper"

export const getToken = () => {
    return new Promise( resolve => {
        instance.get( endpoints.me.token )
            .then( response => {
                let token = response.data.request_token
                resolve( token )
            } )
    } )
}
export const login = ( user ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( endpoints.me.login, user )
            .then( response => {
                let success = response.data.success
                console.log( success )
                resolve( user )
            } )
            .catch( () => {
                reject()
            } )
    } )
}
export const openSession = ( data ) => {
    return new Promise( ( resolve, reject ) => {
        instance.post( endpoints.me.session, data )
            .then( response => {
                resolve( response )
            } )
            .catch( () => {
                reject()
            } )
    } )
}
export const redirect = ( REQUEST_TOKEN ) => {
    return new Promise( resolve => {
        window.location.href = `https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://localhost:8080/films`.replace( '{REQUEST_TOKEN}', REQUEST_TOKEN )
        resolve()
    } )
}
export const account = ( session_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.me.account.replace( '{:session_id}', session_id ) )
            .then( response  => {
                resolve( response.data )
            } )
    } )
}