import axios from "axios"
import {endpoints} from "@/endpoints"

const BASE_URL = 'http://localhost:3000'

export default {
    fetchFilmList({ commit }) {
        return new Promise( resolve => {
            let films = []
            axios
                .get( `${ BASE_URL }${ endpoints.films.films }` )
                .then( response => {
                    films = response.data
                    commit( 'SET_FILM_LIST', films )
                    resolve( films )
                } )
        } )
    },
    sendReview({ commit }, data) {
        return new Promise( resolve => {
            axios( { url: `${ BASE_URL }${ endpoints.films.films }`, data, method: 'POST' } )
                .then( response => console.log( response ) )
            resolve()
            commit( 'SET_REVIEW' )
        } )
    },
    filterList({ commit }, state, value) {
        let list = state.filmList
        list.filter( el => el === el.title.includes( value ) )
        commit( 'FIL' )
    }
}