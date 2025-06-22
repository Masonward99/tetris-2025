class SoundEffects {
    drop
    lineClear
    theme
    isThemeMuted

    constructor (){
        this.lineClear = new Audio('./resources/success.wav')
        this.theme = new Audio('./resources/tetris-theme.mp3')
    }

    muteTheme (){
        this.theme.volume = this.isThemeMuted? 1 : 0
        this.isThemeMuted = !this.isThemeMuted
    }

    playLineClear(){
        this.lineClear.play()
    }
    playTheme(){
        this.theme.loop = true
        this.theme.play()
    }

    musicVolumeDown (){
        if((this.theme.volume - 0.1)  < 0) {
            this.theme.volume = 0
            return
        }
        this.theme.volume -= 0.1
        const musicLevel = document.getElementById('music-level')
        musicLevel.innerText = this.theme.volume.toFixed(1)
    }

    getMusicVolume (){
        return this.theme.volume
    }

    musicVolumeUp (){
        if((this.theme.volume  + 0.1)  > 1) {
            this.theme.volume = 1
            return
        }
        this.theme.volume += 0.1
        const musicLevel = document.getElementById('music-level')
        musicLevel.innerText = this.theme.volume.toFixed(1)
    }

    effectsVolumeDown (){
        if((this.lineClear.volume - 0.1 < 0)){
            this.lineClear.volume = 0
            return
        }
        this.lineClear.volume -= 0.1
        const effectsLevel = document.getElementById('effects-level')
        effectsLevel.innerText = this.lineClear.volume.toFixed(1)
    }

    effectsVolumeUp(){
        if((this.lineClear.volume + 0.1 > 1)){
            this.lineClear.volume = 1
            return
        }
        this.lineClear.volume += 0.1
        const effectsLevel = document.getElementById('effects-level')
        effectsLevel.innerText = this.lineClear.volume.toFixed(1)
    }

    getEffectsVolume(){
        return this.lineClear.volume
    }
    
}

export {SoundEffects}