var config = {
    dropWidth: 300,
    dropPadding: 15,
    volWidth: 150
}
var drop = document.getElementsByClassName('drop')[0];
var track = drop.children[0];
var vol = track.children[0];
var dropBtn = document.getElementsByClassName('drop-btn')[0];
var volSpan = dropBtn.getElementsByTagName('span')[0];
vol.style.width = config.volWidth + 'px';
var volume = 0;
var persent = 0;

drop.onclick = function(e) {
    e.stopPropagation();
    var widthPer = (e.pageX - drop.offsetLeft - config.dropPadding) / config.dropWidth;
    vol.style.width = widthPer * config.dropWidth + 'px';
    volSpan.innerHTML = parseInt(widthPer * 100);
    volume = parseInt(widthPer * 100);
    persent = volume / 100;
    console.log(volume, persent);
}

dropBtn.onmousedown = function(e) {
    var firX = e.pageX;
    var volWidth = parseInt(vol.style.width);

    document.onmousemove = function(e) {
        var nowWidth = parseInt(vol.style.width);


        var lastX = e.pageX;
        var moveX = lastX - firX;
        if (volWidth + moveX > 301 || volWidth + moveX < 0) {
            return;
        }
        vol.style.width = volWidth + moveX + 'px';
        volSpan.innerHTML = parseInt(nowWidth / config.dropWidth * 100);

    }
    document.onmouseup = function() {
        document.onmousemove = null;
    }
}