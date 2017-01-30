'use strict';

// This script simply retrieves colors for a color scheme

var colorScheme = {
  blue: {
    primary: '#0072ce',
    secondary: '#4497dc'
  },
  green: {
    primary: '#20aa3f',
    secondary: '#66c368'
  },
  navy: {
    primary: '#254b87',
    secondary: '#5674a3'
  },
  teal: {
    primary: '#257675',
    secondary: '#579695'
  }
};

var getColorScheme = function( color ) {
  return colorScheme[color];
};

module.exports = getColorScheme;
