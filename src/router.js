import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/view/MainLayout";
import FilmItem from "@/components/FilmItem";
import Login from "@/components/Login";
import FavoriteFilms from "@/components/FavoriteFilms";
import PopularListFilm from "@/components/PopularListFilm";

import { store } from "@/store";

Vue.use( VueRouter )

const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            beforeEnter: ( to, from, next ) => {
                if ( store.getters[ 'getIsLoggedIn' ] ) {
                    next( '/films' )
                } else {
                    next()
                }
            }
        },
        {
            path: '/films',
            name: 'films',
            component: MainLayout,
            props: true,
            meta: { auth: true }
        },
        {
            path: '/popularFilms',
            component: PopularListFilm,
            props: true,
            meta: { auth: true }
        },
        {
            path: '/likeFilms',
            component: FavoriteFilms,
            props: true,
            meta: { auth: true }
        },
        {
            path: '/films/:id',
            component: {
                render( c ) {
                    return c( 'router-view' )
                }
            },
            children: [
                {
                    path: '',
                    component: FilmItem,
                    meta: { auth: true }
                }
            ]
        },
    ]
} )


router.beforeEach( ( to, from, next ) => {
    if ( to.matched.some( route => route.meta.auth ) && !store.getters[ 'getIsLoggedIn' ] ) {
        next( '/' )
    } else {
        next()
    }
} )

export default router