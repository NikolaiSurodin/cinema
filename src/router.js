import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/view/MainLayout'
import FilmItem from '@/components/FilmItem'
import Login from '@/components/Login'
import FavoriteFilms from '@/components/FavoriteFilms'
import PopularListFilm from '@/components/PopularListFilm'
import ActorPage from '@/components/actorPages/ActorPage'
import Account from '@/components/Account'
import DefaultContainer from '@/components/_partial/DefaultContainer'
import FilmListBySearch from '@/view/FilmListBySearch'


import Page404 from '@/components/pages/Page404'
import { store } from '@/store'
import PopularActorsPage from '@/components/actorPages/PopularActorsPage'

Vue.use( VueRouter )

const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: DefaultContainer,
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: Login,
                    beforeEnter: ( to, from, next ) => {
                        if( store.getters[ 'getIsLoggedIn' ] ) {
                            next( '/films' )
                        } else {
                            next()
                        }
                    }
                },
                {
                    path: '/',
                    props: true,
                    component: MainLayout
                },
                {
                    path: '/films',
                    name: 'films',
                    props: true,
                    component: MainLayout
                },
                {
                    path: '/search',
                    name: 'searchFilms',
                    props: true,
                    component: FilmListBySearch
                },
                {
                    path: '/popularFilms',
                    component: PopularListFilm,
                    props: true
                },
                {
                    path: '/:id/likeFilms',
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
                            component: FilmItem
                        }
                    ]
                },
                {
                    path: '/popularPerson',
                    component: PopularActorsPage,
                    props: true
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
                            component: ActorPage
                        }
                    ]
                },
                {
                    path: '/account',
                    component: Account,
                    props: true,
                    meta: { auth: true }

                },
                {
                    path: '*',
                    name: '404',
                    props: true,
                    component: Page404
                }
            ]
        }

    ]
} )


router.beforeEach( ( to, from, next ) => {
    if( to.matched.some( route => route.meta.auth ) && !store.getters[ 'getIsLoggedIn' ] ) {
        next( '/films' )
    } else {
        next()
    }
} )

export default router