import React, { useEffect, useRef, useState } from 'react';
import GridItems from './Components/GridItems';
import SidePanel from './Components/SidePanel';

import './App.css'
import OverlayScreen from './Components/OverlayScreen';

const App = () => {
  const [score, setScore] = useState(0)
  const [action, setAction] = useState('Game')
  const history = useRef([])
  const [name, setName] = useState('')

  useEffect(() => {
    const savedHistory = localStorage.getItem('snakeHighScores')
    if(savedHistory){
      history.current = JSON.parse(savedHistory)
    }
  }, [])

  const playOptions =  (opt) => {
    const options = {
      '1': 'Game',
      '2': 'Playing',
      '3': 'Pause',
      '4': 'Game Over',
    }

    setAction( options[opt]) 
  }

  const addHistory = () =>{
    history.current.push({player: name || 'Anonymous', highscore: score })
    history.current.sort((a, b) => b.highscore - a.highscore)
    history.current = history.current.slice(0, 10)
    localStorage.setItem('snakeHighScores', JSON.stringify(history.current))
  }
  
  return (
    <div className='app' >
      {
        action !== 'Playing' && 
        <OverlayScreen 
          playOptions={playOptions} 
          setName={setName} 
          history={history} 
          action={action} 
          setAction={setAction}/>
      }
      <div>
        <h1 style={{textAlign: 'center'}}>Score</h1>
        <h1 style={{textAlign: 'center'}}>{score}</h1>
      </div>
      <div className='grid'>
        <GridItems
          score={score}
          setScore={setScore}
          addHistory={addHistory}
          action={action}
          playOptions={playOptions}/>
      </div>
      <SidePanel score={score} history={history}/>
    </div>
  );
}

export default App;