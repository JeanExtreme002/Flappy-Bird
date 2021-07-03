class Screen {
	constructor(canvas, images) {
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.images = loadImages(images);
		this.updateCanvasSize();
		this.initializeEntitys();
		this.adjustEntityPositions();
	}

	initializeEntitys() {
		this.background = new Background(this.context, this.images.sky, this.images.floor);
		this.bird = new Bird(this.context, this.images.bird);
		this.scoreboard = new Scoreboard(this.context, this.images.scoreboard);
		this.text = new Text(this.context);
		this.title = new Title(this.context, this.images.title);
		this.tubes = new Tubes(this.context, this.images.tube, this.images.reversedTube);
	}

	adjustEntityPositions() {
		this.bird.setScreenBounds(0, this.background.floor);
		this.tubes.setScreenBounds(0, this.background.floor);

		this.bird.image.onload = () => {
			this.tubes.setVerticalSpacing(this.bird.image.height * 2.5);
		}
	}

	drawGameScreen(score) {
		this.drawGeneralEntitys();
		this.text.draw(score, 20, 60, "#fff", 50, "autumn");
	}

	drawGameOverScreen(score, bestScore, time, totalTime) {
		this.drawGeneralEntitys();
		this.title.draw();
		this.drawScoreboard(score, bestScore, time, totalTime);
	}

	drawPauseScreen(score) {
		this.drawGeneralEntitys();
		this.text.draw(score, 20, 60, "#fff", 50, "autumn");
		this.drawShadow();
		this.title.draw();
	}

	drawTitleScreen() {
		this.drawGeneralEntitys();
		this.title.draw();
	}

	drawGeneralEntitys() {
		clearCanvas(this.canvas, this.context);
		this.background.drawSky();
		this.tubes.draw();
		this.background.drawFloor();
		this.bird.draw();
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

	updateCanvasSize() {
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
	}
}
