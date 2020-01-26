import React from 'react';
import './trackList.css';
import up from './up.svg';
import down from './down.svg';

function TrackList(props) {
    let _tracks = props.trackData;

    const sortModes = {
        DEFAULT:           0,
        VALENCE:           1,
        VALENCE_BACK:      2,
        ENERGY:            3,
        ENERGY_BACK:       4,
        DANCEABILITY:      5,
        DANCEABILITY_BACK: 6,
        TEMPO:             7,
        TEMPO_BACK:        8
    }

    const [sortMode, setSortMode] = React.useState(sortModes.DEFAULT);

    function sortByNumber() {
        _tracks.sort((a, b) => {
            setSortMode(sortModes.DEFAULT);
            return a.number - b.number;
        });
    }

    function sortByValence() {
        _tracks.sort((a, b) => {
            if (sortMode == sortModes.VALENCE) {
                setSortMode(sortModes.VALENCE_BACK);
                return a.valence - b.valence;
            } else if (sortMode == sortModes.VALENCE_BACK) {
                setSortMode(sortModes.DEFAULT);
                return a.number - b.number;
            } else {
                setSortMode(sortModes.VALENCE);
                return b.valence - a.valence;
            }
        });
    }

    function sortByEnergy() {
        _tracks.sort((a, b) => {
            if (sortMode == sortModes.ENERGY) {
                setSortMode(sortModes.ENERGY_BACK);
                return a.energy - b.energy;
            } else if (sortMode == sortModes.ENERGY_BACK) {
                setSortMode(sortModes.DEFAULT);
                return a.number - b.number;
            } else {
                setSortMode(sortModes.ENERGY);
                return b.energy - a.energy;
            }
        });
    }

    function sortByDanceability() {
        _tracks.sort((a, b) => {
            if (sortMode == sortModes.DANCEABILITY) {
                setSortMode(sortModes.DANCEABILITY_BACK);
                return a.danceability - b.danceability;
            } else if (sortMode == sortModes.DANCEABILITY_BACK) {
                setSortMode(sortModes.DEFAULT);
                return a.number - b.number;
            } else {
                setSortMode(sortModes.DANCEABILITY);
                return b.danceability - a.danceability;
            }
        });
    }

    function sortByTempo() {
        _tracks.sort((a, b) => {
            if (sortMode == sortModes.TEMPO) {
                setSortMode(sortModes.TEMPO_BACK);
                return a.tempo - b.tempo;
            } else if (sortMode == sortModes.TEMPO_BACK) {
                setSortMode(sortModes.DEFAULT);
                return a.number - b.number;
            } else {
                setSortMode(sortModes.TEMPO);
                return b.tempo - a.tempo;
            }
        });
    }

    return (
        <div id='list-view'>
            <div id='list-header'>
                {/* Track heading -- click to sort */}
                <div className='header-item' id='header-track' onClick={() => sortByNumber()}>
                    TRACK
                </div>

                {/* Valence heading -- click to sort */}
                <div className='header-item' id='header-valence' onClick={() => sortByValence()}>
                    {sortMode == sortModes.VALENCE && (
                        <img src={down} width='10px' height='10px'/>
                    )}
                    {sortMode == sortModes.VALENCE_BACK && (
                        <img src={up} width='10px' height='10px'/>
                    )}
                    HAPPINESS
                </div>

                {/* Danceability heading -- click to sort */}
                <div className='header-item' id='header-danceability' onClick={() => sortByDanceability()}>
                {sortMode == sortModes.DANCEABILITY && (
                        <img src={down} width='10px' height='10px'/>
                    )}
                    {sortMode == sortModes.DANCEABILITY_BACK && (
                        <img src={up} width='10px' height='10px'/>
                    )}
                    DANCEABILITY
                </div>

                {/* Energy heading -- click to sort */}
                <div className='header-item' id='header-energy' onClick={() => sortByEnergy()}>
                {sortMode == sortModes.ENERGY && (
                        <img src={down} width='10px' height='10px'/>
                    )}
                    {sortMode == sortModes.ENERGY_BACK && (
                        <img src={up} width='10px' height='10px'/>
                    )}
                    ENERGY
                </div>

                {/* Tempo heading -- click to sort */}
                <div className='header-item' id='header-tempo' onClick={() => sortByTempo()}>
                {sortMode == sortModes.TEMPO && (
                        <img src={down} width='10px' height='10px'/>
                    )}
                    {sortMode == sortModes.TEMPO_BACK && (
                        <img src={up} width='10px' height='10px'/>
                    )}
                    TEMPO
                </div>
            </div>

            <div className='track-list'>
                {props.trackData.map((track, i) => (
                    <div className={`track color${i%2 + 1}`}>
                        <p className='track-name'>{track.number}. {track.name}</p>

                        <div className='stat-container'>
                            <div className='track-stat'>
                                <p className='stat-value'>{Math.round(track.valence)}</p>
                            </div>

                            <div className='track-stat'>
                                <p className='stat-value'>{Math.round(track.danceability)}</p>
                            </div>

                            <div className='track-stat track-energy'>
                                <p className='stat-value'>{Math.round(track.energy)}</p>
                            </div>

                            <div className='track-stat'>
                                <p className='stat-value'>{track.tempo} BPM</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackList;