layui.use(['element', 'carousel'],function () {
    var element = layui.element;
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
        elem: '#lunbo'
        ,width: '100%' //设置容器宽度
        ,arrow: 'always' //始终显示箭头
        ,height: '567px'
        //,anim: 'updown' //切换动画方式
    });
})

$().ready(function(){
    let title = document.title;
    switch (title){
        case "网站首页":
            document.getElementById("nvr_index").className = "layui-nav-item layui-this";
            break;
        case "分类查询":
            document.getElementById("nvr_search").className = "layui-nav-item layui-this";
            break;
        case "新闻资讯":
            document.getElementById("nvr_news").className = "layui-nav-item layui-this";
            break;
    }

});
