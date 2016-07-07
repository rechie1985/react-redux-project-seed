
// 不要随意改这里...
// 为了配合服务器做restful接口，使用middleware对restful接口地址进行重定向
var proxyList = [
  {
    reg: /\/qa\/v1\/question\/block\/([^\/]+?)/ig,
    to: '/questions'
  }, {
    reg: /\/qa\/v1\/question\/(\d+?)/ig,
    to: '/questionInfo'
  }, {
    reg: '/qa/v1/block/list',
    to: '/tagList'
  }, {
    reg: /\/qa\/v1\/question$/ig,
    to: '/qa/v1/question/postQuestion'
  }, {
    reg: /\/qa\/v1\/answer$/ig,
    to: '/qa/v1/answer/postAnswer'
  }, {
    reg: /\/qa\/v1\/permision/ig,
    to: '/qa/v1/permision'
  }
]
function restfulProxyMiddleware(req, res, next) {
  var url = req.url;
  proxyList.map(function(rule, index) {
    console.log(url)
    if(true === new RegExp(rule.reg).test(url)) {
      console.log(rule)
      req.url = rule.to;
    }
  });
  next();
}

module.exports = restfulProxyMiddleware;
