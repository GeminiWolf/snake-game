import React, { useState } from 'react';
import SidePanel from './SidePanel';

const OverlayScreen = ({action, setAction, history}) => {
    const [viewHistory, setViewHistory] = useState(false);

    return (
        <div className='modal' >
            {
                viewHistory ? <SidePanel history={history} setViewHistory={setViewHistory} /> :
                <div className='modal-opts' >
                    <h1 className='modal-action-font'>{action}</h1>
                    <input 
                        type='button'
                        className='modal-opt-fonts'
                        onClick={() => setAction('Playing')} value={action === 'Pause' ? 'Continue' :'Start Game'} />
                    {/* <input 
                        type='button'
                        className='modal-opt-fonts'
                        onClick={() => setViewHistory(true)} 
                        value={action === 'Pause' ? 'Exit' :'History'} /> */}
                </div>
            }
        </div>
    );
}

export default OverlayScreen;
