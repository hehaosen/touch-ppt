/*!
 * 无依赖 轻量级 移动端ppt展现 v0.0.1
 * Date: 2016-4-22
 * author:大力神
 * http://www.github.com/hehaosen
 */
"use strict";
var touchPPT = function ( PPTarr ,isVertical) {

    //初始化变量
    var W = window,
        D = document,
        self = this,
        orderArr = [],//场景组顺序及属性
        nowPage = 0, //当前页数
        actors = [],//演员组属性
        film = {};//动画顺序

    isVertical  = isVertical ? true : false ;//是否是垂直滑动播放的
    //初始化设备信息
    var DW,//设备可见宽度
        DH;//设备可见高度
    //选择节点
    this.dom = function ( _name ) {
        return D.querySelector( _name );
    };

    //初始化我们需要的Css
    this.initializeCss = function () {
        D.getElementsByTagName('body')[0].style.cssText = 'overflow:hidden;display:block;visibility:visible';
        DW = D.body.clientWidth;//设备可见宽度
        DH = D.body.clientHeight;//设备可见高度
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
            if ( isVertical ) {//是否是垂直播放
                if( nowPage == 0 ) {

                    //当第一页时只允许下一页
                    if( (e.touches[0].clientY - _y) < 0) {
                        [orderArr[nowPage]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + 'px';

                        //下一个场景的切换时的状态
                        [orderArr[nowPage + 1]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + DH + 'px';
                        [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'visible';
                        [orderArr[nowPage + 1]][0].cssArr['display'] = 'block';
                        self.instantiationCss(orderArr[nowPage + 1]);
                    }
                } else if ( nowPage == (orderArr.length - 1) ) {

                    //当最后一页时只允许上一页
                    if( ( _y - e.touches[0].clientY) < 0 ) {
                        [orderArr[nowPage]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + 'px';
                        //上一个场景的切换时的状态
                        [orderArr[nowPage - 1]][0].cssArr['top'] = -(_y - e.touches[0].clientY) - DH + 'px';
                        [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'visible';
                        [orderArr[nowPage - 1]][0].cssArr['display'] = 'block';
                        self.instantiationCss(orderArr[nowPage - 1]);

                    }
                } else {

                    [orderArr[nowPage]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + 'px';

                    //下一个场景的切换时的状态
                    [orderArr[nowPage + 1]][0].cssArr['top'] = -(_y - e.touches[0].clientY) + DH + 'px';
                    [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'visible';
                    [orderArr[nowPage + 1]][0].cssArr['display'] = 'block';


                    //上一个场景的切换时的状态
                    [orderArr[nowPage - 1]][0].cssArr['top'] = -(_y - e.touches[0].clientY) - DH + 'px';
                    [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'visible';
                    [orderArr[nowPage - 1]][0].cssArr['display'] = 'block';

                    self.instantiationCss(orderArr[nowPage + 1]);
                    self.instantiationCss(orderArr[nowPage - 1]);
                }

                self.instantiationCss(orderArr[nowPage]);
            } else {
                //横向播放
                if( nowPage == 0 ) {

                    //当第一页时只允许下一页
                    if( (e.touches[0].clientX - _x) < 0) {
                        [orderArr[nowPage]][0].cssArr['left'] = -(_x - e.touches[0].clientX) + 'px';

                        //下一个场景的切换时的状态
                        [orderArr[nowPage + 1]][0].cssArr['left'] = -(_x - e.touches[0].clientX) + DW + 'px';
                        [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'visible';
                        [orderArr[nowPage + 1]][0].cssArr['display'] = 'block';
                        self.instantiationCss(orderArr[nowPage + 1]);
                    }
                } else if ( nowPage == (orderArr.length - 1) ) {

                    //当最后一页时只允许上一页
                    if( ( _x - e.touches[0].clientX) < 0 ) {
                        [orderArr[nowPage]][0].cssArr['left'] = -(_y - e.touches[0].clientX) + 'px';
                        //上一个场景的切换时的状态
                        [orderArr[nowPage - 1]][0].cssArr['left'] = -(_y - e.touches[0].clientX) - DW + 'px';
                        [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'visible';
                        [orderArr[nowPage - 1]][0].cssArr['display'] = 'block';
                        self.instantiationCss(orderArr[nowPage - 1]);

                    }
                } else {

                    [orderArr[nowPage]][0].cssArr['left'] = -(_y - e.touches[0].clientX) + 'px';

                    //下一个场景的切换时的状态
                    [orderArr[nowPage + 1]][0].cssArr['left'] = -(_y - e.touches[0].clientX) + DW + 'px';
                    [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'visible';
                    [orderArr[nowPage + 1]][0].cssArr['display'] = 'block';


                    //上一个场景的切换时的状态
                    [orderArr[nowPage - 1]][0].cssArr['left'] = -(_y - e.touches[0].clientX) - DW + 'px';
                    [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'visible';
                    [orderArr[nowPage - 1]][0].cssArr['display'] = 'block';

                    self.instantiationCss(orderArr[nowPage + 1]);
                    self.instantiationCss(orderArr[nowPage - 1]);
                }

                self.instantiationCss(orderArr[nowPage]);
            }


        });

        //监听触摸离开
        D.getElementsByTagName('body')[0].addEventListener('touchend',function ( e ) {

            e.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            if ( isVertical ) {//垂直播放
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
                    if( nowPage != 0 ) {
                        [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'hidden';
                        [orderArr[nowPage - 1]][0].cssArr['display'] = 'none';
                        self.instantiationCss(orderArr[nowPage - 1]);

                    }

                    if ( nowPage != (orderArr.length - 1) ) {
                        [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'hidden';
                        [orderArr[nowPage + 1]][0].cssArr['display'] = 'none';
                        self.instantiationCss(orderArr[nowPage + 1]);
                    }
                    self.instantiationCss(orderArr[nowPage]);
                }
            } else {//横向播放


                //判断是否是上划还是下划，并触发上一页、下一页时间
                if ( _x - e.changedTouches[0].clientX >= DW / 3 ) {

                    //下一页
                    self.nextPage();

                } else if (_x - e.changedTouches[0].clientX < - DW / 3 ) {

                    //上一页
                    self.previousPage();

                } else{

                    //没有切换页面
                    [orderArr[nowPage]][0].cssArr['left'] = '0';
                    if( nowPage != 0 ) {
                        [orderArr[nowPage - 1]][0].cssArr['visibility'] = 'hidden';
                        [orderArr[nowPage - 1]][0].cssArr['display'] = 'none';
                        self.instantiationCss(orderArr[nowPage - 1]);

                    }

                    if ( nowPage != (orderArr.length - 1) ) {
                        [orderArr[nowPage + 1]][0].cssArr['visibility'] = 'hidden';
                        [orderArr[nowPage + 1]][0].cssArr['display'] = 'none';
                        self.instantiationCss(orderArr[nowPage + 1]);
                    }
                    self.instantiationCss(orderArr[nowPage]);
                }
            }

        });
    };


    //上一页
    this.previousPage = function () {

        //判断是否是最小页数
        if ( nowPage > 0 ){

            //当前页面隐藏
            [orderArr[nowPage]][0].cssArr['visibility'] = 'hidden';

            //防止动画
            [orderArr[nowPage]][0].cssArr['display'] = 'none';
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            [orderArr[nowPage]][0].cssArr['left'] = '0';
            self.instantiationCss(orderArr[nowPage]);

            nowPage--;

            //展现新的页面
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            [orderArr[nowPage]][0].cssArr['left'] = '0';
            [orderArr[nowPage]][0].cssArr['visibility'] = 'visible';

            //防止动画
            [orderArr[nowPage]][0].cssArr['display'] = 'block';
            self.instantiationCss(orderArr[nowPage]);

            //重置时间轴
            timer = 0;

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
            [orderArr[nowPage]][0].cssArr['visibility'] = 'hidden';

            //防止动画
            [orderArr[nowPage]][0].cssArr['display'] = 'none';
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            [orderArr[nowPage]][0].cssArr['left'] = '0';
            self.instantiationCss(orderArr[nowPage]);
            nowPage++;

            //展现新的页面.
            [orderArr[nowPage]][0].cssArr['visibility'] = 'visible';
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            [orderArr[nowPage]][0].cssArr['left'] = '0';

            //防止动画
            [orderArr[nowPage]][0].cssArr['display'] = 'block';
            self.instantiationCss(orderArr[nowPage]);

            //重置时间轴
            timer = 0;

        } else {

            //回到原来的状态
            [orderArr[nowPage]][0].cssArr['top'] = '0';
            [orderArr[nowPage]][0].cssArr['left'] = '0';
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

    //场景animation css对象实例化
    this.instantiationAnimation = function (arr) {

        var cssText = '';

        //[arr]将dom转换成对象进行操作
        for ( var i in [arr][0].animationArr) {
            cssText += i + ':' + [arr][0].animationArr[i] + ';'
        }

        arr.style.cssText = cssText;
    };
    //场景顺序
    this.story = function () {
        var _i = 0;
        for ( var _scene in PPTarr ) {

            //推入舞台数组
            orderArr[_i] = self.dom(_scene);

            //舞台css对象化
            orderArr[_i].cssArr = {};

            //新建该场景所需要的成员组
            actors[_i] = [];

            //除第一个场景，其他场景隐藏
            if ( _i != 0 ) {
                orderArr[_i].cssArr['visibility'] = 'hidden';
            }

            //写入初始化css
            orderArr[_i].cssArr['position'] = 'fixed';
            orderArr[_i].cssArr['top'] = '0';
            orderArr[_i].cssArr['left'] = '0';
            orderArr[_i].cssArr['z-index'] = 100 - _i;
            orderArr[_i].cssArr['overflow'] = 'hidden';

            //将css数组实例化写入dom样式
            self.instantiationCss(orderArr[_i]);

            //生产场景演出表
            film[_i] = {};

            //生产演员
            for ( var _actor in PPTarr[_scene] ) {
                self.makeActors( _actor, _i, _scene, PPTarr[_scene][_actor].type, PPTarr[_scene][_actor].speed, PPTarr[_scene][_actor].route);
            }

            _i++;
        }
    };

    //生产演员
    this.makeActors = function ( _name , _scene , _father, _type, _speed, _route) {

        var _actor = self.dom(_name);
        _type = _type ? _type : '';
        _speed = typeof _speed  === 'number' ? _speed : 1000;
        _route = _route ? _route : 0;

        //添加演员-克隆节点
        var _newActorNode =_actor.cloneNode(true);

        //克隆演员增加命名 命名规则：PPT#场景编号#演员编号
        _newActorNode.className += ' PPT#'+ _scene + '#' + (actors[_scene].length);
        self.dom( _father).appendChild( _newActorNode );

        //更改原有dom的id以防止冲突
        _actor.id = 'old_' + _actor.id;

        //演员演出时间生成
        film[_scene] = film[_scene] ? film[_scene] : {};
        film[_scene][_route]  = film[_scene][_route] ? film[_scene][_route] : [];
        film[_scene][_route].push(actors[_scene].length);

        //将新演员推入演员组
        actors[_scene].push( _newActorNode );

        //绑定新演员css属性,并渲染到页面上
        var _my = actors[_scene][actors[_scene].length - 1];
        _my.cssArr = {};
        _my.cssArr['position'] = 'absolute';
        _my.cssArr['top'] = _actor.offsetTop + 'px';
        _my.cssArr['left'] = _actor.offsetLeft + 'px';
        _my.cssArr['transition'] = 'all ' + (_speed/1000) + 's ease';
        _my.cssArr['margin'] = '0';

        //做动画数组根据动画类型，去定位现在初始位置
        _my.animationArr = {};
        _my.animationArr['margin'] = '0';

        //Y轴定位方式
        if( _type.indexOf('join-top') != -1 ) {

            //定位在顶部开始
            _my.animationArr['top'] = '-' + _actor.offsetHeight + 'px';

        } else if ( _type.indexOf('join-bottom') != -1) {

            //定位在底部
            _my.animationArr['top'] = DH + _actor.offsetHeight + 'px';

        } else if( _type.indexOf('out-top') != -1) {

            //向顶部离开
            _my.animationArr['top'] = _my.cssArr['top'];
            _my.cssArr['top'] = '-' + _actor.offsetHeight + 'px';

        }else if( _type.indexOf('out-bottom') != -1 ){

            //向底部部离开
            _my.animationArr['top'] = _my.cssArr['top'];
            _my.cssArr['top'] = DH + _actor.offsetHeight + 'px';

        } else {

            //Y轴无定位
            _my.animationArr['top'] = _my.cssArr['top']

        }

        //X轴定位方式
        if( _type.indexOf('join-left') != -1 ) {

            //定位在左边开始
            _my.animationArr['left'] = '-' + _actor.offsetWidth + 'px';

        } else if( _type.indexOf('join-right') != -1 ) {

            //定位在右边开始
            _my.animationArr['left'] = DW + _actor.offsetWidth + 'px';

        } else if( _type.indexOf('out-left') != -1 ) {

            //向左边离开
            _my.animationArr['left'] = _my.cssArr['left'];
            _my.cssArr['left'] = '-' + _actor.offsetWidth + 'px';

        } else if ( _type.indexOf('out-right') != -1 ) {

            //向右边离开
            _my.animationArr['left'] = _my.cssArr['left'];
            _my.cssArr['left'] = DW + _actor.offsetWidth + 'px';

        } else {

            //X轴无定位
            _my.animationArr['left'] = _my.cssArr['left'];

        }



        /*--------------特效组------------------------*/

        //渐入
        if ( _type.indexOf('join-hiding') != -1) {
            _my.animationArr['filter'] = 'alpha(opacity=0)';
            _my.animationArr['-moz-opacity'] = '0';
            _my.animationArr['opacity'] = '0';
        }

        //渐出
        if ( _type.indexOf('out-hiding') != -1) {
            _my.cssArr['filter'] = 'alpha(opacity=0)';
            _my.cssArr['-moz-opacity'] = '0';
            _my.cssArr['opacity'] = '0';
        }
        /*---------------特效组end------------------------*/

        _my.animationArr['position'] = 'absolute';

        self.instantiationAnimation( _my );//实例化动画初始css

        //隐藏原文档流的节点
        _actor.style.cssText = _actor.style.cssText + 'visibility:hidden; width:' + _actor.offsetWidth + 'px; height:' + _actor.offsetHeight + 'px';
        _actor.innerHTML = '';
    };

    //开始主进程
    var timer = 0;//时间轴
    this.play = function () {

        function main () {

            return function () {

                if ( film[nowPage][timer] != 'undefined' ) {
                    for (var i in film[nowPage][timer]) {
                        self.instantiationCss(actors[nowPage][film[nowPage][timer][i]]);
                    }
                }
                timer++;
            }
        }
        setInterval(main(), 100);//0.1秒触发一次
    };

    //初始化方法
    this.touchListener();//监听滑动
    this.initializeCss();//初始化css
    this.story();//出场顺序初始化
    this.play();
};
