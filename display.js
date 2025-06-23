class Display {
    container 
    game
    constructor (game){
        this.container = document.querySelector('.game-canvas-container')
        this.game = game
    }

    displayStartScreen(){
        this.container.classList.add('semi-transparent')
        const div = document.createElement('div')
        const title = document.createElement('h2')
        title.innerText = 'Tetris'
        title.classList.add('tetris-logo')
        div.appendChild(title)
        const button = document.createElement('button')
        button.addEventListener('click', (e)=> this.game.start(e))
        button.innerText = 'Start Game'
        button.classList.add('popup-button')
        const levelSelect = document.createElement('button')
        levelSelect.classList.add('popup-button')
        levelSelect.innerText = 'Level: 1'
        levelSelect.addEventListener('click', ()=> this.game.changeLevel())
        const settings = document.createElement('button')
        settings.classList.add('popup-button')
        settings.innerText = 'Settings'
        settings.addEventListener('click',(e) => this.displaySettings(e))
        div.appendChild(button)
        div.appendChild(levelSelect)
        div.appendChild(settings)
        div.classList.add('game-canvas-popup')
        this.container.appendChild(div)
    }

    displaySettings (){
        if (!this.game.isPaused) this.container.children[1].remove()
        const div = document.createElement('div')
        div.classList.add('game-canvas-popup')
        if(this.game.isPaused) {
            const paused = document.createElement('h2')
            paused.innerText = 'Paused!'
            div.appendChild(paused)
        }
        //music volume slider
        const settingsElement = this.createSettingsElement()
        const title = document.createElement('h2')
        title.innerText = 'Settings'
        settingsElement.prepend(title)
        const back = document.createElement('button')
        back.classList.add('popup-button')
        back.innerText = 'Back'
        back.addEventListener('click',() =>this.exitSettings())
        settingsElement.appendChild(back)
        this.container.appendChild(settingsElement)
    }

    updateUi(level, score, clearedLines){
        const ui = document.querySelector('.ui-collumn')
        const levelElement = ui.children[1].querySelector('p')
        levelElement.innerText = level
        const scoreElement = ui.children[2].querySelector('p')
        scoreElement.innerText = score
        const clearedLinesElement = ui.children[3].querySelector('p')
        clearedLinesElement.innerText = clearedLines
    }
    
    async countdown (){
        const text = document.createElement('p')
        text.classList.add('game-canvas-popup')
        this.container.appendChild(text)
        for (let i = 3; i > 0; i--){
            text.innerText = i
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        text.remove()
        this.container.classList.remove('semi-transparent')
    }

    async addLineClearMessage(numLines, points){
        const div = document.createElement('div')
        div.classList.add('semi-transparent')
        div.classList.add('game-canvas-popup')
        const text1 = document.createElement('p')
        text1.innerText = 'You cleared ' + numLines + ' lines!!'
        div.appendChild(text1)
        const text2 = document.createElement('p')
        text2.innerText = 'Scoring ' + points + ' points'
        div.appendChild(text2)
        this.container.appendChild(div)
        await new Promise(resolve => setTimeout(resolve, 500))
        div.remove()
    }

    displayPauseScreen (){
        this.container.classList.add('semi-transparent')
        const pausedDiv = document.createElement('div')
        pausedDiv.classList.add('game-canvas-popup')
        const title = document.createElement('h2')
        title.innerText = 'Paused!'
        //Add settings menu
        pausedDiv.appendChild(this.createSettingsElement())
        this.container.appendChild(pausedDiv)
    }

    createSettingsElement (){
        const settingsElement = document.createElement('div')
        settingsElement.classList.add('game-canvas-popup')
        settingsElement.appendChild(this.createMusicVolumeSlider())
        settingsElement.appendChild(this.createEffectsVolumeSlider())
        return settingsElement
    }

    createMusicVolumeSlider (){
        const musicVolumeSlider = document.createElement('div')
        const musicVolumeSliderTitle = document.createElement('h3')
        musicVolumeSliderTitle.innerHTML = 'Music Volume'
        const musicDown = document.createElement('button')
        musicDown.innerText = '-'
        const musicLevel = document.createElement('p')
        musicLevel.id = 'music-level'
        musicLevel.innerText = this.game.soundEffects.getMusicVolume().toFixed(1)
        const musicUp = document.createElement('button')
        musicUp.innerText = '+'
        musicVolumeSlider.appendChild(musicVolumeSliderTitle)
        const buttonDiv  = document.createElement('div')
        buttonDiv.appendChild(musicDown)
        buttonDiv.appendChild(musicLevel)
        buttonDiv.appendChild(musicUp)
        musicVolumeSlider.appendChild(buttonDiv)
        musicUp.addEventListener('click', ()=> this.game.soundEffects.musicVolumeUp())
        musicDown.addEventListener('click',()=> this.game.soundEffects.musicVolumeDown())
        musicVolumeSlider.classList.add('volume-button')
        return musicVolumeSlider
    }

    createEffectsVolumeSlider(){
        const effectsVolumeSlider = document.createElement('div')
        const effectsVolumeSliderTitle = document.createElement('h3')
        effectsVolumeSliderTitle.innerHTML = 'Effects Volume'
        const effectsDown = document.createElement('button')
        effectsDown.innerText = '-'
        const effectsLevel = document.createElement('p')
        effectsLevel.id = 'effects-level'
        effectsLevel.innerText = this.game.soundEffects.getEffectsVolume().toFixed(1)
        const effectsUp = document.createElement('button')
        effectsUp.innerText = '+'
        effectsVolumeSlider.appendChild(effectsVolumeSliderTitle)
        const buttonDiv = document.createElement('div')
        buttonDiv.appendChild(effectsDown)
        buttonDiv.appendChild(effectsLevel)
        buttonDiv.appendChild(effectsUp)
        effectsVolumeSlider.appendChild(buttonDiv)
        effectsUp.addEventListener('click', ()=> this.game.soundEffects.effectsVolumeUp())
        effectsDown.addEventListener('click',()=> this.game.soundEffects.effectsVolumeDown())
        effectsVolumeSlider.classList.add('volume-button')
        return effectsVolumeSlider
    }

    exitSettings (){
        this.container.children[1].remove()
        this.displayStartScreen()
    }

    removePauseScreen (){
        this.container.children[1].remove()
    }
}

export {Display}

