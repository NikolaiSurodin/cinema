import { endpoints } from "@/endpoints"
import { instance, API_KEY } from "@/helpers/http.helper"

export const person = ( person_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPerson.replace( '{:person_id}', person_id ) )
            .then( response => {
                resolve( response.data )
            } )
    } )
}
export const filmsByPerson = ( person_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPersonMovie.replace( '{:person_id}', person_id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                resolve( response.data.cast )
            } )
    } )
}
export const popularPerson = (page) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPopularPerson.replace( '{:api_key}', API_KEY ).replace('{:page}', page) )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}
export const searchPerson = ( search, page ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getSearchPerson.replace( '{:api_key}', API_KEY ).replace( '{:search}', search ).replace( '{:page}', page  ) )
            .then( response => {
                resolve( response.data.results[ 0 ] )
            } )
    } )
}