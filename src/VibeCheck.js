import React from 'react';
import * as $ from "jquery";
import './App.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import { render } from '@testing-library/react';

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// app data
const clientID = "75866d496692487bad2a4d1c7eeb8bca";
const redirectUri = "http://localhost:3000";
const searchURL = "https://api.spotify.com/v1/search?q="
const scopes = [

];

// hash url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

function VibeCheck() {
  const states = {
    LOGIN:   'login',
    SEARCH:  'search',
    RESULTS: 'results',
    ALBUM:   'album'
  }

  const [token, setToken]     = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [tracks, setTracks]   = React.useState([]);
  const [album, setAlbum]     = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [state, setState] = React.useState(states.LOGIN);

  React.useEffect(() => {
    let _token = hash.access_token;
    if (_token && token != null) {
      setToken(_token);
      setState(states.SEARCH);
    }
  })

  // search albums for term, return list of albums
  function searchForAlbum(album) {
    // replace spaces with '%20'
    let formattedAlbumStr = album.replace(/ /g, '%20');

    $.ajax({
      url: `${searchURL}${formattedAlbumStr}&type=album&market=US`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token)
      },
      success: (data) => {
        console.log(data)
        setResults(data.albums.items);
        setSearchTerm(album);
        setState(states.RESULTS);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  function getTracksFromAlbum(album) {
    let _tracks = [];
    let _token = token;
    let albumTracks = $.ajax({
      url: `https://api.spotify.com/v1/albums/${album.id}/tracks`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + _token)
      }
    });

    albumTracks.done((trackData) => {
      let trackIDs = ''
      for (let i = 0; i < trackData.items.length; i++) {
        if (i === 0) {
          trackIDs += trackData.items[i].id;
        } else {
          trackIDs += `,${trackData.items[i].id}`
        }
      }

      let trackFeatures = $.ajax({
        url: `https://api.spotify.com/v1/audio-features/?ids=${trackIDs}`,
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + _token)
        }
      })

      trackFeatures.done((featureData) => {
        for (let i = 0; i < featureData.audio_features.length; i++) {
          let currentTrack = featureData.audio_features[i]
          _tracks.push({
            name:             trackData.items[i].name,
            danceability:     currentTrack.danceability,
            energy:           currentTrack.energy,
            acousticness:     currentTrack.acousticness,
            instrumentalness: currentTrack.instrumentalness,
            valence:          currentTrack.valence,
            tempo:            currentTrack.tempo + ' BPM',
          })
        }

        setTracks(_tracks);
        setAlbum(album);
      });
    });
  }

  function albumToResults() {
    setState(states.RESULTS);
    setAlbum('');
    setTracks([]);
  }

  function resultsToSearch() {
    setState(states.SEARCH);
    setResults([]);
    setTracks([]);
    setSearchTerm('');
  }

  return (
    <div id='App'>
      <Header state={state} />

      {!token && (
          <a
            href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}

        {state === states.SEARCH && (
          <SearchPage
            search={searchForAlbum}
          />
        )}

        {state === states.RESULTS && (
          <ResultsPage
            results={results}
            searchTerm={searchTerm}
            getTracks={getTracksFromAlbum}
          />
        )}

        {state === states.ALBUM && (
          <AlbumPage
            tracks={tracks}
            album={album}
          />
        )}

        <Footer />
    </div>
  )
}

export default VibeCheck;