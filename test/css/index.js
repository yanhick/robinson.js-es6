
let expect = require('chai').expect;

let CSSParser = require('../../lib/css');

describe('css parser', function () {
    it('should parse name selector', function () {
        let stylesheet = new CSSParser().parse('div {foo:bar;}');

        expect(stylesheet.rules).to.exists;
        expect(stylesheet.rules).have.length(1);
        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: 'div',
            id: null,
            className: []
        });
        expect(stylesheet.rules[0].declarations[0]).to.have.property('name', 'foo');
        expect(stylesheet.rules[0].declarations[0]).to.have.property('value');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('type', 'keyword');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('value', 'bar');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('toPx');
    });

    it('should parse css with newlines', function () {
        let css = 'div {\n';
        css += 'foo: bar;\n';
        css += '}';

        let stylesheet = new CSSParser().parse(css);
        expect(stylesheet.rules).to.exists;
        expect(stylesheet.rules).have.length(1);
        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: 'div',
            id: null,
            className: []
        });
        expect(stylesheet.rules[0].declarations[0]).to.have.property('name', 'foo');
        expect(stylesheet.rules[0].declarations[0]).to.have.property('value');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('type', 'keyword');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('value', 'bar');
        expect(stylesheet.rules[0].declarations[0].value).to.have.property('toPx');
    });

    it('should parse id selector', function () {
        let stylesheet = new CSSParser().parse('#my-id {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: null,
            id: 'my-id',
            className: []
        });
    });

    it('should parse class selector', function () {
        let stylesheet = new CSSParser().parse('.my-class {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: null,
            id: null,
            className: ['my-class']
        });
    });

    it('should parse universal selector without *', function () {
        let stylesheet = new CSSParser().parse('{foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: null,
            id: null,
            className: []
        });
    });

    it('should parse universal selector with *', function () {
        let stylesheet = new CSSParser().parse('* {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: null,
            id: null,
            className: []
        });
    });

    it('should parse multiple classes', function () {
        let stylesheet = new CSSParser().parse('.my-class.my-other-class {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: null,
            id: null,
            className: ['my-class', 'my-other-class']
        });
    });

    it('should parse simple selectors', function () {
        let stylesheet = new CSSParser().parse('div.my-class#my-id {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: 'div',
            id: 'my-id',
            className: ['my-class']
        });
    });

    it('should parse keyword value', function () {
        let stylesheet = new CSSParser().parse('div {foo:bar;}');

        let declaration = stylesheet.rules[0].declarations[0];
        expect(declaration).to.have.property('name', 'foo');
        expect(declaration).to.have.property('value');
        expect(declaration.value).to.have.property('type', 'keyword');
        expect(declaration.value).to.have.property('value', 'bar');
    });

    it('should parse length value', function () {
        let stylesheet = new CSSParser().parse('div {foo:10px;}');

        let declaration = stylesheet.rules[0].declarations[0];
        expect(declaration).to.have.property('name', 'foo');
        expect(declaration).to.have.property('value');
        expect(declaration.value).to.have.property('type', 'length');
        expect(declaration.value.value).to.eql({
            unit: {
                type: 'px'
            },
            value: 10
        });
    });

    it('should parse color value', function () {
        let stylesheet = new CSSParser().parse('div {foo:#CCFF00;}');

        let declaration = stylesheet.rules[0].declarations[0];
        expect(declaration).to.have.property('name', 'foo');
        expect(declaration).to.have.property('value');
        expect(declaration.value).to.have.property('type', 'color');
        expect(declaration.value.value).to.eql({
            r: 204,
            g: 255,
            b: 0,
            a: 255
        });
    });

    it('should parse comma separated selectors', function () {
        let stylesheet = new CSSParser().parse('div, p {foo:bar;}');

        expect(stylesheet.rules[0].selectors[0].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[0].value).to.eql({
            tagName: 'div',
            id: null,
            className: []
        });

        expect(stylesheet.rules[0].selectors[1].type).to.eql('simple');
        expect(stylesheet.rules[0].selectors[1].value).to.eql({
            tagName: 'p',
            id: null,
            className: []
        });
    });
});
