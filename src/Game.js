import React, { Component } from 'react';
import Snake from './Snake';
import Axios from 'axios';

export default class Game extends Component {

    constructor(props) {
        super(props);

        this.CANVAS_WIDTH = 800;
        this.CANVAS_HEIGHT = 600;
        this.CANVAS_BACKGROUND_COLOR = 'white';
        this.CANVAS_BORDER_COLOR = 'black';
    }

    /**
     * Configure canvas element.
     */
    configureCanvas(context) {
        // Put background color.
        context.fillStyle = this.CANVAS_BACKGROUND_COLOR;
        // Put stroke color.
        context.strokeStyle = this.CANVAS_BORDER_COLOR;

        // Draw a "filled" rectangle to cover the entire canvas
        context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        // Draw a "border" around the entire canvas
        context.strokeRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
    }

    /**
     * Initializes the snake.
     * @param {CanvasRenderingContext2D} context - Game context.
     */
    initializeSnake(context) {
        this.refs.canvas.addEventListener('keydown', event => {
            switch (event.key.toLowerCase()) {
                case 'arrowup':
                    this.snake.goUp();
                    this.snake.drawSnake();
                    break;
                case 'arrowdown':
                    this.snake.goDown();
                    this.snake.drawSnake();
                    break;
                case 'arrowleft':
                    this.snake.goLeft();
                    this.snake.drawSnake();
                    break;
                case 'arrowright':
                    this.snake.goRight();
                    this.snake.drawSnake();
                    break;
                case ' ':
                    this.snake.ate = true;
                    break;
                default:
                    break;
            }
        }, false)

        setInterval(() => {
            Axios.get('http://localhost:3001/api/getSnakes', { crossdomain: true, headers: { 'content-type': 'application/x-www-form-urlencoded' } }).then(response => {
                const snakeCoords = response.data.data[0].coords;
                // Draw the snake.
                if (this.snake) {
                    this.snake.coords = snakeCoords;
                }
                else {
                    this.snake = new Snake(snakeCoords, context); 
                }
                console.log(this.snake.coords);
                if (!this.snake.isAlive() || this.snake.isOut(this.CANVAS_WIDTH, this.CANVAS_HEIGHT)) {
                    context.fillStyle = 'red';
                    context.font = '42px Arial';
                    context.textAlign = 'center';
                    context.fillText('Game Over', this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT / 2);
                }
                this.snake.clearSnake();
                this.snake.drawSnake();
            }).catch(err => {
                throw err;
            });
        }, 2000);
    }

    /**
     * Called after render().
     */
    componentDidMount() {
        // Get the canvas context.
        const context = this.refs.canvas.getContext('2d');
        // Configure canvas.
        this.configureCanvas(context);
        // Init the snake.
        this.initializeSnake(context);
    }

    render() {
        return (
            <div className="Snacracy">
                <canvas id="board" ref="canvas" width={this.CANVAS_WIDTH} height={this.CANVAS_HEIGHT} tabIndex="0"></canvas>
            </div>
        );
    }
}
