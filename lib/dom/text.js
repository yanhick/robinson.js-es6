import {DOMNode} from './node';

export class TextNode extends DOMNode {
    constructor(data = "") {
        super(3, []);
        this.text = data;
    }
}
