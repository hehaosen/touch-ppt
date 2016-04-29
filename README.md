# touch-ppt
一款无任何依赖的移动端ppt框架
#安装
1.你可以直接 <a href="https://github.com/hehaosen/touch-ppt/archive/master.zip">点击下载</a></br></br>
2.可以用npm下载
```bash
$npm install touch-ppt
```
#如何使用?



```bash
<script>
touchPPT = new touchPPT({
    '.page1':{  //<--第一页的节点
        '.p1_no1':{  //<--需要在第一页产生动画的节点
            type:'top',//<--动画特效
            speed: 2000,//<--动画速度
            route: 10 //<--时间轴 0.1秒为一个单位  10 = 等待1秒执行动画
        },
        '.p1_no2':{
            type:'bottom left',
            speed: 2000,
            route: 20
        }
    },
    '.page2':{
        '.p2_no1':{}
    }
})
</script>
```


#type动效说明

动画效果可以叠加用【空格】分割  例:bottom left  右下角飞入  top hiding 从上渐入</br></br>

所有动效:
```bash
join-top:从屏幕上部飞入
join-left:从屏幕左边飞入
join-right:从屏幕右边飞入
join-bottom:从屏幕下方飞入
out-top:向屏幕上部飞出
out-left:向屏幕左边飞出
out-right:向屏幕右边飞出
out-bottom:向屏幕下方飞出
join-hiding:渐入
out-hiding:渐出
```

#API说明

.nextPage()</br>
进入下一页</br>

.previousPage()</br>
进入上一页</br>

#作者补充说明
注意:</br>
1.如果是脱离文档流的布局，尽量使用top和left进行定位，这样可以避免在部分浏览器中产生错误。</br>
2.class样式请不要依赖于父级节点，不然会导致css失效</br>

我会尽快解决这些问题

#联系作者
如有好的想法或者好的建议欢迎加我QQ:307052084
或者邮箱:307052084@qq.com


