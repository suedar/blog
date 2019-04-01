/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-01 12:43:20
 * @Last Modified by:   sunchao
 * @Last Modified time: 2019-04-01 12:43:20
 */
/**
 * 存储localStorage
 */
// 在想是否用session storge
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
