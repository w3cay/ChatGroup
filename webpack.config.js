var vue = require('vue-loader');
var webpack = require('webpack');
var path = require('path');
var DEBUG = process.env.NODE_ENV !== 'production';
var publicPath = 'http://localhost:3000/';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var cssLoader =  ExtractTextPlugin.extract('style', 'css');
var sassLoader = ExtractTextPlugin.extract('style', 'css!postcss!sass');
var baseDir = path.join(__dirname);
var paths = {
    src: './src/',
    dist: './dist',
};

module.exports = {
    devtool: 'source-map',
    entry:{ 'master': paths.src + 'views/home/master.js' },
    output: {
        path: paths.src + 'views/home/dist',
        publicPath: publicPath + paths.src + 'views/home/dist',
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
            loader: sassLoader,
        },
        {
            test: /\.css$/,
            loader:  cssLoader,
        },
        {
           test: /\.html$/,
           loader: "raw-loader"
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    externals: {
        VueStrap: 'VueStrap',
        io: 'io',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].css'), 
        new BrowserSyncPlugin({
             // browse to http://localhost:3000/ during development,
             // ./public directory is being served
             host: 'localhost',
             port: 2333,
             proxy: 'http://localhost:8080/'
           },      // plugin options
          {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: true
          }
       )
    ]
};