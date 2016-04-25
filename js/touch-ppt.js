/*!
 * 无依赖 轻量级 移动端ppt展现 v0.0.1
 * Date: 2016-4-22
 * author:大力神
 * http://www.github.com/hehaosen
 */
"use strict";
var touchPPT = function ( PPTarr ) {

    //初始化变量
    var W = window,
        D = document,
        self = this,
        orderArr = [],//场景顺序及属性
        nowPage = 0; //当前页数

    //初始化设备信息
    var DW = D.body.clientWidth,//设备可见宽度
        DH = D.body.clientHeight;//设备可见高度
    //选择节点
    this.dom = function ( _name ) {

        //返回id节点
        if ( _name.indexOf('#') == 0 ) {
            return D.getElementById( _name.substr(1) );
        }

        //返回class节点
        if ( _name.indexOf('.') == 0 ) {
            return D.getElementsByClassName( _name.substr(1) )[0];
        }
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

            [orderArr[nowPage]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + 'px';

            self.instantiationCss(orderArr[nowPage]);
        });

        //监听触摸离开
        D.getElementsByTagName('body')[0].addEventListener('touchend',function ( e ) {

            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

            //判断是否是上划还是下划，并触发上一页、下一页时间
            if ( _y - e.changedTouches[0].clientY >= DH / 3 ) {

                //下一页
                self.nextPage();

            } else if (_y - e.changedTouches[0].clientY < - DH / 3 ) {

                //上一页
                self.previousPage();

            } else{

                //没有切换页面
                [orderArr[nowPage]][0].cssArr['top'] = '0';

                self.instantiationCss(orderArr[nowPage]);
            }
        });
    };


    //上一页
    this.previousPage = function () {

        //判断是否是最小页数
        if ( nowPage > 0 ){

            //当前页面隐藏
            [orderArr[nowPage]][0].cssArr['display'] = 'none';
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            self.instantiationCss(orderArr[nowPage]);

            nowPage--;

            //展现新的页面
            [orderArr[nowPage]][0].cssArr['display'] = 'block';
            self.instantiationCss(orderArr[nowPage]);
        } else{

            //回到原来的状态
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            self.instantiationCss(orderArr[nowPage]);
        }

    };

    //下一页
    this.nextPage = function () {

        //判断是否到达最大页数
        if ( nowPage != (orderArr.length - 1) ){

            //当前页面隐藏
            [orderArr[nowPage]][0].cssArr['display'] = 'none';
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            self.instantiationCss(orderArr[nowPage]);
            nowPage++;

            //展现新的页面
            [orderArr[nowPage]][0].cssArr['display'] = 'block';
            self.instantiationCss(orderArr[nowPage]);
        } else {

            //回到原来的状态
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            self.instantiationCss(orderArr[nowPage]);
        }
    };

    //场景css对象实例化
    this.instantiationCss = function (arr) {

        var cssText = '';

        //[arr]将dom转换成对象进行操作
        for ( var i in [arr][0].cssArr) {
            cssText += i + ':' + [arr][0].cssArr[i] + ';'
        }

        arr.style.cssText = cssText;
    };
    //场景顺序
    this.story = function () {
        var _i = 0;
        for ( var scene in PPTarr ) {

            //推入舞台数组
            orderArr[_i] = self.dom(scene);

            //舞台css对象化
            orderArr[_i].cssArr = {};

            //除第一个场景，其他场景隐藏
            if ( _i != 0 ) {
                orderArr[_i].cssArr['display'] = 'none';
            }

            //写入初始化css
            orderArr[_i].cssArr['position'] = 'fixed';
            orderArr[_i].cssArr['top'] = '0';
            orderArr[_i].cssArr['left'] = '0';
            orderArr[_i].cssArr['z-index'] = 100 - _i;

            //将css数组实例化写入dom样式
            self.instantiationCss(orderArr[_i]);

            _i++;
        }

    };

    //初始化方法
    this.touchListener();//监听滑动
    this.initializeCss();//初始化css
    this.story();//出场顺序初始化
};
