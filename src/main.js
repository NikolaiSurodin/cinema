import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import { store } from '@/store'

import popup from '@/helpers/popup.helper'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/global.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
Vue.use( BootstrapVue )
// Optionally install the BootstrapVue icon components plugin
Vue.use( IconsPlugin )
Vue.use( VueSweetalert2 )
Vue.prototype.$popup = popup
new Vue( {
    render: h => h( App ),
    router,
    store

} ).$mount( '#app' )
