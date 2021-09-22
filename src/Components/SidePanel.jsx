import React from 'react';

const SidePanel = ({score, history}) => {
    return (
        <div className='sidepanel'>
            {/* <img alt='hitsBack' className='history-back-btn'/> */}
            <div className='history'>
                {history.current.map((h) => {
                    return (
                        <div key={h.player+h.highscore} className='history-item'>
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
