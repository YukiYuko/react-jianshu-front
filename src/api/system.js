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
  },
  // 友情链接
  LinkList(params) {
    return ajax.post(`${base.server}/${prefix}/link/list`, params);
  },
  // 获取系统统计
  count() {
    return ajax.get(`${base.server}/${prefix}/count`);
  }
};

export default system;
