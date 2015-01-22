
let expect = require('chai').expect;

import {ElementNode} from '../../lib/dom/element';

describe('element', function () {

    describe('#id', function () {
        it('should return the element id', function () {
            let elementNode = new ElementNode('div',
                                              {id: 'my-id'},
                                             []);

            expect(elementNode.id()).to.eql('my-id');
        });
        it('should return null if the element has no id', function () {
            let elementNode = new ElementNode('div',
                                              {foo: 'bar'},
                                             []);

            expect(elementNode.id()).to.be.null;
        });
    });

    describe('#classes', function () {
        it('should return the element classes', function () {
            let elementNode = new ElementNode('div',
                                              {'class': 'my-class my-other-class'},
                                             []);

            expect(elementNode.classes()).to.eql(['my-class', 'my-other-class']);
        });
        it('should return an empty list if the element has no classes', function () {
            let elementNode = new ElementNode('div',
                                              {},
                                             []);

            expect(elementNode.classes()).to.eql([]);
        });
    });
});
