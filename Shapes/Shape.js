class Shape {
    points
    color
    state //tracks rotation of the shape
    constructor (){
        this.state = 0
    }

    rotate(){
        return this.points
    }

    moveVertically(){
        let translated = []
        for (let point of this.points){
            translated.push([point[0], point[1] + 1])
        }
        return translated
    }

    moveHorizontally(distance){
        let translated = []
        for (let point of this.points){
            translated.push([point[0] + distance, point[1]])
        }
        return translated
    }

    setPoints(points){
        this.points = points
    }

    getPoints(){
        return this.points
    }

    getColor(){
        return this.color
    }

    //Rotating right is positive, left is negative
    changeState(amount){
        this.state += amount
        this.state = ((this.state % 4)+ 4) % 4
    }
}

export {Shape}