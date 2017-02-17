
# CFPB Chart Builder [![Build Status](https://travis-ci.org/cfpb/cfpb-chart-builder.svg?branch=master)](https://travis-ci.org/cfpb/cfpb-chart-builder) [![Coverage Status](https://coveralls.io/repos/github/cfpb/cfpb-chart-builder/badge.svg?branch=master)](https://coveralls.io/github/cfpb/cfpb-chart-builder?branch=master) [![Sauce Test Status](https://saucelabs.com/browser-matrix/cct-sauce.svg)](https://saucelabs.com/u/cct-sauce)

Charts for the [Consumer Financial Protection Bureau](https://cfpb.github.io/).

## Dependencies

- [Gulp](http://gulpjs.com): task runner for pulling in assets,
  linting and concatenating code, etc.
- [Less](http://lesscss.org): CSS pre-processor.
- [Capital Framework](https://cfpb.github.io/capital-framework/getting-started):
  User interface pattern-library produced by the CFPB.

## Installation

Run `npm install cfpb-chart-builder` to add this library to your project.

Add a `div` with a class of `cfpb-chart` and the following data attributes to your page:

```
<div class="cfpb-chart"
     data-chart-type="line"
     data-chart-title="Number of Originations (in millions)"
     data-chart-description="Auto loan originations decreased in 2016."
     data-chart-color="green"
     data-chart-metadata="Number of Loans"
     data-chart-source="consumer-credit-trends/auto-loans.csv">
     Auto loan originations decreased in 2016.
</div>
```

Add the library to your page:

```
<script type="text/javascript" src="dist/cfpb-chart-builder.min.js"></script>
```

It'll generate a chart for you:

![Screenshot](screenshot.png)

It can also do bar charts and maps.

## Configuration

TBA: Documentation for charts options coming soon!

## Contributing

We welcome your feedback and contributions. See the
[contribution guidelines](https://github.com/cfpb/open-source-project-template/blob/master/CONTRIBUTING.md)
for more details.

### Install locally

1. Install [Node.js](http://nodejs.org) however you'd like.
2. Install [Gulp](http://gulpjs.com) and [Bower](http://bower.io):
  ```bash
  npm install -g gulp bower
  ```
3. Next, install the dependencies and compile the project with:
  ```bash
  ./setup.sh
  ```
  __NOTE:__ To re-install and rebuild all the site’s assets run
  `./setup.sh` again. See the [usage](#usage) section on updating all the
  project dependencies.

### Development usage

Each time you fetch from the upstream repository (this repo), run `./setup.sh`.
This setup script will remove and re-install the project dependencies and
rebuild the site's JavaScript and CSS assets.

To watch for changes in the source code and automatically update the running site,
open a terminal and run:

```bash
gulp watch
```

### Non gulp development workflow

1. Clone this repository.
1. `npm install`
1. `npm run watch` to bundle the JS and output it to `dist/`.
1. `npm start` to serve the test directory.
1. Open `http://localhost:8088/test` in a browser to see the test page with a dozen random charts on it.
1. Whenever a JS file in `src/` is edited, the JS will be rebundled. Refresh the page.

Bonus: Visit `http://localhost:8088/test/all-charts.html` to see *all* the CCT charts.

Helpful commands:

- `npm run build` - Bundle and minify all assets into the `dist/` directory.
- `npm run watch` - Bundle JS files whenever they're changed.
- `npm start` - Start a local server to demo the charts at `http://localhost:8088/test`.
- `npm test` - Run the test charts through Sauce Labs.
- `npm run lint` - Check JS files for syntax errors using the rules in `.eslintrc`.

## Testing

Sauce Labs is used to test the charts in IE 8 through 10.
An [Open Sauce](https://saucelabs.com/open-source) account has been created for this repo.
Its credentials can be found at https://GHE/gist/contolini/504ea71f6a19c74090c7a150aff60421.

1. `cp test/config.json.example test/config.json`
1. Add valid Sauce Labs credentials to `test/config.json` (see above gist).
1. `npm test`

The browser tests will take several minutes to run.
The test script simply loads `http://localhost:8088/test` in IE VMs and reports any `window` errors.


## How to test the software

After running `./setup.sh` or compiling with Gulp,
you can view the site in a browser by opening `/dist/index.html`.
Alternatively, you may want to use a local server with something like
`python -m SimpleHTTPServer`.

## Known issues

_Document any known significant shortcomings with the software._

## Getting help

_Instruct users how to get help with this software; this might include links
to an issue tracker, wiki, mailing list, etc._

Use the issue tracker to follow the development conversation.
If you find a bug not listed in the issue tracker, please file a bug report.

## Getting involved

We welcome your feedback and contributions. See the
[contribution guidelines](https://github.com/cfpb/open-source-project-template/blob/master/CONTRIBUTING.md)
for more details.

Additionally, you may want to consider
[contributing to the Capital Framework](https://cfpb.github.io/capital-framework/contributing/),
which is the front-end pattern library used in this project.


----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)


----

## Credits and references

1. Projects that inspired you
2. Related projects
3. Books, papers, talks, or other sources that have meaniginful impact or
   influence on this project
