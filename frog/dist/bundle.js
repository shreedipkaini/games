/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

const showHowTo = () => {
    const ele = document.getElementById('info');
    ele.classList.remove('hidden');
}

const hideHowTo = () => {
    const ele = document.getElementById('info');
    ele.classList.add('hidden');
}

window.hideHowTo = hideHowTo;

document.addEventListener('DOMContentLoaded', () => {
    const gameCanvas = document.getElementById('game-canvas');
    const gameCanvasContext = gameCanvas.getContext('2d');

    const backgroundCanvas = document.getElementById('background-canvas');
    const backgroundCanvasContext = backgroundCanvas.getContext('2d');

    const openHowTo = document.getElementById('how-to');
    openHowTo.addEventListener('click', showHowTo);

    const closeHowTo = document.getElementById('close-how-to');
    closeHowTo.addEventListener('click', hideHowTo);

    // const foregroundCanvas = document.getElementById('foreground-canvas');
    // const foregroundCanvasContext = foregroundCanvas.getContext('2d');

    const game = new Game(
        gameCanvasContext,
        gameCanvas,
        backgroundCanvasContext,
        "stop",
        hideHowTo
        )
    
    game.draw();
    window.addEventListener('keydown', game.jump);

    const buttonReStart = document.getElementById("cover-die-button")
    const cover = document.getElementById("cover-die")
    const score = document.getElementById("score")
    function reStartGame() {
        hideHowTo();
        cover.style.display = "none";
        score.innerText = "0"
        const game = new Game(
            gameCanvasContext,
            gameCanvas,
            backgroundCanvasContext,
            "start",
            hideHowTo
        )
        game.draw();
        window.addEventListener('keydown', game.jump);
    }

    buttonReStart.addEventListener("click", reStartGame)
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(2);
const Bean = __webpack_require__(3)
const Mushroom = __webpack_require__(4);
const Player = __webpack_require__(5);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

const heights = [250, 325, 400];

class Bean {
    constructor(canvas, ctx, speed, discardCb) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.speed = speed;
        this.x = canvas.width;
        this.y = heights[Math.floor(3 * Math.random())];
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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

/***/ }),
/* 5 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map