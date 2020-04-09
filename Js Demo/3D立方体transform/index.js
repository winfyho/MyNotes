var contant = document.getElementsByClassName('contant')[0];
var box = contant.children[0];
var itemList = box.children;



var init = document.getElementsByClassName('init')[0];
init.onclick = function() {
    itemList[0].style.transform = "rotateX(0deg) translateZ(250px)";
    itemList[1].style.transform = "rotateX(0deg) translateZ(-250px)";
    itemList[2].style.transform = "rotateY(-90deg) translateZ(250px)";
    itemList[3].style.transform = "rotateY(90deg) translateZ(250px)";
    itemList[4].style.transform = "rotateX(-90deg) translateZ(250px)";
    itemList[5].style.transform = "rotateX(90deg) translateZ(250px)";
}

var rollX = document.getElementsByClassName('roll-x')[0];
var rollY = document.getElementsByClassName('roll-y')[0];
var rollZ = document.getElementsByClassName('roll-z')[0];
var X = 50;
var Y = 50;
var Z = 50;

rollX.onclick = function() {
    box.style.transform = "rotateY(" + X + "deg) ";
    X += 50;
}
rollY.onclick = function() {
    box.style.transform = "rotateX(" + Y + "deg) ";
    Y += 50;
}
rollZ.onclick = function() {
    box.style.transform = "rotateZ(" + Z + "deg) ";
    Z += 50;
}