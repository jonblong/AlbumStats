import React from 'react';

import './Header.css';

const Header = (props) => {
    return (
        <div id='header'>
            <div id='back'>BACK</div>
            <h1 className='title'>VibeCheck</h1>
        </div>
    );
};

export default Header;