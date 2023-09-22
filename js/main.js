// Получаем элементы canvas и контекст для рисования
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Создаем новый объект изображения
let img = new Image();

// Обработчик события выбора изображения
document
    .getElementById("imageLoader")
    .addEventListener("change", handleImage, false);

// Функция для сохранения картинки
function saveImage() {
    // Создаем ссылку для скачивания
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "meme.png";
    // Добавляем ссылку на страницу и эмулируем клик
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Обработчик события клика на canvas
canvas.addEventListener("click", function (e) {
    let mousePos = getMousePos(canvas, e);
    selectedText = null;

    for (let i = textInputs.length - 1; i >= 0; i--) {
        let textInput = textInputs[i];
        if (isCursorInText(textInput.position, mousePos, textInput.text)) {
            selectedText = textInput;
            break;
        }
    }

    if (selectedText) {
        document.getElementById("textInput").value = selectedText.text;
        document.getElementById("textSize").value = selectedText.size;
        document.getElementById("textColor").value = selectedText.color;
    }
});

// Флаг для отслеживания состояния перетаскивания
let isDragging = false;
// Смещение курсора относительно позиции текста
let dragOffset = { x: 0, y: 0 };

// Обработчик события нажатия кнопки мыши на canvas
canvas.addEventListener("mousedown", function (e) {
    let mousePos = getMousePos(canvas, e);
    selectedText = null;

    for (let i = textInputs.length - 1; i >= 0; i--) {
        let textInput = textInputs[i];
        if (isCursorInText(textInput.position, mousePos, textInput.text)) {
            selectedText = textInput;
            dragOffset.x = mousePos.x - selectedText.position.x;
            dragOffset.y = mousePos.y - selectedText.position.y;
            isDragging = true;
            break;
        }
    }

    if (selectedText) {
        document.getElementById("textInput").value = selectedText.text;
        document.getElementById("textSize").value = selectedText.size;
        document.getElementById("textColor").value = selectedText.color;
    }
});

// Обработчик события перемещения мыши на canvas
canvas.addEventListener("mousemove", function (e) {
    if (isDragging && selectedText) {
        let mousePos = getMousePos(canvas, e);
        selectedText.position.x = mousePos.x - dragOffset.x;
        selectedText.position.y = mousePos.y - dragOffset.y;
        drawMeme();
    }
});

// Обработчик события отпускания кнопки мыши на canvas
canvas.addEventListener("mouseup", function (e) {
    isDragging = false;
});

// Обработчики событий для кнопок и полей ввода
document.getElementById("addTextButton").addEventListener("click", addText);
document
    .getElementById("deleteTextButton")
    .addEventListener("click", deleteText);
document.getElementById("textSize").addEventListener("input", changeTextSize);
document.getElementById("textColor").addEventListener("input", changeTextColor);
document.getElementById("saveButton").addEventListener("click", saveImage);
