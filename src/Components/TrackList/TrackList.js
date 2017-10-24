import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
  render(){

    return(
      <div className="TrackList">
        {/* Step 34 You will add a map method that renders a set of Track components */}
        {
          this.props.tracks&&this.props.tracks.map(track => {
          return <Track track = {track} key = {track.id} onAdd = {this.props.onAdd}
          onRemove = {this.props.onRemove} />//step 51
        })//step 44. Note that a “key” is a special string attribute you need to include when creating lists of elements.

      }

      </div>
    );
  }
}

export default TrackList
