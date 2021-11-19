module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/s-cinema-test.surge.sh/'
        : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
}