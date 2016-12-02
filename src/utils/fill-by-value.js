'use strict';


function fillByValue( value, valueGrid ) {
  if ( typeof valueGrid === 'undefined' ) {
    console.log( 'wat' );
    return '#bbdca2';
  }
  for (var i = 0; i < valueGrid.length; i++ ) {
    var max = valueGrid[i].maxValue;
    console.log( value, max );
    if ( value < max || typeof max !== 'number' ) {
      return valueGrid[i].fillColor;
    }
  }
}

module.exports = fillByValue;