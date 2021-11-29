import Vue from "vue"
import Vuex from "vuex"

import filmsModule from "@/store/filmModule/filmsModule"
import userModule from "@/store/userModule/userModule"
import actorModule from "@/store/actorModule/actorModule"

Vue.use( Vuex )

export const store = new Vuex.Store( {
    modules: {
        filmsModule,
        userModule,
        actorModule
    }
} )