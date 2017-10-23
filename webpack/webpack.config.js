var path = require("path");
var fs = require('fs');
var htmlWebpackPlugin = require('html-webpack-plugin');
var cleanWebpackPlugin = require('clean-webpack-plugin');
var DIST_PATH = path.resolve(__dirname, './dist');
var SRC_PATH = path.resolve(__dirname,'./src');

function getEntry() { 
    var jsPath = path.resolve(SRC_PATH,'./pages');
    var dirs = fs.readdirSync(jsPath);
    console.log(dirs);
    var matches = [];
    var files = {};
    dirs.forEach(function (item) { 
        matches = item.match(/(.+)\.js$/);
        console.log("matches",matches);
        if (matches) { 
            files[matches[1]] = path.resolve(SRC_PATH,'js',item);
        }
    });
    console.log('files',files);
}
getEntry();
var config = {
    entry: {
        app: './app.js',
    },
    output: {
        path: DIST_PATH,
        filename: 'js/[name].[chunkhash].js',
        //filename: 'js/app_bundle.js',
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets:['latest']
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'app_index.html',
            template: 'app.html',
            chunks:['app'],
            //inject: true,
            //inject: 'head',
            inject:'body',
            title: 'hahaha,this is app.index title',
            minify: {
                removeComments: true,
                collapseWhitespace:false
            }
        }),
        new cleanWebpackPlugin(DIST_PATH)
]
};
module.exports = config;