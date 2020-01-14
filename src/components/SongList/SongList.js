import React from 'react';
import './SongList.css';
import back from './undo.svg';

const SongList = (props) => {
  return (
    <div className="SongList">
      <img width='30px' id='back-button' src={back} onClick={() => props.goBack()} />
    </div>
  )
}

export default SongList;