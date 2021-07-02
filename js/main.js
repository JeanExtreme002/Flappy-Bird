const game = new FlappyBird();
let running = false;

function main() {
	game.build(document.getElementById("canvas"));
	setTitleScreenEvents();
	updateGame();
}

function updateGame() {
	if (running && !game.isRunning) {
		setTitleScreenEvents();
		running = false;
	}
	else if(!running && game.isRunning) {
		setGameEvents();
		running = true;
	}
	game.update();
	requestAnimationFrame(updateGame);
}
