module.exports = {
    publicPath:process.env.NODE_ENV === 'production'
        ? 'https://s-cinema-test.surge.sh/'
        : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
}