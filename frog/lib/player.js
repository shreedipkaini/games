class Player {
    constructor(ctx, image, posY,speed) {
        this.ctx = ctx;
        this.image = image;
        this.speed = speed;
        this.isJump = true
        this.x = 100;
        this.y = posY;
        this.jumping = false;
        this.size = [100,100];
        this.jumpImage = this.jumpImage.bind(this);
        this.jumping = false;
        this.selfJumpImg = this.selfJumpImg.bind(this);
        this.sefJumping = false;
        this.getPosition = this.getPosition.bind(this);
    }

    draw() {
        this.ctx.clearRect(0, 0, 800, 600);
        this.ctx.drawImage(this.image, this.x, this.y, this.size[0], this.size[1]);
    }

    selfJump() {
        this.jumping = true;
        this.jumpImage()
    }

    selfJumpImg() {
        const gravity = 0.80;
        const initialSpeed = 42;
        if (this.y > 600 && this.jumping) {
            this.y -= initialSpeed - gravity;
            requestAnimationFrame(this.selfJumpImg)
        } else {
            this.jumping = false
            if (this.y >= 440) {
                return
            } else {
                this.y += this.speed;
                requestAnimationFrame(this.selfJumpImg)
            }
        }
    }

    performJump() {
        this.jumping = true;
        this.jumpImage()
    }

    jumpImage() {
        const gravity = 0.40;
        const initialSpeed = 12;
        if (this.y > 200 && this.jumping) {
            this.y -= initialSpeed - gravity ;
            requestAnimationFrame(this.jumpImage)
        } else {
            this.jumping = false
            if (this.y >= 440) {
                return
            } else {
                this.y += this.speed;
                requestAnimationFrame(this.jumpImage)
            }
        }
    }

    getPosition() {
        return [this.x, this.y];
    }
}

module.exports = Player;