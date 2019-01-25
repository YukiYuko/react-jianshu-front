/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import ajax from '../ajax'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 热门搜索
    hotList () {
        return ajax.get(`${base.local}/mock/hot.json`);
    },
    // 其他接口…………
};

export default article;