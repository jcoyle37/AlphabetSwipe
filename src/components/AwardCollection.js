import React from 'react'

export default function AwardCollection(props) {
  return (
    <div id='awardCollection'>
      {props.awards.map((award) => {
        const randomPositionRight = Math.floor(Math.random() * 60) + 20;
        const randomPositionBottom = Math.floor(Math.random() * 48) + 32;

        const imgStyle = {
          right: randomPositionRight + '%',
          bottom: randomPositionBottom + '%'
        };

        return (
          <img
            key={award.name}
            alt=''
            className='award'
            src={award.src}
            style={imgStyle}
          />
        );
      })}
    </div>
  )
}
