export default {
    filmList: [],
    recomendFilmList:[],
    popularFilmList:[],
    film: {},
    globalFilm:{},
    likesFilmList:JSON.parse(localStorage.getItem('likesFilmList')) || [],
    IMG_URL: 'https://image.tmdb.org/t/p/w500/'
}