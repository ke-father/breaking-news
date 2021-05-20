$(function () {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        userInfo: function (value) {
            if (value.length > 6) {
                return '用户昵称过长！ 6位以下'
            }
        }
    })

    // 获取用户信息
    getUserInfo();


    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) return layer.msg('用户信息获取失败');

                // 使用layui中的表单赋值方法 快速填充表单
                form.val("userForm", res.data);
            }
        })
    }

    // 为重置按钮添加事件
    $('#reset').on('click', function (e) {
        // 阻止表单默认事件
        e.preventDefault();

        // 再次调用获取用户信息方法重置表单
        getUserInfo();
    })


    // 用户信息修改按钮
    $('.layui-form').on('submit', function (e) {
        console.log($('.layui-form').serialize())
        // 阻止表单默认提交事件
        e.preventDefault();
        // console.log($(this))
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                // console.log(res)
                if(res.status !== 0) return layer.msg('提交失败');
                layer.msg('修改成功');

                window.parent.getUserInfo();

            }
        })
    })
})
