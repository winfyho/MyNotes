var option = {
    
}
var audioSrc = "./audio.mp3";

var audioDom = document.getElementById("audio");

var inforDom = document.getElementsByClassName("infor")[0];

var playBtn = document.getElementsByClassName("play-btn")[0];
var modeBtn = document.getElementsByClassName("mode-btn")[0];

var timeSlider = document.getElementsByClassName("time-slider")[0];
var volumeSlider = document.getElementsByClassName("volume-slider")[0];

var curTimeDom = document.getElementsByClassName("currentTime")[0];
var timeInnerDom = document.getElementsByClassName("time-inner")[0];
var durationDom = document.getElementsByClassName("duration")[0];
var volumeDom = document.getElementsByClassName("volume-num")[0];
var volumeInnerDom = document.getElementsByClassName("volume-inner")[0];



init(audioDom, audioSrc);

function init(audio, src) {

    audio.setAttribute("src", src);
    inforDom.innerHTML = "3AM - AGA";

    var timer = setInterval(function () {
        if (audio.readyState) {
            console.log(audio.readyState, audio.duration)
            // 设置总时长
            let m = parseInt(audio.duration / 60);
            let s = parseInt(audio.duration - m * 60) < 10 ? '0' + parseInt(audio.duration - m * 60) : parseInt(audio.duration - m * 60);
            durationDom.innerHTML = m + ':' + s;
            curTimeDom.innerHTML = "0:00";

            clearInterval(timer)
        }
    }, 200)

    bindPlay(audio, playBtn);
    bindVolume(audio, volumeSlider)
    bindTime(audio, timeSlider);
    bindeMode(audio, modeBtn)
}

function bindPlay(audio, playBtn) {
    audio.playing = false;

    playBtn.onclick = function () {
        if (audio.playing === false) {
            audio.play();
            // 改变播放状态
            audio.playing = true;
            setPlayStyle(audio.playing)


        } else {
            audio.pause();
            // 改变播放状态
            audio.playing = false;
            setPlayStyle(audio.playing)

        }
    }

    function setPlayStyle(playing) {
        // 设置样式
        if (playing === true) {
            playBtn.classList.remove("play")
            playBtn.classList.add("pause")
        } else {
            playBtn.classList.remove("pause")
            playBtn.classList.add("play")
        }
    }
}

function bindVolume(audio, volumeSlider) {
    renderVolume(audio.volume)

    console.log(audio.volume, volumeSlider)
    volumeSlider.oninput = function () {
        console.log(volumeSlider.value)
        // 设置播放器音量
        audio.volume = parseFloat(volumeSlider.value / 100);
        // 渲染样式
        renderVolume(audio.volume)
    }

    function renderVolume(vol) {
        // 渲染样式
        volumeInnerDom.style.width = vol * 100 + '%';
        volumeSlider.value = vol * 100;
        volumeDom.innerHTML = parseInt(vol * 100);
    }

}

function bindTime(audio, timeSlider) {

    var timer = setInterval(function () {
        // 获取当前播放时间
        console.log(audio.currentTime)
        // 渲染时间样式
        renderTimeStyle(audio.currentTime)
    }, 1000)

    timeSlider.onmousedown = function () {
        clearInterval(timer)
    }

    // 改变时间
    timeSlider.oninput = function () {
        console.log(timeSlider.value)
        let = curTime = parseFloat(timeSlider.value / 100) * audio.duration;
        // 设置当前播放时间
        audio.currentTime = curTime;
        // 渲染时间样式 
        renderTimeStyle(audio.currentTime)

        timer = setInterval(function () {
            renderTimeStyle(audio.currentTime)
        }, 1000)
    }

    function renderTimeStyle(curTime) {
        // 渲染样式
        let m = parseInt(curTime / 60);
        let s = (curTime - m * 60) < 10 ? '0' + parseInt(curTime - m * 60) : parseInt(curTime - m * 60);
        timeInnerDom.style.width = parseFloat(curTime / audio.duration) * 100 + '%';
        timeSlider.value = parseFloat(curTime / audio.duration) * 100;
        curTimeDom.innerHTML = m + ':' + s;

    }
}

function bindeMode(audio, modeBtn) {
    audio.mode = "loop";
    modeBtn.onclick = function () {
        if (audio.mode === "loop") {
            audio.mode = "order";
            audio.loop = false;
            renderModeStyle(audio.mode);
        } else {
            audio.mode = "loop";
            audio.loop = true;
            renderModeStyle(audio.mode);            
        }
    }


    function renderModeStyle(mode) {
        console.log(mode)
        if (audio.mode === "loop") {
            modeBtn.classList.remove("order");
            modeBtn.classList.add("loop");
        } else {
            modeBtn.classList.remove("loop");
            modeBtn.classList.add("order");
        }

    }
}