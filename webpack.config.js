var vue = require('vue-loader');
var webpack = require('webpack');
var path = require('path');

var paths = {
    src: './resources/src/',
    dist: './resources/dist/'
};

module.exports = {
    entry: {
        'fileList': paths.src + 'business/fileList/app.js',
        'uploadFile': paths.src + 'business/uploadFile/app.js'
        // 'interface': paths.src + 'javascripts/interface.js'
    },
    output: {
        path: paths.dist + 'business',
        publicPath: paths.dist + 'business',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue', '.styl'],
        alias: {
              'src': path.resolve(__dirname, './resources')
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
            test: /\.styl$/,
            loader: 'style-loader!css-loader!stylus-loader'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    // 如果要全部都用jQuery，就用插件的方法加载jQuery，代码在下面👇
    // plugins: [
 //        new webpack.ProvidePlugin({
 //            $: "jquery",
 //            jQuery: "jquery",
 //            "window.jQuery": "jquery"
 //        })
 //    ]
};