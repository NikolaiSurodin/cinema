import axios from "axios"

export const getToken = () => {
    return new Promise( resolve => {
        axios.get( 'https://api.themoviedb.org/3/authentication/token/new?api_key=a1a84ce3dd10a1eb326873af2b7d9e60' )
            .then( response => {
                let token = response.data.request_token
                resolve( token )
            } )
    } )
}
export const login = (data) => {
    return new Promise( ( resolve, reject ) => {
                axios( {
                    url: 'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=a1a84ce3dd10a1eb326873af2b7d9e60',
                    data,
                    method: 'POST'
                } )
                    .then( response => {
                        let success = response.data.success
                        console.log( success )
                        resolve(data)
                    } )
                    .catch( () => {
                        reject()
                    } )
    } )
}