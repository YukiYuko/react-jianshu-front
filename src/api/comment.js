/**
 * 评论模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const prefix = "comment";
const comment = {
  /**
   * @description 发表评论
   * @param params uid: 用户ID, postId: 文章ID, content: 评论内容
   * @return {Q.Promise<any> | AxiosPromise<any>}
   */
  commentCreate(params) {
    return ajax.post(`${base.server}/${prefix}/create`, qs.stringify(params));
  },
  commentList(params) {
    return ajax.post(`${base.server}/${prefix}/list`, qs.stringify(params));
  },
  commentHot(params) {
    return ajax.post(`${base.server}/${prefix}/hot`, qs.stringify(params));
  }
};

export default comment;
