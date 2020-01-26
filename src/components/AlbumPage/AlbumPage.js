import React from 'react';
import './albumPage.css';
import ChartView from './../ChartView/ChartView';
import TrackList from './../TrackList/TrackList';

function AlbumPage(props) {
    let trackDataList = [];
    props.tracks.forEach((track, i) => {
        trackDataList.push({
            name:         track.name,
            number:       track.number,
            valence:      track.valence,
            acousticness: track.acousticness,
            energy:       track.energy,
            danceability: track.danceability,
            tempo:        track.tempo,
        });
    });

    function resizeComponent() {
        document.getElementById('AlbumPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
    }

    React.useEffect(() => {
        document.getElementById('AlbumPage').setAttribute('style', `min-height: ${window.innerHeight - 150}px`);
        window.addEventListener('resize', resizeComponent);

        return function cleanup() {
            window.removeEventListener('resize', resizeComponent);
        }
    }, []);

    const [mode, setMode] = React.useState(false);

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
            <div id='view-controller'>
                    <div id='track-button' className={mode ? '' : 'active'} onClick={() => setMode(false)}>Tracklist View</div>
                    <div id='chart-button' className={mode ? 'active' : ''} onClick={() => setMode(true)}>Chart View</div>
                </div>
            <div id='charts'>
                {mode && (
                  <ChartView trackData={trackDataList} />
                )}

                {!mode && (
                    <TrackList trackData={trackDataList} />
                )}
            </div>
        </div>
    );
};

export default AlbumPage;