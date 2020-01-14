import React from 'react';
import './AlbumList.css';
import back from './undo.svg';

const AlbumList = (props) => {
  return (
    <div className="AlbumList">
      <div id='searchTerm'>
        <img width='30px' id='back-button' src={back} onClick={() => props.goBack()} />
        Showing results for <span>{props.term}</span>
      </div>
      <div id='albumGrid'>
        {props.albums.map((a, i) => (
          <div className='album-card' onClick={() => props.getTracks(a.id)}>
            <img src={a.images[0].url} width='300px' height='300px' alt='album art'/>
            <p><b>{a.name}</b></p>
            <p>{a.artists[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumList;