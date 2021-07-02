class Text {
	constructor(canvasContext) {
		this.context = canvasContext;
		this.canvas = canvasContext.canvas;
	}

	draw(text, x, y, color, size, style) {
		// Draws a border.
		this.setTextStyle("#000", size, style);
		this.context.fillText(text, x - 2, y);
		this.context.fillText(text, x + 2, y);
		this.context.fillText(text, x, y - 2);
		this.context.fillText(text, x, y + 2);

		this.setTextStyle(color, size, style);
		this.context.fillText(text, x, y);
	}

	setTextStyle(color, size, font) {
		this.context.fillStyle = color;
		this.context.font = size + "px " + font;
	}
}
