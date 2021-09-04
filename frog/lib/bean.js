const heights = [250, 275, 300, 325, 350, 375, 400];

class Bean {
    constructor(canvas, ctx, speed, discardCb) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.speed = speed;
        this.x = canvas.width;
        this.y = heights[Math.floor(heights.length * Math.random())];
        this.getPosition = this.getPosition.bind(this)
        this.clean = this.clean.bind(this)
        this.discardCb = discardCb;
    }

    move() {
        this.x -= this.speed;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI, true);
        this.ctx.fillStyle = "yellow";
        this.ctx.strokeStyle = "yellow";
        this.ctx.fill();
        this.ctx.stroke();
        this.move();
        if (this.x < -10) {
            // bean passed the left edge
            this.discardCb();
        }
    }

    getPosition() {
        return [this.x, this.y];
    }

    clean() {
        this.ctx.clearRect(this.x, this.y, 10, 10);
    }
}

module.exports = Bean;