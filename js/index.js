if ( !window.location.search.match(/print/) ) {
    impress().init();
}


function addClassNameListener(elemId, callback) {
    var elem = document.getElementById(elemId);
    var lastClassName = elem.className;
    window.setInterval( function() {   
       var className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10);
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function svgTranslateTo(objectId, elementId, viewSize) {
    var object = document.getElementById(objectId);
    var svg = object.contentDocument.getElementsByTagName('svg')[0];
    var element = svg.getElementById(elementId);
    var canvasBBox = svg.getBBox();
    var elementBBox = element.getBBox();
    var viewBox = svg.getAttribute('viewBox').split(' ');

    var x_0 = Number(viewBox[0]);
    var y_0 = Number(viewBox[1]);
    var x_1 = elementBBox['x'] - (viewSize / 2);
    var y_1 = canvasBBox['height'] + elementBBox['y'] - (viewSize / 2)
    var w_0 = Number(viewBox[2]);
    var h_0 = Number(viewBox[3]);
    var w_1 = viewSize;
    var h_1 = viewSize;

    var steps = 100;
    var dt = 10;
    var dx = (x_1 - x_0) / steps
    var dy = (y_1 - y_0) / steps;
    var dw = (w_1 - w_0) / steps;
    var dh = (h_1 - h_0) / steps;

    for (var i=0; i<steps; i++) {
        x_0 += dx;
        y_0 += dy;
        w_0 += dw;
        h_0 += dh;
        var translation = x_0 + ' ' + y_0 + ' ' + w_0 + ' ' + h_0;
        svg.setAttribute('viewBox', translation);
        await sleep(dt);
    }
}


var graphEvents = [
    ['graph-zoom-1', 'node273', 1000],
    ['graph-zoom-2', 'node7', 1000],
    ['graph-zoom-3', 'node269', 1000]
]


for (let graphEvent of graphEvents) {
    addClassNameListener(graphEvent[0], function() {
        var elem = document.getElementById(graphEvent[0]);
        if (elem.className.indexOf('substep-visible')) {
            svgTranslateTo('graph', graphEvent[1], graphEvent[2]);
        }
    });
}
