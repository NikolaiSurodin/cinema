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
            timer: 1500,
            background: '#e2e2e2'
        } )
    }

    toast( message ) {
        const Toast = this.$swal.mixin( {
            toast: true,
            position: 'bottom-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: ( toast ) => {
                toast.addEventListener( 'mouseenter', this.$swal.stopTimer )
                toast.addEventListener( 'mouseleave', this.$swal.resumeTimer )
            }
        } )

        Toast.fire( {
            icon: 'success',
            title: message
        } )

    }

    info( message, title, url, text, html = false ) {
        return this.$swal( {
            title: title,
            imageUrl: `https://image.tmdb.org/t/p/w500/${ url }`,
            imageWidth: 200,
            imageHeight: 300,
            imageAlt: 'Custom image',
            [ html ? 'html' : 'text' ]: message,
        } )
    }

    infoActor( message, title, url, text, html = false ) {
        return this.$swal( {
            title: title,
            imageUrl: `https://image.tmdb.org/t/p/w500/${ url }`,
            confirmButtonText: 'Look at person!',
            imageWidth: 200,
            imageHeight: 300,
            imageAlt: 'Custom image',
            [ html ? 'html' : 'text' ]: message,
            width: '45em',
            background: '#000000',
            confirmButtonColor: 'black'
        } )
    }

    video( key ) {
        return this.$swal.fire( {
            title: '',
            icon: '',
            html:
                `<iframe width="560" height="315" src="https://www.youtube.com/embed/${ key }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
            showCloseButton: false,
            showCancelButton: false,
            confirmButtonColor: 'black',
            confirmButtonText: 'close',
            focusConfirm: false,
            width: '45em',
            background: '#000000'
        } )
    }

}

const popup = new Popup()
export default popup