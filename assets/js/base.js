// 拦截jQuery的ajax请求 并配置基础
$.ajaxPrefilter(function (options) {
    // 拼接地址  根目录＋接口
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 配置请求头信息
    if (options.url.includes('/my/')) {
        options.headers = {
            // 取出本地存储的token 并随着请求发出 验证
            Authorization: localStorage.getItem('Authorization')
        }
    }
    // 为请求配置 未登录跳转登录页功能
    options.complete = function (res) {
        if (res.responseJSON.status !== 0 || res.responseJSON.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('Authorization');
            // 退回到登录界面
            location.href = '/breaking%20news/login.html'
        }
    }
})