import { Shape } from "./Shape.js";

class Z extends Shape{
    constructor() {
        super()
        this.points = 
            [
                [4, 1],
                [5, 1],
                [5, 0],
                [6, 0],
            ],
            this.color = 3
    }
    rotateRight(){
        switch(this.state % 2){
            case 0:
                 return [
                    [this.points[0][0] + 1, this.points[0][1] - 1],
                    [this.points[1][0]  , this.points[1][1] ],
                    [this.points[2][0] + 1, this.points[2][1] + 1 ],
                    [this.points[3][0], this.points[3][1] + 2]
                ]
            case 1:
                return [
                    [this.points[0][0] - 1, this.points[0][1] + 1],
                    [this.points[1][0]  , this.points[1][1] ],
                    [this.points[2][0] - 1, this.points[2][1] - 1 ],
                    [this.points[3][0], this.points[3][1] - 2]
                ]
        }
    }

    rotateLeft(){
        return this.rotateRight()
    }
}
export {Z}