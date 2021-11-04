import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use( VueSweetalert2 )

class Popup {
    constructor() {
        this.$swal = Vue.prototype.$swal
    }

    error( message, title, html = false ) {
        return this.$swal( {
            title: title,
            icon: 'error',
            [ html ? 'html' : 'text' ]: message,
            confirmButtonColor: '#f46660',
            type: 'error',
        } )
    }

    success( message, title, html = false ) {
        return this.$swal( {
            position: 'top-end',
            icon: 'success',
            title: title,
            [ html ? 'html' : 'text' ]: message,
            showConfirmButton: false,
            timer: 1500
        } )
    }

    info( message, title, url, text, html = false ) {
        return this.$swal( {
            title: title,
            text: 'asfasfa',
            imageUrl: `https://image.tmdb.org/t/p/w500/${ url }`,
            imageWidth: 200,
            imageHeight: 300,
            imageAlt: 'Custom image',
            [ html ? 'html' : 'text' ]: message,
        } )
    }

}

const popup = new Popup()
export default popup