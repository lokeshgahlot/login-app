# react-webpack-4-boilerplate

## Setup steps
- Clone this repro `git clone git@github.com:lokeshgahlot/webpack4-boilerplate.git`
- Run `npm i` command, it downloads all dependencies 
- Use `npm run dev` command to run the project in development environment.
- Use `npm run build` command to run the project in production environment.
- Build creates bundle.[chunkhash].js and bundle.[chunkhash].css in the public folder.

## This setup does following tasks
1 - Handles Javascript/ES6/React code with both .js and .jsx file extensions; should output a single ES5 .js bundle with a unique hash added to the filename.
2 - Handles SCSS code with .scss extensions and outputs a single .css file with a unique hash added to the filename.
3 - Handles IMG file with .jpeg, .jpg, .png, and .gif extensions; should return a link referencing the file
4 - Handles SVG file with .svg extension; return a base-64 data-encoded string if the file is < 1mb and a link to the file otherwise.