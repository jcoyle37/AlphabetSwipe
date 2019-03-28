import React, { Component } from 'react';
import Award from './Award';
import AwardCollection from './AwardCollection';
import ProgressBar from './ProgressBar';
import Stats from './Stats';
let awardJSON = require('../awards.json');

function ChangeViewBtn(props) {
  return (
    <button
      className='changeViewBtn'
      onClick={() => props.handleChangeView(props.changeTo)}
    >{props.text}</button>
  )
}

function Backpack() {
  return (
    <img
      id='backpack'
      alt=''
      src='https://openclipart.org/download/101599/mochila.svg'
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    awardJSON.awards.forEach(function(awardObj) { //append default values to each award
      Object.assign(awardObj, {
        awarded: false,
        numIncorrect: 0,
        timesPlayed: 0
      });
    });

    this.state = {
      availableLetters: ['t', 'n', 'o', 'd', 'g', 'm', 'a', 's'], //only use words starting with these letters
      numLettersToDisplay: 4, //number of letter buttons to show at bottom (note: 'availableLetters' array
                              //length must be equal to or greater than this number)
      numRounds: 10,
      awards: awardJSON.awards,
      currRound: 0,
      currView: 'game'
    };

    this.handleActivateAward = this.handleActivateAward.bind(this);
    this.handleSkipAward = this.handleSkipAward.bind(this);
    this.handleRestartGame = this.handleRestartGame.bind(this);
    this.handleEndGameEarly = this.handleEndGameEarly.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
  }
  handleActivateAward(name) {
    window.$('button.letter').attr('disabled', true); //prevent multiple clicks
    document.getElementById('awardDisplay').style.animationName = 'stashInBackpack';

    setTimeout(() => { //let animation play
      document.getElementById('awardDisplay').style.animationName = 'slideIn';

      this.setState((currentState) => {
        return {
          awards: currentState.awards.map((award) => {
            if(award.name === name) {
              award.awarded = true;
              award.timesPlayed += 1;
            }

            return award;
          }),
          currRound: currentState.currRound += 1
        }
      });

      window.$('button.letter').attr('disabled', false);
    }, 1000);
  }
  handleSkipAward(name) {
    window.$('button.letter').attr('disabled', true); //prevent multiple clicks
    document.getElementById('awardDisplay').style.animationName = 'runAway';

    setTimeout(() => { //let animation play
      document.getElementById('awardDisplay').style.animationName = 'slideIn';

      this.setState((currentState) => {
        return {
          awards: currentState.awards.map((award) => {
            if(award.name === name) {
              award.numIncorrect += 1;
              award.timesPlayed += 1;
            }

            return award;
          }),
          currRound: currentState.currRound += 1
        };
      });

      window.$('button.letter').attr('disabled', false);
    }, 1000);
  }
  handleRestartGame() {
    this.setState((currentState) => {
      return {
        awards: currentState.awards.map((award) => { //set all awards to unearned
          if(award.awarded === true)
            award.awarded = false;

          return award;
        }),
        currRound: 0
      };
    });
  }
  handleEndGameEarly() {
    this.setState((currentState) => {
      return {
        currRound: currentState.numRounds
      };
    });

    alert("Congratulations...you've won all the awards!");
  }
  handleChangeView(newView) {
    this.setState((currentState) => {
      return {
        currView: newView
      };
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.numRounds === this.state.currRound) { //if last round complete
      window.$("#awardCollection img.award")
        .draggable() //make awards draggable
        .on('mouseup click', (evt) => {
          //make target take the highest z-index
          let maxZindex = 1;

          window.$('#awardCollection img.award').each(function() {
            const thisZindex = parseInt(this.style.zIndex);
            if(thisZindex > maxZindex)
              maxZindex = thisZindex;
          });

          evt.target.style.zIndex = maxZindex + 1;
        }
      );
    }
  }
  render() {
    if(this.state.currView === 'game') {
      if(this.state.numRounds === this.state.currRound) { //if final round complete
        return (
          <div>
            <ChangeViewBtn
              text='View Stats'
              changeTo='stats'
              handleChangeView={this.handleChangeView}
            />

            <AwardCollection
              awards={this.state.awards.filter((award) => award.awarded === true)}
            />

            <Backpack />

            <button
              id='playAgainBtn'
              onClick={this.handleRestartGame}
            ></button>
          </div>
        )
      }
      else {
        return (
          <div>
            <ChangeViewBtn
              text='View Stats'
              changeTo='stats'
              handleChangeView={this.handleChangeView}
            />

            <ProgressBar
              numRounds={this.state.numRounds}
              currRound={this.state.currRound}
            />

            <Award
              avlblAwards={this.state.awards}
              avlblLetters={this.state.availableLetters}
              handleActivateAward={this.handleActivateAward}
              handleSkipAward={this.handleSkipAward}
              handleEndGameEarly={this.handleEndGame}
              numLettersToDisplay={this.state.numLettersToDisplay}
            />

            <Backpack />
          </div>
        );
      }
    } else if(this.state.currView === 'stats') {
      return (
        <div>
          <ChangeViewBtn
            text='Return to Game'
            changeTo='game'
            handleChangeView={this.handleChangeView}
          />

          <Stats
            awards={this.state.awards}
          />
        </div>
      );
    }
  }
}

export default App;
