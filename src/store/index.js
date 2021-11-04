import Vue from "vue"
import Vuex from "vuex"

import filmsModule from "@/store/filmsModule"

Vue.use( Vuex )

export const store = new Vuex.Store( {
    modules: {
        filmsModule
    }
} )