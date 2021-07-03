class Bird {
	constructor(canvasContext, image) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
		this.image = image;
		this.setAcceleration(0.15, 3);
		this.setScreenBounds(0, canvas.height);
		this.reset();
	}

	draw() {
		this.context.drawImage(this.image, this.getPositionX(), this.y);
	}

	hasCollidedWithScreenBounds() {
		return this.y == this.screenCeil || (this.y + this.image.height) >= this.screenFloor;
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

		if (this.y <= this.screenCeil) {
			this.y = this.screenCeil;
			this.velocityY = 0;
		}

		if ((this.y + this.image.height) >= this.screenFloor) {
			this.y = this.screenFloor - this.image.height;
		}
	}

	reset() {
		this.y = this.canvas.height / 2;
		this.velocityY = 0;
	}

	setAcceleration(gravity, accelerationUp) {
		this.gravity = Math.abs(gravity);
		this.accelerationUp = Math.abs(accelerationUp) * -1;
	}

	setScreenBounds(ceil, floor) {
		this.screenCeil = ceil;
		this.screenFloor = floor;
	}
}
