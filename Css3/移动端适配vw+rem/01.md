## 一、设备的css像素是不同的
### 1. CSS像素（逻辑像素）
- 可通过浏览器F12控制台查看不同机型的css像素，比如**iPhone6为375px，iPhone6Plus为414px**
- CSS中使用的一个抽象的概念，单位是px
- 值是相对的，并不是绝对的

### 2. 设备像素（物理像素）
- 屏幕的物理像素，任何设备屏幕的物理像素的数量都是固定不变的，单位是pt（点）
- 一般指的是手机的分辨率
- 1pt = 1/72英寸（inch）

### 3. 像素比（DPR）
- 物理像素 = css像素 * DPR
本质：一个css像素占用几个设备像素
获取：window.devicePixelRatio

- iphone6
**750 × 1334**		设备像素，屏幕分辨率
**375 × 667**		css像素，浏览器中html的宽度就为375px
**2.0**				像素比DPR

## 二、viewport可视区窗口的设置
通过meta标签设置，`name="viewport"`

### 1. content			视口里的相关设置
- `width`  视口的宽度，值为一个正整数，或字符串device-width（设备的实际宽度--css像素）。不建议设置数字（安卓设备有些不支持）
- `height`  视口的高度（与width一至）
- `user-scalable`	是否允许用户进行页面缩放，值为no或yes，代表不允许与允许
- `initial-scale`	页面初始缩放值，值为一个数字（可以带小数）。
- `minimum-scale`	页面最小能够缩放的比例，值为一个数字（可以带小数）。
- `maximum-scale`	页面最大能够缩放的比例，值为一个数字（可以带小数）。
        
### 2. 注意事项
1. 有的时候大家会见到同时写了不允许缩放，又写了最小与最大能够缩放的比例，那这样不是冲突了，为什么都已经写了不允许缩放了，还要写那些？
   原因：
        
        1、会有一些第三方的工具能够破坏user-scalable，比方说一些给父母的手机把文字放大的工具，就会有可能。不过一般是没有问题的
        2、像iphone5下还会有黑边
        3、所以写全了，可以避免一些bug

2. ios10不支持user-scalable=no，后面事件解决（阻止document的touchstart的默认行为）

### 3. 推荐设置
不允许用户缩放，默认固定缩放比例为1.0
``` js
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
```

## 三、移动端浏览器样式重置
将html，body占满整个设备的屏幕。并且清除默认的margin、padding
``` css
html,body{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
```
安卓和ios上的其他样式
``` css
body{
    font-family: helvetica;
    margin: 0;
}
body *{
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: 100%;
}
a,input,button{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
button,input{
    -webkit-appearance: none;
    border-radius: 0;
}
input::-webkit-input-placeholder{
    color:#000;
}
input:focus::-webkit-input-placeholder{
    color:#f00;
}
```
移动端的样式重置
1. 禁止用户选中文字，安卓无效，用阻止touchstart后的默认行为搞定
    `-webkit-user-select: none;`
2. 禁止长按弹出系统菜单
    `-webkit-touch-callout: none;`
3. 去除android下a/button/input标签被点击时产生的边框 & 去除ios下a标签被点击时产生的半透明灰色背景
    `-webkit-tap-highlight-color: rgba(0,0,0,0);`
4. 切换横竖屏或者用户自己通过浏览器设置的话，可以改变字体的大小(需要给body下的所有元素)
    `-webkit-text-size-adjust: 100%;`
5. 按钮在ios下都是圆角
   
    ``` css
    -webkit-appearance: none;	//button与input都会有个默认背景
    border-radius: 0;	//input有个默认圆角
    ```
6. 修改placeholder的样式
    ``` css
    input::-webkit-input-placeholder{
        color:#000;	//默认的样式
    }
    input:focus::-webkit-input-placeholder{
        color:#f00;	//点击后的样式
    }
    ```
    
7. 字体
    - ios
        默认中文字体是Heiti SC
        默认英文字体是Helvetica
        默认数字字体是HelveticaNeue
        无微软雅黑字体
    - android
        默认中文字体是Droidsansfallback
        默认英文和数字字体是Droid Sans
        无微软雅黑字体
    
    - font-family: helvetica;

## 四、相对单位em和rem
### 1. em相对于父级	
作为font-size的单位时，其代表父元素的字体大小，作为其他属性单位时，代表自身字体大小	
``` css
.parent{
    font-size:20px
}
.son{
    width:1em;
    /* 1em=20px */
}		

```	
    		


问题：
    1、chrom下有最小字体限制，必需为12px，所以这个值不能小于12
    2、如果两个一样的元素，但是里面字体不一样，那就不能统一设置了。或者元素字体变化了，就又要统一设置一遍
    
### 2. rem相对于根元素html	
CSS3新增的一个相对单位，是相对于根元素html字体大小
``` css
html{
    font-size:20px
}		
/* 2rem=40px */
```

em和rem都是相对单位，不同点在于em是相对于父级的font-size。而rem是相对于根节点html的font-size


## 五、rem布局原理
### iPhone6为例
通过浏览器F12查看控制台可以看到iPhone6的css像素为`375px`
``` html
<style>
    html {
        font-size: 100px;
    }

    html,
    body {
        margin: 0;
        padding: 0;
    }

    header {
        width: 3.75rem;
        font-size: 0.2rem;
        background: #007ACC;
    }

    div {
        width: 1.875rem;
        height: 1.875rem;
        font-size: 0.12rem;
        background: #07C160;
    }
</style>

<body>
    <header>占满屏幕</header>
    <div>屏幕宽度的一半</div>
</body>

```
暂时设置html的font-size为100px（正常开发时是动态设置html根节点的字体大小）
子元素的宽度全部用rem设置
那么所有子元素的css宽度 = 根节点字体大小 * 对应的rem
在上面的例子中
- header的宽度：375px = 100 * 3.75rem
- div的宽度：187.5 = 100 * 1.875rem

iPhone6的css像素为375px，此时header刚好占满屏幕，div为屏幕宽度的一半

### iPhone6Plus为例
iPhone6Plus的css像素为`414px`
此时设置根节点html的字体大小为`110.4px`,子元素不作任何变化
``` css
html {
    font-size: 110.4px;
    /* 414 / 3.75 = 110.4 */
}
```
- header的宽度：414px = 110.4 * 3.75rem
- div的宽度：207px = 110.4 * 1.875rem

此时可以意外的看到header仍然占满了屏幕宽度，div为屏幕宽度一半。
而我们却只是改变了html的字体大小就实现了这样的功能

### 子元素随着html成比例变化
rem的布局原理就是通过动态改变根节点的字体大小，来影响所有设置了rem单位的子元素的大小，来保证元素大小和屏幕大小是**成比例式的同步变化**

**那么如何设置子元素为多少rem呢？**
目前市面通常以iPhone6作为标准，设计稿尺寸一般为750px以便于计算

## 六、动态设置根节点字体大小
以iPhone6为标准，设计稿尺寸750px
``` js
(function(doc, designWidth) {
    const html = doc.documentElement;
 
    const refreshRem = () => {
        const clientWidth = html.clientWidth;
        if (clientWidth >= designWidth) { 
            //给宽度一个最大值，如果设备的宽度已经超过设计稿的尺寸了，统一按一个值去算（传的第三个参数）
            html.style.fontSize = '100px';
        } else {
            // iPhone6为例：根节点字体大小为50px = 100 * (375 / 750)
            html.style.fontSize = 100 * (clientWidth / designWidth) + 'px';
        }
    };
    
    //dom加载完的一个事件
    doc.addEventListener('DOMContentLoaded', refreshRem);
})(document, 750);
```
通过上面的立即执行函数，在iPhone6中，根节点的字体大小被设置为了50px

那么如果要占满屏幕宽度，则子元素宽度应设置`width:7.5rem;`
占据一半，则设置`width:3.75rem;`。相对于原来的100px，以750的设计稿为标准可以让计算时出现的小数点较少,便于计算。

当然也可以使用sass或者less编写`px2rem()`函数，自动将px转成rem，便于代码编写

## 七、通过vw设置根节点字体大小

### vw、vh单位
- `vw`		Viewport's width的简写，1vw等于视口宽度的1%
- `vh`		Viewport's height的简写，1vh等于视口高度的1%
- `vmin`	取vw和vh中最小的值
- `vmax`	取vw和vh中最大的值

### 兼容性问题
ios 8 及以上的系统
Android 4.4及以上的系统
现在大部分的移动端设备都支持vw了

### vw+rem适配方案

通过vw设置根节点字体大小，页面里的尺寸依然使用rem

**iphone6**
1vw=375/100=3.75px;

**iphone6Plus**
1vw=414/100=4.14px;


以iPhone6设计稿为例：html的font-size为50px，1vw=3.75px
转化为vw为 `50 / 3.75 = 13.333333333333334vw`
``` html
<style>
html{
    font-size:13.333333333333334vw
    /* font-size: calc(50vw/3.75); */
}
/* 占满整个屏幕 */
header {
    width: 7.5rem;
    font-size: 0.4rem;
    background: #007ACC;
}
/* 占据一半 */
div {
    width: 3.75rem;
    height: 3.75rem;
    font-size: 0.2rem;
    background: #07C160;
}
</style>

<body>
    <header>占满屏幕</header>
    <div>屏幕宽度的一半</div>
</body>
```

