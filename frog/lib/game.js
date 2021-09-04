const Background = require('./background.js');
const Bean = require('./bean')
const Mushroom = require('./mushroom');
const Player = require('./player');

class Game {
    constructor(ctx, gameCanvas, backgroundCtx, action, closeCb) {
        this.backgroundCtx = backgroundCtx;
        this.called = false;
        this.ctx = ctx;
        this.gameCanvas = gameCanvas;
        this.start = action;
        this.bounceMp3 = document.getElementById('bounce-mp3');
        this.impactMp3 = document.getElementById('impact-mp3');
        this.coinMp3 = document.getElementById('coin-mp3');
        this.collisionWithBean = this.collisionWithBean.bind(this);
        this.createBean = this.createBean.bind(this);
        this.discardBean = this.discardBean.bind(this);
        this.draw = this.draw.bind(this);
        this.jump = this.jump.bind(this);
        this.closeCb = closeCb;
        this.createBackground(backgroundCtx);
        this.createBean(gameCanvas,ctx);
        this.createMushroom(ctx);
        this.createPlayer(ctx);
    }

    jump(event) {
        if (event.code === "Space" ) {
            event.preventDefault();
            if (!this.called) {
                this.closeCb();
                const m = document.getElementById("menu")
                if (m.dataset.check === "off") {
                    if (this.start !== "die") {
                        this.player.performJump();
                        this.start = "start";
                        this.called = true;
                        let that = this;
                        this.bounceMp3.play();
                        setTimeout(() => {
                            that.called = false;
                         },350);
                    }
                } 
            } 
        }
    }

    createBackground() {
        const backgroundImage = new Image();
        backgroundImage.src = './assets/images/background.png';
        this.background = new Background(this.backgroundCtx, backgroundImage, 0, 750, 0.8);
        this.preBackground = new Background(this.backgroundCtx, backgroundImage, 0, 750, 0);
    }

    createPlayer() {
        const frogImage = new Image();
        frogImage.src = './assets/images/frog.png';
        this.player = new Player(this.ctx, frogImage, 440,5);
    }

    createMushroom() {
       const mushroomImage = new Image();
       mushroomImage.src = './assets/images/mushroom.png';
       this.mushroom1 = new Mushroom(this.ctx, mushroomImage, 800, 440, 4);
       this.mushroom2 = new Mushroom(this.ctx, mushroomImage, 1200, 440, 4);
    }

    createBean() {
        this.bean = new Bean(this.gameCanvas, this.ctx, 5, this.discardBean);
    }

    discardBean() {
        this.bean.clean();
        this.createBean();
    }

    draw() {
        requestAnimationFrame(this.draw);
        const score = document.getElementById("score");
        const info = document.getElementById("menu-info");
        if(this.start === "stop") {
            this.preBackground.draw() ;
            this.player.draw();
            info.style.display = "flex";
        } else if (this.start === "start") {
            info.style.display = "none";
            this.background.draw();
            this.player.draw();
            this.mushroom1.draw();
            this.mushroom2.draw();
            this.bean.draw();

            // player position
            const player = this.player.getPosition();
            // mushroom positions
            const mushrooms = [
                this.mushroom1.getPosition(),
                this.mushroom2.getPosition(),
            ];

            if(this.collisionWithBean(player)) {
                this.coinMp3.play();
                score.innerText = parseInt(score.innerText) + 100;
                this.discardBean();
            }
           
            const [playerX, playerY] = player;

            // .some on [mushrooms], was there collision?
            if (mushrooms.some(mushroom => {
                let spacing = 80;
                let tolerance = 50;
                const [mushX, mushY] = mushroom;

               if (mushX > playerX + spacing || playerX - mushX >= spacing) {
                   // collision not possible
                   return false;
               } else {
                   const xDifference = Math.abs(mushX - playerX);
                   const yDifference = Math.abs(mushY - playerY);

                   if (mushX - playerX < spacing) {
                       return Math.sqrt((xDifference * xDifference) + (yDifference * yDifference)) < spacing;
                   } else {
                       return Math.sqrt((xDifference * xDifference) + (yDifference * yDifference)) < spacing / 3;
                   }
               }
            })) {
                // stop
                this.stopPlaying();
            } 
        } else if (this.start === "die") {
            return;
        }
    }

    collisionWithBean([playerX, playerY]) {
        let playerSize = 100;
        let beanSize = 10;
        let [beanX, beanY] = this.bean.getPosition();

        playerX += playerSize / 2;
        playerY += playerSize / 2;
        beanX += beanSize / 2;
        beanY += beanSize / 2;

        return Math.abs(playerX - beanX) + Math.abs(playerY - beanY) < (playerSize + beanSize) / 1.75;
    }

    stopPlaying() {
        this.impactMp3.play();
        this.start = "die";
        const cover = document.getElementById("cover-die");
        cover.style.display = "flex";
    }
}

module.exports = Game;
