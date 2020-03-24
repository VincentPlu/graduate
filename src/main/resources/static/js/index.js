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