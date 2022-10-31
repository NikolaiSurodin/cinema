const endpoints = {
    me: {
        token: '/authentication/token/new?api_key={:api_key}',
        login: '/authentication/token/validate_with_login?api_key={:api_key}',
        session: '/authentication/session/new?api_key={:api_key}',
        account: '/account?api_key={:api_key}&session_id={:session_id}'
    },
    films: {
        getFilmList: '/discover/movie',
        getSearchFilm: '/search/movie',
        getMovie: '/movie/{movie_id}',
        getRecommendationsFilmList: '/movie/{movie_id}/recommendations?api_key={:api_key}&language=en-US&page=1',
        getTrailer: '/movie/{movie_id}/videos',
        getPopularFilmList: '/movie/popular?api_key={:api_key}&language=en-US&page=1',
        getSimilarList: '/movie/{movie_id}/similar',
        getListByGenre: '/discover/movie?api_key={:api_key}&with_genres={genres}&page=1',
        likeFilm: '/account/{:account_id}/favorite?api_key={:api_key}&session_id={:session_id}',
        getFavoriteFilmList: 'https://api.themoviedb.org/3/account/{:account_id}/favorite/movies?api_key={:api_key}&session_id={:session_id}&language=en-US&sort_by=created_at.asc&page=1',

    },
    genres: {
        getGenres: '/genre/movie/list'
    },
    actor: {
        getPerson: '/person/{:person_id}?api_key={:api_key}&language=en-US',
        getPersonMovie: '/person/{:person_id}/movie_credits?api_key={:api_key}&language=en-US',
        getPopularPerson: '/person/popular?api_key={:api_key}&language=en-US&page={:page}',
        getSearchPerson: '/search/person?api_key={:api_key}&language=en-US&query={:search}&page=1&include_adult=false'
    }
}

export { endpoints }