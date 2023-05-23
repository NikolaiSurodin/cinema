module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://cinema-kino.vercel.app/'
        : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                prepareData: '@import "@/assets/styles.scss";'
            }
        }
    },
    chainWebpack: config => {
        config
            .plugin( 'html' )
            .tap( args => {
                if ( process.env.VUE_APP_ENV && process.env.VUE_APP_ENV !== 'local' ) {
                    args[ 0 ].template = `./public/index-${process.env.VUE_APP_ENV}.html`
                } else {
                    args[ 0 ].template = './public/index.html'
                }
                return args
            } )
    }

}