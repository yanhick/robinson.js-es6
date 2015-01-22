
let expect = require('chai').expect;

let Rect = require('../../lib/layout/rect');
let EdgeSize = require('../../lib/layout/edge-size');

describe('rect', function () {
    describe('#expandedBy', function () {
        it('should be expanded by edges', function () {
            let rect = new Rect(0, 0, 100, 100);
            let expandedRect = rect.expandedBy(new EdgeSize(10, 20, 30, 40));

            expect(expandedRect.x).to.eql(-10);
            expect(expandedRect.y).to.eql(-30);
            expect(expandedRect.width).to.eql(130);
            expect(expandedRect.height).to.eql(170);
        });
    });
});
