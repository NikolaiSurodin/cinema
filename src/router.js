import Vue from "vue";
import VueRouter from "vue-router";
import MainLayout from "@/view/MainLayout";
import FilmItem from "@/components/FilmItem";

Vue.use( VueRouter )

const router = new VueRouter( {
    mode: 'history',
    routes: [
        {
            path: '/films',
            component: MainLayout,
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