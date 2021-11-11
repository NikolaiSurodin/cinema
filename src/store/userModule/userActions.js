import { getToken, login } from "@/services/login.service"

export default {

    fetchToken( { commit } ) {
        return new Promise( resolve => {
            getToken()
                .then( ( token ) => {
                    commit( 'SET_TOKEN', token )
                    resolve()
                } )
        } )
    },
    sendLogin( { dispatch, state } ) {
        dispatch( 'getToken' )
            .then( () => {
                const TOKEN = state.token
                window.location.href = `https://www.themoviedb.org/authenticate/${ TOKEN }`
            } )
    },
    login( { commit, dispatch, state }, data ) {
        return new Promise( ( resolve, reject ) => {
            dispatch( 'fetchToken' )
                .then( () => {
                    data.request_token = state.token
                    login( data )
                        .then( () => {
                            commit( 'SET_USER', data )
                            resolve()
                        } )
                        .catch( () => {
                            dispatch('logout')
                            reject()
                        } )
                } )

        } )
    },
    logout( { commit } ) {
        return new Promise( resolve => {
            commit( 'LOGOUT' )
            resolve()
        } )

    }
}