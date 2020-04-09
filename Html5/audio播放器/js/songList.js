import storage from "./storage.js"
import UI from "./interaction.js"

function init(curSheet) {
    var songListDom = document.getElementsByClassName("song-list")[0];
    var songs = getSongListDetail(curSheet).list;

    console.log("当前歌单", curSheet, songs)
    renderSongList(curSheet, songs);

    bindChangeSong();

}



function renderSongList(curSheet, songs) {
    var songUL = document.getElementsByClassName("songs-ul")[0];
    var listName = document.getElementsByClassName("list-name")[0];
    var fileInput = document.getElementById("file");
    var audioDom = document.getElementById("audio");

    songUL.innerHTML = "";
    for (let i = 0; i < songs.length; i++) {

        rederOneSong(songs[i]);
    }

    listName.innerHTML = curSheet;
    fileInput.curSheet = curSheet;
    audioDom.curSheet = curSheet;

    fileInput.onchange = function () {
        let songList = [];
        let list = fileInput.files;

        for (let i = 0; i < list.length; i++) {

            songList.push({
                src: list[i].name,
                size: list[i].size,
                addDate: new Date().getTime(),
                type: list[i].type
            })

        }
        let newNum = addSongList(fileInput.curSheet, songList)
        console.log(fileInput.curSheet, "添加音乐", songList.length, "首", songList)

        UI.showToast({
            icon: "success",
            title: "添加" + newNum + "首歌曲",
            duration: 2000
        })
    }

    
}
function rederOneSong(song) {
    var songUL = document.getElementsByClassName("songs-ul")[0];

    var li = document.createElement('li');
    var songName = document.createElement("span");
    songName.className = "song";
    songName.innerHTML = song.src;
    li.appendChild(songName);

    var singer = document.createElement("span");
    singer.className = "singer"
    singer.innerHTML = song.size;
    li.appendChild(singer);


    var others = document.createElement("span");
    others.className = "others"
    others.innerText = "专辑";
    li.appendChild(others);

    li.song = song;
    songUL.appendChild(li);

}

function bindChangeSong(){
    var songUL = document.getElementsByClassName("songs-ul")[0];
    let songs = songUL.children;
    console.log(songs)

    for (let i = 0; i < songs.length; i++) {
        let el = songs[i];
        el.onclick = function(){
            console.log(el.song);
            var audio = document.getElementById("audio");
            audio.src ="../music/"+audio.sheet+"/" + el.song.src;
            var songName = document.getElementById("song-name");
            songName.innerHTML = el.song.src;
            audio.play();
        }
        
    }
}

function getSongListDetail(sheetName) {
    let songListDetail = storage.getItem(sheetName)
    return songListDetail;
}

function addSongList(curSheet, newSongs) {
    let songListData = storage.getItem(curSheet);
    let oldSongs = songListData.list;
    let oldNum = oldSongs.length;
    console.log("oldSongs", curSheet, oldSongs, newSongs);
    newSongs.forEach(newSong => {
        let flag = false;
        oldSongs.forEach(oldSong => {
            if (oldSong.src === newSong.src) {
                flag = true;
            }
        })
        // 歌单中不存在当前歌曲，则加入
        if (flag === false) {
            oldSongs.push(newSong)
        }
    })
    songListData.list = oldSongs;
    storage.setItem(curSheet, songListData)
    console.log("更新歌单-", curSheet, oldSongs);

    return oldSongs.length - oldNum

}

export default {
    init,
    addSongList,
    getSongListDetail
}