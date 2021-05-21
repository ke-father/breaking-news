$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;

    // 定义过滤器
    template.defaults.imports.art_date = function(value) {
    let date = new Date(value);

        console.log(date)

    let y = repair(date.getFullYear());
    let m = repair(date.getMonth());
    let d = repair(date.getDay());

    let hh = repair(date.getHours());
    let mm = repair(date.getMinutes());
    let ss = repair(date.getSeconds());

    return y + '-' + m + '-' + d + ' ' + hh +':' + mm + ':' + ss;
    }

    // 补零函数
    function repair(data) {
        return data >= 10 ? data : '0' + data;
    }

// 获取文章列表参数
    let p = {
        pagenum: 1,  //当前页
        pagesize: 2,  //每页的展示数量
        cate_id: '',  //分类
        state: ''   //状态
    }

    getArticleList();
    getArticleCate()

    // 获取分类列表
    function getArticleCate() {
        console.log()
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res)

                let art = template('article_class', res);
                // console.log(art)
                $('#articleClass').html(art);

                // 因为执行机制所以使用layui方法重新渲染
                form.render()
            }
        })
    }

    // 获取文章列表
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) return layer.msg('文章列表获取失败！');

                // 使用模板引擎渲染 页面
                let art = template('article_list', res);
                // console.log(art)
                // 将模板添加到页面内
                $('#list_main').html(art);

                // 调用分页渲染功能
                artPage(res.total);
            }
        })
    }

    // 分页功能
    function artPage(total) {
        console.log(total)
        // 使用layui的分页组件
        laypage.render({
            elem: 'drawPage', //容器id
            count: 100, //数据总数
            limit: p.pagesize,   //每页显示条数
            curr: p.pagenum,    //当前页 页码
            jump: function(obj, first) {
                // 每次对分页键进行操作都会 刷新
                // console.log(obj.curr);
                // console.log(obj.limit);

                // 对获取表单的数据进行赋值 再渲染
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;

                // jump有两种触发方式：
                // 点击页码造成jump回调
                // 调用laypage.render()造成jump回调      first值为true  直接调用会陷入死循环
                if (!first) {
                    getArticleList();
                }

            },
            layout: ['count', 'limit','prev', 'page', 'next','refresh', 'skip'],     //列表分页区域显示 顺序与 功能
            limits: [2, 3, 5, 10],     //列表显示条数的规则
        });
    }

    // 文章删除操作
    $('tbody').on('click', '.btn_del', function () {
        // 获取当前蛋妞个数
        let num = $('.btn-del').length;
        // 获取按钮绑定的id
        let id = $(this).attr('data-id');

        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: `/my/article/delete/${id}`,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除失败');
                    layer.msg('删除成功');

                    // 当点击完确认后 页面按钮数量为1的话 再减一的话应该减页
                    if (num == 1) p.pagenum == 1 ? 1 : p.pagenum - 1;

                    getArticleList();
                }
            })
        });
    })
})