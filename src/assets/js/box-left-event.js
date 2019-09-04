$(document).ready(function () {

    // Left box item click
    $('.box-nav-left > li > a').on('click', function () {
        if ($(this).hasClass('active')) {
            if ($(this).hasClass('sub-nav-click')) {
                $(this).parent().toggleClass('active');
                //$(this).parents(".box-nav-left").toggleClass('active');
                return false;
            }
        }
        else {
            $('.box-nav-left li').removeClass('active');
            $('.box-nav-left li a').removeClass('active');

            $(this).addClass('active');

            if ($('#canvas-wrapper').is('.ui-draggable') && !$(".box-nav-left > a.hand").hasClass('active')) {
                $('#canvas-wrapper').draggable('destroy');

                canvas.selection = true;
                canvas.forEachObject(function (o) {
                    o.selectable = true;
                    o.editable = true;
                });
            }

            if ($(this).hasClass('hand') && !$('#canvas-wrapper').is('.ui-draggable')) {
                $('#canvas-wrapper').draggable();

                canvas.selection = false;
                canvas.discardActiveObject().renderAll();

                canvas.forEachObject(function (o) {
                    o.selectable = false;
                    o.editable = false;
                });
            }

            $(this).parents(".box-nav-left").removeClass('active');
            if ($(this).hasClass('sub-nav-click')) {
                $(this).parent().addClass('active');
                $(this).parents(".box-nav-left").addClass('active');

                var dataActive = $(this).attr('data-active');
                if (dataActive != undefined && dataActive != null && dataActive != '')
                    $('.box-nav-left .out-sub-list > li > a[data-active="' + dataActive + '"]').addClass('active');

                return false;
            }
        }
    })
    $('.box-nav-left .out-sub-list > li > a').on('click', function () {
        $('.box-nav-left .out-sub-list > li > a').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.out-sub-list').parent().removeClass('active');
        $(this).closest('.out-sub-list').parent().find('.sub-nav-click').attr('data-active', $(this).attr('data-active'));
        $(this).closest('.out-sub-list').parent().find('.sub-nav-click i').prop('class', $(this).find('i').prop('class'));
    });

    // Left box item drag drop
    $('.box-nav-left li a.drag-me').draggable({
        scroll: true,
        containment: '.middle-center',
        helper: 'clone',
        disable: false
    });
    $('.box-nav-left li a:not(.drag-me)').prop('draggable', false);
    $('.canvas-container').droppable({
        accept: '.box-nav-left li a.drag-me',
        drop: function (event, ui) {
            var $scope = angular.element(ui.helper.context).scope();
            $scope.dropToCanvas.has = true;
            $scope.dropToCanvas.x = ui.offset.left - $(this).offset().left;
            $scope.dropToCanvas.y = ui.offset.top - $(this).offset().top;

            angular.element(ui.helper.context).triggerHandler('click');

            var $parent = $(ui.helper.context).closest('ul');
            $parent.find('li > a').removeClass('active');

            if ($parent.hasClass('out-sub-list')) {
                $parent.parent().removeClass('active');
                $parent.parent().find('.sub-nav-click').addClass('active');
                $parent.parent().find('.sub-nav-click').attr('data-active', $(ui.helper.context).attr('data-active'));
                $parent.parent().find('.sub-nav-click i').prop('class', $(ui.helper.context).find('i').prop('class'));
            }

            $(ui.helper.context).addClass('active');
        }
    });

    $(document.body).click(function (evt) {
        var $subActive = $('.box-nav-left > li > a.sub-nav-click.active');
        if ($subActive.length > 0)
            $subActive.parent().removeClass('active');
    });

    $(window).resize(function () {
        var $subActive = $('.box-nav-left > li > a.sub-nav-click.active');
        if ($subActive.length > 0)
            $subActive.parent().removeClass('active');
    });

});