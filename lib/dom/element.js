import {DOMNode} from './node';

export class ElementNode extends DOMNode {
    constructor(name, attrs = {}, children = []) {
        super(1, children);
        this.tagName = name;
        this.attributes = attrs;
    }

    id() {
        return this.attributes.id ? this.attributes.id : null;
    }

    classes() {
        return this.attributes['class'] ? this.attributes['class'].split(' ') : [];
    }
}
