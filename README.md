
##`React + Redux + gulp + webpack` 项目脚手架

> 这个脚手架用于快速启动基于React + Redux + gulp + webpack为技术栈的前端项目

#### 1.开始使用

```
git@github.com:rechie1985/react-redux-project-seed.git
cd react-redux-project-seed
npm install
```

#### 2.相关命令

##### 2.1 开发
运行
```
gulp dev
```
打开`http://localhost:8080/webpack-dev-server/index.html`


##### 2.2 上线
运行
```
gulp prod
```
资源打包在`dist`目录中

#### 3.技术栈

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
- [x] [css-modules](https://github.com/css-modules/webpack-demo)
- [x] gulp
- [x] webpack


---------


#### 4.webpack相关

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


--------

#### 5.项目目录说明

    ├── gulpfile.js   gulp相关配置
    │
    ├── webpack.dev.config.js/webpack.prod.config.js   webpack 开发/上线 配置
    │
    ├── src   源码
    │   │
    │   ├── actions ActionCreater
    │   │
    │   ├── components 组件目录。所有组件都需要新建一个目录，如List组件
    │   │   │
    │   │   └── List
    │   │       │
    │   │       ├── List.js
    │   │       │
    │   │       └── List.sass
    │   │
    │   ├── constants 常量目录
    │   │
    │   ├── containers 视图组件，对应每一个不同视图
    │   │
    │   ├── entrys 入口文件，暂时只有一个index.js，进行createStore、路由配置等操作
    │   │
    │   ├── reducers  reducer目录，根据视图和数据两个维度进行切分。
    │   │
    │   ├── utils  常用功能集合
    │   │
    │   └── libs 第三方库(支持npm的库，不需要放在这里)
    │   
    └── tools  辅助工具集,node实现。     
        │
        └── restfulProxyMiddleware 使mock server支持restful接口的中间件



-------




#### 6.注意事项
- 顶层state是原生Js对象，第二级对应的value都是Immutable Data。在使用中要注意。
```
const { userInfo } = state;
userInfo.get('works');  //获取state子集的数据
```
- 可以在connect的mapStateToProps方法中，将state转换成相应的js对象
```
let newState;
if (Immutable.Iterable.isIterable(state)) {
  newState = state.toJS();
} else {
  newState=state;
}
```


---------



#### 7.TODO
- [x] 使用css-modules
- [ ] 将gulp功能逐渐转移到webpack上
- [ ] 命令行工具，进行一些目录修改的操作
- [ ] 补全整体项目流程及相关知识点
- [ ] 增加单元测试框架
- [ ] 目录结构修改，提取出routes目录，对应视图组件
