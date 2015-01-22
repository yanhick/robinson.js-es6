let fs = require('fs');
let PNG = require('node-png').PNG;

// Parse command line options
let argv = require('yargs').argv;

let Rect = require('./layout/rect');
let EdgeSize = require('./layout/edge-size');
let Dimensions = require('./layout/dimensions');
let HTMLParser = require('./html');
let CSSParser = require('./css');
let style = require('./style');
let layout = require('./layout');
let paint = require('./painting/paint');

let readSource = function (filename, defaultFileName) {
    filename = filename || defaultFileName;

    return fs.readFileSync(filename, 'utf8');
};

// Read input files:
let html = readSource(argv.html || argv.h, 'examples/test.html');
let css = readSource(argv.css || argv.c, 'examples/test.css');

// Since we don't have an actual window, hard-code the "viewport" size.
let createInitialContainingBlock = function () {
    return new Dimensions(
        new Rect(0, 0, 800, 600),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0),
        new EdgeSize(0, 0, 0, 0)
    );
};

// Parsing and rendering:
let rootNode = new HTMLParser().parse(html);
let stylesheet = new CSSParser().parse(css);
let styleRoot = style(rootNode, stylesheet);
let layoutRoot = layout(styleRoot, createInitialContainingBlock());
let canvas = paint(layoutRoot, createInitialContainingBlock().content);

let data = [],
    pixels = canvas.pixels,
    pixel = null;

pixels.forEach(function(pixel) {
    data.push(pixel.r, pixel.g, pixel.b, pixel.a);
});

let png = new PNG({
    width: createInitialContainingBlock().content.width,
    height: createInitialContainingBlock().content.height,
    filterType: -1
});

png.data = new Buffer(data);

// Save an image:
png.pack().pipe(fs.createWriteStream(argv.output || argv.o || './output.png', 'binary'));
