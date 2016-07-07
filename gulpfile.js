var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
// 删除文件库
var del = require('del');
var WebpackDevServer = require("webpack-dev-server");
var restfulProxyMiddleware = require('./tools/restfulProxyMiddleware');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

// var process = require('process');
var webpackDevConf = require("./webpack.dev.config.js");
var webpackProdConf = require('./webpack.prod.config.js');

var mockServer = require('gulp-mock-server');

// The development server (the recommended option for development)

var assetsDir = '/github/react-redux-project-seed/dist/';

gulp.task("dev", ["mock", "webpack-dev-server"], function() {
});


gulp.task('mock', function() {
  gulp.src('.')
    .pipe(mockServer({
      port: 8090,
      mockDir: 'mockApi',
      middleware: [restfulProxyMiddleware]
    }));
});

gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackDevConf);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        publicPath: "/" + myConfig.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});

gulp.task('usemin',['webpack:build-prod'], function() {
  return gulp.src('index.html')
    .pipe(usemin({
      // assetsDir: '/qaCommunity/',
      // outputRelativePath: '/qaCommunity/',
      css: [ minifyCss(), rev() ],
      css1: [ minifyCss(), rev() ],
      html: [ minifyHtml({ empty: true }) ],
      js: [ uglify(), rev() ],
      js1: [ uglify(), rev() ],
      js2: [ uglify(), rev() ],
      inlinejs: [ uglify() ],
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('move', ['usemin'], function() {
  return gulp.src(`dist${assetsDir}/**/*`)
    .pipe(gulp.dest('dist/'));
});

gulp.task('prod-clean', ['move'], function() {
  return del([`dist${assetsDir}`, 'dist/js/index.js*', 'dist/css/index.css*']);
});


gulp.task('prod', ['prod-clean']);
gulp.task("webpack:build-prod", function(callback) {
    // 构建前先删除dist目录
    del('dist');
    // modify some webpack config options
    var prodConf = Object.create(webpackProdConf);
    prodConf.devtool = "sourcemap";
    prodConf.debug = false;

    // create a single instance of the compiler to allow caching
    var devCompiler = webpack(prodConf);
    // run webpack
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});
