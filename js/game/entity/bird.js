class Bird {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
		this.reset();
		this.setAcceleration(0.15, 3);
	}

	draw() {
		this.context.drawImage(this.image, this.getPositionX(), this.y);
	}

	hasCollidedWithCanvas() {
		return this.y == 0 || this.y >= (this.canvas.height - this.image.height);
	}

	getBbox() {
		return [this.getPositionX(), this.y, this.getPositionX() + this.image.width, this.y + this.image.height];
	}

	getPositionX() {
		return (this.canvas.width / 2) - (this.image.width / 2);
	}

	isGoingDown() {
		return this.velocityY > 0;
	}

	move(flyUp = false) {
		if (flyUp && this.isGoingDown()) {
			this.velocityY = 0;
		}

		this.velocityY += this.gravity + (flyUp ? this.accelerationUp : 0);
		this.y += this.velocityY;

		if (this.y <= 0) {
			this.velocityY = 0;
			this.y = 0;
		}

		if (this.y >= (this.canvas.height - this.image.height)) {
			this.y = (this.canvas.height - this.image.height);
		}
	}

	reset() {
		this.velocityY = 0;
		this.y = this.canvas.height / 2;
	}

	setAcceleration(gravity, accelerationUp) {
		this.gravity = Math.abs(gravity);
		this.accelerationUp = Math.abs(accelerationUp) * -1;
	}
}
