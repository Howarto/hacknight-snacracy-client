import Axios from 'axios';

export default class Snake {

    /**
     * Constructor for Snake instance.
     * @param {Object[]} coords - First snake point coordinate.
     * @param {Number} coords[].x - X coordinate.
     * @param {Number} coords[].y - Y coordinate.
     * @param {CanvasRenderingContext2D} context - Game context.
     */
    constructor(coords, context) {
        this.context = context;
        // Snake coordinates.
        this.coords = coords;
        // Square board distance constant.
        this.SQUARE_PART_SIZE = 10;
        // Color used to display a snake's part.
        this.PART_BACKGROUND_COLOR = 'black';
        // True when the snake eats a point.
        this.ate = false;
    }

    set coords(value) {
        this._coords = value;
    }

    get coords() {
        return this._coords;
    }

    /**
     * Says false if the snake colisioned with itself.
     * Otherwise, true.
     */
    isAlive() {
        for (const part1 of this.coords) {
            for (const part2 of this.coords) {
                if (part1 !== part2) {
                    if (part1.x === part2.x && part1.y === part2.y) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * Returns if the snake is out of the canvas.
     * True in case that the snake is out. Otherwise, false.
     * @param {Number} canvasWidth - Canvas width.
     * @param {Number} canvasHeigth - Canvas heigth.
     */
    isOut(canvasWidth, canvasHeigth) {
        let out = false;
        let i = 0;
        while (i < this.coords.length && !out) {
            const part = this.coords[i];
            if (part.x > canvasWidth || part.x < 0 || part.y > canvasHeigth || part.y < 0) {
                out = true;
            }
            i++;
        }

        return out;
    }

    /**
     * Draws a snake's part on the board.
     * @param {Object} part - Snake's part.
     * @param {Number} part.x - X part coordinate.
     * @param {Number} part.y - Y part coordinate.
     */
    drawSnakePart(part) {
        // Draw a "filled" rectangle to cover the entire canvas
        this.context.fillStyle = this.PART_BACKGROUND_COLOR;
        this.context.fillRect(part.x, part.y, this.SQUARE_PART_SIZE, this.SQUARE_PART_SIZE);
    }

    /**
     * Draws all the snake on the board.
     */
    drawSnake() {
        this.coords.forEach(part => {
            this.drawSnakePart(part);
        })
    }

    /**
     * Clears a snake's part on the board.
     * @param {Object} part - Snake's part.
     * @param {Number} part.x - X part coordinate.
     * @param {Number} part.y - Y part coordinate.
     */
    clearSnakePart(part) {
        this.context.clearRect(part.x, part.y, this.SQUARE_PART_SIZE, this.SQUARE_PART_SIZE);
    }

    /**
     * Clear all snake's parts.
     */
    clearSnake() {
        this.coords.forEach(part => {
            this.clearSnakePart(part);
        })
    }

    /**
     * Move the snake in x and y axis.
     * @param {Number} xIncrease - x axis increase.
     * @param {Number} yIncrease - y axis increase.
     */
    goSomewhere(xIncrease, yIncrease) {
        const head = { x: this.coords[0].x + xIncrease, y: this.coords[0].y + yIncrease };
        this.coords.unshift(head);
        let tail;
        if (!this.ate) {
            tail = this.coords.pop();
        }
        else {
            tail = this.coords[this.coords.length - 1];
            this.ate = false;
        }
        this.context.clearRect(tail.x, tail.y, this.SQUARE_PART_SIZE, this.SQUARE_PART_SIZE)
    }

    /**
     * Snake goes up.
     */
    goUp() {
        // this.goSomewhere(0, -this.SQUARE_PART_SIZE);
        Axios.post('http://localhost:3001/api/putVote', { message: 'up' }).then(response => { }).catch(err => {
            throw err;
        });
    }

    /**
     * Snake goes down.
     */
    goDown() {
        // this.goSomewhere(0, this.SQUARE_PART_SIZE);
        Axios.post('http://localhost:3001/api/putVote', { message: 'down' }).then(response => { }).catch(err => {
            throw err;
        });
    }

    /**
     * Snake goes left.
     */
    goLeft() {
        // this.goSomewhere(-this.SQUARE_PART_SIZE, 0);
        Axios.post('http://localhost:3001/api/putVote', { message: 'left' }).then(response => { }).catch(err => {
            throw err;
        });
    }

    /**
     * Snake goes right.
     */
    goRight() {
        // this.goSomewhere(this.SQUARE_PART_SIZE, 0);
        Axios.post('http://localhost:3001/api/putVote', { message: 'right' }).then(response => { }).catch(err => {
            throw err;
        });
    }
}