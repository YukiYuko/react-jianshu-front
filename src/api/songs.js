import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
const prefix = "song";

const song = {
  list(params) {
    return ajax.get(`${base.server}/${prefix}/list`);
  }
};

export default song;
