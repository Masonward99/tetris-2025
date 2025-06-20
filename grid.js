class Grid {
    grid //2D array of ints representing different colours
    points // Array of coordinates
    hardDropPoints

    constructor (){
        this.grid = new Array(20)
        for (let row = 0; row < this.grid.length; row++){
            let col = new Array(10).fill(0)
            this.grid[row] = col
        }
    }

    //public methods
    getGrid (){
        return this.grid
    }

    addShape(points, color){
        if (!this.allPointsEmpty(points))return false
        this.hardDropPoints = null
        this.points = points
        this.updateHardDrop(points)
        this.setPoints(points, color)
        return true
    }

    changePoints(newPoints, color){
        if(!this.arePointsValid(newPoints)) return false
        this.removePoints(this.points)
        this.setPoints(newPoints, color)
        this.points = newPoints
        return true
    }

    updateHardDrop (newPoints){
        if (this.hardDropPoints){
            this.removePoints(this.hardDropPoints)
        }
        this.setHardDrop(newPoints)
    }

    getFullRows(){
        let rows = this.points.map((e) => e[1])
        let uniqueRows = [... new Set(rows)]
        uniqueRows.sort()
        let fullRows = []
        for (let row of uniqueRows){
            if (!this.grid[row].includes(0)){
                fullRows.push(row)
            }
        }
        return fullRows
    }

    async removeFullRows(fullRows){
        fullRows.sort( )
        for (let row of fullRows){
             this.grid.splice(row, 1)
             this.grid.unshift(new Array(10).fill(0))
        }
    }

    //helpers 
    removePoints(points){
        for(let coord of points){
            let row = coord[0]
            let col = coord[1]
            this.grid[col][row] = 0
        }
    }

    setPoints(points, color){
        for (let point of points){
            let col = point[0]
            let row = point[1]
            this.grid[row][col] = color
        }
    }

    arePointsValid(points){
        for (let point of points){
            if (!this.isPointValid(point))return false
        }
        return true
    }

    isPointValid(point){
        let col = point[0]
        let row = point[1]
        if(!this.points) return true 
        if (this.pointAlreadySet(point)) return true
        if (row >= 20 || row < 0) return false
        else if (col >= 10 || col < 0) return false
        //Check cell is empty
        else if (this.grid[row][col] == 0 || this.grid[row][col] == 9) return true
    }

    setHardDrop(points){
        //find min distance to collision 
        let minDistance = 30
        for (let point of points){
            let distance = 0
            while (this.isPointValid([point[0] , point[1] + distance])){
                distance += 1
            }
            if (distance - 1< minDistance){
                minDistance = distance - 1
            }
        }
        //hardrop point is the points translated downwards by this distance
        let hardDropPoints = []
        for (let point of points){
            hardDropPoints.push([point[0], point[1] + minDistance])
        }
        //add points to grid
        this.hardDropPoints = hardDropPoints
        this.setPoints(hardDropPoints, 9)
    }
    
    pointAlreadySet(point){
        for (let currPoint of this.points){
            if(currPoint[0] == point[0] && currPoint[1] == point[1]) return true
        }
        return false
    }

    allPointsEmpty (points){
        for (let point of points){
            let col = point[0]
            let row = point[1]
            if(this.grid[row][col] != 0) return false
        }
        return true
    }

    setRows(rows, color){
        for (let row of rows){
            this.grid[row] = new Array(10).fill(color)
        }
    }
}
export {Grid}