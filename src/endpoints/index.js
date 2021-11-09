const endpoints = {

    films: {
        getFilmList: '/discover/movie?api_key={:api_key}&language=ru-RU&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate',
        getSearchFilm: '/search/movie?api_key={:api_key}&language=ru-RU&query={:search}&page=1&include_adult=false',
        getMovie: '/movie/{movie_id}?api_key={:api_key}&language=en-US',
        getRecommendationsFilmList: '/movie/{movie_id}/recommendations?api_key={:api_key}&language=en-US&page=1',
        getTrailer: '/movie/{movie_id}/videos?api_key={:api_key}&language=en-US',
        getPopularFilmList: '/movie/popular?api_key={:api_key}&language=en-US&page=numberPage',

    },
}

export { endpoints }