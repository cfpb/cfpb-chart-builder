'use strict';

// This script simply retrieves colors for a color scheme

var colorScheme = {
  blue: {
    primary: '#0072CE',
    secondary: '#328ED8'
  },
  green: {
    primary: '#2CB34A',
    secondary: '#ADDC91'
  },
  navy: {
    primary: '#002D72',
    secondary: '#33578E'
  },
  teal: {
    primary: '#005E5D',
    secondary: '#337E7D'
  }
}

var getColorScheme = function( color ) {
  return colorScheme[color];
}

module.exports = getColorScheme;
