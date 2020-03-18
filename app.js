const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const image = "";

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

// 실제 Canvas 의 픽셀 사이즈를 기재해 주어야 함
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.0;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else {
        if(filling === false){
        ctx.lineTo(x, y);
        ctx.stroke();
        } else {
        ctx.fillRect(0,0, canvas.width, canvas.height);
        }
        // ctx.closePath();
    }

}

function handleColorClick(event){
    const Color = event.target.style.backgroundColor;
    ctx.strokeStyle = Color;
    ctx.fillStyle = Color;
}

function handleRangeChange(evnet){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event){
    console.log(event)
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(fiiling === true){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    } else {}
}
    

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    // toDataURL를 toDateURL로 오타처리해서 2시간 동안 고생함..
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;  
    link.download = "PaintJS[EXPORT]";
    console.log(link);
    link.click();
    
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

//이 부분을 잘 이해하는게 중요하다.
// Array, from, forEach에 대해서 알아보자.
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick));

// console.log(Array.from(colors))

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}