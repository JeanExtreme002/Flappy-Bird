class Scoreboard {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
		this.image.onload = () => this.reset();
	}

	draw(score, bestScore, time, totalTime) {
		this.context.drawImage(this.image, this.x, this.y);

		this.setTextStyle("#fff", 18, "cursive");
		this.context.fillText("Score: " + score, this.x + 15, this.y + this.image.height - 70);
		this.context.fillText("Time: " + time, this.x + 170, this.y + this.image.height - 70);
		this.context.fillText("Best Score: " + bestScore, this.x + 15, this.y + this.image.height - 40);
		this.context.fillText("Total Time: " + totalTime, this.x + 170, this.y + this.image.height - 40);
	}

	reset() {
		this.x = this.canvas.width / 2 - this.image.width / 2;
		this.y = this.canvas.height / 2 - this.image.height / 2;
	}

	setTextStyle(color, size, font) {
		this.context.fillStyle = color;
		this.context.font = size + "px " + font;
	}
}
