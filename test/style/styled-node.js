
let expect = require('chai').expect;
let StyledNode = require('../../lib/style/styled-node');
let Value = require('../../lib/css/value');
let Display = require('../../lib/style/display');

import {ElementNode} from '../../lib/dom/element';

describe('styled node', function () {

    describe('#value', function () {
        it('should return the specified value of a property', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.value('foo')).to.eql('bar');
        });

        it('should return null if the property doesn\'t exists', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {}, []);

            expect(styledNode.value('foo')).to.eql(null);
        });
    });

    describe('#lookup', function () {
        it('should return the value of the requested property if exists', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('foo', 'fallback', 'default')).to.eql('bar');
        });

        it('should return the value of the fallback property if requested don\'t exists', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('missing', 'foo', 'default')).to.eql('bar');
        });

        it('should return the given default value if no property exists', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('missing', 'missingAlso', 'default')).to.eql('default');
        });
    });

    describe('#display', function () {
        it('should return the value of the display property for block', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let specifiedValues = {
                display: new Value().Keyword('block')
            };
            let styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().Block());
        });

        it('should return the value of the display property for none', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let specifiedValues = {
                display: new Value().Keyword('none')
            };
            let styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().None());
        });

        it('should return the value of the display property for inline', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let specifiedValues = {
                display: new Value().Keyword('inline')
            };
            let styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().Inline());
        });

        it('the display value should default to inline if missing', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {}, []);

            expect(styledNode.display()).to.eql(new Display().Inline());
        });
    });
});
