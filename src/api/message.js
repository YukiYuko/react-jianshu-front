import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const prefix = "message";

const user = {
  //
  create(params) {
    return ajax.post(`${base.server}/${prefix}/create`, qs.stringify(params));
  },
  //
  list(params) {
    return ajax.post(`${base.server}/${prefix}/list`, qs.stringify(params));
  },
  //
  del(id) {
    return ajax.post(`${base.server}/${prefix}/del`, qs.stringify(id));
  }
};

export default user;
