import React from 'react';

const SidePanel = ({score, history}) => {
    return (
        <div className='sidepanel'>
            <h1>Score</h1>
            <h1>{score}</h1>
            <div className='history'>
                {history.map((h) => {
                    return (
                        <div className='history-item'>
                            <p>{h.player}</p>
                            <p>{h.highscore}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default SidePanel;
