export default {
    getFilmList: state => state.filmList,
    getIMG_URL: state => state.IMG_URL,
    getFilm: state => state.film,
    getGlobalFilm: state => state.globalFilm,
    getFavoriteFilms: state => state.favoriteFilmList,
    getRecomendFilmList: state => state.recomendFilmList,
    getPopularFilmList: state => state.popularFilmList,
    getSimilarListFilm: state => state.similarFIlmList,
    getGenresList: state => state.genres,
    getFilmsByGenre: state => state.filmListByGenre
}