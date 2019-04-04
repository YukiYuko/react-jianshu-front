import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
const prefix = "user";

const user = {
  // 用户这侧
  register(params) {
    return ajax.post(`${base.server}/${prefix}/create`, qs.stringify(params));
  }
};

export default user;
