/* ==========================================================================
   Settings for webpack JavaScript bundling system.
   ========================================================================== */

const TerserPlugin = require( 'terser-webpack-plugin' );
const envvars = require( './environment' ).envvars;

/* Commmon webpack 'module' option used in each configuration.
   Runs code through Babel and uses global supported browser list. */
const COMMON_MODULE_CONFIG = {
  rules: [ {
    exclude: [/node_modules/],
    use: {
      loader: 'babel-loader?cacheDirectory=true',
      options: {
        presets: [ [ '@babel/preset-env', {
          configPath: __dirname,
          /* Use useBuiltIns: 'usage' and set `debug: true` to see what
             scripts require polyfilling. */
          useBuiltIns: 'usage',
          corejs: 3,
          debug: false
        } ] ]
      }
    }
  } ]
};

/* Set warnings to true to show linter-style warnings.
   Set mangle to false and beautify to true to debug the output code. */
const COMMON_UGLIFY_CONFIG = new TerserPlugin( {
  cache: true,
  parallel: true,
  terserOptions: {
    ie8: false,
    ecma: 5,
    warnings: true,
    mangle: true,
    output: {
      comments: false,
      beautify: false
    }
  }
} );

const commonConf = {
  cache: true,
  module: COMMON_MODULE_CONFIG,
  mode: (() => envvars.NODE_ENV ? envvars.NODE_ENV : 'production')(),
  plugins: (() => {
    return envvars.NODE_ENV !== 'development' ? [COMMON_UGLIFY_CONFIG] : [];
  })(),
  stats: {
    warnings: true
  }
};

const demoConf = Object.assign( {}, commonConf );

module.exports = {
  commonConf,
  demoConf
};
