var webpack = require("webpack");
var path = require("path");

// 将require css文件提取到header中

var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var config = {
    context: __dirname,
    entry: {
        index: ['./src/entrys/index.js', hotMiddlewareScript],
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/", // relative path for github pages
        filename: "js/[name].js", // no hash in main.js because index.html is a static page
        chunkFilename: 'chunk/[name].[chunkhash:5].js',
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
            loader: "style-loader!css-loader!sass-loader"
        }, ],
        noParse: [],    },
    devtool: "source-map",
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
          'NODE_ENV': '"development"'
        }
      }),
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    fakeUpdateVersion: 0
};


module.exports = config;
