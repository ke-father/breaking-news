$(function () {
    const layer = layui.layer;
    const form = layui.form;

    getArticleCate();

    // 获取文章类别
    function getArticleCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取文章类别失败');

                // 渲染模板引擎
                let art = template('cate_table', res);
                $('#cate_main').html(art);
            }
        })

    }

    var addIndex = null;
    // 为添加类别按钮添加点击弹出层
    $('#addCate').on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#add_cate').html()
        });
    })

    // 添加文章分类表单提交
    $('body').on('submit', '#form_add', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();

        // 提交添加
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('提交失败')
                layer.msg('提交成功')
                layer.close(addIndex);
                getArticleCate();
            }
        })
    })

    var editIndex = null;
    // 为编辑按钮点击添加弹出层
    $('#cate_main').on('click', '.btn-edit', function () {
        console.log($(this).attr('data-id'))
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#edit_cate').html()
        });

        $.ajax({
            method: 'GET',
            url: `/my/article/cates/${$(this).attr('data-id')}`,
            success: function (res) {
                if (res.status !== 0) return layer.msg('获取信息失败');

                form.val('form_edit', res.data);
            }
        })
    })

    // 文章修改提交
    $('body').on('submit', '#form_edit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();

        // 修改文章请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('提交失败')
                layer.msg('修改成功', function () {
                    layer.close(editIndex);
                    getArticleCate();
                })
            }
        })
    })

    // 为删除按钮添加弹出层
    $('body').on('click', '.btn-del', function () {
        let id = $(this).attr('data-id')
        let delIndex = layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(){
            $.ajax({
                method: 'GET',
                url: `/my/article/deletecate/${id}`,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败！');
                    layer.msg('删除成功')
                    layer.close(delIndex);
                    getArticleCate();
                }
            })
        });

    })
})