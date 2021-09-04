class Mushroom {
    constructor(ctx, image,x, y, speed) {
        this.ctx = ctx;
        this.image = image;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = [100, 100];
        this.getPosition = this.getPosition.bind(this);
    }  

    move() {
        this.x -= this.speed;
        setInterval(() => {
            this.speed += 0.001
        },20000)
        if(this.x < -100) {
            this.x = 800
        } 
    }

    draw(ctx) {
        // this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(this.image, this.x, this.y, this.size[0], this.size[1]);
        this.move()
    }

    getPosition() {
        return [this.x, this.y];
    }
}

module.exports = Mushroom;