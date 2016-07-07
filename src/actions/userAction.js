import * as ActionType from '../constants/ActionType';
import 'whatwg-fetch'
import { getUrlParam } from '../utils/GlobalUtil';

export function doLogin(data) {
  return dispatch => {
    dispatch({
      type: ActionType.LOGIN_REQUEST
    });
    fetch('http://localhost:8090/login', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: data.userName,
        password: data.password
      })
    }).then(resp => {
      return resp.json();
    }).then(respData => {
      const { code, data } = respData;
      if(200 === code) {
        dispatch({
          type: ActionType.LOGIN_SUCCESS,
          userId: data.userId
        });
      } else {
        dispatch({
          type: ActionType.LOGIN_FAILED,
          errorMessage: '登录失败'
        })
      }
    }).catch((err) => {
      dispatch({
        type: ActionType.LOGIN_FAILED,
        errorMessage: '网络错误,请稍后重试'
      })
    })
  }
}

// https://fetch.spec.whatwg.org/#fetch-api
function querystring(urlStr, params) {
  var url = new URL(urlStr);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  return url;
}

export function getUserInfo() {
  return dispatch => {
    let userId = getUrlParam('userId');
    dispatch({
      type: ActionType.GET_USER_INFO_REQUEST
    });
    fetch(querystring('http://localhost:8090/user', {
      userId: userId
    }), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json();
    }).then(respData => {
      const { code ,data } = respData;
      if(200 === code) {
        dispatch({
          type: ActionType.GET_USER_INFO_SUCCESS,
          userInfo: data
        });
      } else {
        dispatch({
          type: ActionType.GET_USER_INFO_FAILED,
          errorMessage: '获取错误'
        });
      }
    }).catch(error => {
      dispatch({
        type: ActionType.GET_USER_INFO_FAILED,
        errorMessage: '网络错误'
      })
    })
  }
}
