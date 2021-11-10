export default {
    SET_TOKEN( state, token ) {
        state.token = token
        localStorage.setItem( 'token', token )
    },
    SET_USER( state, user ) {
        state.user = user.username
        state.isLoggedIn = true
        localStorage.setItem( 'user', user.username )
    },
    LOGOUT( state ) {
        state.user = {}
        localStorage.removeItem( 'user' )
        state.token = ''
        localStorage.removeItem( 'token' )
        state.isLoggedIn = false
    }
}