import React from 'react';
import './AlbumList.css';

const AlbumList = (props) => {
  return (
    <div className="AlbumList">
      {props.albums.map((a, i) => (
        <div className='album-card' onClick={() => props.getTracks(a.id)}>
          <img src={a.images[0].url} width='100px' height='100px' alt='album art'/>
          <p>{a.name} by {a.artists[0].name}</p>
        </div>
      ))}
    </div>
  )
}

export default AlbumList;