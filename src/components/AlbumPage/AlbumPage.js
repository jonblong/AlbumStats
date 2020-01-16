import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import './albumPage.css';

import TrackList from './../TrackList/TrackList';

function AlbumPage(props) {
    let trackDataList = [];
    props.tracks.forEach((track, i) => {
        trackDataList.push({
            name: track.name,
            valence: track.valence,
            acousticness: track.acousticness,
            energy: track.energy,
            danceability: track.danceability,
        });
    });

    const [mode, setMode] = React.useState(false);

    const SongTooltip = ({ active, payload, label }) => {
        //console.log(payload);
        if (active) {
            return (
                <div className='song-tooltip'>
                    <p className='tooltip-song-name'>{payload[0].payload.name}</p>
                    <p className='tooltip-song-valence'>Valence: {payload[0].payload.valence}</p>
                    <p className='tooltip-song-valence'>Energy: {payload[0].payload.energy}</p>
                    <p className='tooltip-song-valence'>Danceability: {payload[0].payload.danceability}</p>
                </div>
            )
        }

        return null;
    }

    return(
        <div id="AlbumPage">
            <div id='album-info'>
                <img id='album-art' src={props.album.images[0].url} alt={props.album.name} />
                <div id='album-details'>
                    <p id='album-name'>{props.album.name}</p>
                    <p id='artist-name'>
                        <span className='byline'>By </span>
                        {props.album.artists[0].name}
                    </p>
                    <p id='date-num'>{props.album.release_date.slice(0,4)} &#183; {props.album.total_tracks} songs</p>
                </div>
            </div>
            <div id='charts'>
                <div id='view-controller'>
                    <div id='track-button' className={mode ? '' : 'active'} onClick={() => setMode(false)}>Tracklist View</div>
                    <div id='chart-button' className={mode ? 'active' : ''} onClick={() => setMode(true)}>Chart View</div>
                </div>
                {mode && (
                    <LineChart width={800} height={300} data={trackDataList} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type='monotone' dataKey='valence' stroke='#242423' />
                        <Line type='monotone' dataKey='energy' stroke='#ff9900' />
                        <Line type='monotone' dataKey='danceability' stroke='#3299bb' />
                        <CartesianGrid vertical={false} stroke='#424242' strokeDasharray="5 5"/>
                        <YAxis type='number' domain={[0, 1]}/>
                        <Tooltip content={<SongTooltip />}/>
                    </LineChart>
                )}

                {!mode && (
                    <TrackList trackData={trackDataList} />
                )}
            </div>
        </div>
    );
};

export default AlbumPage;