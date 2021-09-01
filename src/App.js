import React, { useState } from 'react';
import GridItems from './Components/GridItems';
import SidePanel from './Components/SidePanel';

import './App.css'

const App = () => {
  
  const [speed, setSpeed] = useState(800)
  const [score, setScore] = useState(0)
  const [history, setHistory] = useState([{player: 'hello', highscore: 1000 }])
  const [name, setName] = useState()

  // const onScore = () => {

  // }
  
  return (
    <div className='app' >
      <SidePanel score={score} history={history} />
      <div className='grid'>
        <GridItems score={score} setScore={setScore} />
      </div>
    </div>
  );
}

export default App;