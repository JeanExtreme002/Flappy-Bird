class Tube {
    constructor(canvasContext, image) {
        this.context = canvasContext;
        this.image = image;
        this.computed = false;
        this.reset();
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
    }

    hasCollided(bbox) {
        const tubeX2 = this.x + (this.image.width);
        const tubeY2 = this.y + (this.image.height);
        const hCollision = (this.x <= bbox[0] && bbox[0] <= tubeX2) || (this.x <= bbox[2] && bbox[2] <= tubeX2);
        const vCollision = (this.y <= bbox[1] && bbox[1] <= tubeY2) || (this.y <= bbox[3] && bbox[3] <= tubeY2);
        return hCollision && vCollision;
    }

    hasPassedOver(x) {
        const hasPassedOver = (this.x + (this.image.width)) < x && !this.computed;

        if (hasPassedOver) {
            this.computed = true;
        }
        return hasPassedOver;
    }

    move(pixels = 1) {
        this.x -= pixels;
    }

    reset() {
        this.x = this.context.canvas.width;
        this.y = 0;
    }

    setRandomPositionY(minY, maxY) {
        this.y = Math.floor(Math.random() * maxY);
        this.y = this.y <= minY ? minY : this.y;
    }
}
