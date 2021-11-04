export default {
    filmList: [],
    film: {},
    globalFilm:{},
    likesFilm:JSON.parse(localStorage.getItem('likesFilms')) || [],
    IMG_URL: 'https://image.tmdb.org/t/p/w500/',
    recomendFilmList:[]
}