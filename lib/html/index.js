/**
 * A simple parser for a tiny subset of HTML
 *
 * Can parse basic opening and closing tags, and text nodes
 *
 * Not yet supported:
 *
 * * Comments
 * * Doctypes and processing instructions
 * * Self-closing tags
 * * Non-well-formed markup
 * * Character entities
 */

let assert = require('assert');
import {ElementNode} from '../dom/element';
import {TextNode} from '../dom/text';

module.exports = function () {

    let pos = 0,

        input = '',

        // parse an HTML document and return the root element
        parse = function (html) {
            pos = 0;
            input = html;

            let nodes = parseNodes();

            // if the document contains a root element, just return it.
            // Oterhwise, create one
            if (nodes.length === 1) {
                return nodes[0];
            }
            else {
                return new ElementNode('html', [], nodes);
            }
        },

        // parse a sequence of sibling nodes
        parseNodes = function () {
            let nodes = [];
            while (true) {
                consumeWhiteSpace();
                if (eof() === true || startsWith('</') === true) {
                    break;
                }
                nodes.push(parseNode());
            }
            return nodes;
        },

        // parse a single node
        parseNode = function () {
            switch(nextChar()) {
                case '<':
                    return parseElement();
                default:
                    return parseText();
            }
        },

        // parse a single element, including its open tag,
        // contents and closing tag.
        parseElement = function () {
            //Opening tag
            assert(consumeChar() === '<');
            let tagName = parseTagName();
            let attrs = parseAttributes();
            assert(consumeChar() === '>');

            //Contents
            let children = parseNodes();

            //Closing tag
            assert(consumeChar() === '<');
            assert(consumeChar() === '/');
            assert(parseTagName() === tagName);
            assert(consumeChar() === '>');

            return new ElementNode(tagName, attrs, children);
        },

        // parse a tag or attribute name
        parseTagName = function () {
            return consumeWhile(isTagNameChar);
        },

        isTagNameChar = function (str) {
            let c = str.charCodeAt(0);
            return (c >= 'a'.charCodeAt(0) && c <= 'z'.charCodeAt(0)) ||
                   (c >= 'A'.charCodeAt(0) && c <= 'Z'.charCodeAt(0)) ||
                   (c >= '0'.charCodeAt(0) && c <= '9'.charCodeAt(0));
        },

        // parse a list of name="value" pairs, separated by
        // whitespace.
        parseAttributes = function () {
            let attributes = {};
            while (true) {
                consumeWhiteSpace();
                if (nextChar() === '>') {
                    break;
                }
                let attribute = parseAttr();
                attributes[attribute.name] = attribute.value;
            }
            return attributes;
        },

        // parse a single name="value" pair
        parseAttr = function () {
            let name = parseTagName();
            assert(consumeChar() === '=');
            let value = parseAttrValue();

            return {
                name: name,
                value: value
            };
        },

        // parse a quoted value
        parseAttrValue = function () {
            let openQuote = consumeChar();
            assert(openQuote === '"' || openQuote === '\'');
            let value = consumeWhile(isAttributeValueChar(openQuote));
            assert(consumeChar() === openQuote);

            return value;
        },

        isAttributeValueChar = function (quote) {
            return function (c) {
                return c !== quote;
            };
        },

        // parse a text node
        parseText = function () {
            return new TextNode(consumeWhile(isTextChar));
        },

        isTextChar = function (c) {
            return c !== '<';
        },

        // Consume and discard zero or more whitespace characters.
        consumeWhiteSpace = function () {
            consumeWhile(isWhiteSpace);
        },

        isWhiteSpace = function (c) {
            return c === ' ' || c === '\n';
        },

        // Consume characters until 'test' returns false
        consumeWhile = function (test) {
            let result = '';

            while(!eof() && test(nextChar())) {
                result += consumeChar();
            }

            return result;
        },

        // Return the current character, and advance self.pos to the
        // next character.
        consumeChar = function () {
            return input.charAt(pos++);
        },

        // Read the current character without consuming it.
        nextChar = function () {
            return input.charAt(pos);
        },

        // Does the current input start with the given string?
        startsWith = function (str) {
            return input.substr(pos).indexOf(str) === 0;
        },

        // Return true if all input is conxumed.
        eof = function () {
            return pos >= input.length;
        };

    return {
        parse: parse
    };
};
