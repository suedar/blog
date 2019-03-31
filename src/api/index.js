/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-03-28 16:30:19
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-03-28 16:35:24
 */


import fetch from '../config/fetch'

export const getBrief = param => fetch('/article', param);