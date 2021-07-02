class GameStorage {
	constructor() {
		if (localStorage.length < 2) {
			this.reset();
		}
	}

	getBestScore() {
		return parseInt(localStorage.bestScore);
	}

	getTotalTime() {
		return parseInt(localStorage.totalTime);
	}

	reset() {
		localStorage.bestScore = 0;
		localStorage.totalTime = 0;
	}

	updateBestScore(score) {
		if (this.getBestScore() < score) {
			localStorage.bestScore = score;
			return true;
		}
		return false;
	}

	updateTotalTime(time) {
		localStorage.totalTime = this.getTotalTime() + time;
	}
}
