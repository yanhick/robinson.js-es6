
var expect = require('chai').expect;
var StyledNode = require('../../lib/style/styled-node');
var Value = require('../../lib/css/value');
var Display = require('../../lib/style/display');

import {ElementNode} from '../../lib/dom/element';

describe('styled node', function () {

    describe('#value', function () {
        it('should return the specified value of a property', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.value('foo')).to.eql('bar');
        });

        it('should return null if the property doesn\'t exists', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {}, []);

            expect(styledNode.value('foo')).to.eql(null);
        });
    });

    describe('#lookup', function () {
        it('should return the value of the requested property if exists', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('foo', 'fallback', 'default')).to.eql('bar');
        });

        it('should return the value of the fallback property if requested don\'t exists', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('missing', 'foo', 'default')).to.eql('bar');
        });

        it('should return the given default value if no property exists', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {foo: 'bar'}, []);

            expect(styledNode.lookup('missing', 'missingAlso', 'default')).to.eql('default');
        });
    });

    describe('#display', function () {
        it('should return the value of the display property for block', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var specifiedValues = {
                display: new Value().Keyword('block')
            };
            var styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().Block());
        });

        it('should return the value of the display property for none', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var specifiedValues = {
                display: new Value().Keyword('none')
            };
            var styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().None());
        });

        it('should return the value of the display property for inline', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var specifiedValues = {
                display: new Value().Keyword('inline')
            };
            var styledNode = new StyledNode(element, specifiedValues, []);

            expect(styledNode.display()).to.eql(new Display().Inline());
        });

        it('the display value should default to inline if missing', function () {
            var element = new ElementNode('div', {foo: 'bar'}, []);
            var styledNode = new StyledNode(element, {}, []);

            expect(styledNode.display()).to.eql(new Display().Inline());
        });
    });
});
