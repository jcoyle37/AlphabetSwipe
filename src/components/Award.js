import React from 'react'
import LetterContainer from './LetterContainer';

export default function Award(props) {
  //create pool of awards that haven't been awarded yet
  const awardChoices = props.avlblAwards.filter((award) => award.awarded === false);

  if(awardChoices.length === 0) {
    props.handleEndGameEarly();
    return null;
  }

  let isAvlbl = false;
  let randomAward, firstLetter;

  while(!isAvlbl) { //loop until valid match found
    randomAward = awardChoices[Math.floor(Math.random() * (awardChoices.length))];

    firstLetter = randomAward.name.substr(0,1);

    //if award starts with a letter that's in App "availableLetters" state, use it
    if(props.avlblLetters.indexOf(firstLetter) !== -1) isAvlbl = true;
  }

  return (
    <div>
      <img
        id='awardDisplay'
        alt=''
        src={randomAward.src}
      />

      <LetterContainer
        chosenLetter={firstLetter}
        chosenAward={randomAward}
        avlblLetters={props.avlblLetters}
        handleActivateAward={props.handleActivateAward}
        handleSkipAward={props.handleSkipAward}
        numLettersToDisplay={props.numLettersToDisplay}
      />
    </div>
  )
}
