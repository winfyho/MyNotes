function imgMagnifier(target, imgSrc) {
    // var imgWraper = target;
    var imgWraper = target;

    var imgView = document.createElement('div');
    var largeImg = document.createElement('img');
    var large = document.createElement('div');
    imgView.style.display = "none";
    large.style.display = "none";
    initImgView();

    function initImgView() {
        imgView.style.position = "absolute";
        imgView.style.right = -imgWraper.offsetWidth - 5 + 'px';
        imgView.style.width = imgWraper.offsetWidth + 'px';
        imgView.style.height = imgWraper.offsetHeight + 'px';
        imgView.style.backgroundColor = "#aaa";
        imgView.style.overflow = "hidden";
        imgWraper.appendChild(imgView);
        largeImg.style.width = "200%";
        largeImg.style.position = "absolute";

        largeImg.src = imgSrc;
        imgView.appendChild(largeImg);
        large.style.width = 150 + 'px';
        large.style.height = 150 + 'px';
        large.style.backgroundColor = "#777";
        large.style.opacity = 0.4;
        large.style.position = "absolute";
        imgWraper.append(large);
    }



    imgWraper.onmouseover = function(e) {
        imgView.style.display = "block";
        large.style.display = "block";
        imgWraper.onmousemove = function(e) {

            var mouseX = e.pageX - imgWraper.offsetLeft;
            var mouseY = e.pageY - imgWraper.offsetTop;
            if (mouseX < 0 || mouseX > imgWraper.offsetWidth || mouseY < 0 || mouseY > imgWraper.offsetHeight) {
                imgView.style.display = "none";
                large.style.display = "none";
                return;
            }
            var largeX = mouseX - large.offsetHeight / 2;
            var largeY = mouseY - large.offsetWidth / 2;
            large.style.left = largeX + 'px';
            large.style.top = largeY + 'px';

            // console.log(largeX, largeY);
            largeImg.style.left = -largeX * 2 + 'px';
            largeImg.style.top = -largeY * 2 + 'px';

        }
    }
}