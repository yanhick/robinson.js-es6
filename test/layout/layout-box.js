
let expect = require('chai').expect;
let BoxType = require('../../lib/layout/box-type');
let Dimensions = require('../../lib/layout/dimensions');
let Rect = require('../../lib/layout/rect');
let EdgeSize = require('../../lib/layout/edge-size');
let LayoutBox = require('../../lib/layout/layout-box');
let StyledNode = require('../../lib/style/styled-node');
let Value = require('../../lib/css/value');
let Unit = require('../../lib/css/unit');

import {ElementNode} from '../../lib/dom/element';

describe('layout box', function () {
    describe('#getStyleNode', function () {
        it('should allow to retrieve the styled node', function () {
            let boxType = new BoxType().Block('foo');
            let rect = new Rect(0, 0, 0, 0);
            let edge = new EdgeSize(10, 10, 10, 10);
            let dimensions = new Dimensions(rect, edge, edge, edge);

            let layoutBox = new LayoutBox(boxType, dimensions, []);

            expect(layoutBox.getStyleNode()).to.eql('foo');
        });
    });

    describe('#getInlineContainer', function () {
        it('should return the layout box for inline box', function () {
            let boxType = new BoxType().Inline('foo');
            let layoutBox = new LayoutBox(boxType);

            expect(layoutBox.getInlineContainer()).to.eql(layoutBox);
        });

        it('should return the layout box for anonymous box', function () {
            let boxType = new BoxType().Anonymous();
            let layoutBox = new LayoutBox(boxType);

            expect(layoutBox.getInlineContainer()).to.eql(layoutBox);
        });

        it('should create and return an anonymous block if there is none for a block box', function () {
            let boxType = new BoxType().Block('foo');
            let layoutBox = new LayoutBox(boxType);

            let inlineContainer = layoutBox.getInlineContainer();
            expect(inlineContainer.boxType.type === 'anonymous');
        });

        it('should return the last anonymous box for a block box', function () {
            let boxType = new BoxType().Block('foo');
            let children = [createLayoutBox(), createLayoutBox()];
            let layoutBox = new LayoutBox(boxType, undefined, children);

            let inlineContainer = layoutBox.getInlineContainer();
            expect(layoutBox.children[2]).to.eql(inlineContainer);
        });
    });

    describe('#calculateBlockHeight', function () {
        it('should set the actual block height if provided', function () {
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                height: new Value().Length(50, new Unit().Px())
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType);

            layoutBox.calculateBlockHeight();
            expect(layoutBox.dimensions.content.height).to.eql(50);
        });

        it('should do nothing if height is not explicit');
    });

    describe('#calculateBlockPosition', function () {
        it('should set the block position', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let layoutBox = createLayoutBox(undefined, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(10, 20, 0, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);
            layoutBox.calculateBlockPosition(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.x).to.eql(10);
            expect(layoutBox.dimensions.content.y).to.eql(20);
        });
        it('should set the block position with paddings');
        it('should set the block position with margins');
        it('should set the block position with borders');
    });

    describe('#calculateBlockWidth', function () {
        it('should set the block width with an explicit width', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(50, new Unit().Px())
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 0, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(50);
        });

        it('should set the block width with auto width', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block'
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(200);
        });

        it('should set the margins width with auto margins and explicit width', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(100, new Unit().Px()),
                'margin-left': new Value().Keyword('auto'),
                'margin-right': new Value().Keyword('auto')
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 100),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(100);
            expect(layoutBox.dimensions.margin.left).to.eql(50);
            expect(layoutBox.dimensions.margin.right).to.eql(50);
        });

        it('should resize left auto margin when right margin and width length is explicit', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(100, new Unit().Px()),
                'margin-left': new Value().Length(50, new Unit().Px()),
                'margin-right': new Value().Keyword('auto')
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 100, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(100);
            expect(layoutBox.dimensions.margin.left).to.eql(50);
            expect(layoutBox.dimensions.margin.right).to.eql(-50);
        });

        it('should resize right auto margin when left margin and width length is explicit', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Length(100, new Unit().Px()),
                'margin-right': new Value().Length(50, new Unit().Px()),
                'margin-left': new Value().Keyword('auto')
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(100);
            expect(layoutBox.dimensions.margin.right).to.eql(50);
            expect(layoutBox.dimensions.margin.left).to.eql(50);
        });

        it('should set auto margins to 0 if width is auto', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Keyword('auto'),
                'margin-right': new Value().Keyword('auto'),
                'margin-left': new Value().Keyword('auto')
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 200, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(200);
            expect(layoutBox.dimensions.margin.right).to.eql(0);
            expect(layoutBox.dimensions.margin.left).to.eql(0);
        });

        it('should make right margin negative if the width was going to be negative', function () {
            let edgeSize = new EdgeSize(0, 0, 0, 0);
            let dimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                edgeSize,
                edgeSize,
                edgeSize
            );
            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                width: new Value().Keyword('auto'),
                'margin-right': new Value().Length(100, new Unit().Px()),
                'margin-left': new Value().Length(200, new Unit().Px())
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType, dimensions);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 100, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.calculateBlockWidth(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.width).to.eql(0);
            expect(layoutBox.dimensions.margin.right).to.eql(-100);
            expect(layoutBox.dimensions.margin.left).to.eql(200);

        });
    });

    describe('#layoutBlockChildren', function () {
        it('should layout all its children and set its height from it');
    });

    describe('#layout', function () {
        it('should layout itself', function () {

            let element = new ElementNode('div', {foo: 'bar'}, []);
            let styledNode = new StyledNode(element, {
                display: 'block',
                height: new Value().Length(50, new Unit().Px())
            }, []);
            let boxType = new BoxType().Block(styledNode);
            let layoutBox = createLayoutBox(boxType);

            let containingEdgeSize = new EdgeSize(0, 0, 0, 0);
            let containingDimensions = new Dimensions(
                new Rect(0, 0, 0, 0),
                containingEdgeSize,
                containingEdgeSize,
                containingEdgeSize
            );
            let containingLayoutBox = createLayoutBox(undefined, containingDimensions);

            layoutBox.layout(containingLayoutBox.dimensions);

            expect(layoutBox.dimensions.content.height).to.eql(50);
        });
    });
});

function createLayoutBox (boxType, dimensions, children) {
    children = children || [];
    let element = new ElementNode('div', {foo: 'bar'}, []);
    let styledNode = new StyledNode(element, {
        display: new Value().Keyword('block')
    }, []);
    boxType = boxType || new BoxType().Block(styledNode);
    let rect = new Rect(0, 0, 0, 0);
    let edge = new EdgeSize(10, 10, 10, 10);
    dimensions = dimensions || new Dimensions(rect, edge, edge, edge);

    return new LayoutBox(boxType, dimensions, children);
}
