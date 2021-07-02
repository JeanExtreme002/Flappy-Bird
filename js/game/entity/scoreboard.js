class Scoreboard {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
	}

	draw(score, bestScore, time, totalTime) {
		const x = this.canvas.width / 2 - this.image.width / 2;
		const y = this.canvas.height / 2 - this.image.height / 2;
		this.context.drawImage(this.image, x, y);

		this.setTextStyle("#fff", 18, "cursive");

		this.context.fillText("Score: " + score, x + 15, y + this.image.height - 70);
		this.context.fillText("Time: " + time, x + 170, y + this.image.height - 70);
		this.context.fillText("Best Score: " + bestScore, x + 15, y + this.image.height - 40);
		this.context.fillText("Total Time: " + totalTime, x + 170, y + this.image.height - 40);
	}

	setTextStyle(color, size, font) {
		this.context.fillStyle = color;
		this.context.font = size + "px " + font;
	}
}
