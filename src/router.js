import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/view/MainLayout";
import FilmItem from "@/components/FilmItem";
import Login from "@/components/Login";
import FavoriteFilms from "@/components/FavoriteFilms";
import PopularListFilm from "@/components/PopularListFilm";

Vue.use( VueRouter )

const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login,
            props: true
        },
        {
            path: '/films',
            component: MainLayout,
            props: true
        },
        {
            path: '/popularFilms',
            component: PopularListFilm,
            props: true
        },
        {
            path: '/likeFilms',
            component: FavoriteFilms,
            props: true
        },
        {
            path: '/films/:id',
            component: {
                render(c) {
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
    ]
} )
export default router