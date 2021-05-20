$(function () {
    getUserInfo();
})

const layer = layui.layer;

// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) return layer.msg('登陆失败')
            // 渲染用户头像功能
            renderAvatar(res.data)
        }

    })
}

// // 渲染用户头像
function renderAvatar(user) {
    console.log(user)
    // 获得用户名称
    let name = user.nickname || user.username;
    // 渲染用户名称
    $('#username').html(`欢迎 ${name}`);
    // 获取用户的名称首字母
    let first = name[0];
    // 渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.photo').attr('src', user.user_pic).show();
        $('.textPhoto').html(first).hide();
    } else {
        // 渲染文字头像
        $('.textPhoto').html(first).show();
        $('.photo').attr('src', user.user_pic).hide();
    }
}

// 添加退出功能
$('#close').on('click', function () {
    layer.confirm('确认退出吗', {icon: 3, title:'提示'}, function(){
       // 当点击退出清空本地储
        localStorage.removeItem('Authorization');
        // 跳转到登陆界面
        location.href = '/breaking%20news/login.html'
    });
})
