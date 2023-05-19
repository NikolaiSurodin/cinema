import { endpoints } from "@/endpoints"
import { instance } from "@/helpers/http.helper"

export const fetchPerson = ( person_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPerson.replace( '{:person_id}', person_id ) )
            .then( response => {
                resolve( response.data )
            } )
    } )
}
export const filmsByPerson = ( person_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPersonMovie.replace( '{:person_id}', person_id ) )
            .then( response => {
                resolve( response.data.cast )
            } )
    } )
}
export const popularPerson = (page) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPopularPerson.replace('{:page}', page) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}
export const searchPerson = ( search, page ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getSearchPerson.replace( '{:search}', search ).replace( '{:page}', page  ) )
            .then( response => {
                resolve( response.data.results[ 0 ] )
            } )
    } )
}