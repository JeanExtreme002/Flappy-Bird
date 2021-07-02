class Screen {
	constructor(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.updateCanvasSize();
		this.setText();
	}

	drawGameScreen(score) {
		this.drawBackground();
		this.tubes.draw();
		this.bird.draw();
		this.text.draw(score, 20, 60, "#fff", 50, "autumn");
	}

	drawGameOverScreen(score, bestScore, time, totalTime) {
		this.drawBackground();
		this.tubes.draw();
		this.bird.draw();
		this.title.draw();
		this.drawScoreboard(score, bestScore, time, totalTime);
	}

	drawPauseScreen(score) {
		this.drawBackground();
		this.tubes.draw();
		this.bird.draw();
		this.text.draw(score, 20, 60, "#fff", 50, "autumn");
		this.drawShadow();
		this.title.draw();
	}

	drawTitleScreen() {
		this.drawBackground();
		this.bird.draw();
		this.title.draw();
	}

	drawBackground() {
		clearCanvas(this.canvas, this.context);
		this.background.draw();
	}

	drawScoreboard(score, bestScore, time, totalTime) {
		time = getFormattedTime(time);
		totalTime = getFormattedTime(totalTime);
		this.scoreboard.draw(score, bestScore, time, totalTime);
	}

	drawShadow() {
		this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	setBackground(imageFilename) {
		this.background = new Background(this.context, getImageFrom(imageFilename));
	}

	setBird(imageFilename) {
		this.bird = new Bird(this.context, getImageFrom(imageFilename));
	}

	setText() {
		this.text = new Text(this.context);
	}

	setScoreboard(imageFilename) {
		this.scoreboard = new Scoreboard(this.context, getImageFrom(imageFilename));
	}

	setTubes(imageFilename, rImageFilename) {
		this.tubes = new Tubes(this.context, [getImageFrom(imageFilename), getImageFrom(rImageFilename)]);
	}

	setTitle(imageFilename) {
		this.title = new Title(this.context, getImageFrom(imageFilename));
	}

	updateCanvasSize() {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}
}
