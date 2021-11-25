import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/view/MainLayout";
import FilmItem from "@/components/FilmItem";
import Login from "@/components/Login";
import FavoriteFilms from "@/components/FavoriteFilms";
import PopularListFilm from "@/components/PopularListFilm";
import ActorPage from "@/components/ActorPage";
import Page404 from "@/components/pages/Page404";

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
            props: true,
            component: MainLayout,
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
        {
            path: '/actor/:id',
            component: {
                render( c ) {
                    return c( 'router-view' )
                }
            },
            children: [
                {
                    path: '',
                    component: ActorPage,
                    meta: { auth: true }
                }
            ]
        },
        {
            path: '*',
            name: '404',
            props: true,
            component: Page404,
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