/**
 * Get the first value that is a Number.
 * TODO: Returned value should be consistent.
 *       Refactor to return null when no number is found.
 *       Also, check the structure of array to fit with expections and
 *       throw error if it is wrong.
 *
 * @param {Array} array An array of Objects with values to check.
 * @returns {string} an actual Number, or false if none was found.
 */
function getFirstNumber( array ) {
  let val;
  for ( let x = 0, len = array.length; x < len; x++ ) {
    if ( !isNaN( array[x][1] ) ) {
      val = array[x][1];
      return val;
    }
  }
  return false;
}

module.exports = {
  getFirstNumber
};
