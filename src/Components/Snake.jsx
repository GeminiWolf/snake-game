import React from 'react';

const Snake = ({head}) => {
    return (
        <div className={`snake ${head ? 'head' : null}`} >
            {head && console.log('snale', head)}
        </div>
    );
}

export default Snake;
