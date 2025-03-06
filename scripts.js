// Select Canvas & Context
const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Set Canvas Size
canvas.width = window.innerWidth * 0.8;
canvas.height = 500;
canvas.style.border = "2px solid black";

let painting = false;
let paths = [];
let currentPath = [];

// Start Drawing
function startPaint(e) {
    painting = true;
    ctx.beginPath();
}

// Stop Drawing
function endPaint() {
    painting = false;
    paths.push([...currentPath]); // Save path for undo
    currentPath = [];
}

// Draw on Canvas
function draw(e) {
    if (!painting) return;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;
    
    ctx.lineWidth = document.getElementById("brushSize").value;
    ctx.lineCap = "round";
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    currentPath.push({ x, y, color: ctx.strokeStyle, width: ctx.lineWidth });
}

// Undo Function
function undoLast() {
    if (paths.length > 0) {
        paths.pop();
        redrawCanvas();
    }
}

// Redraw function
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach(path => {
        ctx.beginPath();
        path.forEach(point => {
            ctx.strokeStyle = point.color;
            ctx.lineWidth = point.width;
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
        });
    });
}

// Clear Canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths = [];
}

// Save Drawing
function downloadCanvas() {
    const link = document.createElement("a");
    link.download = "my_painting.png";
    link.href = canvas.toDataURL();
    link.click();
}

// Event Listeners
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mousemove", draw);
