export default {
    filmList: [],
    recomendFilmList:[],
    popularFilmList:[],
    similarFIlmList:[],
    genres:[],
    filmListByGenre:[],
    film: {},
    globalFilm:{},
    favoriteFilmList:JSON.parse(localStorage.getItem('favoriteFilms')) || [],
    IMG_URL: 'https://image.tmdb.org/t/p/w500/',
}