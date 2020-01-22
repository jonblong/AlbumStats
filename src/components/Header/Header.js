import React from 'react';

import './Header.css';

const Header = (props) => {
    return (
        <div id='header'>
            {props.mode === 'results' && (
                <div id='back' onClick={() => props.rToS()}>BACK</div>
            )}

            {props.mode === 'album' && (
                <div id='back' onClick={() => props.aToR()}>BACK</div>
            )}
            <h1 className='title'>VibeCheck</h1>
        </div>
    );
};

export default Header;