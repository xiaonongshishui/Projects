var config = {
    entry: {
        app: 'app.js'
    },
    output: {
        path: './dist',
        filename: 'js/[name]-[chunkhash].js',
        publicPath: ''
    },
    plugins: {
        new htmlWebpackPlugin({
            filename: 'app_index.html',
            template: 'app.html',
            inject: false,
            title: 'hahaha,this is title',
            minify: {
                removeComments: true,
                collapseWhitespace:true
            }
        })
    }
};
module.exports = config;