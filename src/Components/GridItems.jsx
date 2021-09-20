import { render } from '@testing-library/react';
import React, { useEffect, useRef, useState } from 'react';
import Food from './Food';
import Snake from './Snake';

let x = Math.floor((Math.random()*(19-1+1)+1)/2)*2
let y = Math.floor((Math.random()*(19-1+1)+1)/2)*2
const startPos = {rows: 20/2 -1, cols: 20/2 -1}

const GridItems = ({setScore, score}) => {
    const [snakeHead, setSnakeHead] = useState(startPos)
    const [food, setfood] = useState({rows: x, cols: y})
    const [snake, setSnake] = useState([snakeHead])
    const [direction, setDirection] = useState('')
    const blocks = useRef({rows: 20,cols: 20})
    const [Grid, setGrid] = useState([])
    const speed = useRef(400)
    const grid = []

    // block
    const renderGrid = () => {
        for (let rows = 0; rows < blocks.current.rows; rows++) {
            for (let cols = 0; cols < blocks.current.cols; cols++) {
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
        let tempfood = {rows: 0, cols: 0}

        const check = (pos) => {
            return pos.rows === tempfood.rows && pos.cols === tempfood.cols
        }

        do {
            let r = Math.floor((Math.random()*(19-1+1)+1)/2)*2
            let c = Math.floor((Math.random()*(19-1+1)+1)/2)*2
            tempfood = {rows: r, cols: c}
            
        } while (snake.find(check) !== undefined);
        
        setfood(tempfood)
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
            if(speed.current !== 50){
                speed.current -= 5
            }
            await randFoodPos()
        }else if(checkGameOver(newHead)){
            setDirection('')
            return
        }else{
            newbod.pop()
        }
        
        setSnakeHead(newHead)
        setSnake(newbod)
        // renders()
    }

    const checkGameOver = (newhead) => {
        const sideHit = (pos) => {
            return pos.cols < 0 || pos.cols > 19 || pos.rows < 0 || pos.row > 19
        }

        const outOfBounds = Grid.filter(sideHit)


        const bodyHit = (pos) => {
            return pos.cols === newhead.cols && pos.rows === newhead.rows
        }

        if(snake.filter(bodyHit).length > 1){
            return true
        }
        else if(outOfBounds.filter(bodyHit).length > 0){
            return true
        }

        return false
        
    }

    const onKeys = (e) => {

        const moves = {
            38: direction !== 'down' && 'up' ,
            39: direction !== 'left' && 'right',
            40: direction !== 'up' && 'down',
            37: direction !== 'right' && 'left',
        }

        moves[e.keyCode] != 0 && setDirection(moves[e.keyCode])
    }

    
    useEffect(() => {
        renders()
        document.addEventListener('keydown', onKeys);
        const interval = setInterval(() => movement(), speed.current)
        return () => clearInterval(interval)
    }, [direction, snake])

    return Grid.map((block, i) => {
        return (
            <div key={i.toString()} className='grid-item'>
                {snakeBody(block) ? <Snake head={block.cols === snakeHead.cols & block.rows === snakeHead.rows && true}/> : null}
                {placeFood(block) ? <Food/> : null }
            </div>
        )
    })
    
}

export default GridItems;
