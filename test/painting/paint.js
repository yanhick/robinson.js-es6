
let expect = require('chai').expect;
let HTMLParser = require('../../lib/html');
let CSSParser = require('../../lib/css');
let styleTree = require('../../lib/style');
let layoutTree = require('../../lib/layout');
let Dimensions = require('../../lib/layout/dimensions');
let Rect = require('../../lib/layout/rect');
let EdgeSize = require('../../lib/layout/edge-size');
let paint = require('../../lib/painting/paint');

describe('paint', function () {
    it('should paint the layout tree onto a canvas', function () {

        let rootElement = new HTMLParser().parse('<html><body></body></html>');
        let stylesheet = new CSSParser().parse('{display: block;} body {background: #FF0000; width: 1px; height: 1px;}');
        let styledTree = styleTree(rootElement, stylesheet);

        let laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 1, 1),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        let bounds = new Rect(0, 0, 1, 1);
        let canvas = paint(laidoutTree, bounds);

        expect(canvas.pixels).to.eql([{
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }]);
    });

    it('should paint layout tree with borders onto a canvas', function () {

        let rootElement = new HTMLParser().parse('<html><body></body></html>');
        let stylesheet = new CSSParser().parse('{display: block;} body {border-color: #FF0000; border-left-width: 1px; width: 1px; height: 2px;}');
        let styledTree = styleTree(rootElement, stylesheet);

        let laidoutTree = layoutTree(styledTree, new Dimensions(
            new Rect(0, 0, 2, 2),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0),
            new EdgeSize(0, 0, 0, 0)
        ));

        let bounds = new Rect(0, 0, 2, 2);
        let canvas = paint(laidoutTree, bounds);

        expect(canvas.pixels).to.eql([{
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }, {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }, {
            r: 255,
            g: 0,
            b: 0,
            a: 255
        }, {
            r: 255,
            g: 255,
            b: 255,
            a: 255
        }]);
    });
});
