import { endpoints } from '@/endpoints'
import { instance } from '@/helpers/http.helper'

export const getKeyWordList = ( search ) => {
    return new Promise( resolve => {
        instance.get( endpoints.search.getKeyWordList, {
            params: {
                query: search

            }
        } )
            .then( response => {
                resolve( response.data.results )
            } )
    } )
}