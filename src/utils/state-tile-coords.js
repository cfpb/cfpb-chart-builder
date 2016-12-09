'use strict';

var stateCoords = {    
  AK: [ 1, 7 ],
  AL: [ 6, 6 ],
  AR: [ 4, 5 ],
  AZ: [ 1, 5 ],
  CA: [ 0, 4 ],
  CO: [ 2, 4 ],
  CT: [ 9, 3 ],
  DC: [ 8, 5 ],
  DE: [ 9, 4 ],
  FL: [ 8, 7 ],
  GA: [ 7, 6 ],
  HI: [ 0, 7 ],
  IA: [ 4, 3 ],
  ID: [ 1, 2 ],
  IL: [ 5, 2 ],
  IN: [ 5, 3 ],
  KS: [ 3, 5 ],
  KY: [ 5, 4 ],
  LA: [ 4, 6 ],
  MA: [ 9, 2 ],
  MD: [ 8, 4 ],
  ME: [ 10, 0 ],
  MI: [ 6, 2 ],
  MN: [ 4, 2 ],
  MO: [ 4, 4 ],
  MS: [ 5, 6 ],
  MT: [ 2, 2 ],
  NC: [ 6, 5 ],
  ND: [ 3, 2 ],
  NE: [ 3, 4 ],
  NH: [ 10, 1 ],
  NJ: [ 8, 3 ],
  NM: [ 2, 5 ],
  NV: [ 1, 3 ],
  NY: [ 8, 2 ],
  OH: [ 6, 3 ],
  OK: [ 3, 6 ],
  OR: [ 0, 3 ],
  PA: [ 7, 3 ],
  RI: [ 10, 3 ],
  SC: [ 7, 5 ],
  SD: [ 3, 3 ],
  TN: [ 5, 5 ],
  TX: [ 3, 7 ],
  UT: [ 1, 4 ],
  VA: [ 7, 4 ],
  VT: [ 9, 1 ],
  WA: [ 0, 2 ],
  WI: [ 5, 1 ],
  WV: [ 6, 4 ],
  WY: [ 2, 3 ]
};

function stateTileCoords( state ) {
  if ( stateCoords.hasOwnProperty( state ) ) {
    return stateCoords[state];
  }

  return false;
}

module.exports = stateTileCoords;