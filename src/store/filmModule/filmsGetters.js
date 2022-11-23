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
    getActiveGenreList: state => state.genres.filter( el => el.isActive ),
    getActiveGenreListIdList: state => state.activeGenreListIdList,
    getFilmsByGenre: state => state.filmListByGenre,
    getPayloadFilter: state => state.payloadFilter
}