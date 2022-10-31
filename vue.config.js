module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'https://cinema-s-test.vercel.app/'
        : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                prepareData: '@import "@/assets/styles.scss";'
            }
        }
    }

}