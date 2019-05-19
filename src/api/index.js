/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-03-28 16:30:19
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-24 11:02:34
 */


import fetch from '../config/fetch'

export const getBrief = param => fetch('/article', param);
export const getRecommand = param => fetch('/recommand', param, 'POST');
export const getAllMenu = () => fetch('/menu');
export const getArticleDetail = id => fetch('/queryArticle', id);
export const getPersonalInfo = () => fetch('/selectByUserId');

export const userLogin = param => fetch('/login', param, 'POST');

// 管理页面
export const delArticle = id => fetch('/delArticle', id, 'DELECT');
export const alterArticle = param => fetch('/alterArticle', param, 'POST');
export const delRecommand = id => fetch('/delRecommand', id, 'DELECT');
export const alterRecommand = param => fetch('/alterRecommand', param, 'POST');
export const alterPersonalMsg = param => fetch('/personalMsg', param, 'POST');