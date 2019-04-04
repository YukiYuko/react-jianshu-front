/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
  // 热门搜索
  hotList(params) {
    return ajax.get(`${base.local}/mock/hot.json`, {params});
  },
  // banner
  banner() {
    return ajax.get(`${base.local}/mock/banner.json`);
  },
  // 推荐作者
  recommendAuthor() {
    return ajax.get(`${base.local}/mock/recommendAuthor.json`);
  },
  // 首页数据
  articleList() {
    return ajax.get(`${base.local}/mock/articleList.json`);
  },
  // post提交
  // login(params) {
  //   return ajax.post(`${base.sq}/accesstoken`, qs.stringify(params));
  // }
};

export default article;