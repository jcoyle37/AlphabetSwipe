import React from 'react'

export default function Stats(props) {
	const sortedAwards = props.awards.sort(compare); //sort awards by greatest number incorrect at top

  return (
    <div id='stats'>
      <table>
  			<thead>
  				<tr>
  					<th>Word</th>
  					<th>Times Played</th>
            <th>Incorrect Guesses</th>
  				</tr>
  			</thead>
  			<tbody>
          {sortedAwards.map(({name, numIncorrect, timesPlayed}) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{timesPlayed}</td>
              <td>{numIncorrect}</td>
            </tr>
          ))}
  			</tbody>
  		</table>
    </div>
  )
}

//sort array of objects by date (source: https://stackoverflow.com/a/1129270/2969615)
function compare(a,b) {
  if (a.numIncorrect < b.numIncorrect)
    return 1;
  if (a.numIncorrect > b.numIncorrect)
    return -1;
  return 0;
}
