module.exports = {
    publicPath:process.env.NODE_ENV === 'production'
        ? '/production-sub-path/'
        : '/',
    lintOnSave: process.env.NODE_ENV !== 'production',
    runtimeCompiler: true,
}