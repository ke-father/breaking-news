
const layer = layui.layer

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 选取上传文件
$('#uploading').on('click', function () {
    // 模拟文件选择框点击
    $('#avatar').click();
})

$('#avatar').on('change', function (e) {
    // console.log(e)
    // 获取文件
    var file = e.target.files[0]
    // 获取文件的url地址
    var newImgURL = URL.createObjectURL(file)

    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})

$('#sure').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    console.log(dataURL)

    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) return layer.msg('头像上传失败');
            layer.msg('头像上传成功', function () {
                window.parent.getUserInfo();
            })
        }
    })
})