$(function () {
    // 定义layer方法
    const layer = layui.layer;
    // 定义form方法
    const form = layui.form;

    // 富文本编辑器初始化
    initEditor()
    // 调用文章分类列表获取
    getArticleList();

    // 获取文章分类列表功能
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) return layer.msg('获取文章分类列表失败')

                // 渲染文章分类列表
                let art = template('art_list', res);
                // 添加至页面
                $('[name=cate_id]').html(art);
                // 重渲染
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 封面图片选择
    $('#elect').on('click', function () {
        $('#photoFile').click();
    })

    // 监听文件选择
    $('#photoFile').on('change', function (e) {
        // console.log(e.target.files)
        if (e.target.files.length <= 0) return false;
        // 获取图片
        let file = e.target.files[0];
        // 获取url地址
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 设置提交按钮属性
    let state = '已发布';
    $('#btn_cao').on('click', function () {
        state = '草稿'
    })



    $('#art_publish').on('submit', function (e) {
        // 阻止表单默认提交事件
        e.preventDefault();

        // 创建FormData对象
        let fd = new FormData($(this)[0])
        // console.log(fd)

        // 将状态追加到FormData对象中
        fd.append('state', state);

        // fd.forEach(function (k, v) {
        //     console.log(k, v)
        // })

        // 将图片以blog二进制传入FormData对象中
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);

                // 发出ajax请求
                publishAricle(fd);
            })
    })

    function publishAricle(fd) {
        // 发起请求
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 不修改content-Type属性
            contentType: false,
            processData: false,
            // 不进行url编码
            success: function (res) {
                if (res.status !== 0) return layer.msg('文章上传失败');

                layer.msg('文章上传成功');

                location.href = '/breaking%20news/article/article_list.html?_ijt=cjcotuoij60nfqhng2nsi21avd'
            }
        })
    }
})