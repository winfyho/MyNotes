import storage from "./storage.js"
import UI from "./interaction.js"
import SongList from "./songList.js"
function init(songSheetDom) {

    var songSheetDom = document.getElementsByClassName("song-sheet")[0];

    getSongSheet(songSheetDom);
    bindChangeSheet(songSheetDom);
    bindAddSheet(songSheetDom)
    bindRemoveSheet(songSheetDom);



}

function bindChangeSheet(songSheetDom) {
    var sheets = songSheetDom.getElementsByClassName("list")[0].children;


    console.log(sheets);
    for (let i = 0; i < sheets.length; i++) {
        let sheet = sheets[i];
        sheet.onclick = function () {
            for (let j = 0; j < sheets.length; j++) {
                sheets[j].className = "";
            }
            this.className = "choosed";
            document.getElementById("audio").sheet= sheet.innerHTML;
            SongList.init(sheet.innerHTML)
            renderStyle(sheet.innerHTML);
        }
    }
    function renderStyle(sheetName) {
        // SongList.init()
    }
}

function bindAddSheet(songSheetDom) {
    var addSheetBtn = songSheetDom.getElementsByClassName("add-sheet-btn")[0];
    addSheetBtn.onclick = function () {
        var btnTitle = addSheetBtn.getElementsByClassName("btn-title")[0];
        var sheetNameInput = addSheetBtn.getElementsByClassName("sheet-name-input")[0];
        btnTitle.style.display = "none";
        sheetNameInput.style.display = "block";

        document.onkeypress = function (e) {
            if (e.key === "Enter") {
                console.log("创建歌单", sheetNameInput.value)

                btnTitle.style.display = "block";
                sheetNameInput.style.display = "none";
                createSongSheet(sheetNameInput.value);
                sheetNameInput.value = "";


            }
        }
    }
}

function bindRemoveSheet(songSheetDom) {
    var sheets = songSheetDom.getElementsByClassName("list")[0].children;

    for (let i = 0; i < sheets.length; i++) {
        let el = sheets[i];
        el.oncontextmenu = function (e) {
            e.preventDefault()
            console.log(el.innerHTML);
            removeSongSheet(el.innerHTML);

        }

    }
}

function createSongSheet(sheetName) {
    if (!storage.getItem(sheetName)) {
        // 在浏览器缓存创建歌单
        storage.setItem(sheetName, {
            createDate: new Date().getTime(),
            name: sheetName,
            url: sheetName + "/",
            list: []
        })
        // 更新歌单索引
        let songSheet = storage.getItem("songSheet");
        songSheet.push(sheetName)
        storage.setItem("songSheet", songSheet)
        console.log("歌单创建成功", songSheet, storage.getItem("songSheet"));
        UI.showToast({
            icon: "success",
            title: "歌单创建成功"
        })
    } else {
        console.log("歌单已经存在")
    }
}
function removeSongSheet(sheetName) {
    var songSheet = storage.getItem("songSheet");
    songSheet.pop(sheetName);
    storage.setItem("songSheet", songSheet)
    storage.removeItem(sheetName)
    UI.showToast({
        icon: "success",
        title: "删除成功"
    })
}
function getSongSheet(songSheetDom) {
    var songSheet = storage.getItem("songSheet");
    var listUL = songSheetDom.getElementsByClassName("list")[0];
    let list = ``;
    songSheet.forEach(i => {
        var li = document.createElement("li")
        li.innerHTML = i
        listUL.appendChild(li);
    });
    console.log("获取歌单", songSheet, listUL);

    return songSheet;
}
export default {
    init,
    createSongSheet,
    getSongSheet,
    removeSongSheet
}