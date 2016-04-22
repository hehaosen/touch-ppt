/*!
 * 无依赖 轻量级 移动端ppt展现 v0.0.1
 * Date: 2016-4-22
 * author:大力神
 * http://www.github.com/hehaosen
 */
"use strict";
var touchPPT = function () {

    //初始化变量
    var W = window,
        D = document,
        self = this;

    //初始化设备信息
    var DW = D.body.clientWidth,//设备可见宽度
        DH = D.body.clientHeight;//设备可见高度

    //返回id节点
    this.id = function ( _id ) {
        return D.getElementById( _id );
    };

    //返回class节点
    this.class = function ( _class ) {
        return D.getElementsByClassName( _class );
    };

    //初始化我们需要的Css
    this.initializeCss = function () {
        D.getElementsByTagName('body')[0].style.cssText = 'overflow:hidden';
    };


    //判断触摸屏幕监听
    this.touchListener = function () {

        //初始化变量，用来记录点击是的坐标
        var _x, _y;

        //监听屏幕触摸
        D.getElementsByTagName('body')[0].addEventListener('touchstart',function ( e ) {

            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

            _x = e.touches[0].clientX;
            _y = e.touches[0].clientY;
        });

        //监听触摸移动
        D.getElementsByTagName('body')[0].addEventListener('touchmove',function ( e ) {

            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            //console.log(e.touches[0].clientX);
            //console.log(e.touches[0].clientY);
        });

        //监听触摸离开
        D.getElementsByTagName('body')[0].addEventListener('touchend',function ( e ) {

            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

            //判断是否是上划还是下划，并触发上一页、下一页时间
            if ( _y - e.changedTouches[0].clientY >= DH / 4 ) {

                //下一页
                self.nextPage();

            } else if (_y - e.changedTouches[0].clientY < - DH / 4 ) {

                //上一页
                self.previousPage();

            }
        });
    };


    //上一页
    this.previousPage = function () {
        console.log('上一页');
    };

    //下一页
    this.nextPage = function () {
        console.log('下一页');
    };

    //初始化方法
    this.touchListener();//监听滑动
    this.initializeCss();//初始化css
};
