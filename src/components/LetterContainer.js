import React from 'react';

export default function Letter (props) {
  let lettersToChooseFrom = [];
  let randomLetter;

  //find a random array index to place the correct letter
  const randomInsertionPoint = Math.floor(Math.random() * props.numLettersToDisplay);

  while(lettersToChooseFrom.length < props.numLettersToDisplay) { //iterate until letter array is full
    if(lettersToChooseFrom.length === randomInsertionPoint) //if at random array index, insert correct letter there
      lettersToChooseFrom.push(props.chosenLetter);
    else {
      //select random letter from array of availableLetters (inherited from App state)
      randomLetter = props.avlblLetters[Math.floor(Math.random() * (props.avlblLetters.length))];
      if(randomLetter !== props.chosenLetter)
        if(lettersToChooseFrom.indexOf(randomLetter) === -1) //if letter hasn't already been chosen
          lettersToChooseFrom.push(randomLetter);
    }
  }

  return (
    <div id='letterContainer'>
      {lettersToChooseFrom.map((letter) => {
        if(letter !== props.chosenLetter) {
          return (
            <button
              key={letter}
              onClick={() => props.handleSkipAward(props.chosenAward.name)}
              className='letter'
            >{letter.toUpperCase()}</button>
          );
        } else {
          return (
            <button
              key={letter}
              onClick={() => props.handleActivateAward(props.chosenAward.name)}
              className='letter'
            >{letter.toUpperCase()}</button>
          );
        }
      })}
    </div>
  )
}
