
####`React + Redux + gulp + webpack` 项目脚手架

> 这个脚手架用于快速启动基于React + Redux + gulp + webpack为技术栈的前端项目

###### 1.开始使用

```
git@github.com:rechie1985/react-redux-project-seed.git
cd react-redux-project-seed
npm install
```

###### 2.相关命令

####### 2.1 开发
运行
```
gulp dev
```
打开`http://localhost:8080/webpack-dev-server/index.html`


####### 2.2 上线
运行
```
gulp prod
```
资源打包在`dist`目录中

###### 3.技术栈

- [x] [react](https://hulufei.gitbooks.io/react-tutorial/content/introduction.html)
- [x] [redux](http://redux.js.org/docs/basics/Actions.html)
- [x] [redux-thunk](https://github.com/gaearon/redux-thunk)
- [x] [redux-logger](https://github.com/evgenyrodionov/redux-logger)
- [x] [react-redux](https://github.com/reactjs/react-redux)
- [x] [react-router](http://react-guide.github.io/react-router-cn/index.html)
- [x] [fetch](https://github.com/github/fe)
- [x] [immutable](https://facebook.github.io/immutable-js/docs/#/Map/mergeIn)
- [x] sass
- [ ] Promise
- [ ] [css-modules](https://github.com/css-modules/webpack-demo)
- [x] gulp
- [x] webpack


---------


###### 4.webpack相关

`loader`
- babel-loader
- sass-loader style-loader css-loader
- url-loader

`plugin`
- DefinePlugin
- LimitChunkCountPlugin
- OccurenceOrderPlugin
- HotModuleReplacementPlugin
- NoErrorsPlugin
- CommonsChunkPlugin
- UglifyJsPlugin
- ExtractTextPlugin
- ProvidePlugin
- HtmlWebpackPlugin


###### 5.TODO
- [ ] 是否使用css-modules
- [ ] 将gulp功能逐渐转移到webpack上
- [ ] 命令行工具，进行一些目录修改的操作
- [ ] 补全整体项目流程及相关知识点
