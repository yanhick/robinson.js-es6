
let expect = require('chai').expect;

let Canvas = require('../../lib/painting/canvas');
let Color = require('../../lib/css/color');
let Rect = require('../../lib/layout/rect');
let DisplayCommand = require('../../lib/painting/display-command');

describe('painting', function () {
    describe('#paintItem', function () {
        it('should paint a display command', function () {
            let canvas = new Canvas(1, 1);

            canvas.paintItem(new DisplayCommand().SolidColor(
                new Color(0, 0, 0, 0),
                new Rect(0, 0, 1, 1)
            ));

            expect(canvas.pixels).to.eql([{
                r: 0,
                g: 0,
                b: 0,
                a: 0
            }]);
        });
    });
});
