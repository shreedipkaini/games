class Background {
    constructor(ctx, image, posY, imageLength, speed) {
        this.image = image;
        this.speed = speed;
        this.x = 0;
        this.y = posY;
        this.imageLength = imageLength;
        this.ctx = ctx;
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);
        // this.image.width = 100
        // this.image.height = 100
        this.ctx.drawImage(this.image, this.x, this.y, 820, 600);
        this.ctx.drawImage(this.image, this.x + this.imageLength, this.y, 820, 600);
        this.ctx.drawImage(this.image, this.x + this.imageLength * 2, this.y, 820, 600);
        if (this.x <= -this.imageLength) {
            this.x = 0;
        }
        this.scrollImage();
    }

    scrollImage() {
        this.x -= this.speed;
    }

}

module.exports = Background;