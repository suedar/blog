/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-03-28 16:30:19
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-04 16:01:16
 */


import fetch from '../config/fetch'

export const getBrief = param => fetch('/article', param);
export const getRecommand = param => fetch('/recommand', param);
export const getAllMenu = () => fetch('/menu');