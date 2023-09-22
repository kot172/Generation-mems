// Функция для добавления текста
function addText() {
    let text = document.getElementById("textInput").value;
    let size = document.getElementById("textSize").value;
    let color = document.getElementById("textColor").value;

    let position = { x: canvas.width / 2, y: canvas.height / 2 };

    textInputs.push({ text, size, color, position });

    drawMeme();
}

// Функция для изменения размера текста
function changeTextSize() {
    if (selectedText) {
        selectedText.size = document.getElementById("textSize").value;
        drawMeme();
    }
}

// Функция для изменения цвета текста
function changeTextColor() {
    if (selectedText) {
        selectedText.color = document.getElementById("textColor").value;
        drawMeme();
    }
}

// Функция для удаления текста
function deleteText() {
    if (selectedText) {
        let index = textInputs.indexOf(selectedText);
        if (index !== -1) {
            textInputs.splice(index, 1);
            selectedText = null;
            drawMeme();
        }
    }
}

// Массив для хранения введенных текстов
let textInputs = [];
// Выбранный текст
let selectedText = null;

// Функция для получения позиции курсора мыши на canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

// Функция для проверки, находится ли курсор внутри текста
function isCursorInText(position, event, text) {
    let textWidth = ctx.measureText(text).width;
    return (
        event.x > position.x - textWidth / 2 &&
        event.x < position.x + textWidth / 2 &&
        event.y > position.y - 30 &&
        event.y < position.y
    );
}
