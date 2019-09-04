$(document).ready(function () {
    // Colorpicker
    $('.gradient-colorpicker').asColorPicker({
        mode: 'gradient',
        onChange: function (color) {
            $($(this)[0].element).val(color);//.select();
            var obj = $($(this)[0].element).attr('ng-value')
            if (obj === "getFill()") {
                setActiveStyle("fill", color);
            }
            else if (obj === "getTextBgColor()") {
                setActiveStyle("textBackgroundColor", color);
            }
            else if (obj === "getStroke()") {
                setActiveStyle("stroke", color);
            }
            else if (obj === "GetCanvasBgColor()") {
                canvas.backgroundColor = color;
                canvas.renderAll();
                updateCanvasState();
            }
        }
        //onApply: function (e) { //$($(this)[0].element).val('rgb(' + e.value.r + ', ' + e.value.g + ', ' + e.value.b + ')').select(); },
        //onClose: function () { alert(" bb") },
    });
    $('.gradient-colorpicker.object-action').asColorPicker('disable');

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // Canvas parent scroll
    $('#bd-wrapper').on('scroll', function () {
        if ($(this).scrollLeft() > 0)
            $(this).addClass('scrolling-left');
        if ($(this).scrollTop() > 0)
            $(this).addClass('scrolling-top');
    });

    $(document.body).on('click', function (evt) {
        if (
            ($(evt.target).prop('id') != 'canvas-wrapper' && $(evt.target).closest('#canvas-wrapper').length <= 0) &&
            ($(evt.target).hasClass('outer-center') || $(evt.target).closest('.outer-center').length > 0)
        )
            canvas.discardActiveObject();
    });

    // Window key down (delete, undo, redo)
    $(document.body).on('keydown', function (evt) {
        if (evt.keyCode == 46) {
            if (['A'].indexOf(evt.target.tagName) == -1 && $(evt.target).is(':focus'))
                return;
            var $scope = angular.element(this).scope();
            $scope.removeSelected();
        }

        if (evt.ctrlKey && evt.keyCode == 79) {
            $('.open-json').trigger('click');
            return false;
        }

        if (evt.ctrlKey && evt.keyCode == 83) {
            var jsonData = JSON.stringify(canvas.toJSON());
            saveTextAs(jsonData, "breece_desinger.json");
            return false;
        }

        if (evt.ctrlKey && evt.keyCode == 90) {
            if (evt.altKey)
                angular.element($('.box-nav-left > li > a.redo')).triggerHandler('click');
            else
                angular.element($('.box-nav-left > li > a.undo')).triggerHandler('click');
            return false;
        }
    });
});