fabric.Object.prototype.set({
    transparentCorners: false,
    //borderColor: 'rgba(102,153,255,1)',
    //cornerColor: 'rgba(102,153,255,1)',
    cornerSize: 10,
    //padding: 1
});

fabric.util.addListener(fabric.window, 'load', function () {
    var canvas = this.__canvas || this.canvas,
        canvases = this.__canvases || this.canvases;

    canvas && canvas.calcOffset && canvas.calcOffset();

    if (canvases && canvases.length) {
        for (var i = 0, len = canvases.length; i < len; i++) {
            canvases[i].calcOffset();
        }
    }
});