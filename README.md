# touch-ppt
一款无任何依赖的移动端ppt框架

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

动画效果可以叠加用【空格】分割  例:bottom left  右下角飞入  top hiding 从上渐出</br></br>

所有动效:
```bash
top:从屏幕上部飞入
left:从屏幕左边飞入
right:从屏幕右边飞入
bottom:从屏幕下方飞入
hiding:渐出
```
