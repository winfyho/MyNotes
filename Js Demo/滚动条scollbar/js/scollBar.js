(function() {

    var config = {
        wraperDom: document.getElementsByClassName('wraper')[0],
        barDom: document.getElementsByClassName('scoll-bar')[0],
        contentDom: document.getElementsByClassName('wraper')[0].getElementsByTagName('ul')[0],
    };
    // var bar = document.getElementsByClassName('scoll-bar')[0];
    // var content = document.getElementsByClassName('wraper')[0].getElementsByTagName('ul')[0];
    // var wraper = document.getElementsByClassName('wraper')[0];
    var bar = config.barDom;
    var content = config.contentDom;
    var wraper = config.wraperDom;

    var clientH = wraper.clientHeight;
    var contentH = content.offsetHeight;
    var barHeight;
    content.style.top = 0;
    bar.style.top = 0;
    setScollBarStyle();
    scollBarDrop();
    scollMouseWheel();
    /**
     * 设置滚动条样式
     */
    function setScollBarStyle() {
        barHeight = clientH / contentH * clientH;
        bar.style.height = barHeight + 'px';

        console.log('bar的高度为：' + parseInt(barHeight) + "px 内容占窗口比例" + parseInt(barHeight * 100 / clientH) + '%');
    }
    /**
     * 滚动条拖拽事件
     */
    function scollBarDrop() {

        bar.onmousedown = function(e) {
            e.preventDefault();
            var firstY = e.pageY;
            var barY = parseFloat(window.getComputedStyle(bar).top);

            document.onmousemove = function(e) {

                var moveY = e.pageY - firstY;
                // console.log("鼠标移动" + moveY + " " + "滚动条位置Y: " + bar.style.top);

                bar.style.top = barY + moveY + 'px';
                if (parseFloat(bar.style.top) <= 0) {
                    bar.style.top = 0 + 'px';
                } else if (parseFloat(bar.style.top) >= clientH - barHeight) {
                    bar.style.top = clientH - barHeight + 'px';
                }
                // 根据滚动条位置，设置内容区的位置
                moveContent(parseFloat(bar.style.top));

            }
            document.onmouseup = function() {
                document.onmousemove = null;
            }
        }
    }
    /**
     * 鼠标滚轮事件
     */
    function scollMouseWheel() {

        content.onmousewheel = function(e) {
            var now = parseFloat(bar.style.top);

            // console.log(now);
            var wheelSpeen = 20; // 设置鼠标滚轮速度
            now += e.deltaY / wheelSpeen;
            if (now <= 0) {
                now = 0;
            } else if (now >= clientH - barHeight) {
                now = clientH - barHeight;
            }
            moveContent(now);
            bar.style.top = now + 'px';
        }

    }
    /**
     * 内容区移动跟随滚动条移动
     * @param {*} barTop 
     */
    function moveContent(barTop) {

        var contentTop = barTop / (clientH - barHeight) * (contentH - clientH);
        // console.log(contentTop);
        content.style.top = -contentTop + 'px';
    }
}())