class Title {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
	}

	draw() {
		this.context.drawImage(this.image, this.canvas.width / 2 - this.image.width / 2, 50);
	}
}
