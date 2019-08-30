/**
 *  草稿模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const prefix = "draft";
const draft = {
  /**
   * @description 发表评论
   * @param params
   * @param type
   * @return {Q.Promise<any> | AxiosPromise<any>}
   */
  create(params, type = "create") {
    return ajax.post(`${base.server}/${prefix}/${type}`, params);
  },
  detail(id) {
    return ajax.get(`${base.server}/${prefix}/detail/${id}`);
  },
  list(aid) {
    return ajax.post(`${base.server}/${prefix}`,{aid});
  },
  del(id) {
    return ajax.delete(`${base.server}/${prefix}/del`,{
      data: {id}
    });
  }
};

export default draft;
