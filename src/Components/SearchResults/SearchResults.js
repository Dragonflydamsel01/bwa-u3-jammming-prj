import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component{
  render(){

    return(
      <div className="SearchResults">
        <h2>Results</h2>
        {/*Add a TrackList component. The "this" values are steps 33 and 43 respectively */}
        <TrackList tracks = {this.props.SearchResults} onAdd = {this.props.onAdd} />
        </div>
    );

  }

}
export default SearchResults;
