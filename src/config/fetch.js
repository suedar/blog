/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-01 12:43:06
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-01 12:43:35
 */

import {
    baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type === 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    let headers = new Headers();
    headers.append('content-type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    let param = {
        credentials: 'include',
        mode: 'cors',
        headers
    };

    if (type === 'POST') {
        param = Object.assign(param, {
            method: 'post',
            body: JSON.stringify(data)
        })
    }

    try {
        const response = await fetch(url, param);
        // const response = type === 'GET' ? await fetch(url) : await fetch(url, { method: type, body: JSON.stringify(data) });
        const responseJson = await response.json();
        if (responseJson.success) {
            return responseJson.data;
        } else {
            throw new Error(`Opps! Error occured. Error code: ${responseJson.code}. Error msssage: ${responseJson.message}.`)
        }
    } catch (error) {
        throw new Error(error)
    }
}