import { Shape } from "./Shape.js";

class Square extends Shape{
    constructor (){
        super()
        this.color = 1 
        this.points = [[4, 0], [5, 0], [4, 1], [5, 1]]
    }

    rotateLeft(){
        return this.points
    }

    rotateRight(){
        return this.points
    }
}

export {Square}