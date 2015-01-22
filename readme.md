[![Build Status](https://travis-ci.org/yanhick/robinson.js-es6.svg)](https://travis-ci.org/yanhick/robinson.js-es6)
[![Coverage Status](https://img.shields.io/coveralls/yanhick/robinson.js-es6.svg)](https://coveralls.io/r/yanhick/robinson.js-es6)
[![Code Climate](https://codeclimate.com/github/yanhick/robinson.js-es6/badges/gpa.svg)](https://codeclimate.com/github/yanhick/robinson.js-es6)

#Robinson.js

A node.js port of [Robinson](https://github.com/mbrubeck/robinson)

##Install

Clone this repo, then cd in it and:

```
npm install
```

##Usage

```
node index --html file.html --css file.css --output file.png
```

By default, robinson will load test.html and css.html from the ```examples``` directory and
save the rendered page to a file named ```output.png```.

##Test

```
npm test
```
