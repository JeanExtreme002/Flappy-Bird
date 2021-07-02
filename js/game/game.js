class FlappyBird {
	constructor() {
		this.isRunning = false;
		this.isGameOver = false;
		this.isPaused = false;
		this.resetMatchInfo();
	}

	build(canvasElement) {
		this.storage = new GameStorage();
		this.initializeGameSounds();
		this.initializeGameScreen(canvasElement);
	}

	drawGameScreen() {
		if (!this.isRunning && !this.isGameOver) {
			this.screen.drawTitleScreen();
		}
		else if(this.isRunning && this.isPaused) {
			this.screen.drawPauseScreen(this.score);
		}
		else if (this.isRunning) {
			this.screen.drawGameScreen(this.score);
		}
		else {
			this.screen.drawGameOverScreen(this.score, this.storage.getBestScore(), this.time, this.storage.getTotalTime());
		}
	}

	increaseDifficulty() {
		this.velocity += 0.02;
		this.screen.tubes.spacingX -= 2;
	}

	initializeGameSounds() {
		this.audio = new AudioPlayer({
			"music": musicFilename,
			"impactOnGround": impactOnGroundSoundFilename,
			"impactOnTube": impactOnTubeSoundFilename,
			"newRecord": newRecordSoundFilename
		});
	}

	initializeGameScreen(canvas) {
		this.screen = new Screen(canvas);
		this.screen.setBackground(backgroundImageFilename);
		this.screen.setBird(birdImageFilename);
		this.screen.setTubes(tubeImageFilename, rtubeImageFilename);
		this.screen.setScoreboard(scoreboardImageFilename);
		this.screen.setTitle(titleImageFilename);
	}

	pullBirdUp() {
		this.screen.bird.move(true)
	}

	resetDifficulty() {
		this.screen.tubes.spacingX = 500;
		this.velocity = 2;
	}

	resetEntitys() {
		this.screen.background.reset();
		this.screen.bird.reset();
		this.screen.tubes.reset();
	}

	resetMatchInfo() {
		this.score = 0;
		this.time = 0;
		this.newRecord = false;
		this.startingTime = new Date();
	}

	setGameOver() {
		this.isRunning = false;
		this.isGameOver = true;
		this.time = new Date().getTime() - this.startingTime.getTime();
		this.storage.updateTotalTime(this.time);
	}

	startGame() {
		this.resetDifficulty();
		this.resetEntitys();
		this.resetMatchInfo();
		this.isRunning = true;
		this.audio.play("music", true, true);
	}

	setPause(value = undefined) {
		this.isPaused = value == undefined ? !this.isPaused : value;

		if (this.isPaused) {
			this.audio.pause("music");
		}
		else {
			this.audio.play("music", true, true);
		}
	}

	update() {
		if (this.isRunning && !this.isPaused) {
			this.updateEntitys();

			const birdBbox = this.screen.bird.getBbox();

			if (this.screen.bird.hasCollidedWithCanvas()) {
				this.audio.play("impactOnGround", true, false);
				this.setGameOver();
			}

			if (this.screen.tubes.hasCollided(birdBbox)) {
				this.audio.play("impactOnTube", true, false);
				this.setGameOver();
			}

			if (this.screen.tubes.hasPassedOver(birdBbox[0])) {
				this.increaseDifficulty();
				this.updateBestScore(++this.score);
			}
		}
		this.drawGameScreen();
	}

	updateEntitys() {
		this.screen.bird.move();
		this.screen.background.move(this.velocity);
		this.screen.tubes.move(this.velocity);
	}

	updateBestScore(score) {
		const isNewRecord = this.storage.updateBestScore(score);

		if (!this.newRecord && isNewRecord) {
			this.audio.play("newRecord", false, false);
			this.newRecord = true;
		}
	}
}
