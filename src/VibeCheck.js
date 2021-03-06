import React from 'react';
import * as $ from "jquery";
import './App.css'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SearchPage from './components/SearchPage/SearchPage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import AlbumPage from './components/AlbumPage/AlbumPage';
import { render } from '@testing-library/react';

// app data (is this even working?)
const clientID = `${process.env.REACT_APP_CLIENT_ID}`;
const clientSecret = `${process.env.REACT_APP_CLIENT_SECRET}`;
const searchURL = "https://api.spotify.com/v1/search?q="

function VibeCheck() {
  const modes = {
    SEARCH:  'search',
    RESULTS: 'results',
    ALBUM:   'album'
  }

  const [token, setToken]     = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [tracks, setTracks]   = React.useState([]);
  const [album, setAlbum]     = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [mode, setMode] = React.useState(null);

  React.useEffect(() => {
    $.ajax({
      url: `https://accounts.spotify.com/api/token`,
      type: "POST",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Basic " + (new Buffer(clientID + ':' + clientSecret).toString('base64')))
      },
      data: {
        grant_type: "client_credentials",
      },
      dataType: 'json',
      success: (data) => {
        setToken(data.access_token);
        setMode(modes.SEARCH);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }, []);

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
        setMode(modes.RESULTS);
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

      console.log(trackIDs);

      let trackFeatures = $.ajax({
        url: `https://api.spotify.com/v1/audio-features/?ids=${trackIDs}`,
        type: "GET",
        beforeSend: (xhr) => {
          xhr.setRequestHeader("Authorization", "Bearer " + _token)
        }
      })

      trackFeatures.fail((err) => {
        console.log(err);
      })

      trackFeatures.done((featureData) => {
        console.log("FEATUREDATA");
        for (let i = 0; i < featureData.audio_features.length; i++) {
          console.log(featureData);
          let currentTrack = featureData.audio_features[i]
          _tracks.push({
            name:             trackData.items[i].name,
            number:           i+1,
            danceability:     Math.round(currentTrack.danceability * 100),
            energy:           Math.round(currentTrack.energy * 100),
            acousticness:     Math.round(currentTrack.acousticness * 100),
            instrumentalness: Math.round(currentTrack.instrumentalness * 100),
            valence:          Math.round(currentTrack.valence * 100),
            tempo:            Math.round(currentTrack.tempo),
          })
        }

        setTracks(_tracks);
        setAlbum(album);
        setMode(modes.ALBUM);
      });
    });
  }

  function albumToResults() {
    setMode(modes.RESULTS);
    setAlbum('');
    setTracks([]);
  }

  function resultsToSearch() {
    setMode(modes.SEARCH);
    setResults([]);
    setTracks([]);
    setSearchTerm('');
  }

  return (
    <div id='App'>
      <Header 
        mode={mode}
        aToR={albumToResults}
        rToS={resultsToSearch}
      />

        {mode === modes.SEARCH && (
          <SearchPage
            search={searchForAlbum}
          />
        )}

        {mode === modes.RESULTS && (
          <ResultsPage
            results={results}
            searchTerm={searchTerm}
            getTracks={getTracksFromAlbum}
          />
        )}

        {mode === modes.ALBUM && (
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