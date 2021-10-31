function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function getFormattedTime(ms) {
    return new Date(1000 * 60 * 60 * 3 + parseInt(ms)).toLocaleTimeString();
}

function getImageFrom(source) {
    const image = new Image();
    image.src = source;
    return image;
}

function loadImages(images) {
    const names = Object.getOwnPropertyNames(images);
    const loadedImages = {};

    for (let index = 0; index < names.length; index++) {
        const name = names[index];
        loadedImages[name] = getImageFrom(images[name]);
    }
    return loadedImages;
}
