import base from "./base"; // 导入接口域名列表
import ajax from "../ajax"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块
const prefix = "user";

const user = {
  // 用户注册
  register(params) {
    return ajax.post(`${base.server}/${prefix}/create`, qs.stringify(params));
  },
  // 用户登录
  login(params) {
    return ajax.post(`${base.server}/${prefix}/login`, qs.stringify(params));
  },
  update(params) {
    return ajax.post(`${base.server}/${prefix}/update`, qs.stringify(params));
  },
  /**
   * @description 所有用户
   * @params recommend: 1, 推荐作者, 后端默认为1
   * @returns {Q.Promise<any> | AxiosPromise<any>}
   */
  list(params) {
    return ajax.post(`${base.server}/${prefix}/list`, params);
  },
  // 用户详情
  getUser() {
    return ajax.get(`${base.server}/${prefix}/current`);
  },
  // 关注/取消关注 用户:  status: 1 关注，2 取消关注
  follow(params) {
    return ajax.post(`${base.server}/${prefix}/follow`, params);
  },
  // 关注用户数
  followNum(aid) {
    return ajax.get(`${base.server}/${prefix}/followNum`, {
      params: {
        aid
      }
    });
  },
  // 关注和粉丝
  following({aid, type = 2, page}) {
    return ajax.get(`${base.server}/${prefix}/following/${type}`, {
      params: {
        aid,
        page
      }
    });
  },
  // 收藏的文章
  getCollection({uid, page}) {
    return ajax.get(`${base.server}/${prefix}/collection`, {
      params: {
        id: uid,
        page
      }
    });
  },
  // 忘记密码
  forgot(params) {
    return ajax.post(`${base.server}/${prefix}/forgot`, qs.stringify(params));
  },
  reset(params) {
    return ajax.post(`${base.server}/${prefix}/reset`, qs.stringify(params));
  }
};

export default user;
