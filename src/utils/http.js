// require("es6-promise").polyfill();
import "url-search-params-polyfill";
import axios from "axios";

// let count = 1;
//封装好的get和post接口，调用方法情况action文件
const instance = axios.create({
  // baseURL: API_URL, //设置默认api路径
  timeout: 180000, //设置超时时间
  headers: {
    contentType: "application/json"
  },
  withCredentials: true
});

export const get = (url, param) => {
  return instance.get(`${url}`, { params: param });
};

/**
 * 后端需要莫名其妙的post格式
 * @param {String} url
 * @param {Obj} param
 */
export const postFormData = (url, param) => {
  let formParams = new URLSearchParams();
  for (let p in param) {
    formParams.append(p, param[p]);
  }
  return instance.post(`${url}`, formParams);
};
/**
 * post json
 * @param {String} url
 * @param {Obj} param
 */
export const post = (url, param) => {
  return instance.post(`${url}`, param);
};

export const dele = (url, param) => {
  return instance.delete(url, param);
};
export const put = (url, param) => {
  return instance.put(url, param);
};

/**
 * 传统post方式
 * @param {String} url
 * @param {Obj} param
 */
export const postJsonData = (url, param) => {
  return instance.post(`${url}`, param);
};

export const getMultiData = getFuncArr => {
  return axios.all(getFuncArr);
};
