import React, { useEffect, useState } from 'react';
import Food from './Food';
import Snake from './Snake';

let x = Math.floor((Math.random()*(19-1+1)+1)/2)*2
let y = Math.floor((Math.random()*(19-1+1)+1)/2)*2

const GridItems = ({setScore, score}) => {
    const [snakeHead, setSnakeHead] = useState({rows: 0, cols: 5})
    const [food, setfood] = useState({rows: x, cols: y})
    const [snake, setSnake] = useState([snakeHead, {rows: 0, cols: 4}])
    const [direction, setDirection] = useState('right')
    const [blocks, setBlocks] = useState({rows: 20,cols: 20})
    const [Grid, setGrid] = useState([])
    const [speed, setSpeed] = useState(400)

    const grid = []

    // block
    const renderGrid = () => {
        for (let rows = 0; rows < blocks.rows; rows++) {
            for (let cols = 0; cols < blocks.cols; cols++) {
                grid.push({
                    rows,
                    cols,
                })
            }
        }
    }

    // snake
    const snakeBody = (b) => {
        let result = false
        let x = snake.filter(e => {
            return e.cols === b.cols && e.rows === b.rows
        })
        
        if(x.length > 0) { result = true}
        return result
    }
    
    // food
    const placeFood = (b) => {
        let result = false

        if(food.cols === b.cols && food.rows === b.rows)
        {
            result = true
        }

        return result
    }

    const randFoodPos = () =>{
        let r = Math.floor((Math.random()*(19-1+1)+1)/2)*2
        let c = Math.floor((Math.random()*(19-1+1)+1)/2)*2
        setfood({rows: r, cols: c})
    }

    const renders = async () => {
        await renderGrid()
        setGrid(grid)
    }

    const movement = async() => {
        let tempHead = snakeHead
        let tempbod = snake
        let newbod = []
        let newHead = {rows: 0,cols: 0}

        switch (direction) {
            case "":
                return;
            case "up":
                if(tempHead.rows < 0){
                    newHead.rows = 19;
                }
                else{
                    newHead.rows = tempHead.rows - 1;
                }
                newHead.cols = tempHead.cols;
                break;
            case "right":
                if(tempHead.cols > 19){
                    newHead.cols = 0;
                }
                else{
                    newHead.cols = tempHead.cols + 1;
                }
                newHead.rows = tempHead.rows;
                break;
                case "down":
                    if(tempHead.rows > 19){
                        newHead.rows = 0;
                    }
                    else{
                        newHead.rows = tempHead.rows + 1;
                    }
                    newHead.cols = tempHead.cols;
                    break;
            case "left":
                if(tempHead.cols < 0){
                    newHead.cols = 19;
                }
                else{
                    newHead.cols = tempHead.cols - 1;
                }
                newHead.rows = tempHead.rows;
                break;
            default:
                break;
        }

        newbod = [newHead, ...tempbod]

        if(food.cols === newHead.cols && food.rows === newHead.rows)
        {
            setScore(score + 100)
            if(speed !== 50){
                setSpeed(speed - 5)
            }
            randFoodPos()
        }else{
            newbod.pop()
        }
        
        setSnakeHead(newHead)
        setSnake(newbod)
        renders()
    }

    const onKeys = (e) => {

        const moves = {
            38: 'up',
            39: 'right',
            40: 'down',
            37: 'left',
        }

        setDirection(moves[e.keyCode])
    }

    
    useEffect(() => {
        document.addEventListener('keydown', onKeys);
        const interval = setInterval(() => movement(), speed)
        return () => clearInterval(interval)
    }, [direction, snake])

    return Grid.map((block, i) => {
        return (
            <div key={i.toString()} className='grid-item'>
                {snakeBody(block) ? <Snake  show={block}/> : null}
                {placeFood(block) ? <Food/> : null }
            </div>
        )
    })
    
}

export default GridItems;
