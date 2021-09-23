import React from 'react';

const dirIcons = {
    'up': 'https://img.icons8.com/pastel-glyph/64/000000/circled-chevron-up.png',
    'left': 'https://img.icons8.com/pastel-glyph/64/000000/circled-chevron-left.png',
    'down': 'https://img.icons8.com/pastel-glyph/64/000000/circled-chevron-down.png',
    'right': 'https://img.icons8.com/pastel-glyph/64/000000/circled-chevron-right.png',
}

const DirectionalBtns = ({action, onKeys}) => {

    const btnMovements = (d) => {

        const dObj = {keyCode: d}

        // if(action === 'Playing'){
            onKeys(dObj)
        // }
    }
    
    return (
        <div>
            {/* <div>Side</div> */}
            <div className='dir-buttons'>
                <img alt='dirs' onClick={() => btnMovements(38)} className='dir-arrows' src={dirIcons['up']} />
                <img alt='dirs' onClick={() => btnMovements(37)} className='dir-arrows' src={dirIcons['left']} />
                <img alt='dirs' onClick={() => btnMovements(40)} className='dir-arrows' src={dirIcons['down']} />
                <img alt='dirs' onClick={() => btnMovements(39)} className='dir-arrows' src={dirIcons['right']} />
            </div>
        </div>
    );
}

export default DirectionalBtns;
