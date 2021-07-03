class Tubes {
	constructor(canvasContext, tubeImage, reversedTubeImage) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.setImages(tubeImage, reversedTubeImage);
		this.setScreenBounds(0, canvas.height);
		this.setSpacing(200, 100);
		this.reset();
	}

	createNewTubes() {
		const tubeDown = new Tube(this.context, this.tubeImage);
		tubeDown.setRandomPositionY(this.screenCeil + this.spacingY + 30, this.screenFloor - 30);

		const tubeUp = new Tube(this.context, this.reversedTubeImage);
		tubeUp.y = tubeDown.y - this.reversedTubeImage.height - this.spacingY;

		this.tubes.push(tubeDown);
		this.tubes.push(tubeUp);
	}

	draw() {
		this.tubes.forEach((tube) => tube.draw());
	}

	hasCollided(bbox) {
		return this.tubes.filter((tube) => tube.hasCollided(bbox)).length != 0;
	}

	hasTubes() {
		return this.tubes.length != 0;
	}

	hasPassedOver(x) {
		return this.tubes.filter((tube) => tube.hasPassedOver(x)).length != 0;
	}

	move(pixels = 1) {
		this.tubes.forEach((tube) => tube.move(pixels));
		this.removeInvisibleTubes();

		const lastTube = this.tubes[this.tubes.length - 1];

		if (!this.hasTubes() || (lastTube.x + lastTube.image.width) <= (this.canvas.width - this.spacingX)) {
			this.createNewTubes();
		}
	}

	removeInvisibleTubes() {
		this.tubes = this.tubes.filter((tube) => (tube.x + tube.image.width) > 0);
	}

	reset() {
		this.tubes = [];
	}

	setImages(tubeImage, reversedTubeImage) {
		this.tubeImage = tubeImage;
		this.reversedTubeImage = reversedTubeImage;
	}

	setScreenBounds(ceil, floor) {
		this.screenCeil = ceil;
		this.screenFloor = floor;
	}

	setSpacing(spacingX, spacingY) {
		this.setHorizontalSpacing(spacingX);
		this.setVerticalSpacing(spacingY);
	}

	setHorizontalSpacing(spacingX) {
		this.spacingX = spacingX;
	}

	setVerticalSpacing(spacingY) {
		this.spacingY = spacingY;
	}
}
