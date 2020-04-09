import storage from "./storage.js"
import SongSheet from "./songSheet.js"
import SongList from "./songList.js"
import UI from "./interaction.js"
import { file } from "./file.js"

var songSheetDom = document.getElementsByClassName("song-sheet")[0];
SongSheet.init(songSheetDom);
SongList.init("AGA")

// storage.setItem("MyLove",{
//     createDate:new Date().getTime(),
//     name:"MyLove",
//     url:"MyLove/",
//     list:[]
    
// })


// storage.setItem("test",{
//     name:"winfy",
// })
// storage.update("test",{
//     age:18,
//     name:"hyh"
// });




// file.init(document.getElementById("file"));

var fileInput = document.getElementById("file");



// var addBtn = document.getElementsByClassName("add-btn")[0];
// addBtn.onclick = function(){
//     console.log("add")
// }