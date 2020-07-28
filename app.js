const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraseBtn = document.getElementById("jsErase");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.55;


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
    ctx.moveTo(x,y);
    ctx.beginPath();
  }else{
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  }else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function fillCanvas(){
  if(filling){
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContext(event){
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "mypainting";
  link.click();
}

function handleEraseClick(){
  const tmp = ctx.fillStyle;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = tmp;
}


if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", fillCanvas);
  canvas.addEventListener("contextmenu", handleContext);
}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}

if(eraseBtn){
  eraseBtn.addEventListener("click", handleEraseClick);
}