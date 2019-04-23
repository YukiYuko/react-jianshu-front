import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
const prefix = "system";
const system = {
  // 文章分类
  categoryList() {
    return ajax.post(`${base.server}/${prefix}/category/list`);
  },
  // 所有标签
  labelList() {
    return ajax.post(`${base.server}/${prefix}/label/list`);
  },
  // banner 图
  bannerList() {
    return ajax.post(`${base.server}/${prefix}/banner/list`);
  }
};

export default system;
