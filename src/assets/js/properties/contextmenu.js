$method_contextmenu = {
    event: function () {
        $(document).bind('contextmenu', function (e) {
            e.preventDefault();
        });
        var curX, curY;
        fabric.util.addListener(document.getElementsByClassName('upper-canvas')[0], 'contextmenu', function (e) {
            target = canvas.findTarget(e, false);
            if (target) {
                let type = target.type;
                if (type === "activeSelection") {
                    console.log('right click on group');
                } else {
                    canvas.setActiveObject(target);
                    console.log('right click on target, type: ' + type);
                }
            } else {
                canvas.discardActiveObject();
                canvas.renderAll();
                console.log('right click on canvas');
            }
            curX = e.clientX;
            curY = e.clientY;
            $('#contextmenu').css({ 'top': curY, 'left': curX }).fadeIn('slow');

        });
        $(document).click(function (event) {
            if (!$(event.target).closest('#contextmenu').length) {
                if ($('#contextmenu').css("display", "block")) {
                    $('#contextmenu').css("display", "none");
                }
            }
        });
        $(document).on('click',
            '.cut-obj, .coppy-obj, .paste-obj, .sendToBack, .bringForward,.sendBackwards, .bringToFront, .delete-obj, .undo-obj, .redo-obj',
            function (evt) {
                $('#contextmenu').hide();
            });
    },
}

$(document).ready(function () {
    $method_contextmenu.event();
});