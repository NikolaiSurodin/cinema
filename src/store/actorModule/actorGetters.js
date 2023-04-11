export default {
    getActor: state => state.actor,
    getPopularFilmListByActor: state => state.popularFilmListByActor.sort( ( a, b ) => b.popularity - a.popularity ).slice( 0, 10 ),
    getPopularPerson: state => state.personList,
    getSearchPerson: state => state.searchPerson
}