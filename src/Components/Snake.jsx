import React from 'react';

const Snake = ({head}) => {
    return (
        <div className={`snake ${head ? 'head' : null}`} >
        </div>
    );
}

export default Snake;
