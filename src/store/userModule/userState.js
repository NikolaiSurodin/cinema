export default {
    token: localStorage.getItem( 'token' ) || '',
    user: localStorage.getItem( 'user' ) || {},
    isLoggedIn: localStorage.getItem( 'token' ) !== null,
}