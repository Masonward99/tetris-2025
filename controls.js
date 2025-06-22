import { Game } from "./game.js";



window.addEventListener('keydown', function (event) {
    // event listener to get user input
    event.preventDefault()

    if (game.hasEnded) return
    else if (!game.hasStarted) return
    else if (game.isPaused && event.key != 'Escape') return
    else if (game.isAnimating) return

    switch (event.key) {
        case 'Escape':
            game.pause()
            break
        case 'ArrowLeft':
            game.moveHorizontally(-1)
            break
        case 'ArrowRight':
            game.moveHorizontally(1)
            break
        case 'ArrowDown':
            event.preventDefault()
            game.moveVertically()
            break
        case 'ArrowUp':
            game.rotateRight()
            break
        case 'z':
            game.rotateLeft()
            break
        case ' ':
            event.preventDefault()
            game.hardDrop()
            break
        default:
            return;
    }
})

let game = new Game()


function pauseGame(){
    let text = null
    if(!game.isPaused){
        const container = document.querySelector('.game-canvas-container')
        container.classList.add('semi-transparent')
        text = document.createElement('p')
        text.innerText = 'Paused'
        text.classList.add('game-canvas-popup')
        container.appendChild(text)
    }
    game.pause(text)
}

const muteThemeButton = document.getElementById('mute-theme-button')
muteThemeButton.addEventListener('click',(e)=> game.muteTheme(e))