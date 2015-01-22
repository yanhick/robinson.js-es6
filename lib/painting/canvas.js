let Color = require('../css/color');

// Create a blank canvas
module.exports = function (width, height) {

    let pixels = [],

        paintItem = function (item) {
            switch(item.type) {
                case 'solid-color':
                    paintSolidColor(item.value.color, item.value.rect);
                    break;
            }
        },

        paintSolidColor = function (color, rect) {
            let x0 = rect.x;
            let y0 = rect.y;
            let x1 = rect.x + rect.width;
            let y1 = rect.y + rect.height;

            for (let y = y0; y < y1; y++) {
                for (let x = x0; x < x1; x++) {
                    pixels[y * width + x] = color;
                }
            }
        };

    for (let i = 0; i < width * height; i++) {
        pixels.push(new Color(255, 255, 255, 255));
    }

    return {
        width: width,
        height: height,
        pixels: pixels,
        paintItem: paintItem
    };
};
