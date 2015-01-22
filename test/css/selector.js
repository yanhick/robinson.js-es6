
let expect = require('chai').expect;

let Selector = require('../../lib/css/selector');
let SimpleSelector = require('../../lib/css/simple-selector');

describe('selector', function () {
    it('should allow retrieving the specificity of the selector', function () {
        let simpleSelector = new SimpleSelector('div', 'my-id', ['my-class']);
        let selector = new Selector().SimpleSelector(simpleSelector);

        expect(selector.specificity()).to.eql({
            a: 1,
            b: 1,
            c: 1
        });
    });
});
