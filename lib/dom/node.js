export class DOMNode {
    constructor (nodeType, children = []) {
        this.children = children;
        this.nodeType = nodeType;
    }
}
