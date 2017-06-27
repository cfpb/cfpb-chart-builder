'use strict';

var green50 = '#bae0a2';
var green20 = '#e2efd8';
var gray80 = '#75787b';
var gray5 = '#f7f8f9';
var pacific20 = '#d6e8fa';
var pacific50 = '#96c4ed';

function getColorByValue( value ) {

  if ( value < -15 ) {
    return pacific50;
  }
  if ( value < -5 ) {
    return pacific20;
  }
  if ( value < 6 ) {
    return gray5;
  }
  if ( value < 16 ) {
    return green20;
  }
  return green50;
}

module.exports = {
  getColorByValue: getColorByValue,
  green50: green50,
  green20: green20,
  gray80: gray80,
  gray5: gray5,
  pacific20: pacific20,
  pacific50: pacific50
};
