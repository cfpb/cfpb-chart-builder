# Cfpb chart builder

Charts for the Consumer Financial Protection Bureau

![Screenshot](screenshot.png)

## Dependencies

- [Gulp](http://gulpjs.com): task runner for pulling in assets,
  linting and concatenating code, etc.
- [Less](http://lesscss.org): CSS pre-processor.
- [Capital Framework](https://cfpb.github.io/capital-framework/getting-started):
  User interface pattern-library produced by the CFPB.

**NOTE:** If you're new to Capital Framework, we encourage you to
[start here](https://cfpb.github.io/capital-framework/getting-started).

## Installation

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

## Configuration

_If the software is configurable, describe it in detail,
either here or in other documentation to which you link._

## Usage

Each time you fetch from the upstream repository (this repo), run `./setup.sh`.
This setup script will remove and re-install the project dependencies and
rebuild the site's JavaScript and CSS assets.

To watch for changes in the source code and automatically update the running site,
open a terminal and run:

```bash
gulp watch
```

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
