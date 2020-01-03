import React from 'react';

import * as $ from "jquery";
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import AlbumList from './components/AlbumList/AlbumList';
import SongList from './components/SongList/SongList';

import './App.css'

// endpoint for user authorization
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// app data
const clientID = "75866d496692487bad2a4d1c7eeb8bca";
const redirectUri = "http://localhost:3000";
const searchURL = "https://api.spotify.com/v1/search?q="
const scopes = [
  "playlist-read-private",
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
      tracks: [],
    }

    this.searchForAlbum = this.searchForAlbum.bind(this);
    this.getTracks = this.getTracks.bind(this);
    this.goBack = this.goBack.bind(this);
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

  goBack() {
    this.setState({
      results: [],
      tracks: [],
      term: '',
    });
  }

  getTracks(album) {
    let _tracks = [];
    let _token = this.state.token;
    let albumTracks = $.ajax({
      url: `https://api.spotify.com/v1/albums/${album}/tracks`,
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

        this.setState({ tracks: _tracks });
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        {!this.state.token && (
          <a
            href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
          </a>
        )}

        {this.state.token && this.state.tracks.length < 1  && this.state.results.length === 0 && (
          <SearchBar
            searchForAlbum={this.searchForAlbum}
          />
        )}

        {this.state.token && this.state.results.length > 0  && this.state.tracks.length == 0 && (
          <AlbumList
            albums={this.state.results}
            term={this.state.term}
            getTracks={this.getTracks}
          />
        )}

        {this.state.tracks.length > 0 && (
          <div>
            <SongList
              tracks={this.state.tracks}
              goBack={this.goBack}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App;
