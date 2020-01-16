import React from 'react';
import './trackList.css'

const TrackList = (props) => {
    return (
        <div id='list-view'>
            <div className='track-list-head track'>
            <p className='track-stat track-num'>#</p>
                <p className='track-stat track-name'>TRACK</p>
                <p className='track-stat track-valence'>VALENCE</p>
                <p className='track-stat track-energy'>ENERGY</p>
                <p className='track-stat track-dance'>DANCEABILITY</p>
            </div>
            <div className='track-list'>
                {props.trackData.map((track, i) => (
                    <div className={`track color${i%2 + 1}`}>
                        <p className='track-stat track-num'>{i+1}</p>
                        <p className='track-stat track-name'>{track.name}</p>
                        <p className='track-stat track-valence'>{track.valence}</p>
                        <p className='track-stat track-energy'>{track.energy}</p>
                        <p className='track-stat track-dance'>{track.danceability}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackList;