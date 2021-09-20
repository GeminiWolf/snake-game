import React, { useRef, useState } from 'react';
import GridItems from './Components/GridItems';
import SidePanel from './Components/SidePanel';

import './App.css'
import OverlayScreen from './Components/OverlayScreen';

const App = () => {
  const [score, setScore] = useState(0)
  const [action, setAction] = useState('in-game')
  const history = useRef([])
  const [name, setName] = useState('')

  const playOptions = (opt) => {
    const options = {
      'Play': 'ev',
      'Pause': 'ev',
      'Game Over': 'ev',
    }

    setAction(options[opt])
  }

  const addHistory = () =>{
    history.current.push({player: name, highscore: score })
  }
  
  return (
    <div className='app' >
      <SidePanel score={score} history={history} />
      {action !== 'Play' && <OverlayScreen playOptions={playOptions} setName={setName} />}
      <div className='grid'>
        <GridItems score={score} setScore={setScore} done={addHistory} playOptions={playOptions}/>
      </div>
    </div>
  );
}

export default App;