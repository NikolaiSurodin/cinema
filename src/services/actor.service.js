import { endpoints } from "@/endpoints"
import { instance, API_KEY } from "@/helpers/http.helper"

export const person = ( person_id ) => {
    return new Promise( resolve => {
        instance.get( endpoints.actor.getPerson.replace( '{:person_id}', person_id ).replace( '{:api_key}', API_KEY ) )
            .then( response => {
                resolve( response.data )
            } )
    } )
}