export const PATH_PREFIX = process.env.PATH_PREFIX || '/';


export function getUrlParam (paras) {
  var url = location.href;
  var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
  var paraObj = {};
  var i , j;
  for (i = 0; i<paraString.length; i++) {
    j = paraString[i];
    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length).replace(/#(.+)/ig, '').replace(/\?(.+)/ig, '');
  }
  if(!paras) {
  	return paraObj;
  }
  return paraObj[paras.toLowerCase()] || '';
}
