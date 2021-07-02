class AudioPlayer {
	constructor(playList) {
		this.playList = {};
		this.playing = [];
		this.addPlayList(playList);
	}

	addPlayList(playList) {
		const names = Object.getOwnPropertyNames(playList);

		for (let index = 0; index < names.length; index++) {
			const name = names[index];
			this.playList[name] = this.getAudioFrom(playList[name]);
		}
	}

	getAudioFrom(source) {
		return new Audio(source);
	}

	pause(name) {
		this.playList[name].pause();
		this.playing.splice(this.playing.indexOf(name), 1);
	}

	play(name, stopSounds, loop = false) {
		this.playList[name].play();
		this.playList[name].loop = loop;

		if (stopSounds) {
			this.stopAll();
		}

		if (this.playing.indexOf(name) == -1) {
			this.playing.push(name);
		}
	}

	stop(name) {
		this.playList[name].pause();
		this.playList[name].currentTime = 0;
		this.playing.splice(this.playing.indexOf(name), 1);
	}

	stopAll() {
		for (let index = 0; index < this.playing.length; index++) {
			this.stop(this.playing[index]);
		}
		this.playing = [];
	}
}
