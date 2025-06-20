import { colorMap } from "./colorMap.js"

class nextShapeCanvas {
    canvas
    constructor (){
        this.canvas = document.getElementById('next-shape-canvas')
        this.canvas.height = this.canvas.getBoundingClientRect().height
        this.canvas.width = this.canvas.getBoundingClientRect().width
    }

    draw(nextShape){
        const nextShapePoints = nextShape.getPoints().map(e => [e[0] - 3, e[1]] )
        const grid = []
        for (let row = 0; row < 2; row++){
            grid.push(new Array(4).fill(0))
        }
        for(let point of nextShapePoints){
            let row = point[1]
            let col = point[0]
            grid[row][col] = nextShape.getColor()
        }
        
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
                            ctx.stroke()
                        }
                    }
                }

    }
}

export {nextShapeCanvas}