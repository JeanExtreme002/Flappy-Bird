class Tubes {
	constructor(canvasContext, images) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.images = images;
		this.spacingX = 200;
		this.spacingY = 100;
		this.reset();
	}

	create() {
		const tubeDown = new Tube(this.context, this.images[0]);
		tubeDown.setRandomPositionY(this.spacingY + 50, this.canvas.height - 50);

		const tubeUp = new Tube(this.context, this.images[1]);
		tubeUp.y = tubeDown.y - this.images[0].height - this.spacingY;
		this.tubes.push(tubeDown);
		this.tubes.push(tubeUp);
	}

	draw() {
		this.tubes.forEach((tube) => tube.draw());
	}

	hasCollided(bbox) {
		const tubes = this.tubes.filter((tube) => tube.hasCollided(bbox));
		return tubes.length != 0 ? true : false;
	}

	hasPassedOver(x) {
		const tubes = this.tubes.filter((tube) => {
			const hasPassedOver = tube.hasPassedOver(x);

			if (hasPassedOver) {
				tube.passedOver = true;
			}
			return hasPassedOver;
		});
		return tubes.length != 0 ? true : false;
	}

	isVisible(tube) {
		return (tube.x + tube.image.width) > 0;
	}

	move(pixels = 1) {
		this.tubes.forEach((tube) => tube.move(pixels));

		const lastTube = this.tubes[this.tubes.length - 1];

		if (this.tubes.length == 0 || (lastTube.x + this.images[0].width) <= (this.canvas.width - this.spacingX)) {
			this.create();
		}
		this.removeInvisibleTubes();
	}

	removeInvisibleTubes() {
		this.tubes = this.tubes.filter(this.isVisible);
	}

	reset() {
		this.tubes = [];
	}
}
