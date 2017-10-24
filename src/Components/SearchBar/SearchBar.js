import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor (props){
    super(props);

    //this.state is not explicitly in the instructions. I wonder if this was what the redundant step 72 should have been
    this.state = {
      term: '',
    };

    this.search = this.search.bind(this); //step 70 and 72. Don't get the redundancy
    this.handleTermChange = this.handleTermChange.bind(this); //wasn't in instruction. Maybe that was the error
  }
  //step 69
  search(){
    this.props.onSearch(this.state.term);
  }

  /*step 70, like the one in Yelp */
  handleTermChange(event){
    this.setState({term: event.target.value});
  }

  render(){
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
         onChange = {this.handleTermChange}
         />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }//end render
}

export default SearchBar;
