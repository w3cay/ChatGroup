var vue = require('vue-loader');
var webpack = require('webpack');
var path = require('path');
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var paths = {
    src: './src/',
};

module.exports = {
    devtool: 'source-map',
    entry:{ 'master': [paths.src + 'views/home/master.js' ,hotMiddlewareScript] },
    output: {
        path: paths.src + 'views/home/dist',
        publicPath: publicPath,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.styl'],
        alias: {
              'src': path.resolve(__dirname, './src')
        }
      },
      resolveLoader: {
        root: path.join(__dirname, 'node_modules'),
      },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }, {
            // edit this for additional asset file types
            test: /\.(png|jpg|gif)$/,
            loader: 'url',
            query: {
                // inline files smaller then 10kb as base64 dataURL
                limit: 10000,
                // fallback to file-loader with this naming scheme
                name: '[name].[ext]?[hash]'
            }
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};