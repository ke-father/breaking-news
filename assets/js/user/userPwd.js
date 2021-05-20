$(function () {
    const form = layui.form;
    const layer = layui.layer;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        newPwd: function (value) {
            if (value == $('[name = oldPwd]').val()) return '新旧密码不能相同';
        },
        rePwd: function (value) {
            if (value !== $('[name = newPwd]').val()) return '两次密码输入不一致'
        }

    })

    $('.layui-form').on('submit', function (e) {
        // 组织表单默认提交
        e.preventDefault();
        // 发起提交请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('修改失败');
                layer.msg('修改成功')

                $('.layui-form')[0].reset();
            }
        })
    })
})