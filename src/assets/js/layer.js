var layer = {
    indexs: { qrcode: 1, barcode: 1, image: 1, lineH: 1, lineV: 1, circle: 1, rectangle: 1, square: 1, triangle: 1, text: 1, video: 1 },
    templates: {
        renderQRcode: function (id, name) {
            layer.indexs.qrcode++;
            $('\
                <li class="layer-qrcode">\
                    <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-7"></i><label>' + name + '</label></a>\
                    <div class="dropdown-menu out-action-layer">\
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                        <a href="javascript:void(0)"><span>Duplicate</span></a>\
                        <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                    </div>\
                </li>\
            ').insertAfter($('.out-list-layer li.layer-title'));
        },
        renderBarcode: function (id, name) {
            layer.indexs.barcode++;
            $('\
                <li class="layer-barcode">\
                    <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-8"></i><label>' + name + '</label></a>\
                    <div class="dropdown-menu out-action-layer">\
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                        <a href="javascript:void(0)"><span>Duplicate</span></a>\
                        <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                    </div>\
                </li>\
            ').insertAfter($('.out-list-layer li.layer-title'));
        },
        renderImage: function (id, name) {
            layer.indexs.image++;
            $('\
                <li class="layer-image">\
                    <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-11"></i><label>' + name + '</label></a>\
                    <div class="dropdown-menu out-action-layer">\
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                        <a href="javascript:void(0)"><span>Duplicate</span></a>\
                        <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                    </div>\
                </li>\
            ').insertAfter($('.out-list-layer li.layer-title'));
        },
        renderLines: {
            horizontal: function (id, name) {
                layer.indexs.lineH++;
                $('\
                    <li class="layer-horizontal-line">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-sub-horizontal"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            },
            vertical: function (id, name) {
                layer.indexs.lineV++;
                $('\
                    <li class="layer-vertical-line">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-sub-vertical"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            }
        },
        renderShapes: {
            circle: function (id, name) {
                layer.indexs.circle++;
                $('\
                    <li class="layer-circle">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-sub-circle"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            },
            rectangle: function (id, name) {
                layer.indexs.rectangle++;
                $('\
                    <li class="layer-rectangle">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-sub-rectangle"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            },
            square: function (id, name) {
                layer.indexs.square++;
                $('\
                    <li class="layer-square">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-6"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            },
            triangle: function (id, name) {
                layer.indexs.triangle++;
                $('\
                    <li class="layer-triangle">\
                        <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-icon-triangle"></i><label>' + name + '</label></a>\
                        <div class="dropdown-menu out-action-layer">\
                            <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                            <a href="javascript:void(0)"><span>Duplicate</span></a>\
                            <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                        </div>\
                    </li>\
                ').insertAfter($('.out-list-layer li.layer-title'));
            }
        },
        renderText: function (id, name) {
            layer.indexs.text++;
            $('\
                <li class="layer-text">\
                    <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-10"></i><label>' + name + '</label></a>\
                    <div class="dropdown-menu out-action-layer">\
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                        <a href="javascript:void(0)"><span>Duplicate</span></a>\
                        <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                    </div>\
                </li>\
            ').insertAfter($('.out-list-layer li.layer-title'));
        },
        renderVideo: function (id, name) {
            layer.indexs.video++;
            $('\
                <li class="layer-video">\
                    <a id="' + id + '" href="javascript:void(0)" data-toggle="dropdown"><i class="icon-nav-12"></i><label>' + name + '</label></a>\
                    <div class="dropdown-menu out-action-layer">\
                        <a href="javascript:void(0)" data-toggle="modal" data-target="#assign-parent-pp"><span>Assign parent</span></a>\
                        <a href="javascript:void(0)"><span>Duplicate</span></a>\
                        <a href="javascript:void(0)" class="delete"><span>Delete</span></a>\
                    </div>\
                </li>\
            ').insertAfter($('.out-list-layer li.layer-title'));
        }
    },
    clear: function () {
        layer.indexs.qrcode = 1;
        layer.indexs.barcode = 1;
        layer.indexs.image = 1;
        layer.indexs.lineH = 1;
        layer.indexs.lineV = 1;
        layer.indexs.circle = 1;
        layer.indexs.rectangle = 1;
        layer.indexs.square = 1;
        layer.indexs.triangle = 1;
        layer.indexs.text = 1;
        layer.indexs.video = 1;
        $('.out-list-layer li:not(.layer-title)').remove();
    }
};

$(document).ready(function () {
    $(document.body).on('contextmenu', '.out-list-layer li:not(.layer-title) a', function () {
        $(this).click();
        $(this).parent().addClass('open');
        return false;
    });
    $(document.body).on('click', '.out-list-layer li:not(.layer-title) a', function () {
        if ($(".box-nav-left li > a.hand").hasClass("active"))
            return false;

        $('.out-list-layer li:not(.layer-title)').removeClass('open');
        $('.out-list-layer li:not(.layer-title) a').removeClass('active');

        canvas.discardActiveObject();
        $(this).addClass('active');

        var layerId = $(this).prop('id');
        canvas.getObjects().forEach(function (o) {
            if (o.id === layerId && o.visible)
                canvas.setActiveObject(o);
        });

        var object = canvas.getActiveObject();
        if (!object) {
            if ($(".out-list-layer > li > a").hasClass("active")) {
                $("#hide-start").prop("checked", true);
            }
        }
        return false;
    });
    $(document.body).on('click', '.out-list-layer .out-action-layer a.delete', function () {
        var $scope = angular.element(this).scope();
        $scope.removeSelected();
    });
});