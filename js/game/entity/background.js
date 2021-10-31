class Background {
    constructor(canvasContext, skyImage, floorImage) {
        this.context = canvasContext;
        this.canvas = canvasContext.canvas;
        this.setImages(skyImage, floorImage);
        this.setFloorHeight(0.10);
        this.reset();
    }

    move(pixels = 1) {
        this.positions[0] -= pixels;
        this.positions[1] -= pixels;

        this.positions[0] += (this.positions[0] + this.canvas.width) < 0 ? this.canvas.width * 2 : 0;
        this.positions[1] += (this.positions[1] + this.canvas.width) < 0 ? this.canvas.width * 2 : 0;
    }

    draw() {
        this.drawSky();
        this.drawFloor();
    }

    drawSky() {
        this.context.drawImage(this.skyImage, this.positions[0], 0, this.canvas.width, this.floor);
        this.context.drawImage(this.skyImage, this.positions[1], 0, this.canvas.width, this.floor);
    }

    drawFloor() {
        this.context.drawImage(this.floorImage, this.positions[0], this.floor, this.canvas.width, this.floorHeight);
        this.context.drawImage(this.floorImage, this.positions[1], this.floor, this.canvas.width, this.floorHeight);
    }

    reset() {
        this.positions = [0, this.canvas.width];
    }

    setFloorHeight(porcent) {
        this.floorHeight = canvas.height * porcent;
        this.floor = canvas.height - this.floorHeight;
    }

    setImages(skyImage, floorImage) {
        this.skyImage = skyImage;
        this.floorImage = floorImage;
    }
}
