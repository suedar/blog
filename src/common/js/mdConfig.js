const hljs = require("highlight.js/lib/highlight.js");
const hlHtml = require("highlight.js/lib/languages/xml.js");
const hlCss = require("highlight.js/lib/languages/css.js");
const hlJavascript = require("highlight.js/lib/languages/javascript.js");
const hlJson = require("highlight.js/lib/languages/json.js");
const hlBash = require("highlight.js/lib/languages/bash.js");

import markdownIt from "markdown-it";
import "highlight.js/styles/ocean.css";

export default {
    data() {
        return {
            markdownit: {},
        }
    },
    created() {
        this.initHljs();
    },
    methods: {
        initHljs() {
            hljs.registerLanguage("html", hlHtml);
            hljs.registerLanguage("css", hlCss);
            hljs.registerLanguage("javascript", hlJavascript);
            hljs.registerLanguage("json", hlJson);
            hljs.registerLanguage("bash", hlBash);
            const options = {
                html: true,
                breaks: true,
                linkify: true,
                highlight(str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            return (
                                '<pre class="hljs"><code>' +
                                hljs.highlight(lang, str, true).value +
                                "</code></pre>"
                            );
                        } catch (__) {}
                    }
                    return "";
                }
            };
            this.markdownit = markdownIt(options);
        }
    },
}