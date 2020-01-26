import React from 'react';
import './Header.css';
import back from './back.svg';

const Header = (props) => {
    return (
        <div id='header'>
            {props.mode === 'results' && (
                <div id='back' onClick={() => props.rToS()}>
                    <img src={back} width='50px' height='50px' />
                </div>
            )}

            {props.mode === 'album' && (
                <div id='back' onClick={() => props.aToR()}>
                    <img src={back} width='50px' height='50px' />
                </div>
            )}
            <h1 className='title'>VibeCheck</h1>
        </div>
    );
};

export default Header;