class Text {
    constructor(canvasContext) {
        this.context = canvasContext;
        this.canvas = canvasContext.canvas;
    }

    draw(text, x, y, color, size, style, align = "start", border = 2, borderColor = "black") {
        this.context.fillStyle = color;
        this.context.font = size + "px " + style;
        this.context.textAlign = align;
        this.context.lineWidth = border;
        this.context.strokeStyle = borderColor;

        this.context.fillText(text, x, y);
        this.context.strokeText(text, x, y);
    }
}
