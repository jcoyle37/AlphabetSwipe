import React, { Component } from 'react';

class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //calculatedWith is a ratio of current round # to # of rounds, as a percentage
      calculatedWidth: (props.currRound/props.numRounds)*100
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const widthPercentage = (this.props.currRound/this.props.numRounds)*100;

    //if new calculatedWidth differs from previous calculatedWith, indicating a change in round #...
    if(prevState.calculatedWidth !== widthPercentage) {
      this.setState({
        calculatedWidth: widthPercentage
      });
    }
  }
  render() {
    const progressBarStyle = {
      width: this.state.calculatedWidth + '%'
    };

    return (
      <div id='progressBarContainer'>
        <div id='progressBar' style={progressBarStyle} />
      </div>
    )
  }
}

export default ProgressBar;
