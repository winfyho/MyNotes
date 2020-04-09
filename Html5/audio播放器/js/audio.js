import UI from "./interaction.js"
import storage from "./storage.js"
import SongList from "./songList.js"

var audioSrc = "../playlist/audio.mp3";

var playList = SongList.getSongListDetail("AGA").list;
console.log("当前播放列表",playList)


var audioDom = document.getElementById("audio");


// 点击按钮
var playBtn = document.getElementsByClassName("play-btn")[0];
var lastBtn = document.getElementsByClassName("last-btn")[0];
var nextBtn = document.getElementsByClassName("next-btn")[0];
var modeBtn = document.getElementsByClassName("mode-btn")[0];
var muteBtn = document.getElementsByClassName("mute-btn")[0];

// 滑动选择器
var timeSlider = document.getElementsByClassName("time-slider")[0];
var volumeSlider = document.getElementsByClassName("volume-slider")[0];

// view渲染样式
var inforDom = document.getElementsByClassName("infor")[0];

var curTimeDom = document.getElementsByClassName("currentTime")[0];
var durationDom = document.getElementsByClassName("duration")[0];
var timeInnerDom = document.getElementsByClassName("time-inner")[0];

var volumeDom = document.getElementsByClassName("volume-num")[0];
var volumeInnerDom = document.getElementsByClassName("volume-inner")[0];



init(audioDom, audioSrc);

function init(audio, src) {

    audio.index = 0;
    loadMusic(audio,playList[audio.index])

    bindPlay(audio, playBtn);
    bindChange(audio, lastBtn, nextBtn)
    bindVolume(audio, volumeSlider)
    bindTime(audio, timeSlider);
    bindeMode(audio, modeBtn)
}

function loadMusic(audio,music){
    renderLoadStyle("loading");

    audio.src = "../music/"+audio.curSheet+"/" + music.src;
    inforDom.innerHTML = music.src;

    var timer = setInterval(function () {
        if (audio.readyState === 4) {
            // console.log(audio.readyState, audio.preload)

            // 设置总时长
            let m = parseInt(audio.duration / 60);
            let s = parseInt(audio.duration - m * 60) < 10 ? '0' + parseInt(audio.duration - m * 60) : parseInt(audio.duration - m * 60);
            curTimeDom.innerHTML = "0:00";
            durationDom.innerHTML = m + ':' + s;

            // 改变数据
            audio.playing = true;
            // 渲染样式
            renderLoadStyle("playing");

            audio.play();
            clearInterval(timer)
        }
    }, 200)

    // 渲染不同播放状态的样式
    function renderLoadStyle(state){
        if(state === "loading"){
            playBtn.classList.remove("play");
            playBtn.classList.remove("pause");
            playBtn.classList.add("loading");
        }else if(state === "playing"){
            playBtn.classList.remove("loading");
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
        }else{
            playBtn.classList.remove("loading");
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
        }
    }
}

function bindPlay(audio, playBtn) {
    audio.playing = false;

    playBtn.onclick = function () {
        if (audio.playing === false) {
            audio.play();
            // 改变播放状态
            audio.playing = true;
            UI.showToast({
                title: "播放中",
                icon: "playing"
            })
            // 渲染样式
            renderPlayStyle(audio.playing)


        } else {
            audio.pause();
            // 改变播放状态
            audio.playing = false;
            UI.showToast({
                title: "暂停",
                icon: "pause"
            })
            // 渲染样式
            renderPlayStyle(audio.playing)

        }
    }

    // 渲染播放/暂停状态的样式
    function renderPlayStyle(playing) {
        if (playing === true) {
            playBtn.classList.remove("play");
            playBtn.classList.remove("loading");
            playBtn.classList.add("pause")
        } else {
            playBtn.classList.remove("pause");
            playBtn.classList.remove("loading");
            playBtn.classList.add("play")
        }
    }
}

function bindChange(audio, lastBtn, nextBtn) {
    lastBtn.onclick = function () {
        console.log("上一首", audio.index, playList[audio.index - 1]);
        if (playList[audio.index - 1]) {
            audio.pause();
            // 加载音乐
            loadMusic(audio,playList[audio.index - 1]);
            audio.index -= 1;

            UI.showToast({
                title: "上一首",
                icon: "last"
            })
        } else {
            UI.showToast({
                title: "已经没有了",
                icon: "warning"
            })
        }
    }

    nextBtn.onclick = function () {
        console.log("下一首", audio.index, playList[audio.index + 1])
        if (playList[audio.index + 1]) {
            audio.pause();
            // 加载音乐
            loadMusic(audio,playList[audio.index + 1]);
            audio.index += 1;

            UI.showToast({
                title: "下一首",
                icon: "next"
            })
        } else {
            UI.showToast({
                title: "已经没有了",
                icon: "warning"
            })
        }
    }
}

function bindVolume(audio, volumeSlider) {
    // 渲染初始音量
    renderVolume(audio.volume)

    // console.log(audio.volume, volumeSlider)

    // 绑定静音按钮事件
    muteBtn.onclick = function () {
        console.log(audio.defaultMuted)
        if (audio.defaultMuted === false) {
            audio.defaultMuted = true;
            // 改变数据
            audio.volume = 0;
            UI.showToast({
                title: "静音",
                icon: "mute"
            })
            // 渲染样式
            renderVolume(audio.volume)

        } else {
            audio.defaultMuted = false;
            // 改变数据
            audio.volume = 1;
            UI.showToast({
                title: "取消静音",
                icon: "cancelmute"
            })
            // 渲染样式
            renderVolume(audio.volume)
        }
    }

    // 绑定滑动条滑动事件
    volumeSlider.oninput = function () {
        console.log(volumeSlider.value)
        // 设置播放器音量
        audio.volume = parseFloat(volumeSlider.value / 100);
        // 渲染样式
        renderVolume(audio.volume)
    }

    function renderVolume(vol) {
        volumeInnerDom.style.width = vol * 100 + '%';
        volumeSlider.value = vol * 100;
        volumeDom.innerHTML = parseInt(vol * 100);
    }

}


function bindTime(audio, timeSlider) {

    // 获取当前播放时间
    var timer = setInterval(function () {
        // console.log(audio.currentTime)
        // 渲染时间样式
        renderTimeStyle(audio.currentTime)
    }, 1000)

    // 鼠标点击清除定时器
    timeSlider.onmousedown = function () {
        clearInterval(timer)
    }

    // 绑定滑动条滑动事件
    timeSlider.oninput = function () {
        console.log(timeSlider.value)
        var curTime = parseFloat(timeSlider.value / 100) * audio.duration;
        // 设置当前播放时间
        audio.currentTime = curTime;

        // 渲染样式 
        renderTimeStyle(audio.currentTime)

        // 重新开启计时器
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
            // 改变数据
            audio.mode = "order";
            audio.loop = false;
            UI.showToast({
                title: "顺序播放",
                icon: "order"
            })

            // 渲染样式
            renderModeStyle(audio.mode);
        } else {
            // 改变数据
            audio.mode = "loop";
            audio.loop = true;
            UI.showToast({
                title: "单曲循环",
                icon: "loop"
            })
            
            // 渲染样式
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








