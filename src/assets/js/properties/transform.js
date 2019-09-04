// Drag and drop point
$('.wr-archor-point-l').mousedown(function (evt) {
    if ($(evt.target).hasClass('points') || $('.wr-archor-point-l').length === 0)
        return false;
    var left = evt.clientX - $('.wr-archor-point-l').offset().left;
    var top = evt.clientY - $('.wr-archor-point-l').offset().top;
    var leftPercent = number.parseFixed(left / $('.wr-archor-point-l').width() * 100, 2, 0);
    var topPercent = number.parseFixed(top / $('.wr-archor-point-l').height() * 100, 2, 0);
    updatePivotPoint(left, top, leftPercent, topPercent);
});
$('.wr-archor-point-l .points').draggable({
    scroll: true,
    containment: '.wr-archor-point-l',
    disable: false,
    drag: function (event, ui) {
        if ($('.wr-archor-point-l').length === 0) return false;

        var left = ui.offset.left - $('.wr-archor-point-l').offset().left;
        var top = ui.offset.top - $('.wr-archor-point-l').offset().top;
        var leftPercent = number.parseFixed(left / $('.wr-archor-point-l').width() * 100, 2, 0);
        var topPercent = number.parseFixed(top / $('.wr-archor-point-l').height() * 100, 2, 0);
        updatePivotPoint(left, top, leftPercent, topPercent);
    }
});

function updatePivotPoint(left, top, leftPercent, topPercent) {
    $('.wr-archor-point-l .points').css({ 'left': left + 'px', 'top': top + 'px' });
    $('.wr-archor-point-r .line-point.point-x label').html(leftPercent);
    $('.wr-archor-point-r .line-point.point-y label').html(topPercent);

    var activeObject = canvas.getActiveObject();
    if (activeObject != null) {
        activeObject.set({
            pivotXRatio: leftPercent,
            pivotYRatio: topPercent
        });
        //updateRotatePosition(activeObject);
    }
}

$(document).ready(function () {
    // Rotate
    $('.text-transform-rotate').change(function () {
        var angle = number.parseFixed($(this).val(), 2, 0);
        if (angle < 0)
            angle = 360 + angle;
        if (angle > 359)
            angle = angle - 360;

        $(this).val(number.formatFixed(angle, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            updateObjectPosition(activeObject, angle);
            updateCanvasState();
        }
    });

    // Scale
    $('.text-transform-scale-x').change(function () {
        var scaleX = number.parseFixed($('.text-transform-scale-x').val(), 2, 0);
        var scaleY = number.parseFixed($('.text-transform-scale-y').val(), 2, 0);
        var width = number.parseFixed($('.text-size-width').val(), 2, 0);
        var height = number.parseFixed($('.text-size-height').val(), 2, 0);
        if ($('.btn-size-all.transform-scale').hasClass('active')) {
            var scaleXBefore = number.parseFixed($('.text-transform-scale-x').attr('data-value'), 2, 0);
            scaleY = number.parseFixed(scaleY * scaleX / scaleXBefore, 2, 0);
            width = number.parseFixed(width * scaleX / scaleXBefore, 2, 0);
            height = number.parseFixed(height * scaleX / scaleXBefore, 2, 0);
        }

        $('.text-transform-scale-x').attr('data-value', scaleX).val(number.formatFixed(scaleX, 2, 0));
        $('.text-transform-scale-y').attr('data-value', scaleY).val(number.formatFixed(scaleY, 2, 0));
        $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
        $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            activeObject.set({ scaleX: scaleX, scaleY: scaleY });
            canvas.renderAll();

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });
    $('.text-transform-scale-y').change(function () {
        var scaleX = number.parseFixed($('.text-transform-scale-x').val(), 2, 0);
        var scaleY = number.parseFixed($('.text-transform-scale-y').val(), 2, 0);
        var width = number.parseFixed($('.text-size-width').val(), 2, 0);
        var height = number.parseFixed($('.text-size-height').val(), 2, 0);
        if ($('.btn-size-all.transform-scale').hasClass('active')) {
            var scaleYBefore = number.parseFixed($('.text-transform-scale-y').attr('data-value'), 2, 0);
            scaleX = number.parseFixed(scaleX * scaleY / scaleYBefore, 2, 0);
            width = number.parseFixed(width * scaleY / scaleYBefore, 2, 0);
            height = number.parseFixed(height * scaleY / scaleYBefore, 2, 0);
        }

        $('.text-transform-scale-x').attr('data-value', scaleX).val(number.formatFixed(scaleX, 2, 0));
        $('.text-transform-scale-y').attr('data-value', scaleY).val(number.formatFixed(scaleY, 2, 0));
        $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
        $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            activeObject.set({ scaleX: scaleX, scaleY: scaleY });
            canvas.renderAll();

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });

    // Reference point
    $('.select-reference-point').select2({ minimumResultsForSearch: -1 });
    $('.select-reference-point').change(function () {
        var origins = $(this).val().split(',');
        var left = $('.wr-archor-point-l').width() * origins[0] / 100;
        var top = $('.wr-archor-point-l').height() * origins[1] / 100;
        updatePivotPoint(left, top, origins[0], origins[1]);
    });

    // Default point
    $('.wr-archor-point-r .default-point').click(function () {
        $('.select-reference-point').val('50,50').change();
    });
    $('.wr-archor-point-r .default-point').click();
});