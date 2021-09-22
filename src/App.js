import React, { useRef, useState } from 'react';
import GridItems from './Components/GridItems';
import SidePanel from './Components/SidePanel';

import './App.css'
import OverlayScreen from './Components/OverlayScreen';

const App = () => {
  const [score, setScore] = useState(0)
  const [action, setAction] = useState('Game')
  const history = useRef([])
  const [name, setName] = useState('')

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
    history.current.push({player: name, highscore: score })
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
    </div>
  );
}

export default App;