import React from 'react';

import * as $ from "jquery";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//OLD
//import SearchBar from './components/SearchBar/SearchBar';
//import AlbumList from './components/AlbumList/AlbumList';
//import SongList from './components/SongList/SongList';

//NEW
import SearchPage from './components/SearchPage/SearchPage';
import ResultsPage from './components/ResultsPage/ResultsPage';
import AlbumPage from './components/AlbumPage/AlbumPage';

import './App.css'

// endpoint for user authorization
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

class App extends React.Component {
  // constructor (duh)
  constructor() {
    super();
    this.state = {
      token: null,
      results: [],
      term: '',
      album: '',
      tracks: [],
    }

    // bind functions
    this.searchForAlbum = this.searchForAlbum.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.goBack = this.goBack.bind(this);
    this.albumToResults = this.albumToResults.bind(this);
  }

  // sets token
  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token,
      });
    }
  }

  // search albums for term, return list of albums
  searchForAlbum(album) {
    let formattedAlbumStr = album.replace(/ /g, '%20');

    $.ajax({
      url: `${searchURL}${formattedAlbumStr}&type=album&market=US`,
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + this.state.token)
      },
      success: (data) => {
        console.log(data)
        this.setState({
          results: data.albums.items,
          term: album,
        });
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  // go from album screen to results screen
  albumToResults() {
    this.setState({
      tracks: '',
      album: '',
    });
  }

  // go from results screen to home
  goBack() {
    this.setState({
      results: [],
      tracks: [],
      term: '',
    });
  }

  // go to album screen from results screen
  getTracks(album) {
    let _tracks = [];
    let _token = this.state.token;
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

        this.setState({ 
          tracks: _tracks,
          album: album,
        });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* SHOW LOGIN PROMPT */}
        {!this.state.token && (
          <a
            href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}

        {/* SHOW SEARCH PAGE */}
        {this.state.token && this.state.tracks.length < 1  && this.state.results.length === 0 && (
          <SearchPage
            searchForAlbum={this.searchForAlbum}
          />
        )}

        {/* SHOW RESULTS PAGE */}
        {this.state.token && this.state.results.length > 0  && this.state.tracks.length == 0 && (
          <ResultsPage
            albums={this.state.results}
            term={this.state.term}
            getTracks={this.getTracks}
            goBack={this.goBack}
          />
        )}

        {/* SHOW ALBUM PAGE */}
        {this.state.tracks.length > 0 && (
            <AlbumPage
              tracks={this.state.tracks}
              album={this.state.album}
              goBack={this.albumToResults}
            />
        )}

        <Footer />
      </div>
    )
  }
}

export default App;
