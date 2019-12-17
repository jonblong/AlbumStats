import React from 'react';

const AlbumList = (props) => {
  return (
    <div className="AlbumList">
      {props.albums.map((a, i) => (
        <div className='album-card' onClick={() => props.getTracks(a.id)}>
          <p>{a.name}</p>
        </div>
      ))}
    </div>
  )
}

export default AlbumList;