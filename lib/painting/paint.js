let Canvas = require('../../lib/painting/canvas');
let Rect = require('../../lib/layout/rect');
let DisplayCommand = require('../../lib/painting/display-command');

// Paint a tree of LayoutBoxes to an array of pixels.
module.exports = function (layoutRoot, bounds) {
    let displayList = buildDisplayList(layoutRoot);
    let canvas = new Canvas(bounds.width, bounds.height);

    displayList.forEach(canvas.paintItem);
    return canvas;
};

function buildDisplayList (layoutRoot) {
    let list = [];
    renderLayoutBox(list, layoutRoot);
    return list;
}

function renderLayoutBox (list, layoutBox) {
    renderBackground(list, layoutBox);
    renderBorders(list, layoutBox);
    layoutBox.children.forEach(function (child) {
        renderLayoutBox(list, child);
    });
}

function renderBackground (list, layoutBox) {
    let color = getColor(layoutBox, 'background');

    if (color === null) {
        return null;
    }

    list.push(new DisplayCommand().SolidColor(color, layoutBox.dimensions.borderBox()));
}

function renderBorders (list, layoutBox) {
    let color = getColor(layoutBox, 'border-color');

    if (color === null) {
        return;
    }

    let d = layoutBox.dimensions;
    let borderBox = d.borderBox();

    // Left border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y,
        d.border.left,
        borderBox.height
    )));

    // Right border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x + borderBox.width - d.border.right,
        borderBox.y,
        d.border.right,
        borderBox.height
    )));

    // Top border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y,
        borderBox.width,
        d.border.top
    )));

    // Bottom border
    list.push(new DisplayCommand().SolidColor(color, new Rect(
        borderBox.x,
        borderBox.y + borderBox.height - d.border.bottom,
        borderBox.width,
        d.border.bottom
    )));
}

// Return the specified color for CSS property `name`, or `null` if no color was specified.
function getColor (layoutBox, name) {
    let getColorFromStyle = function (style) {
        let color = style.value(name);

        if (color === null) {
            return null;
        }

        return color.type === 'color' ? color.value : null;
    };

    switch (layoutBox.boxType.type) {
        case 'block':
            return getColorFromStyle(layoutBox.boxType.value);

        case 'inline':
            return getColorFromStyle(layoutBox.boxType.value);

        case 'anonymous':
            return null;
    }
}
