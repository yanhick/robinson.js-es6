
let expect = require('chai').expect;

let Value = require('../../lib/css/value');
let Unit = require('../../lib/css/unit');
let Color = require('../../lib/css/color');

describe('value', function () {
    describe('#toPx', function () {
        it('should return the size of a length in px', function () {
            let length = new Value().Length(1.0, new Unit().Px());

            expect(length.toPx()).to.eql(1.0);
        });

        it('should return 0 for none length value', function () {
            let keyword = new Value().Keyword('auto');

            expect(keyword.toPx()).to.eql(0);
        });
    });
});
