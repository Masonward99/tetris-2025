import { Shape } from "./Shape.js";

class BackwardsL extends Shape{
    constructor() {
        super()
        this.points = [
            [4, 1],
            [5, 1],
            [6, 1],
            [6, 0],
        ];
        this.color = 6
    }

    rotateRight(){
        switch(this.state){
            case 0:
                return [
                    [this.points[0][0] + 1, this.points[0][1] - 1],
                    [this.points[1][0], this.points[1][1] ],
                    [this.points[2][0] - 1, this.points[2][1] + 1],
                    [this.points[3][0] ,this.points[3][1] + 2 ]
                ]
            case 1:
                return [
                    [this.points[0][0] + 1, this.points[0][1]],
                    [this.points[1][0], this.points[1][1] - 1],
                    [this.points[2][0] - 1, this.points[2][1] - 2],
                    [this.points[3][0] - 2,this.points[3][1] - 1]
                ]
            case 2:
                return [
                    [this.points[0][0] , this.points[0][1] + 2],
                    [this.points[1][0] + 1, this.points[1][1] + 1],
                    [this.points[2][0] + 2, this.points[2][1] ],
                    [this.points[3][0] + 1 ,this.points[3][1] - 1]
                ]
            case 3:
                return [
                    [this.points[0][0] - 2 , this.points[0][1] - 1],
                    [this.points[1][0] - 1 , this.points[1][1] ],
                    [this.points[2][0] , this.points[2][1] + 1],
                    [this.points[3][0] + 1,this.points[3][1] ]
                ]
        }
    }

    rotateLeft(){
        switch(this.state){
            case 0:
                return [
                    [this.points[0][0] + 2, this.points[0][1] + 1],
                    [this.points[1][0] + 1, this.points[1][1] ],
                    [this.points[2][0] , this.points[2][1] - 1],
                    [this.points[3][0] - 1,this.points[3][1] ]
                ]
            case 1:
                return [
                    [this.points[0][0] - 1, this.points[0][1] + 1],
                    [this.points[1][0], this.points[1][1] ],
                    [this.points[2][0] + 1, this.points[2][1] - 1],
                    [this.points[3][0] ,this.points[3][1] - 2 ]
                ]
            case 2:
                return [
                    [this.points[0][0] - 1, this.points[0][1]],
                    [this.points[1][0], this.points[1][1] + 1],
                    [this.points[2][0] + 1, this.points[2][1] + 2],
                    [this.points[3][0] + 2,this.points[3][1] + 1]
                ]
            case 3:
                return [
                    [this.points[0][0] , this.points[0][1] - 2],
                    [this.points[1][0] - 1, this.points[1][1] - 1],
                    [this.points[2][0] - 2, this.points[2][1] ],
                    [this.points[3][0] - 1 ,this.points[3][1] + 1]
                ]
        }
    }
}
export {BackwardsL}