// 拦截jQuery的ajax请求 并配置基础
$.ajaxPrefilter(function (options) {
    // 拼接地址  根目录＋接口
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
})