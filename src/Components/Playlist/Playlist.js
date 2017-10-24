import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';


 class Playlist extends React.Component{
  constructor(props){
    super(props);
    //no, this is the wrong instruction. should be what's below this.onNameChange = this.onNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){
    this.props.onNameChange(event.target.value)
  } // step 59

  render(){
    return(
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange = {this.handleNameChange} />
        {/*Add a TrackList component step 39. Step 65 add this.props.onSave */}
        <TrackList tracks = {this.props.playlistTracks}
        onRemove = {this.props.onRemove} />
        <a className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
