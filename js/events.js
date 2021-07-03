const birdEventKeys = ["arrowup", "space"];
const pauseEventKeys = ["escape", "keyp"];
const titleScreenEventKeys = birdEventKeys;

function controlGameByKeyboard(event) {
	if (birdEventKeys.indexOf(event.code.toLowerCase()) != -1 && !game.isPaused) {
		game.pullBirdUp();
	}
	else if (pauseEventKeys.indexOf(event.code.toLowerCase()) != -1) {
		game.setPause();
	}
}

function controlGameByMouse(event) {
	if (event.type == "mousedown" && !game.isPaused) {
		game.pullBirdUp();
	}
}

function startGameByKeyBoard(event) {
	if (titleScreenEventKeys.indexOf(event.code.toLowerCase()) != -1) {
		game.startGame();
	}
}

function startGameByMouse(event) {
	if (event.type == "mousedown") {
		game.startGame();
	}
}

function clearEvents() {
	document.onkeydown = null;
	document.onmousedown = null;
}

function setGameEvents() {
	document.onkeydown = controlGameByKeyboard;
	document.onmousedown = controlGameByMouse;
}

function setTitleScreenEvents() {
	document.onkeydown = startGameByKeyBoard;
	document.onmousedown = startGameByMouse;
}
