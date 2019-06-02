/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-01 12:42:44
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-23 10:23:40
 */

/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let imgBaseUrl = '';


if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://yapi.demo.qunar.com/mock/64011';
    // baseUrl = 'http://203.195.135.253:8080';
    baseUrl = "https://www.easy-mock.com/mock/5cbe744bf5d7db5ffebc9ab0/blog";

} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '//elm.cangdu.org';
    imgBaseUrl = '//elm.cangdu.org/img/';
}

export {
    baseUrl,
    imgBaseUrl,
}