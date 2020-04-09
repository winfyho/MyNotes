const container = document.getElementsByClassName('container')[0];
const el = document.getElementsByClassName('el-drag')[0];

// 被拖动元素事件
function dragstart(ev) {
    ev.dataTransfer.dropEffect = "move";
    ev.dataTransfer.setData("text/plain", ev.target.innerText);
    console.log(ev.target);
    console.log("dragstart");

}
function drag(e) {
    // console.log("drag");

}
function dragend(e) {
    console.log("dragend");
}


// 拖动区域事件
function dragenter(e) {
    console.log("dragenter");
    container.style.background = "#aaa"
}

function dragleave(e) {
    container.style.background = "#fff"

}
function drop(ev) {
    container.appendChild(el)
    // ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text/plain");
    // var html = ev.dataTransfer.getData("text/html");

    console.log("drop",data);
    container.style.background = "#fff"

}
function drogover(e) {
    e.preventDefault();
}