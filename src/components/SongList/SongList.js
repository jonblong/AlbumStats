import React from 'react';
import './SongList.css';

const SongList = (props) => {
  return (
    <div className="SongList">
      <div className="back-button" onClick={() => props.goBack()}>Back</div>
      <div className='song-card'>
        <p>TRACK</p>
        <p>DANCEABILITY</p>
        <p>ENERGY</p>
        <p>ACOUSTICNESS</p>
        <p>INSTRUMENTALNESS</p>
        <p>VALENCE</p>
        <p>TEMPO</p>
      </div>
      {props.tracks.map((t, i) => (
        <div className='song-card'>
          <p>{t.name}</p>
          <p>{t.danceability}</p>
          <p>{t.energy}</p>
          <p>{t.acousticness}</p>
          <p>{t.instrumentalness}</p>
          <p>{t.valence}</p>
          <p>{t.tempo}</p>
        </div>
      ))}
    </div>
  )
}

export default SongList;