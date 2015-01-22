
let expect = require('chai').expect;
let Dimensions = require('../../lib/layout/dimensions');
let Rect = require('../../lib/layout/rect');
let EdgeSize = require('../../lib/layout/edge-size');

describe('dimensions', function () {
    describe('#paddingBox', function () {
        it('should return the content area + padding box', function () {
            let rect = new Rect(0, 0, 0, 0);
            let edge = new EdgeSize(10, 10, 10, 10);
            let dimensions = new Dimensions(rect, edge, edge, edge);

            let paddingBoxRect = dimensions.paddingBox();

            expect(paddingBoxRect.x).to.eql(-10);
            expect(paddingBoxRect.y).to.eql(-10);
            expect(paddingBoxRect.width).to.eql(20);
            expect(paddingBoxRect.height).to.eql(20);
        });
    });

    describe('#borderBox', function () {
        it('should return the content area + padding and border box', function () {
            let rect = new Rect(0, 0, 0, 0);
            let edge = new EdgeSize(10, 10, 10, 10);
            let dimensions = new Dimensions(rect, edge, edge, edge);

            let borderBoxRect = dimensions.borderBox();

            expect(borderBoxRect.x).to.eql(-20);
            expect(borderBoxRect.y).to.eql(-20);
            expect(borderBoxRect.width).to.eql(40);
            expect(borderBoxRect.height).to.eql(40);
        });
    });

    describe('#marginBox', function () {
        it('should return the content area + padding, border and margin box', function () {
            let rect = new Rect(0, 0, 0, 0);
            let edge = new EdgeSize(10, 10, 10, 10);
            let dimensions = new Dimensions(rect, edge, edge, edge);

            let marginBoxRect = dimensions.marginBox();

            expect(marginBoxRect.x).to.eql(-30);
            expect(marginBoxRect.y).to.eql(-30);
            expect(marginBoxRect.width).to.eql(60);
            expect(marginBoxRect.height).to.eql(60);
        });
    });
});
