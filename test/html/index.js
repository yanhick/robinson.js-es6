let expect = require('chai').expect;

let HTMLParser = require('../../lib/html');

describe('html parser', function () {

    it('should parse <html> tags', function () {
        let nodes = HTMLParser().parse('<html></html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse html with newlines', function () {
        let nodes = HTMLParser().parse('<html>\n</html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse nested tags', function () {
        let nodes = HTMLParser().parse('<html><body></body></html>');
        expect(nodes.children[0].tagName).to.eql('body');
        expect(nodes.children[0].nodeType).to.eql(1);
        expect(nodes.children[0].children).to.eql([]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse text nodes', function () {
        let nodes = HTMLParser().parse('<html>hello</html>');

        expect(nodes.children).to.eql([{
            text: 'hello',
            nodeType: 3,
            children: []
        }]);
        expect(nodes.attributes).to.eql({});
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');
    });

    it('should parse attributes with quoted values', function () {
        let nodes = HTMLParser().parse('<html lang="us"></html>');
        expect(nodes.children).to.eql([]);
        expect(nodes.attributes).to.eql({
            lang: 'us'
        });
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');
    });

    it('should create a root element if sibling nodes are parsed', function () {
        let nodes = HTMLParser().parse('<div></div><div></div>');
        expect(nodes.nodeType).to.eql(1);
        expect(nodes.tagName).to.eql('html');

        expect(nodes.children.length).to.equal(2);
    });
});
