class FlappyBird {
	constructor() {
		this.isRunning = false;
		this.isGameOver = false;
		this.isPaused = false;
		this.resetGameData();
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
		else if (this.isRunning && !this.isGameOver) {
			this.screen.drawGameScreen(this.score);
		}
		else {
			this.screen.drawGameOverScreen(this.score, this.storage.getBestScore(), this.time, this.storage.getTotalTime());
		}
	}

	initializeGameSounds() {
		this.audio = new AudioPlayer({
			music: musicFilename,
			impactOnGround: impactOnGroundSoundFilename,
			impactOnTube: impactOnTubeSoundFilename,
			newRecord: newRecordSoundFilename
		});
	}

	initializeGameScreen(canvas) {
		this.screen = new Screen(canvas, {
			bird: birdImageFilename,
			floor: floorImageFilename,
			sky: skyImageFilename,
			scoreboard: scoreboardImageFilename,
			title: titleImageFilename,
			tube: tubeImageFilename,
			reversedTube: reversedTubeImageFilename,
		});
	}

	pullBirdUp() {
		this.screen.bird.move(true);
	}

	resetEntities() {
		this.screen.background.reset();
		this.screen.bird.reset();
		this.screen.tubes.reset();
	}

	resetGameData() {
		this.score = 0;
		this.time = 0;
		this.newRecord = false;
		this.startingTime = new Date();
	}

	setDifficultyByScore(score) {
		const spacing = 400 - 2 * score;
		const velocity = 2 + 0.005 * score;

		this.screen.tubes.setHorizontalSpacing(spacing >= 250 ? spacing : 250);
		this.velocity = velocity <= 3 ? velocity : 3;
	}

	setGameOver() {
		this.isRunning = false;
		this.isGameOver = true;
		this.time = new Date().getTime() - this.startingTime.getTime();
		this.storage.updateTotalTime(this.time);
	}

	startGame() {
		this.resetEntities();
		this.resetGameData();
		this.setDifficultyByScore(0);
		this.isRunning = true;
		this.isGameOver = false;
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
		if (this.isRunning && !this.isPaused && !this.isGameOver) {
			this.updateEntities();

			const birdBbox = this.screen.bird.getBbox();

			if (this.screen.bird.hasCollidedWithScreenBounds()) {
				this.audio.play("impactOnGround", true, false);
				this.setGameOver();
			}

			if (this.screen.tubes.hasCollided(birdBbox)) {
				this.audio.play("impactOnTube", true, false);
				this.setGameOver();
			}

			if (this.screen.tubes.hasPassedOver(birdBbox[0])) {
				this.updateBestScore(++this.score);
				this.setDifficultyByScore(this.score);
			}
		}
		this.drawGameScreen();
	}

	updateEntities() {
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
