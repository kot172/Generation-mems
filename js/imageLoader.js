// Функция для обработки выбранного изображения
function handleImage(e) {
    // Создаем объект FileReader для чтения файла
    let reader = new FileReader();
    reader.onload = function (event) {
        // Устанавливаем обработчик события загрузки изображения
        img.onload = function () {
            // Устанавливаем размеры canvas равными размерам изображения
            canvas.width = img.width;
            canvas.height = img.height;

            // Очищаем canvas и рисуем изображение
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        // Устанавливаем источник изображения
        img.src = event.target.result;
    };
    // Читаем выбранный файл как URL-адрес
    reader.readAsDataURL(e.target.files[0]);
}

// Функция для отрисовки мема
function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    for (let i = 0; i < textInputs.length; i++) {
        let textInput = textInputs[i];
        ctx.font = textInput.size + "px sans-serif";
        ctx.fillStyle = textInput.color;
        ctx.textAlign = "center";
        ctx.fillText(textInput.text, textInput.position.x, textInput.position.y);
    }
}