// Painting Canvas
const canvas = document.getElementById('paintCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
    let painting = false;

    function startPaint(e) {
        painting = true;
        draw(e);
    }

    function endPaint() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startPaint);
    canvas.addEventListener('mouseup', endPaint);
    canvas.addEventListener('mousemove', draw);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Writing Notes
function saveNote() {
    let text = document.getElementById('textEditor').value;
    localStorage.setItem("savedNote", text);
    alert("Note Saved!");
}
