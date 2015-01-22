
let expect = require('chai').expect;
let HTMLParser = require('../../lib/html');
let CSSParser = require('../../lib/css');
let styleTree = require('../../lib/style');

describe('style tree', function () {
    it('should style a dom node', function () {
        let rootElement = new HTMLParser().parse('<html class="my-class"></html>');
        let stylesheet = new CSSParser().parse('html {foo: bar;} .my-class {bar: foo;} .my-other-class {bar: baz;}');
        let styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.node.children).to.eql([]);
        expect(styledTree.node.attributes).to.eql({'class' : 'my-class'});
        expect(styledTree.node.nodeType).to.eql(1);
        expect(styledTree.node.tagName).to.eql('html');

        expect(styledTree.specifiedValues.foo.type).to.eql('keyword');
        expect(styledTree.specifiedValues.foo.value).to.eql('bar');

        expect(styledTree.specifiedValues.bar.type).to.eql('keyword');
        expect(styledTree.specifiedValues.bar.value).to.eql('foo');
    });

    it('should ignore node not matching a class selector', function () {
        let rootElement = new HTMLParser().parse('<html></html>');
        let stylesheet = new CSSParser().parse('.not-matched {foo: bar;}');
        let styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.specifiedValues.foo).to.not.exists;
    });

    it('should ignore node not matching an id selector', function () {
        let rootElement = new HTMLParser().parse('<html></html>');
        let stylesheet = new CSSParser().parse('#not-matched {foo: bar;}');
        let styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.specifiedValues.foo).to.not.exists;
    });

    it('should style a dom tree with multiple selectors', function () {
        let rootElement = new HTMLParser().parse('<html class="my-class" id="my-id"></html>');
        let stylesheet = new CSSParser().parse('html.my-class#my-id {foo: bar;}');
        let styledTree = styleTree(rootElement, stylesheet);

        expect(styledTree.node.children).to.eql([]);
        expect(styledTree.node.attributes).to.eql({'class' : 'my-class', 'id': 'my-id'});
        expect(styledTree.node.nodeType).to.eql(1);
        expect(styledTree.node.tagName).to.eql('html');

        expect(styledTree.specifiedValues.foo.type).to.eql('keyword');
        expect(styledTree.specifiedValues.foo.value).to.eql('bar');
    });
});
