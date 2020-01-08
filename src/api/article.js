/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
import axios from "axios";

// const meiriyiwen = "https://interface.meiriyiwen.com";
// const todayArticle = "/article/today?dev=1";
// const randomArticle = "/article/random?dev=1";
// // 例子 date = 20180906
// const somedayArticle = "/article/day?dev=1&date=";

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
  // 文章详情
  articleDetail(id, uid = "") {
    return ajax.post(`${base.server}/${prefix}/detail`, qs.stringify({id, uid}));
  },
  // 文章列表
  articleList(params) {
    return ajax.post(`${base.server}/${prefix}/list`, params);
  },
  // 发表文章
  articleCreate(params) {
    return ajax.post(`${base.server}/${prefix}/create`, params);
  },
  // 删除文章
  articleDelete(params) {
    return ajax.post(`${base.server}/${prefix}/del`, params);
  },
  // 更新文章
  articleUpdate(params) {
    return ajax.post(`${base.server}/${prefix}/update`, params);
  },
  // 文章点赞
  articleLike(params) {
    return ajax.post(`${base.server}/${prefix}/like`, qs.stringify(params));
  },
  // 评论点赞
  commentLike(params) {
    return ajax.post(`${base.server}/${prefix}/comment/up`, qs.stringify(params));
  },
  // 随机文章
  articleRand(params) {
    return ajax.post(`${base.server}/${prefix}/rand`, qs.stringify(params));
  },
  // 随机文章
  articleTagList(params) {
    return ajax.post(`${base.server}/${prefix}/tag/list`, qs.stringify(params));
  },
  /**
   * @description 每日一文API
   * @param type today 今日文章, random 随机文章
   * @returns {AxiosPromise<any>}
   */
  oneDay(type = "today") {
    return axios.get(`https://interface.meiriyiwen.com/article/${type}?dev=1`)
  },
  /**
   * @description 每日一文API
   * @param date 20180906
   * @returns {AxiosPromise<any>}
   */
  someDay(date) {
    return axios.get(`https://interface.meiriyiwen.com/article/day?dev=1&date=${date}`)
  },
  // *******************一言api*****************************
  /**
   * @param c a	Anime - 动画
   * @param c b	Comic – 漫画
   * @param c	Game – 游戏
   * @param c d	Novel – 小说
   * @param c e	Myself – 原创
   * @param c f	Internet – 来自网络
   * @param c g	Other – 其他
   * @param c 其他不存在参数	任意类型随机取得
   * @returns {AxiosPromise<any>}
   */
  hitokoto(c = "a") {
    return axios.get(`https://v1.hitokoto.cn/?c=${c}`)
  }
};

export default article;
