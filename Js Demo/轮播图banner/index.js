function createBanner(bannerWidth, bannerHeight, imgInfor) {
    // 接口调用：宽度，高度，图片url
    var banner = document.getElementsByClassName('banner')[0];
    var bannerCon = document.createElement('ul');

    bannerCon.style.transition = "all 1s";
    var imgUrl = imgInfor;
    var width = bannerWidth;
    var height = bannerHeight;
    var index = 0;
    var moveLen = 0;

    initImgs();
    var numCon = document.createElement('ul');

    initNumCon();
    Init();

    function initImgs() {
        banner.appendChild(bannerCon);
        bannerCon.style.width = width * imgUrl.length + 'px';
        bannerCon.style.height = height + 'px';
        bannerCon.style.position = "absolute";
        bannerCon.style.left = 0;
        for (let i = 0; i < imgUrl.length; i++) {
            var picList = document.createElement('li');
            picList.setAttribute("img-data", i);
            picList.className = "banner-img";
            picList.style.backgroundImage = "url(" + imgUrl[i] + ")";
            picList.style.width = width + 'px';
            picList.style.height = height + 'px';
            picList.style.float = "left";
            picList.style.backgroundSize = width + "px" + " " + height + "px";
            bannerCon.appendChild(picList);
        }
    }

    function initNumCon() {
        numCon.style.position = "absolute";
        numCon.style.bottom = 20 + 'px';
        numCon.style.left = '50% ';
        numCon.style.marginLeft = -80 + 'px';
        numCon.style.width = 160 + 'px';
        numCon.style.height = 10 + 'px';
        banner.appendChild(numCon);
        for (let i = 0; i < imgUrl.length; i++) {
            var numList = document.createElement('li');
            numList.setAttribute("data-index", i);
            numList.className = "num-list";
            numList.style.width = 30 + 'px';
            numList.style.height = 10 + 'px';
            numList.style.float = "left";
            // numList.style.borderRadius = '50%';
            numList.style.backgroundColor = "#ccc";
            // numList.style.opacity = 0.7;
            numList.style.marginRight = 10 + 'px';
            numCon.appendChild(numList);
        }
        numCon.children[0].style.backgroundColor = "#333";
    }


    function Init() {
        var timer = autoImg();
        chooseImg(timer);
    }

    function autoImg() { //自动轮播
        var timer = setInterval(moveImg, 1000);
        return timer;
    }

    function moveImg() {
        moveLen = index * width;
        bannerCon.style.left = -moveLen + 'px';
        changeNum(index);
        index++;
        if (index > 3) {
            index = 0;
        }
    }
    var numList = numCon.children;

    function changeNum(index) {
        for (var i = 0; i < numList.length; i++) {
            numList[i].style.backgroundColor = "#ccc";
        }

        numList[index].style.backgroundColor = "#333";
    }

    function chooseImg(timer) {
        var numList = numCon.children;

        for (let i = 0; i < numList.length; i++) {
            numList[i].onmouseover = function() {
                clearInterval(timer);
                moveLen = i * width;
                bannerCon.style.left = -moveLen + 'px';
                changeNum(i);

            }
            numList[i].onmouseleave = function() {
                Init();
            }
        }
    }
}