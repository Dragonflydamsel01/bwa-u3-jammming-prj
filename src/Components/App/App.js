import React, { Component } from 'react';
//
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends Component {
  //step 30
  constructor (props){
    super(props);
    this.state = {
      searchResults: ['term'], // Step 88 input the value resolved to the promise in the Spotify module
      playlistName: 'Playlist',
      playlistTracks: [//Step 37 Add hard-coded values for playlistName and playlistTracks to state
        "id": 'track.id',
        "name": 'track.name',
        "artist": 'track.artist',
        "album": 'track.album'
      ]

    };
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this); //step 50
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this); //step 68
  }

  //step 41, create an add track method that will add a track when a user clicks the plus sign
  addTrack(track){
    let tracks = this.state.playlistTracks;
    let updatedPlaylist = this.state.playlistTracks.concat(track);
    let id = this.state.playlistTracks.length + 1;
    let found = this.state.playlistTracks.some(function (el) {
      return el.track === track;
    });
    if (!found) {

        return updatedPlaylist;
    }

    this.setState({ playlistTracks: updatedPlaylist  });
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks:tracks});

  }

  updatePlaylistName(name){
    this.setState({ playlistName: name});
  }

  /* step 63 create a method that generates an array of uri values from playlistTracks property.
  Step 95, update the method with the addition of the savePlaylist method from the Spotify module.
  Just like with search below you pass in the parameters */
  savePlaylist(){
    let trackUris = this.props.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        searchResults: []
      });
    });
  }

  /*step 64, create a search method that accepts a search term and logs it to the console.
  Step 88, update using the Yelp model */
  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({
        searchResults: searchResults
      });
    });

  }

  render() {
    return (
      <div>
         <h1>Ja<span className="highlight">mmm</span>ing</h1>

        <div className="App">
          <header className="App-header">
          <img src={'./public/favicon.ico'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          </header>

          <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          </p>
           {/* Add a SearchBar component */}
           <SearchBar onSearch = {this.search} />

          <div className="App-playlist">
           {/*Add a SearchResults component step 32 and 42 add the "this" values */}
           <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack} />
           {/* Add a Playlist component step 38 */}
           <Playlist playlistTracks ={this.state.playlistTracks}
             onRemove = {this.removeTrack} //step 50
             onSave = {this.savePlaylist} //step 64
             playlistName ={this.state.playlistName}
             onNameChange = {this.updatePlaylistName}
            />
          </div>//end App-playlist div
        </div>//end App div
      </div>//end first div
    )

  }
}

export default App;
