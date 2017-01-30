'use strict';

// This script simply retrieves colors for a color scheme

var colorScheme = {
  blue: {
    primary: '#0072ce',
    secondary: '#7eb7e8'
  },
  green: {
    primary: '#20aa3f',
    secondary: '#addc91'
  },
  navy: {
    primary: '#254b87',
    secondary: '#889cc0'
  },
  teal: {
    primary: '#257675',
    secondary: '#89b6b5'
  }
};

var getColorScheme = function( color ) {
  return colorScheme[color];
};

module.exports = getColorScheme;
