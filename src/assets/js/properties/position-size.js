
$method_positionsize = {
    moveUp: function ($item) {
        $before = $item.prev();
        if ($item.prevUntil(':not(.hidden)').length > 0)
            $before = $item.prevUntil(':not(.hidden)').last().prev();
        if (!$before.hasClass("first"))
            $item.insertBefore($before);
    },
    moveDown: function ($item) {
        $after = $item.next();
        if ($item.nextUntil(':not(.hidden)').length > 0)
            $after = $item.nextUntil(':not(.hidden)').last().next();
        $item.insertAfter($after);
    },
    moveAfter: function ($this, idx) {
        $this.insertAfter(".out-list-layer li:nth-child(" + idx + ")");
    }
}
$(document).ready(function () {
    // Position
    $('.text-position-x').change(function () {
        //var left = number.parseFixed($(this).val(), 2, 0);
        var left = $method_canvas.setLeft($(this).val());
        $(this).val(number.formatFixed(left, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            activeObject.set({ left: left }).setCoords();
            canvas.renderAll();

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });
    $('.text-position-y').change(function () {
        //var top = number.parseFixed($(this).val(), 2, 0);
        var top = $method_canvas.setTop($(this).val());
        $(this).val(number.formatFixed(top, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            activeObject.set({ top: top }).setCoords();
            canvas.renderAll();

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });

    // Size
    $('.text-size-width').change(function () {
        var width = number.parseFixed($('.text-size-width').val(), 2, 0);
        var height = number.parseFixed($('.text-size-height').val(), 2, 0);
        if ($('.btn-size-all.size').hasClass('active')) {
            var widthBefore = number.parseFixed($('.text-size-width').attr('data-value'), 2, 0);
            height = number.parseFixed(height * width / widthBefore, 2, 0);
        }

        $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
        $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            var scaleX = number.parseFixed($('.text-transform-scale-x').val(), 2, 0);
            var scaleY = number.parseFixed($('.text-transform-scale-y').val(), 2, 0);
            width = number.parseFixed(width / scaleX, 2, 0);
            height = number.parseFixed(height / scaleY, 2, 0);

            activeObject.set({ width: width, height: height });
            canvas.renderAll();

            if (activeObject.type == 'image' && ['barcode', 'qrcode'].indexOf(activeObject.usingType) == -1)
                reloadImage(activeObject);

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });
    $('.text-size-height').change(function () {
        var width = number.parseFixed($('.text-size-width').val(), 2, 0);
        var height = number.parseFixed($('.text-size-height').val(), 2, 0);
        if ($('.btn-size-all.size').hasClass('active')) {
            var heightBefore = number.parseFixed($('.text-size-height').attr('data-value'), 2, 0);
            width = number.parseFixed(width * height / heightBefore, 2, 0);
        }

        $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
        $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            var scaleX = number.parseFixed($('.text-transform-scale-x').val(), 2, 0);
            var scaleY = number.parseFixed($('.text-transform-scale-y').val(), 2, 0);
            width = number.parseFixed(width / scaleX, 2, 0);
            height = number.parseFixed(height / scaleY, 2, 0);

            activeObject.set({ width: width, height: height });
            canvas.renderAll();

            //updateRotatePosition(activeObject);
            updateCanvasState();
        }
    });
    $('#zindex').change(function () {
        var object = canvas.getActiveObject();
        if (!object) return;

        var value = $(this).val()
        var valueBefor = $(this).attr("data-value");
        if (!$.isNumeric(value)) {
            $(this).val(valueBefor);
            return;
        };

        var objects = canvas.getObjects();
        value = parseInt(value);
        if (value > objects.length)
            value = objects.length;
        else if (value <= 0) value = 1;

        //var index = $("ul.out-list-layer > li").length - (value + 1);
        //$("#" + objects[value].id).parent();//

        var index = $("ul.out-list-layer > li:not(.hidden)").length - (value);
        var $before = $('ul.out-list-layer > li:not(.hidden):eq(' + index + ')');

        if (value === 0 || value < parseInt(valueBefor))
            $("#" + object.id).parent().insertAfter($before);
        else
            $("#" + object.id).parent().insertBefore($before);

        object.moveTo(value - 1);
        $(this).attr("data-value", value).val(value);

        canvas.renderAll();

        updateCanvasState();
    });

    $(".moveUp").click(function () {
        var object = canvas.getActiveObject();
        if (!object) return false;

        var index = (object && canvas.getObjects().indexOf(object));
        if ((index + 1) >= canvas.getObjects().length) return false;
        index = index + 1;
        object.moveTo(index);

        $('#zindex').attr("data-value", index + 1).val(index + 1);

        $method_positionsize.moveUp($("#" + object.id).parent());

        //setTimeout(function () {
        //    $("#" + object.id).trigger("click");
        //}, 10);

        updateCanvasState();

        return false;
    });
    $(".moveDown").click(function () {
        var object = canvas.getActiveObject();
        if (!object) return false;

        var index = (object && canvas.getObjects().indexOf(object))
        if (index === 0) return false;
        index = index - 1;
        object.moveTo(index);

        $('#zindex').attr("data-value", index + 1).val(index + 1);

        $method_positionsize.moveDown($("#" + object.id).parent());

        //setTimeout(function () {
        //    $("#" + object.id).trigger("click");
        //}, 10);

        updateCanvasState();

        return false;
    })
});