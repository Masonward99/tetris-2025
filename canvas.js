import { colorMap } from "./colorMap.js"

class Canvas {
    canvas
    constructor (){
        this.canvas = document.getElementById('game-canvas')
        this.canvas.height = this.canvas.getBoundingClientRect().height
        this.canvas.width = this.canvas.getBoundingClientRect().width
    }

    draw (grid){
       if(this.canvas.getContext){
            const ctx = this.canvas.getContext("2d")
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height) //clears canvas
            const boxSize = Math.floor(this.canvas.getBoundingClientRect().height / grid.length) 
            for (let row=0; row< grid.length; row++){
                for(let col = 0; col < grid[0].length; col ++){
                    ctx.beginPath();
                    ctx.rect(col * boxSize, row * boxSize, boxSize, boxSize)
                    ctx.fillStyle = colorMap[grid[row][col]]
                    ctx.fill();
                    ctx.beginPath();
                    ctx.rect(col * boxSize, row * boxSize, boxSize, boxSize)
                    colorMap[grid[row][col]] == 'black'? ctx.strokeStyle = 'white' : ctx.strokeStyle = 'black'
                    ctx.stroke()
                }
            }
        } 
    }
}

export {Canvas}
