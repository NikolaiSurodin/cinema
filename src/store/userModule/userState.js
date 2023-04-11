export default {
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || {},
    session_id: localStorage.getItem('id') || '',
    isLoggedIn: localStorage.getItem('token') !== null,
    AVATAR_URL: 'https://image.tmdb.org/t/p/w200',
    lang: 'ru-RU'
}