const ExtractTextPlugin = require( 'fdb' );
let path = require( 'path' )

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve( __dirname, 'src' ),
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: { prettify: false }
        },
        {
            test: /\.pug$/,
            loader: 'pug-plain-loader'
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract( {
                fallback: 'style-loader',
                use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
            } )
        },
    ]
};