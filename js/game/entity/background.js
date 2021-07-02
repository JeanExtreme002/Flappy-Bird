class Background {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
		this.reset();
	}

	move(pixels = 1) {
		this.positions[0][0] -= pixels;
		this.positions[1][0] -= pixels;

		this.positions[0][0] += (this.positions[0][0] + this.canvas.width) < 0 ? this.canvas.width * 2 : 0;
		this.positions[1][0] += (this.positions[1][0] + this.canvas.width) < 0 ? this.canvas.width * 2 : 0;
	}

	draw() {
		const width = this.canvas.width;
		const height = this.canvas.height;
		this.context.drawImage(this.image, this.positions[0][0], this.positions[0][1], width, height);
		this.context.drawImage(this.image, this.positions[1][0], this.positions[1][1], width, height);
	}

	reset() {
		this.positions = [[0, 0], [this.canvas.width, 0]];
	}
}
