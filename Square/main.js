/**
 * Created by admin on 27/6/2016.
 */
var selected = null;
var mouseX = 0, mouseY = 0, elemX = 0, elemY = 0;
var initX = 0, initY = 0;

function getOffsetRect(elem){
    var c = elem.getBoundingClientRect();

    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top = c.top + scrollTop - clientTop;
    var left = c.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)};
}

window.onload = function(){
    initX = document.getElementById('square').getBoundingClientRect().left;
    initY = document.getElementById('square').getBoundingClientRect().top;
    document.getElementById('square').style.borderBottomColor = 'aqua';
    document.getElementById('square').style.borderTopColor = 'brown';
    document.getElementById('square').style.borderLeftColor = 'beige';
    document.getElementById('square').style.borderRightColor = 'mediumslateblue';

    document.getElementById('square').ondblclick = function() {
        changeColour(this);
    };
    document.getElementById('square').addEventListener('mousedown',function (event) {
        if(event.which == 1){
            dragInit(this);//dragging the square around...
        }else if(event.which == 2){
            resetPosition(this);//reset square to original position
        }else if(event.which == 3){
            event.preventDefault();//prevent context menu from popping out
        }
    });
    document.onmousemove = moveElem;
    document.onmouseup = removeSelected;
};


function changeColour(e) {
    var temp = e.style.borderRightColor;
    e.style.borderRightColor = e.style.borderTopColor;
    var temp1 = e.style.borderBottomColor;
    e.style.borderBottomColor = temp;
    temp = e.style.borderLeftColor;
    e.style.borderLeftColor = temp1;
    e.style.borderTopColor = temp;
}

function dragInit(e) {
    selected = e;
    elemX = mouseX - selected.offsetLeft;
    elemY = mouseY - selected.offsetTop;
}

function moveElem(e){
    mouseX = document.all ? window.event.clientX : e.pageX;
    mouseY = document.all ? window.event.clientY : e.pageY;
    if (selected != null){
        selected.style.left = (mouseX - elemX) + 'px';
        selected.style.top = (mouseY - elemY) + 'px';
    }
}

function removeSelected(){
    selected = null;
}

function resetPosition(e){
    e.style.left = initX + 'px';
    e.style.top = initY + 'px';
}