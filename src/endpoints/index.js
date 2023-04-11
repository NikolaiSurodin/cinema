const endpoints = {
    me: {
        token: '/authentication/token/new',
        login: '/authentication/token/validate_with_login',
        session: '/authentication/session/new',
        account: '/account?&session_id={:session_id}'
    },
    films: {
        getFilmList: '/discover/movie',
        getSearchFilm: '/search/multi',
        getMovie: '/movie/{movie_id}',
        getRecommendationsFilmList: '/movie/{movie_id}/recommendations?language=en-US&page=1',
        getTrailer: '/movie/{movie_id}/videos',
        getPopularFilmList: '/movie/popular?language=en-US&page=1',
        getSimilarList: '/movie/{movie_id}/similar',
        getListByGenre: '/discover/movie?with_genres={genres}&page=1',
        likeFilm: '/account/{:account_id}/favorite?session_id={:session_id}',
        getFavoriteFilmList: 'account/{:account_id}/favorite/movies?&session_id={:session_id}&language=en-US&sort_by=created_at.asc&page=1',

    },
    genres: {
        getGenres: '/genre/movie/list'
    },
    actor: {
        getPerson: '/person/{:person_id}?language=en-US',
        getPersonMovie: '/person/{:person_id}/movie_credits?language=en-US',
        getPopularPerson: '/person/popular?language=en-US&page={:page}',
        getSearchPerson: '/search/person?language=en-US&query={:search}&page=1&include_adult=false'
    },
    search: {
        getKeyWordList: '/search/keyword'
    }
}

export { endpoints }