# CFPB Chart Builder [![Build Status](https://travis-ci.org/cfpb/cfpb-chart-builder.svg?branch=master)](https://travis-ci.org/cfpb/cfpb-chart-builder)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/cct-sauce.svg)](https://saucelabs.com/u/cct-sauce)

Charts for [Consumer Financial Protection Bureau](https://cfpb.github.io/).

![Screenshot](screenshot.png)

## Usage

Add a `div` with a class of `cfpb-chart` and the following data attributes to your page:

```
<div class="cfpb-chart"
     data-chart-type="line"
     data-chart-title="Number of Originations (in millions)"
     data-chart-description="Auto loan originations decreased in 2016."
     data-chart-source="consumer-credit-trends/auto-loans.csv">
     Auto loan originations decreased in 2016.
</div>
```

Add this library to your page:

```
<script type="text/javascript" src="dist/cfpb-chart-builder.min.js"></script>
```

It'll generate a chart for you:



## Configuration

TBD.

## Contributing

1. Clone this repository.
1. `npm install`
1. `npm run watch` to bundle the JS and output it to `dist/`.
1. `npm start` to serve the test directory.
1. Open `http://localhost:8088/test` in a browser to see the test page with lots of charts on it.
1. Whenever a JS file in `src/` is edited, the JS will be rebundled.

## Testing

Sauce Labs is used to test the charts in IE 8 through 10.

1. `export SAUCE_LABS_USERNAME=XXXXXXXXXX`
1. `export SAUCE_LABS_ACCESS_KEY=YYYYYYYYYY`
1. `npm test`

They'll take several minutes to run.
An [open source](https://saucelabs.com/open-source) account has been created for this repo.
Ask @contolini for the credentials.

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
