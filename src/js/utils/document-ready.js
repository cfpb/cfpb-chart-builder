/**
 * Run a function after the DOM has finished loading.
 * @param  {Function} fn - A function to run after the document has loaded.
 */
function ready( fn ) {
  if ( document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading' ) {
    fn();
  } else {
    document.addEventListener( 'DOMContentLoaded', fn );
  }
}

export default ready;
