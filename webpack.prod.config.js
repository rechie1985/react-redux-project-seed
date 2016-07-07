var webpack = require("webpack");
var path = require("path");

// 将require css文件提取到header中
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var config = {
    context: __dirname,
    entry: {
        index: ['./src/entrys/index.js'],
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/qaCommunity/", // relative path for github pages
        filename: "js/[name].js", // no hash in main.js because index.html is a static page
        // require.ensure模块输出文件配置
        chunkFilename: 'chunk/[name].[chunkhash:5].js'
    },
    // recordsOutputPath: path.join(__dirname, "records.json"),
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['react', 'es2015'],
                plugins: ["transform-object-assign", 'transform-decorators-legacy']
            }
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader")
        }, ],
        noParse: [],    },
    // devtool: "source-map",
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'superagent': 'superagent',
        'react-router': 'ReactRouter',
        'react-thunk': 'react-thunk'
    },
    resolve: {
        alias: {}
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': '"production"',
          'PATH_PREFIX': '"/github/react-redux-project-seed/dist/"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
          disable: false,
          allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks: 2,
        // entry name
        name: 'index',
        children: true,
        async: true,
        // output js file name
        filename: 'chunk/[name].[chunkhash:5].js'
      })
    ],
    fakeUpdateVersion: 0
};


module.exports = config;
