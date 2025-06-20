class SoundEffects {
    drop
    lineClear
    theme
    isThemeMuted
    areEffectsMuted

    constructor (){
        this.lineClear = new Audio('./resources/success.wav')
        this.theme = new Audio('./resources/tetris-theme.mp3')
    }

    muteTheme (){
        this.theme.volume = this.isThemeMuted? 1 : 0
        this.isThemeMuted = !this.isThemeMuted
    }

    areEffectsMuted(){
        volNum = this.areEffectsMuted? 1 : 0
        // this.drop.volume = volNum
        this.lineClear.volume = volNum
        this.areEffectsMuted = !this.areEffectsMuted
    }

    playLineClear(){
        this.lineClear.play()
    }
    playTheme(){
        this.theme.loop = true
        this.theme.play()
    }
    
}

export {SoundEffects}