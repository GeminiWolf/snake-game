import React, { useEffect, useRef, useState } from 'react';
import DirectionalBtns from './DirectionalBtns';
import Food from './Food';
import Snake from './Snake';

const startPos = {rows: 20/2 -1, cols: 20/2 -1}

const GridItems = ({setScore, score, action, playOptions, addHistory}) => {
    const [snakeHead, setSnakeHead] = useState(startPos)
    const [food, setfood] = useState({rows: Math.floor(Math.random()*20), cols: Math.floor(Math.random()*20)})
    const [snake, setSnake] = useState([snakeHead])
    const [direction, setDirection] = useState('')
    const directionRef = useRef('')
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
            let r = Math.floor(Math.random()*20)
            let c = Math.floor(Math.random()*20)
            tempfood = {rows: r, cols: c}
            
        } while (snake.find(check) !== undefined);
        
        setfood(tempfood)
    }


    const renders = () => {
        renderGrid()
        setGrid(grid)
    }

    const movement = () => {
        let tempHead = snakeHead
        let tempbod = snake
        let newbod = []
        let newHead = {rows: 0,cols: 0}
        let gOver = false
        var Mv = directionRef.current

        switch (Mv) {
            case "":
                return;
            case "up":
                newHead.rows = tempHead.rows - 1;
                newHead.cols = tempHead.cols;
                break;
            case "right":
                newHead.cols = tempHead.cols + 1;
                newHead.rows = tempHead.rows;
                break;
            case "down":
                newHead.rows = tempHead.rows + 1;
                newHead.cols = tempHead.cols;
                break;
            case "left":
                newHead.cols = tempHead.cols - 1;
                newHead.rows = tempHead.rows;
                break;
            default:
                break;
        }

        newbod = [newHead, ...tempbod]

        gOver = checkGameOver(newHead)

        if(food.cols === newHead.cols && food.rows === newHead.rows)
        {
            setScore(score + 100)
            if(speed.current !== 50){
                speed.current -= 5
            }
            randFoodPos()
        }else if(gOver){
            addHistory()
            setDirection('')
            directionRef.current = ''
            return
        }else{
            newbod.pop()
        }
        
        setSnakeHead(newHead)
        setSnake(newbod)
    }

    const checkGameOver = (newhead) => {
        const bodyHit = (pos) => {
            return pos.cols === newhead.cols && pos.rows === newhead.rows
        }

        const bhit = snake.findIndex(bodyHit)

        if(newhead.cols < 0 || newhead.cols > 19 || newhead.rows < 0 || newhead.rows > 19){
            resetGame()
            playOptions('4')
            return true
        }
        else if(bhit !== -1){
            resetGame()
            playOptions('4')
            return true
        }

        return false
    }

    const onKeys = (e) => {
        const od = directionRef.current
        
        const moves = {
            'ArrowUp': 'up',
            'ArrowRight': 'right',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'w': 'up',
            'W': 'up',
            'd': 'right',
            'D': 'right',
            's': 'down',
            'S': 'down',
            'a': 'left',
            'A': 'left',
        }
        
        const newDir = moves[e.key]
        
        if(action === 'Playing' && newDir){
            const opposites = {
                'up': 'down',
                'down': 'up',
                'left': 'right',
                'right': 'left',
            }
            
            if(opposites[newDir] !== od && (od !== '' || snake.length === 1)){
                setDirection(newDir)
                directionRef.current = newDir
            }
        }
    }

    const resetGame = () => {
        setSnakeHead(startPos)
        setSnake([startPos])
        speed.current = 400;
        setScore(0)
        setDirection('')
        directionRef.current = ''
        randFoodPos()
    }

    
    useEffect(() => {
        renders()
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => onKeys(e);
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [action, snake])

    useEffect(() => {
        if(action === 'Playing' && direction !== ''){
            const interval = setInterval(() => movement(), speed.current)
            return () => clearInterval(interval)
        }
    }, [direction, snake, action, food, score])

    return (
        <>
           { Grid.map((block, i) => {
                return (
                    <div key={i.toString()} className='grid-item'>
                        {snakeBody(block) ? <Snake head={block.cols === snakeHead.cols && block.rows === snakeHead.rows && true}/> : null}
                        {placeFood(block) ? <Food/> : null }
                    </div>
                )
            })}
            <DirectionalBtns action={action} onKeys={onKeys}/>
        </>
    )
}

export default GridItems;
