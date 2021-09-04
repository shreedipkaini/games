const Game = require('./game.js');

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