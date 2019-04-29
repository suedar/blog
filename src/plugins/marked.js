/**
 * @file: Describe the file
 * @author: sunchao
 * @Date: 2019-04-23 15:56:05
 * @Last Modified by: sunchao15
 * @Last Modified time: 2019-04-25 17:18:00
 */

import marked from 'marked';
import 'highlight.js/styles/monokai-sublime.css'; // 这个样式有多种类型可选择

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: code => (require('highlight.js').highlightAuto(code).value)
});

const install = Vue => {
    /* istanbul ignore if */
    if (install.installed) return;
    Vue.directive('marked', {
        // 注意，这儿得使用bind钩子函数，因为我们使用此指令主要是为了写文档，
        // 文档里不会有变量且一次性生成,而update在自定义指令所在模板变化时就会重新执行，
        // 会影响渲染文档的方法，所以不能使用update钩子，也不能使用函数简写
        bind (el, binding, vnode) {
            // console.(el)
            // console.log(el.innerHTML)
            // el.innerHTML = marked(el.innerHTML);
        },
        update (el, binding, vnode) {
            if (binding.value) {
                // console.log(el.innerHTML)
                // console.log(el.innerHTML)
                // console.log(el);
                // const str = el.innerText;
                // const parser = new DOMParser();
                // const doc = parser.parseFromString(str, "text/html");
                // console.log(doc.innerHTML)
                el.innerHTML = marked(el.innerText);
            }
        }
    })
};

export default install;
