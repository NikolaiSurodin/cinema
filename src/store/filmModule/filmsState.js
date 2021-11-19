export default {
    filmList: [],
    recomendFilmList:[],
    popularFilmList:[],
    similarFIlmList:[],
    genres:[],
    filmListByGenre:[],
    film: {},
    globalFilm:{},
    likesFilmList:JSON.parse(localStorage.getItem('likesFilm')) || [],
    IMG_URL: 'https://image.tmdb.org/t/p/w500/'
}