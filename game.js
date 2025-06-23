import { Grid } from "./grid.js"
import { Canvas } from "./canvas.js"
import { Square } from "./Shapes/Square.js"
import { levels } from "./levels.js"
import { Long } from "./Shapes/Long.js"
import { Z } from "./Shapes/Z.js"
import { BackwardsZ } from "./Shapes/BackwardsZ.js"
import { L } from "./Shapes/L.js"
import { BackwardsL } from "./Shapes/BackwardsL.js"
import { T } from "./Shapes/T.js"
import { scoringMap } from "./scoringMap.js"
import { nextShapeCanvas } from "./nextShapeCanvas.js"
import { SoundEffects } from "./soundEffects.js"
import { Display } from "./display.js"

class Game{
    grid
    canvas
    shape
    nextShape
    clearedLines
    interval
    score
    level
    nextShapeCanvas
    hasEnded
    hasStarted
    isPaused
    isAnimating
    theme
    soundEffects
    display

    constructor (){
        this.clearedLines = 0
        this.level = 1
        this.score = 0
        this.grid = new Grid()
        this.canvas = new Canvas()
        this.nextShapeCanvas = new nextShapeCanvas()
        this.nextShape = this.getRandomShape()
        this.nextShapeCanvas.draw(this.nextShape)
        this.canvas.draw(this.grid.getGrid())
        this.hasEnded = false
        this.hasStarted = false
        this.isPaused = false
        this.theme = new Audio('./resources/tetris-theme.mp3')
        this.theme.loop = true
        this.soundEffects = new SoundEffects()
        this.display = new Display(this)
        this.display.displayStartScreen()
    }
    
    async start(e){
        if (e){
            e.currentTarget.parentElement.remove()
        }
        await this.display.countdown()
        this.hasStarted = true
        this.addShapeToGrid(this.nextShape)
        this.soundEffects.playTheme()
    }

    async pause (){
        if (!this.hasStarted || this.hasEnded) return 
        if(this.isPaused){
            this.display.removePauseScreen()
            await this.display.countdown()
            this.isPaused = false
            this.autoDrop()
        }else{
            this.display.displayPauseScreen()
            clearInterval(this.interval)
            this.isPaused = true
        }
    }

    reset(e){
        this.hasEnded = false
        this.grid = new Grid()
        this.score = 0
        this.level = 1
        this.clearedLines = 0
        this.hasStarted = false
        e.currentTarget.parentElement.remove()
        this.start()
    }

    endGame(){
        this.hasEnded = true
        this.soundEffects.theme.pause()
        const container = document.querySelector('.game-canvas-container')
        container.classList.add('semi-transparent')
        const div = document.createElement('div')
        const title = document.createElement('h2')
        title.innerText = 'Game Over!'
        div.appendChild(title)
        const text = document.createElement('p')
        text.innerText = 'You scored ' + this.score + ' points'
        div.appendChild(text)
        const button = document.createElement('button')
        button.innerText = 'Play again'
        button.addEventListener('click', (e)=> this.reset(e))
        div.appendChild(button)
        div.classList.add('game-canvas-popup')
        container.appendChild(div)
    }

    getRandomShape(){
        let randomNum = Math.floor(Math.random() * 7)
        switch (randomNum){
            case 0:
                return new Square()
            case 1:
                return new Long()
            case 2:
                return new Z()
            case 3:
                return new BackwardsZ()
            case 4:
                return new L()
            case 5:
                return new BackwardsL()
            case 6:
                return new T()
        }
    }

    moveVertically(){
        if(this.hasEnded) return
        const points = this.shape.moveVertically()
        const hasBeenMoved = this.grid.changePoints(points, this.shape.getColor())
        if (hasBeenMoved){
            this.shape.setPoints(points)
            //trigger redraw
            this.canvas.draw(this.grid.getGrid())
            this.score += this.level
        }
        else {
            this.handleCollision(false, 0)
        }
        this.display.updateUi(this.score, this.level, this.clearedLines)
    }

    moveHorizontally(d){
        const newPoints = this.shape.moveHorizontally(d)
        if (this.grid.arePointsValid(newPoints)){
            this.grid.updateHardDrop(newPoints)
            this.grid.changePoints(newPoints, this.shape.getColor())
            this.shape.setPoints(newPoints)
            //trigger redraw
            this.canvas.draw(this.grid.getGrid())
        }
    }

    addShapeToGrid(shape){
        this.shape = shape
        let hasBeenAdded = this.grid.addShape(shape.getPoints(), shape.getColor())
        if (!hasBeenAdded) {
            this.endGame()
            return
        } // Game has ended
        this.autoDrop()
        this.nextShape = this.getRandomShape()
        this.nextShapeCanvas.draw(this.nextShape)
        //trigger redraw
        this.canvas.draw(this.grid.getGrid())
    }

    rotateRight(){
        let newPoints = this.shape.rotateRight()
        if (!this.grid.arePointsValid(newPoints)) return 
        this.grid.updateHardDrop(newPoints)
        this.grid.changePoints(newPoints, this.shape.getColor())
        this.shape.setPoints(newPoints)
        this.shape.changeState(1)
        //trigger redraw
        this.canvas.draw(this.grid.getGrid())
    }

    rotateLeft(){
        let newPoints = this.shape.rotateLeft()
        if (!this.grid.arePointsValid(newPoints)) return 
        this.grid.updateHardDrop(newPoints)
        this.grid.changePoints(newPoints, this.shape.getColor())
        this.shape.setPoints(newPoints)
        this.shape.changeState(-1)
        //trigger redraw
        this.canvas.draw(this.grid.getGrid())
    }

    hardDrop(){
        let points = this.grid.hardDropPoints
        let distance = points[0][1] - this.shape.getPoints()[0][1] 
        this.grid.changePoints(points, this.shape.getColor())
        this.handleCollision(true, distance)
        this.display.updateUi(this.score, this.level, this.clearedLines)
    }

    autoDrop(){
        //max drop speed is level 10
        this.interval = setInterval(()=> this.moveVertically(), this.level < 10 ? levels[this.level] : 133)
    }

    async handleCollision(isHardDrop, distance){
            let fullRows = this.grid.getFullRows()
            let numRows = fullRows.length
            //scoring based on num rows and level
            clearInterval(this.interval)
            if( numRows > 0){
                this.isAnimating = true
                let pointsScored = (scoringMap[numRows] * this.level)
                this.score += pointsScored
                if(isHardDrop) this.score += distance * 2 * this.level
                const linesBefore = this.clearedLines
                this.clearedLines += numRows
                const linesAfter = this.clearedLines
                if (Math.floor(linesAfter / 10) > Math.floor(linesBefore / 10)) this.level += 1 
                let animation = this.animateLines(fullRows)
                let message = this.display.addLineClearMessage(numRows, pointsScored)
                this.soundEffects.playLineClear()
                await Promise.all([animation, message])
                this.grid.removeFullRows(fullRows)
                this.isAnimating = false
            }
            this.addShapeToGrid(this.nextShape)
    }

    async animateLines(rows){
        for (let i=0; i < 5; i++){
            this.grid.setRows(rows, i % 2 == 0 ? 0 : 9)
            this.canvas.draw(this.grid.getGrid())
            await new Promise(resolve => setTimeout(resolve, 100))
        }
    }

    muteTheme(e){
        e.currentTarget.innerHTML = '<img src =' + (!this.soundEffects.isThemeMuted? './resources/icons/muted-vol.svg' : './resources/icons/vol-on.svg') + '>'
        this.soundEffects.muteTheme()
    }

    changeLevel(){
        const container = document.querySelector('.game-canvas-popup')
        const levelSelect = container.children[2]
        this.level += 1 
        if( this.level == 10) this.level = 1
        levelSelect.innerText = 'Level: ' + this.level
        const level =  document.querySelector('.ui-collumn').children[1].children[1]
        level.innerText= this.level
    }


    
}

export {Game}