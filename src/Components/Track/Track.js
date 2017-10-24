import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor (props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(event){ //step 45
    this.props.onAdd(this.props.track);
  }

  removeTrack(event){
    this.props.onRemove(this.props.track);
  }

  renderAction(){
    if(this.props.isRemoval){
      return (<a className="Track-action" onClick={this.removeTrack}>-</a>);
    }
    return (
      <a className="Track-action" onClick = {this.addTrack}>+</a>
    ); //step 47

  }//end renderAction

  render(){
   return(
      <div className="Track">
        <div className="Track-information">
        {/*step 35 */}
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {/* + or - will go here */}
        {this.renderAction()}
      </div>
    );
  }//end render
} // end Track

export default Track;
