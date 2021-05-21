$(function () {
    // 当去注册链接点击
    $('#link_reg').on('click', function () {
        // 登录盒子隐藏盒子显示
        $('.login-box').hide();
        //注册盒子显示
        $('.reg-box').show();
    })

    // 当去登陆链接点击
    $('#link_login').on('click', function () {
        // 注册盒子隐藏
        $('.reg-box').hide();
        // 登陆盒子显示
        $('.login-box').show();
    })

    // 登陆表单验证
    const form = layui.form;
    const layer = layui.layer;
    // 为表单添加自定义规则
    form.verify({
        // 密码必须6 - 12为 且没有空格
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        // 验证用户两次密码是否输入一致
        repwd: function (value) {
            console.log(value)
            // 获取第一次密码输入值
            let pwd = $('#reg-form [name=password]').val();
            console.log(pwd)
            // 比对两次密码是否输入一致
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    });

    // 提交注册表单
    $('#reg-form').on('submit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();
        // 提交post方式的ajax请求
        $.post({
            url:'/api/reguser',
            data: {
                username: $('#reg-form [name=username]').val(),
                password: $('#reg-form [name=password]').val(),
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message, {
                    icon: 1,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    // 自动点击去登录链接
                    $('#link_login').click();
                })
            }
        })
    })

    // 登陆功能
    $('#login-form').submit(function (e) {
        // 阻止表单默认跳转事件
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $('#login-form').serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登陆失败');
                layer.msg(res.message, {
                    icon: 1,
                    time: 1000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    // 跳转链接;
                    location.href = './index.html';
                    // 储存身份认证到本地
                    localStorage.setItem('Authorization', res.token);
                })
            }
        })
    })
})