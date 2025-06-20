import { Shape } from "./Shape.js";

class Long extends Shape {
    constructor() {
        super()
        this.points= [[3, 0], [4, 0], [5, 0], [6, 0]]
        this.color =  2
    }
    rotateRight(){
        switch(this.state){
            case 0:
                return [
                    [this.points[0][0] + 2 , this.points[0][1]],
                    [this.points[1][0] + 1 , this.points[1][1] + 1],
                    [this.points[2][0], this.points[2][1] + 2],
                    [this.points[3][0] - 1 ,this.points[3][1] + 3 ]
                ]
            case 1:
                return [
                    [this.points[0][0] + 1, this.points[0][1]],
                    [this.points[1][0], this.points[1][1] - 1],
                    [this.points[2][0] - 1, this.points[2][1] - 2],
                    [this.points[3][0] - 2,this.points[3][1] - 3]
                ]
            case 2:
                return [
                    [this.points[0][0] - 2, this.points[0][1] + 3],
                    [this.points[1][0] - 1, this.points[1][1] + 2],
                    [this.points[2][0], this.points[2][1] + 1],
                    [this.points[3][0] + 1,this.points[3][1]]
                ]
            case 3:
                return [
                    [this.points[0][0] - 1, this.points[0][1] - 3],
                    [this.points[1][0], this.points[1][1] - 2],
                    [this.points[2][0] + 1, this.points[2][1] - 1],
                    [this.points[3][0] + 2, this.points[3][1] ]
                ]
        }
    }

    rotateLeft(){
        switch(this.state){
            case 0:
                return [
                    [this.points[0][0] + 1, this.points[0][1] + 3],
                    [this.points[1][0], this.points[1][1] + 2],
                    [this.points[2][0] -1, this.points[2][1] + 1],
                    [this.points[3][0] - 2, this.points[3][1] ]
                ]
            case 1:
                return [
                    [this.points[0][0] - 2, this.points[0][1]],
                    [this.points[1][0] - 1 , this.points[1][1] - 1],
                    [this.points[2][0], this.points[2][1] - 2],
                    [this.points[3][0] + 1, this.points[3][1] - 3 ]
                ]
            case 2:
                return [
                    [this.points[0][0] - 1, this.points[0][1]],
                    [this.points[1][0] , this.points[1][1] + 1 ],
                    [this.points[2][0] + 1, this.points[2][1] + 2],
                    [this.points[3][0] + 2, this.points[3][1] + 3]
                ]
            case 3:
                return [
                    [this.points[0][0] + 2 , this.points[0][1] - 3],
                    [this.points[1][0] + 1, this.points[1][1] - 2],
                    [this.points[2][0] , this.points[2][1] - 1],
                    [this.points[3][0] - 1, this.points[3][1] ]
                ]
        }
    }
}
export {Long}