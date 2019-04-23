/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import axios from "axios";

const prefix = "article";
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
  // articleList() {
  //   return ajax.get(`${base.local}/mock/articleList.json`);
  // },
  // 文章详情
  articleDetail(id, uid = "") {
    return ajax.post(`${base.server}/${prefix}/detail`, qs.stringify({id, uid}));
  },
  // 文章列表
  articleList(params) {
    return ajax.post(`${base.server}/${prefix}/list`, qs.stringify(params));
  },
  // 文章点赞
  articleLike(params) {
    return ajax.post(`${base.server}/${prefix}/like`, qs.stringify(params));
  },
  // 每日一文
  oneDay() {
    return axios.get('https://interface.meiriyiwen.com/article/today?dev=1')
  }
};

export default article;
