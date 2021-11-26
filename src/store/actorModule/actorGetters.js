export default {
    getActor: state => state.actor,
    getFilms: state => state.popularFilmListByActor,
    getPopularPerson: state => state.personList,
    getSearchPerson: state => state.searchPerson
}