var appPath = './';

function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing)
      ? (object.getSelectionStyles()[styleName] || '')
      : (object[styleName] || '');
};
function setActiveStyle(styleName, value, object) {
    object = object || canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.setCoords();
    }
    else {
        object.set(styleName, value);
    }

    object.setCoords();
    canvas.requestRenderAll();
};

function getActiveProp(name) {
    var object = canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
};
function setActiveProp(name, value) {
    var object = canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    canvas.renderAll();
};

function isEmpty(value) {
    return (value == null || value.length === 0);
};

function createKey() {
    var _time = new Date().getTime();;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (_time + Math.random() * 16) % 16 | 0;
        _time = Math.floor(_time / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};
function drawImage(options, callback) {
    if (!options)
        options = {};

    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function () {
        var ratioW = 1, ratioH = 1;
        switch (options.scaleType) {
            case 'center-crop':
                ratioW = (options.width ? options.width : this.naturalWidth) / this.naturalWidth;
                ratioH = (options.height ? options.height : this.naturalHeight) / this.naturalHeight;
                if (ratioH > ratioW)
                    ratioW = ratioH;
                else
                    ratioH = ratioW;
                break;
            case 'center-inside':
            case 'fit-center':
            case 'fit-end':
            case 'fit-start':
                ratioW = (options.width ? options.width : this.naturalWidth) / this.naturalWidth;
                ratioH = (options.height ? options.height : this.naturalHeight) / this.naturalHeight;
                if (ratioH > ratioW)
                    ratioH = ratioW;
                else
                    ratioW = ratioH;
                break;
        }

        this.width = this.naturalWidth * ratioW;
        this.height = this.naturalHeight * ratioH;

        var drawCanvas = document.createElement('canvas');
        drawCanvas.width = options.width ? options.width : this.width;
        drawCanvas.height = options.height ? options.height : this.height;

        var cropX = 0, cropY = 0, cropW = this.width, cropH = this.height;
        switch (options.scaleType) {
            case 'center':
            case 'center-inside':
            case 'fit-center':
                cropX = (drawCanvas.width - this.width) / 2;
                cropY = (drawCanvas.height - this.height) / 2;
                break;
            case 'fit-end':
                cropX = drawCanvas.width - this.width;
                cropY = drawCanvas.height - this.height;
                break;
            case 'fit-xy':
                cropW = drawCanvas.width;
                cropH = drawCanvas.height;
                break;
        }

        var drawContext = drawCanvas.getContext('2d');
        drawContext.fillStyle = 'transparent';
        drawContext.fillRect(0, 0, drawCanvas.width, drawCanvas.height);
        drawContext.drawImage(this, cropX, cropY, cropW, cropH);

        if (typeof callback == 'function')
            callback(drawCanvas.toDataURL());

        drawCanvas.remove();
    };
    image.src = isEmpty(options.src) ? appPath + 'images/all/img-img.png' : options.src;
};
function pivotPoint(obj) {
    var scale = canvasScale / 100;
    return {
        x: obj.originLeft * scale + obj.width * obj.scaleX * scale * obj.pivotXRatio / 100,
        y: obj.originTop * scale + obj.height * obj.scaleY * scale * obj.pivotYRatio / 100
    };
};
function reloadImage(obj) {
    drawImage(
        {
            src: obj.imageSrc,
            width: obj.width,
            height: obj.height,
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
            scaleType: obj.scaleType
        },
        function (data) {
            obj.setSrc(data);
        }
    );
};
function updateCanvasDimension() {
    var beforeScrollWidth = $('#bd-wrapper')[0].scrollWidth;
    var beforeScrollHeight = $('#bd-wrapper')[0].scrollHeight;

    var $scope = angular.element(document.body).scope();
    canvas.setDimensions({
        width: $scope.configs.width * canvasScale / 100,
        height: $scope.configs.height * canvasScale / 100
    });

    //var activeObject = canvas.getActiveObject();
    //if (activeObject != null)
    //    updateRotatePosition(activeObject);

    $('#canvas-wrapper').css({ 'left': 0, 'top': 0 });

    if (canvas.width > $('#bd-wrapper')[0].clientWidth) {
        if ($('#bd-wrapper').hasClass('scrolling-left')) {
            var scrollLeft = $('#bd-wrapper').scrollLeft();
            if ($('#bd-wrapper')[0].scrollWidth > beforeScrollWidth)
                scrollLeft += ($('#bd-wrapper')[0].scrollWidth - beforeScrollWidth) / 2;
            else
                scrollLeft -= (beforeScrollWidth - $('#bd-wrapper')[0].scrollWidth) / 2;
            $('#bd-wrapper').scrollLeft(scrollLeft);
        }
        else
            $('#bd-wrapper').scrollLeft((canvas.width - $('#bd-wrapper').width()) / 2);
    }
    else
        $('#canvas-wrapper').css({ 'left': ($('#bd-wrapper')[0].clientWidth - canvas.width) / 2 });

    if (canvas.height > $('#bd-wrapper')[0].clientHeight) {
        if ($('#bd-wrapper').hasClass('scrolling-top')) {
            var scrollTop = $('#bd-wrapper').scrollTop();
            if ($('#bd-wrapper')[0].scrollHeight > beforeScrollHeight)
                scrollTop += ($('#bd-wrapper')[0].scrollHeight - beforeScrollHeight) / 2;
            else
                scrollTop -= (beforeScrollHeight - $('#bd-wrapper')[0].scrollHeight) / 2;
            $('#bd-wrapper').scrollTop(scrollTop);
        }
        else
            $('#bd-wrapper').scrollTop((canvas.height - $('#bd-wrapper').height()) / 2);
    }
    else
        $('#canvas-wrapper').css({ 'top': ($('#bd-wrapper')[0].clientHeight - canvas.height) / 2 });
};
function updateCanvasState(onBefore) {
    var $scope = angular.element(document.body).scope();
    if (!$scope.objectHanlder.undoStatus && !$scope.objectHanlder.redoStatus) {
        if (onBefore != null && typeof onBefore == 'function')
            onBefore();

        if ($scope.objectHanlder.currentState >= 0)
            $scope.objectHanlder.states = $scope.objectHanlder.states.slice(0, $scope.objectHanlder.currentState + 1);

        $scope.objectHanlder.states.push(canvas.toJSON());
        $scope.objectHanlder.currentState = $scope.objectHanlder.states.length - 1;
    }
};
function updateObjectPosition(obj, angle) {
    var pivot = {
        x: obj.originLeft + obj.width * obj.scaleX * obj.pivotXRatio / 100,
        y: obj.originTop + obj.height * obj.scaleY * obj.pivotYRatio / 100
    };
    var newPoint = fabric.util.rotatePoint(
        new fabric.Point(obj.originLeft, obj.originTop),
        new fabric.Point(pivot.x, pivot.y),
        fabric.util.degreesToRadians(angle)
    );
    obj.set({
        left: newPoint.x,
        top: newPoint.y,
        angle: angle
    }).setCoords();
    canvas.renderAll();
};
//function updateRotatePosition(obj) {
//    var pivot = {
//        x: obj.originLeft + obj.width * obj.scaleX * obj.pivotXRatio / 100,
//        y: obj.originTop + obj.height * obj.scaleY * obj.pivotYRatio / 100
//    };
//    var rotatePoint = fabric.util.rotatePoint(
//        new fabric.Point(obj.originLeft, obj.originTop),
//        new fabric.Point(pivot.x, pivot.y),
//        fabric.util.degreesToRadians(obj.angle)
//    );
//    obj.set({
//        originLeft: obj.originLeft + obj.left - rotatePoint.x,
//        originTop: obj.originTop + obj.top - rotatePoint.y
//    });

//    pivot = pivotPoint(obj);
//    $('#canvas-rotate').css({ left: pivot.x - $('#canvas-rotate').width() / 2, top: pivot.y - $('#canvas-rotate').height() / 2 });
//};

$method_canvas = {
    getTop: function (height, object) {
        object = object || canvas.getActiveObject();
        if (!object) return '0';

        var top = number.parseFloat(object.top);
        if (object.top < (height / 2)) {
            if (object.originY === "center") {
                top = top - number.parseFloat((object.height * object.scaleY) / 2);
            }
            else if (object.originY === "bottom") {
                top = top - number.parseFloat(object.height * object.scaleY);
            }
        }
        else if (object.top > (height / 2)) {
            if (object.originY === "center") {
                top = top + number.parseFloat((object.height * object.scaleY) / 2);
            }
            else if (object.originY === "bottom") {
                top = top + number.parseFloat(object.height * object.scaleY);
            }
        }
        return number.parseFloat(top);
    },
    setTop: function (vaulue, object) {
        object = object || canvas.getActiveObject();
        if (!object) return '0';

        var top = number.parseFloat(vaulue);
        if (object.originY === "center") {
            top = top + number.parseFloat((object.height * object.scaleY) / 2);
        }
        if (object.originY === "bottom") {
            top = top - number.parseFloat(object.height * object.scaleY);
        }
        return number.parseFloat(top);
    },
    getLeft: function (width, object) {
        object = object || canvas.getActiveObject();
        if (!object) return '0';

        var left = number.parseFloat(object.left);
        if (object.left < (width / 2)) {
            if (object.originX === "center") {
                left = left - number.parseFloat((object.width * object.scaleY) / 2);
            }
            if (object.originX === "right") {
                left = left - number.parseFloat(object.width * object.scaleY);
            }
        }
        else if (object.left > (width / 2)) {
            if (object.originX === "center") {
                left = left + number.parseFloat((object.width * object.scaleY) / 2);
            }
            if (object.originX === "right") {
                left = left + number.parseFloat(object.width * object.scaleY);
            }
        }
        return number.parseFloat(left);
    },
    setLeft: function (vaulue, object) {
        object = object || canvas.getActiveObject();
        if (!object) return '0';

        var left = number.parseFloat(vaulue);
        if (object.originX === "center") {
            left = left + number.parseFloat((object.width * object.scaleX) / 2);
        }
        if (object.originX === "right") {
            left = left - number.parseFloat((object.width * object.scaleX));
        }
        return number.parseFloat(left);
    },
};

function addAccessors($scope) {

    //var pattern = new fabric.Pattern({
    //    source: appPath + 'images/assets/ladybug.png',
    //    repeat: 'repeat'
    //});

    $scope.getOpacity = function () {
        //return getActiveStyle('opacity') * 100;
        var value = getActiveStyle('opacity') * 100;
        $("#show-opa-per-full,#show-opa-per").html(parseInt(value, 10) + '%');
        return value;

    };
    $scope.setOpacity = function (value) {
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

    $scope.getFill = function () {
        var value = getActiveStyle('fill');
        if (!isEmpty(value)) {
            $(".gradient-colorpicker[ng-value='getFill()'").asColorPicker('set', value);
        }
        return value;
    };
    $scope.setFill = function (value) {
        setActiveStyle('fill', value);
    };

    $scope.isBold = function () {
        return getActiveStyle('fontWeight') === 'bold';
    };
    $scope.toggleBold = function () {
        setActiveStyle('fontWeight',
          getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    };
    $scope.isItalic = function () {
        return getActiveStyle('fontStyle') === 'italic';
    };
    $scope.toggleItalic = function () {
        setActiveStyle('fontStyle',
          getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    };

    $scope.isUnderline = function () {
        return getActiveStyle('textDecoration').indexOf('underline') > -1 || getActiveStyle('underline');
    };
    $scope.toggleUnderline = function () {
        var value = $scope.isUnderline()
          ? getActiveStyle('textDecoration').replace('underline', '')
          : (getActiveStyle('textDecoration') + ' underline');

        setActiveStyle('textDecoration', value);
        setActiveStyle('underline', !getActiveStyle('underline'));
    };

    $scope.isLinethrough = function () {
        return getActiveStyle('textDecoration').indexOf('line-through') > -1 || getActiveStyle('linethrough');
    };
    $scope.toggleLinethrough = function () {
        var value = $scope.isLinethrough()
          ? getActiveStyle('textDecoration').replace('line-through', '')
          : (getActiveStyle('textDecoration') + ' line-through');

        setActiveStyle('textDecoration', value);
        setActiveStyle('linethrough', !getActiveStyle('linethrough'));
    };
    $scope.isOverline = function () {
        return getActiveStyle('textDecoration').indexOf('overline') > -1 || getActiveStyle('overline');
    };
    $scope.toggleOverline = function () {
        var value = $scope.isOverline()
          ? getActiveStyle('textDecoration').replace('overline', '')
          : (getActiveStyle('textDecoration') + ' overline');

        setActiveStyle('textDecoration', value);
        setActiveStyle('overline', !getActiveStyle('overline'));
    };

    $scope.isAlign = function (value) {
        return (capitalize(getActiveProp('textAlign')).toLowerCase() == value.toLowerCase());
    };
    $scope.toggAlign = function (value) {
        setActiveProp('textAlign', value.toLowerCase());
    };

    $scope.getTextAlign = function () {
        return capitalize(getActiveProp('textAlign'));
    };
    $scope.setTextAlign = function (value) {
        setActiveProp('textAlign', value.toLowerCase());
    };

    $scope.getFontFamily = function () {
        //return getActiveProp('fontFamily').toLowerCase();
        var value = getActiveProp('fontFamily').toLowerCase();
        if (!isEmpty(value))
            $('.selectpicker[bind-value-to="fontFamily"]').val(value).selectpicker('refresh');

        return value;
    };
    $scope.setFontFamily = function (value) {
        setActiveProp('fontFamily', value.toLowerCase());
    };

    $scope.getBgColor = function () {
        //return getActiveProp('backgroundColor');
        var value = getActiveStyle('backgroundColor');
        if (value.indexOf("#") != -1) {
            $(".gradient-colorpicker[ng-value='getBgColor()'").asColorPicker('set', value);
        }
        return value;
    };
    $scope.setBgColor = function (value) {
        setActiveProp('backgroundColor', value);
    };

    $scope.getTextBgColor = function () {
        var value = getActiveStyle('textBackgroundColor');
        var str = "transparent";
        if (!isEmpty(value)) {
            str = value;
        }
        $(".gradient-colorpicker[ng-value='getTextBgColor()']").asColorPicker('set', str);

        return value;
        //return getActiveProp('textBackgroundColor');
    };
    $scope.setTextBgColor = function (value) {
        setActiveProp('textBackgroundColor', value);
    };

    $scope.getStroke = function () {
        //return getActiveStyle('stroke');
        var value = getActiveStyle('stroke');
        var str = "transparent";
        if (!isEmpty(value)) {
            str = value;
        }
        $(".gradient-colorpicker[ng-value='getStroke()']").asColorPicker('set', str);

        return value;
    };
    $scope.setStroke = function (value) {
        return setActiveStyle('stroke', value);
    };

    $scope.getStrokeWidth = function () {
        var value = getActiveStyle('strokeWidth');
        if (!isEmpty(value)) {
            $('.selectpicker[bind-value-to="strokeWidth"]').val(value).selectpicker('refresh');
            $("#txtStrokeWidth").attr("data-value", value).val($method_commonjs.convertString(value));
        }
        return value;
    };
    $scope.setStrokeWidth = function (value) {
        value = parseInt(value, 10);
        $("#txtStrokeWidth").attr("data-value", value).val($method_commonjs.convertString(value));
        setActiveStyle('strokeWidth', value);
    };

    $scope.getStrokeDashArray = function () {
        var value = getActiveStyle('strokeDashArray');
        var str = "";
        if (!isEmpty(value))
            str = value.join();
        $('.selectpicker[bind-value-to="strokeDashArray"]').val(str).selectpicker('refresh');
        return value;
    };

    $scope.setStrokeDashArray = function (value) {
        setActiveStyle('strokeDashArray', value.split(","));
    };

    $scope.getFontSizePixel = function () {
        //var value = getActiveStyle('fontSize');
        var object = canvas.getActiveObject();
        if (!object) return '';
        var value = (object.fontSize * ((object.scaleX + object.scaleY) / 2)).toFixed(0);
        $('#txtFontSize').attr("data-value", value);
        return value + "px";
    };

    $scope.getFontSize = function () {
        //var value = getActiveStyle('fontSize');
        var object = canvas.getActiveObject();
        if (!object) return '';
        var value = (object.fontSize * ((object.scaleX + object.scaleY) / 2)).toFixed(0);

        if (!isEmpty(value))
            $('.selectpicker[bind-value-to="fontSize"]').val(value).selectpicker('refresh');
        return value;

    };
    $scope.setFontSize = function (value) {
        $('#txtFontSize').attr("data-value", value).val($method_commonjs.convertString(value));
        $method_stylesjs.setFontSize(parseInt(value, 10));
    };

    $scope.getLineHeight = function () {
        return getActiveStyle('lineHeight');
    };
    $scope.setLineHeight = function (value) {
        setActiveStyle('lineHeight', parseFloat(value, 10));
    };
    $scope.getCharSpacing = function () {
        return getActiveStyle('charSpacing');
    };
    $scope.setCharSpacing = function (value) {
        setActiveStyle('charSpacing', value);
    };

    $scope.getBold = function () {
        return getActiveStyle('fontWeight');
    };
    $scope.setBold = function (value) {
        setActiveStyle('fontWeight', value ? 'bold' : '');
    };

    $scope.getTextFontWeight = function () {
        //$('.selectpicker[bind-value-to="textFontWeight"]').val("regular").selectpicker('refresh');
        return getActiveStyle('fontWeight');
    };
    $scope.setTextFontWeight = function (value) {
        //setActiveStyle('fontWeight', (value.toLowerCase() == 'regular' ? '' : value.toLowerCase()));
        if (value.toLowerCase() === 'regular') {
            if ($scope.isBold()) $scope.toggleBold()
            if ($scope.isItalic()) $scope.toggleItalic()
            if ($scope.isUnderline()) $scope.toggleUnderline()
        }
        else if (value.toLowerCase() === 'bold') { $scope.toggleBold() }
        else if (value.toLowerCase() === 'italic') { $scope.toggleItalic() }
        else if (value.toLowerCase() === 'underline') { $scope.toggleUnderline() }
    };

    $scope.setPatternStyle = function (value) {
        var obj = canvas.getActiveObject();
        if (obj && obj.fill instanceof fabric.Pattern) {
            obj.fill.repeat = value;
            obj.dirty = true;
            canvas.requestRenderAll();
        }
    };

    $scope.hasPattern = function () {
        return getActiveStyle('fill') instanceof fabric.Pattern;
    };

    $scope.getPatternRepeat = function () {
        if ($scope.hasPattern()) {
            return getActiveStyle('fill').repeat;
        }
    };

    $scope.addResizeFilter = function () {
        setActiveStyle('resizeFilter', new fabric.Image.filters.Resize());
        canvas.requestRenderAll();
    }

    $scope.addInvertFilter = function () {

        setActiveStyle('filters', [new fabric.Image.filters.Invert()]);
        var obj = canvas.getActiveObject();
        obj.applyFilters && obj.applyFilters();
    }

    $scope.addContrastFilter = function () {
        setActiveStyle('filters', [new fabric.Image.filters.Contrast({ contrast: 0.7 })]);
        var obj = canvas.getActiveObject();
        obj.applyFilters && obj.applyFilters();
    }

    $scope.getCanvasBgColor = function () {
        return canvas.backgroundColor;
    };
    $scope.setCanvasBgColor = function (value) {
        canvas.backgroundColor = value;
        canvas.renderAll();
    };

    $scope.setSubScript = function () {
        var obj = canvas.getActiveObject();
        obj.setSubScript();
    };

    $scope.setSuperScript = function () {
        var obj = canvas.getActiveObject();
        obj.setSuperScript();
    };

    var defaults = {
        lineColor: '#000',
        shapeBackground: '#000',//transparent
        shapeBorder: '#000',
        width: 100,
        height: 100,
        opacity: 1
    };

    $scope.addQRcode = function () {
        fabric.Image.fromURL(appPath + 'images/all/img-qrcode.png', function (image) {
            image.set({
                usingType: 'qrcode',
                id: createKey(),
                name: 'QRcode Layer ' + layer.indexs.qrcode,
                opacity: defaults.opacity,
                renderLayer: 'layer.templates.renderQRcode',
                hasRotatingPoint: false,
            });
            image.scaleToHeight(defaults.height);
            canvas.add(image);
        });
    };

    $scope.addBarcode = function () {
        fabric.Image.fromURL(appPath + 'images/all/img-barcode.png', function (image) {
            image.set({
                usingType: 'barcode',
                id: createKey(),
                name: 'Barcode Layer ' + layer.indexs.barcode,
                opacity: defaults.opacity,
                renderLayer: 'layer.templates.renderBarcode',
                hasRotatingPoint : false,
            });
            image.scaleToHeight(defaults.height);
            canvas.add(image);
        });
    };

    $scope.addImage = function () {
        var drawOptions = {
            src: appPath + 'images/all/img-img.png',
            scaleType: 'center'
        }
        drawImage(drawOptions, function (data) {
            fabric.Image.fromURL(data, function (image) {
                image.set({
                    id: createKey(),
                    name: 'Image Layer ' + layer.indexs.image,
                    opacity: defaults.opacity,
                    renderLayer: 'layer.templates.renderImage',
                    imageSrc: drawOptions.src,
                    scaleType: drawOptions.scaleType
                });
                image.scaleToHeight(defaults.height);
                canvas.add(image);
            });
        });

        //var drawOptions = {
        //    src: appPath + 'images/img-hover-tiger.jpg',
        //    width: 600,
        //    height: 200,
        //    scaleType: 'center'
        //}
        //drawImage(drawOptions, function (data) {
        //    fabric.Image.fromURL(data, function (image) {
        //        image.set({
        //            id: createKey(),
        //            name: 'Image Layer ' + layer.indexs.image,
        //            opacity: defaults.opacity,
        //            renderLayer: 'layer.templates.renderImage',
        //            imageSrc: drawOptions.src,
        //            scaleType: drawOptions.scaleType
        //        });
        //        canvas.add(image);
        //    });
        //});
    };

    $scope.addHorizontalLine = function () {
        canvas.add(new fabric.Line([0, 0, defaults.width, 0], {
            id: createKey(),
            name: 'Line Horizontal Layer ' + layer.indexs.lineH,
            stroke: defaults.lineColor,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderLines.horizontal'
        }));
    };
    $scope.addVerticalLine = function () {
        canvas.add(new fabric.Line([0, 0, 0, defaults.height], {
            id: createKey(),
            name: 'Line Vertical Layer ' + layer.indexs.lineV,
            stroke: defaults.lineColor,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderLines.vertical'
        }));
    };

    $scope.addCircle = function () {
        canvas.add(new fabric.Circle({
            id: createKey(),
            name: 'Circle Layer ' + layer.indexs.circle,
            fill: defaults.shapeBackground,
            stroke: defaults.shapeBorder,
            radius: defaults.width / 2,
            strokeUniform: true,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderShapes.circle'
        }));
    };
    $scope.addRect = function () {
        canvas.add(new fabric.Rect({
            id: createKey(),
            name: 'Rectangle Layer ' + layer.indexs.rectangle,
            fill: defaults.shapeBackground,
            stroke: defaults.shapeBorder,
            width: defaults.width / 2,
            height: defaults.height,
            strokeUniform: true,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderShapes.rectangle'
        }));
    };
    $scope.addSquare = function () {
        canvas.add(new fabric.Rect({
            id: createKey(),
            name: 'Square Layer ' + layer.indexs.square,
            fill: defaults.shapeBackground,
            stroke: defaults.shapeBorder,
            width: defaults.width,
            height: defaults.height,
            strokeUniform: true,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderShapes.square'
        }));
    };
    $scope.addTriangle = function () {
        canvas.add(new fabric.Triangle({
            id: createKey(),
            name: 'Triangle Layer ' + layer.indexs.triangle,
            fill: defaults.shapeBackground,
            stroke: defaults.shapeBorder,
            width: defaults.width,
            height: defaults.height,
            strokeUniform: true,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderShapes.triangle'
        }));
    };

    $scope.addIText = function () {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
          'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.IText(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };
    $scope.addText = function () {
        var coord = getRandomLeftTop();
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
          'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
            left: coord.left,
            top: coord.top,
            fontFamily: 'helvetica',
            angle: getRandomInt(-10, 10),
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };
    $scope.addTextbox = function () {
        canvas.add(new fabric.Textbox('Text here', {
            id: createKey(),
            name: 'Text Layer ' + layer.indexs.text,
            fontFamily: 'helvetica',
            fontSize: 20,
            width: defaults.width * 2,
            opacity: defaults.opacity,
            renderLayer: 'layer.templates.renderText'
        }));
    };

    function getVideoImage(url, second, callback) {
        function initScreenshot() {
            videoHeight = video.videoHeight;
            videoWidth = video.videoWidth;
            canvasTemp.width = videoWidth;
            canvasTemp.height = videoHeight;
        }

        function startScreenshot() {
            if (drawTimer == null) {
                drawTimer = setInterval(grabScreenshot, 1000);
            }
        }

        function stopScreenshot() {
            if (drawTimer) {
                clearInterval(drawTimer);
                drawTimer = null;
            }
        }

        function grabScreenshot() {
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
            var img = new Image();
            img.src = canvasTemp.toDataURL("image/png");
            img.width = 120;
            ssContainer.appendChild(img);
        }

        var canvasTemp = document.getElementById("canvas_default");
        var ctx = canvasTemp.getContext("2d");
        var ssContainer = document.getElementById("img_content");
        var videoHeight, videoWidth;
        var drawTimer = null;

        var video = document.getElementById('video_default');
        video.addEventListener("loadedmetadata", initScreenshot);
        video.addEventListener("playing", startScreenshot);
        video.addEventListener("pause", stopScreenshot);
        video.addEventListener("ended", stopScreenshot);
        video.src = url;
        video.width = 360;
        video.height = 240;
    }
    $scope.addVideo = function () {
        fabric.Image.fromURL(appPath + 'images/all/img-video.png', function (image) {
            image.set({
                usingType: 'video',
                id: createKey(),
                name: 'Video Layer ' + layer.indexs.video,
                opacity: defaults.opacity,
                renderLayer: 'layer.templates.renderVideo'
            });
            image.scaleToHeight(defaults.height);
            canvas.add(image);
        });
    };
    $scope.addVideoBK = function () {
        getVideoImage('https://www.w3schools.com/html/mov_bbb.mp4', 0, function (image) {
            var video = new fabric.Image(image, {
                usingType: 'video',
                id: createKey(),
                name: 'Video Layer ' + layer.indexs.video,
                width: defaults.width,
                height: defaults.height,
                opacity: defaults.opacity,
                renderLayer: 'layer.templates.renderVideo'
            });

            canvas.add(video);
        });
    };

    $scope.addPolygon = function () {
        var coord = getRandomLeftTop();

        this.canvas.add(new fabric.Polygon([
          { x: 185, y: 0 },
          { x: 250, y: 100 },
          { x: 385, y: 170 },
          { x: 0, y: 245 }], {
              left: coord.left,
              top: coord.top,
              fill: '#' + getRandomColor()
          }));
    };

    var addShape = function (shapeName) {

        console.log('adding shape', shapeName);

        var coord = getRandomLeftTop();

        fabric.loadSVGFromURL(appPath + 'images/assets/' + shapeName + '.svg', function (objects, options) {

            var loadedObject = fabric.util.groupSVGElements(objects, options);

            loadedObject.set({
                left: coord.left,
                top: coord.top,
                angle: getRandomInt(-10, 10)
            })
            .setCoords();

            canvas.add(loadedObject);
        });
    };

    $scope.addPatternRect = function () {
        var coord = getRandomLeftTop();
        var rect = new fabric.Rect({
            width: 300,
            height: 300,
            left: coord.left,
            top: coord.top,
            angle: getRandomInt(-10, 10),
            fill: pattern,
        });
        canvas.add(rect);
    };

    $scope.maybeLoadShape = function (e) {
        var $el = $(e.target).closest('button.shape');
        if (!$el[0]) return;

        var id = $el.prop('id'), match;
        if (match = /\d+$/.exec(id)) {
            addShape(match[0]);
        }
    };

    $scope.confirmClear = function () {
        if (confirm('Are you sure?')) {
            canvas.clear();
        }
    };

    $scope.rasterize3x = function () {
        $scope.rasterize(3);
    }

    $scope.rasterize = function (multiplier) {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('This browser doesn\'t provide means to serialize canvas to an image');
        }
        else {
            var data = canvas.toDataURL({ multiplier: multiplier, format: 'png' });
            document.getElementById('canvasRasterizer').src = data;
        }
    };

    $scope.rasterizeSVG = function () {
        document.getElementById('SVGRasterizer').innerHTML = canvas.toSVG();
    };

    $scope.rasterizeJSON = function () {
        $scope.setConsoleJSON(JSON.stringify(canvas));
    };

    $scope.getSelected = function () {
        return canvas.getActiveObject();
    };
    $scope.removeSelected = function () {
        var activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
            if (activeObjects.length == 1) {
                if (activeObjects[0].isEditing)
                    return;
            }
            canvas.discardActiveObject();
            canvas.remove.apply(canvas, activeObjects);
        }
    };

    $scope.getLockScalingFlip = function () {
        return getActiveProp('lockScalingFlip');
    };
    $scope.setLockScalingFlip = function (value) {
        setActiveProp('lockScalingFlip', value);
    };

    $scope.getHorizontalLock = function () {
        return getActiveProp('lockMovementX');
    };
    $scope.setHorizontalLock = function (value) {
        setActiveProp('lockMovementX', value);
    };

    $scope.getVerticalLock = function () {
        return getActiveProp('lockMovementY');
    };
    $scope.setVerticalLock = function (value) {
        setActiveProp('lockMovementY', value);
    };

    $scope.getScaleLockX = function () {
        return getActiveProp('lockScalingX');
    },
    $scope.setScaleLockX = function (value) {
        setActiveProp('lockScalingX', value);
    };

    $scope.getScaleLockY = function () {
        return getActiveProp('lockScalingY');
    };
    $scope.setScaleLockY = function (value) {
        setActiveProp('lockScalingY', value);
    };

    $scope.getRotationLock = function () {
        return getActiveProp('lockRotation');
    };
    $scope.setRotationLock = function (value) {
        setActiveProp('lockRotation', value);
    };

    $scope.setCenteredRotation = function (value) {
        setActiveProp('centeredRotation', value);
    };

    $scope.getCenteredRotation = function (value) {
        return getActiveProp('centeredRotation');
    };

    $scope.getObjectCaching = function () {
        return getActiveProp('objectCaching');
    };

    $scope.setObjectCaching = function (value) {
        return setActiveProp('objectCaching', value);
    };

    $scope.getNoScaleCache = function () {
        return getActiveProp('noScaleCache');
    };

    $scope.setNoScaleCache = function (value) {
        return setActiveProp('noScaleCache', value);
    };

    $scope.getTransparentCorners = function () {
        return getActiveProp('transparentCorners');
    };
    $scope.setTransparentCorners = function (value) {
        return setActiveProp('transparentCorners', value);
    };

    $scope.getHasBorders = function () {
        return getActiveProp('hasBorders');
    };
    $scope.setHasBorders = function (value) {
        return setActiveProp('hasBorders', value);
    };

    $scope.getHasControls = function () {
        return getActiveProp('hasControls');
    };
    $scope.setHasControls = function (value) {
        return setActiveProp('hasControls', value);
    };

    $scope.sendBackwards = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendBackwards(activeObject);
            $method_positionsize.moveDown($("#" + activeObject.id).parent());
            updateCanvasState();
        }
    };
    $scope.sendToBack = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
            $method_positionsize.moveAfter($("#" + activeObject.id).parent(), $(".out-list-layer li").length);

            updateCanvasState();
        }
    };

    $scope.bringForward = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
            $method_positionsize.moveUp($("#" + activeObject.id).parent());
            updateCanvasState();
        }
    };
    $scope.bringToFront = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
            $method_positionsize.moveAfter($("#" + activeObject.id).parent(), 1);
            updateCanvasState();
        }
        
    };

    $scope.patternify = function () {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.fill instanceof fabric.Pattern) {
            obj.set('fill', null);
        }
        else {
            obj.set('fill', pattern);
        }
        canvas.renderAll();
    };

    $scope.play = function () {
        var obj = canvas.getActiveObject();

        if (!obj || !obj.getElement || !obj.getElement().play) return;
        obj.getElement().play();
        renderLoop();
    };

    function renderLoop() {
        canvas.requestRenderAll();
        window.requestAnimationFrame(renderLoop);
    }

    $scope.clip = function () {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.clipTo) {
            obj.clipTo = null;
        }
        else {
            var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
            obj.clipTo = function (ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            };
        }
        canvas.renderAll();
    };

    $scope.shadowify = function () {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.shadow) {
            obj.shadow = null;
        }
        else {
            obj.setShadow({
                color: 'rgba(0,0,0,0.3)',
                blur: 10,
                offsetX: 10,
                offsetY: 10
            });
        }
        canvas.renderAll();
    };

    $scope.gradientify = function () {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        obj.setGradient('fill', {
            x1: 0,
            y1: 0,
            x2: (getRandomInt(0, 1) ? 0 : obj.width),
            y2: (getRandomInt(0, 1) ? 0 : obj.height),
            colorStops: {
                0: '#' + getRandomColor(),
                1: '#' + getRandomColor()
            }
        });
        canvas.renderAll();
    };

    $scope.execute = function () {
        if (!(/^\s+$/).test(consoleValue)) {
            eval(consoleValue);
        }
    };

    var consoleSVGValue = (
      '<?xml version="1.0" standalone="no"?>' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
      '<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
        '<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>' +
      '</svg>'
    );

    var consoleValue = (
      '// clear canvas\n' +
      'canvas.clear();\n\n' +
      '// remove currently selected object\n' +
      'canvas.remove(canvas.getActiveObject());\n\n' +
      '// add red rectangle\n' +
      'canvas.add(new fabric.Rect({\n' +
      '  width: 50,\n' +
      '  height: 50,\n' +
      '  left: 50,\n' +
      '  top: 50,\n' +
      "  fill: 'rgb(255,0,0)'\n" +
      '}));\n\n' +
      '// add green, half-transparent circle\n' +
      'canvas.add(new fabric.Circle({\n' +
      '  radius: 40,\n' +
      '  left: 50,\n' +
      '  top: 50,\n' +
      "  fill: 'rgb(0,255,0)',\n" +
      '  opacity: 0.5\n' +
      '}));\n'
    );

    var consoleJSONValue = (
      '{"objects":[{"type":"i-text","originX":"left","originY":"top","left":51,"top":282,"width":230.05,"height":235.94,"fill":"#333","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"lorem ipsum\ndolor\nsit Amet\nconsectetur","fontSize":40,"fontWeight":"normal","fontFamily":"Helvetica","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{"0":{"0":{"fill":"red","fontSize":20,"fontFamily":"Helvetica","fontWeight":"normal","fontStyle":""},"1":{"fill":"red","fontSize":30,"fontFamily":"Helvetica","fontWeight":"normal","fontStyle":""},"2":{"fill":"red","fontSize":40,"fontFamily":"Helvetica","fontWeight":"normal","fontStyle":""},"3":{"fill":"red","fontSize":50,"fontFamily":"Helvetica","fontWeight":"normal","fontStyle":""},"4":{"fill":"red","fontSize":60,"fontFamily":"Helvetica","fontWeight":"normal","fontStyle":""},"6":{"textBackgroundColor":"yellow"},"7":{"textBackgroundColor":"yellow"},"8":{"textBackgroundColor":"yellow"},"9":{"textBackgroundColor":"yellow","fontFamily":"Helvetica","fontSize":40,"fontWeight":"normal","fontStyle":""}},"1":{"0":{"textDecoration":"underline"},"1":{"textDecoration":"underline","fontFamily":"Helvetica","fontSize":40,"fontWeight":"normal","fontStyle":""},"2":{"fill":"green","fontStyle":"italic","textDecoration":"underline"},"3":{"fill":"green","fontStyle":"italic","textDecoration":"underline"},"4":{"fill":"green","fontStyle":"italic","textDecoration":"underline","fontFamily":"Helvetica","fontSize":40,"fontWeight":"normal"}},"2":{"0":{"fill":"blue","fontWeight":"bold"},"1":{"fill":"blue","fontWeight":"bold"},"2":{"fill":"blue","fontWeight":"bold","fontFamily":"Helvetica","fontSize":40,"fontStyle":""},"4":{"fontFamily":"Courier","textDecoration":"line-through"},"5":{"fontFamily":"Courier","textDecoration":"line-through"},"6":{"fontFamily":"Courier","textDecoration":"line-through"},"7":{"fontFamily":"Courier","textDecoration":"line-through","fontSize":40,"fontWeight":"normal","fontStyle":""}},"3":{"0":{"fontFamily":"Impact","fill":"#666","textDecoration":"line-through"},"1":{"fontFamily":"Impact","fill":"#666","textDecoration":"line-through"},"2":{"fontFamily":"Impact","fill":"#666","textDecoration":"line-through"},"3":{"fontFamily":"Impact","fill":"#666","textDecoration":"line-through"},"4":{"fontFamily":"Impact","fill":"#666","textDecoration":"line-through","fontSize":40,"fontWeight":"normal","fontStyle":""}}}},{"type":"i-text","originX":"left","originY":"top","left":486,"top":343,"width":124.53,"height":157.3,"fill":"#333","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"foo bar\nbaz\nquux","fontSize":40,"fontWeight":"normal","fontFamily":"Helvetica","fontStyle":"","lineHeight":1.16,"textDecoration":"","textAlign":"left","textBackgroundColor":"","styles":{"0":{"0":{"fill":"red"},"1":{"fill":"red"},"2":{"fill":"red","fontFamily":"Helvetica","fontSize":40,"fontWeight":"normal","fontStyle":""}},"2":{"0":{"fill":"blue"},"1":{"fill":"blue"},"2":{"fill":"blue"},"3":{"fill":"blue","fontFamily":"Helvetica","fontSize":40,"fontWeight":"normal","fontStyle":""}}}},{"type":"rect","originX":"left","originY":"top","left":317.5,"top":342,"width":50,"height":50,"fill":{"type":"linear","coords":{"x1":0,"y1":0,"x2":0,"y2":50},"colorStops":[{"offset":"0","color":"rgb(163,168,82)","opacity":1},{"offset":"1","color":"rgb(49,176,244)","opacity":1}],"offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":2.48,"scaleY":2.48,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","originX":"left","originY":"top","left":401,"top":246,"width":80,"height":80,"fill":{"type":"linear","coords":{"x1":0,"y1":0,"x2":80,"y2":0},"colorStops":[{"offset":"0","color":"rgb(49,74,121)","opacity":1},{"offset":"1","color":"rgb(249,168,238)","opacity":1}],"offsetX":0,"offsetY":0},"stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":0.5,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":40,"startAngle":0,"endAngle":6.283185307179586},{"type":"text","originX":"left","originY":"top","left":137,"top":32,"width":598.13,"height":367.02,"fill":"#dfea95","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":0.5,"scaleY":0.5,"angle":6,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\nUt enim ad minim veniam,\nquis nostrud exercitation ullamco\nla","fontSize":40,"fontWeight":"","fontFamily":"helvetica","fontStyle":"","lineHeight":1.16,"textDecoration":" underline","textAlign":"left","textBackgroundColor":""},{"type":"path","originX":"center","originY":"center","left":561.5,"top":150.5,"width":183,"height":189,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"round","strokeLineJoin":"round","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"path":[["M",538.5,95],["Q",538.5,95,539,95],["Q",539.5,95,538.75,95],["Q",538,95,531,99.5],["Q",524,104,522.5,105.5],["Q",521,107,519.5,109],["Q",518,111,517.5,112],["Q",517,113,515.5,117.5],["Q",514,122,514,124],["Q",514,126,514,127.5],["Q",514,129,514.5,130.5],["Q",515,132,515,132.5],["Q",515,133,516,133.5],["Q",517,134,517.5,135],["Q",518,136,519,136.5],["Q",520,137,520,137.5],["Q",520,138,521,138],["Q",522,138,523,138],["Q",524,138,524.5,138],["Q",525,138,525,138.5],["Q",525,139,526,139],["Q",527,139,528,139],["Q",529,139,529.5,139],["Q",530,139,530.5,139],["Q",531,139,531.5,139],["Q",532,139,533,138.5],["Q",534,138,535,137.5],["Q",536,137,536.5,136.5],["Q",537,136,538,135.5],["Q",539,135,539.5,134.5],["Q",540,134,540.5,133.5],["Q",541,133,541.5,132.5],["Q",542,132,542,131.5],["Q",542,131,542,130.5],["Q",542,130,542,129.5],["Q",542,129,542,128.5],["Q",542,128,541.5,128],["Q",541,128,540.5,127.5],["Q",540,127,539.5,127],["Q",539,127,538,127],["Q",537,127,535.5,127],["Q",534,127,533,127.5],["Q",532,128,530.5,129.5],["Q",529,131,528.5,133],["Q",528,135,527.5,136],["Q",527,137,527,138.5],["Q",527,140,527,141.5],["Q",527,143,527,146],["Q",527,149,527.5,150.5],["Q",528,152,528.5,155],["Q",529,158,530.5,161],["Q",532,164,533,165.5],["Q",534,167,534.5,168],["Q",535,169,536.5,172],["Q",538,175,539,176],["Q",540,177,541,178],["Q",542,179,543,179.5],["Q",544,180,544.5,181],["Q",545,182,546,182],["Q",547,182,548,182.5],["Q",549,183,549.5,183.5],["Q",550,184,551,184],["Q",552,184,553,184],["Q",554,184,555,184],["Q",556,184,558,183],["Q",560,182,562.5,179],["Q",565,176,565.5,174],["Q",566,172,566,171],["Q",566,170,566,169],["Q",566,168,566,167.5],["Q",566,167,565.5,166],["Q",565,165,564,164.5],["Q",563,164,562.5,163.5],["Q",562,163,561,163],["Q",560,163,559.5,163],["Q",559,163,558,163.5],["Q",557,164,556.5,164.5],["Q",556,165,555.5,166.5],["Q",555,168,554.5,170],["Q",554,172,553.5,172.5],["Q",553,173,553,175.5],["Q",553,178,553,179],["Q",553,180,553.5,180.5],["Q",554,181,555.5,184.5],["Q",557,188,558.5,191],["Q",560,194,562,196.5],["Q",564,199,565,200.5],["Q",566,202,567.5,203],["Q",569,204,570,205],["Q",571,206,572,207.5],["Q",573,209,576.5,211],["Q",580,213,582,213.5],["Q",584,214,585,214],["Q",586,214,588,214.5],["Q",590,215,592,214.5],["Q",594,214,597,212],["Q",600,210,601,208],["Q",602,206,602.5,204],["Q",603,202,603,199.5],["Q",603,197,603,195],["Q",603,193,602.5,192],["Q",602,191,601,190],["Q",600,189,599.5,189],["Q",599,189,598.5,189],["Q",598,189,597.5,189],["Q",597,189,596.5,189],["Q",596,189,595,190.5],["Q",594,192,593.5,192.5],["Q",593,193,592.5,194.5],["Q",592,196,591.5,198],["Q",591,200,591,202.5],["Q",591,205,591.5,207],["Q",592,209,593,211.5],["Q",594,214,595.5,216],["Q",597,218,598,219.5],["Q",599,221,599.5,221.5],["Q",600,222,601.5,223.5],["Q",603,225,606.5,226],["Q",610,227,613,227],["Q",616,227,617.5,227],["Q",619,227,622,227],["Q",625,227,628,225],["Q",631,223,634,220.5],["Q",637,218,638,216],["Q",639,214,640.5,212],["Q",642,210,642,207.5],["Q",642,205,642.5,201],["Q",643,197,643,192],["Q",643,187,642.5,185.5],["Q",642,184,641.5,182.5],["Q",641,181,640,180],["Q",639,179,639,178.5],["Q",639,178,638,177],["Q",637,176,637,175.5],["Q",637,175,636.5,175],["Q",636,175,635.5,175.5],["Q",635,176,635,176.5],["Q",635,177,635,177.5],["Q",635,178,635,179],["Q",635,180,635,181],["Q",635,182,635,183],["Q",635,184,635,185],["Q",635,186,636,186.5],["Q",637,187,637.5,187.5],["Q",638,188,639.5,189],["Q",641,190,641.5,190],["Q",642,190,643.5,190.5],["Q",645,191,647.5,191],["Q",650,191,651,191],["Q",652,191,653.5,191],["Q",655,191,658,191],["Q",661,191,666,190],["Q",671,189,672,188.5],["Q",673,188,674,187.5],["Q",675,187,675.5,186.5],["Q",676,186,676.5,185],["Q",677,184,677.5,183],["Q",678,182,678,181.5],["Q",678,181,678,179],["Q",678,177,678,174.5],["Q",678,172,676.5,169],["Q",675,166,673,162.5],["Q",671,159,668,154.5],["Q",665,150,661.5,146],["Q",658,142,653,138],["Q",648,134,644,131],["Q",640,128,638,127],["Q",636,126,634.5,125],["Q",633,124,629.5,123.5],["Q",626,123,625,123],["Q",624,123,623.5,123.5],["Q",623,124,623,124.5],["Q",623,125,623,126],["Q",623,127,622.5,127.5],["Q",622,128,622,130],["Q",622,132,622,132.5],["Q",622,133,622,133.5],["Q",622,134,622.5,135.5],["Q",623,137,623.5,138],["Q",624,139,624.5,139],["Q",625,139,625.5,139.5],["Q",626,140,626,140.5],["Q",626,141,626.5,141],["Q",627,141,627.5,141],["Q",628,141,628.5,141],["Q",629,141,630,141],["Q",631,141,631.5,141],["Q",632,141,633,141],["Q",634,141,636,140.5],["Q",638,140,640,138.5],["Q",642,137,643.5,135],["Q",645,133,645.5,131.5],["Q",646,130,646.5,128],["Q",647,126,647,123],["Q",647,120,647,116.5],["Q",647,113,647,111.5],["Q",647,110,646.5,107.5],["Q",646,105,643.5,99],["Q",641,93,639.5,90.5],["Q",638,88,631,78],["Q",624,68,622,66.5],["Q",620,65,617,63.5],["Q",614,62,611,61.5],["Q",608,61,606.5,61],["Q",605,61,604.5,61],["Q",604,61,601.5,61],["Q",599,61,598,62],["Q",597,63,596.5,63.5],["Q",596,64,595,66],["Q",594,68,594,69],["Q",594,70,593.5,71.5],["Q",593,73,593,74.5],["Q",593,76,593,77],["Q",593,78,593,80],["Q",593,82,594,84],["Q",595,86,595.5,86.5],["Q",596,87,597,87.5],["Q",598,88,598.5,88],["Q",599,88,599.5,88.5],["Q",600,89,600.5,89],["Q",601,89,601.5,89],["Q",602,89,603.5,88.5],["Q",605,88,606.5,87.5],["Q",608,87,609.5,85.5],["Q",611,84,612,82.5],["Q",613,81,613.5,80],["Q",614,79,614.5,78],["Q",615,77,615,74],["Q",615,71,615,68.5],["Q",615,66,613.5,62.5],["Q",612,59,610.5,57.5],["Q",609,56,608,55],["Q",607,54,605.5,53.5],["Q",604,53,601,51.5],["Q",598,50,594,48.5],["Q",590,47,586,47],["Q",582,47,576.5,46],["Q",571,45,566.5,45],["Q",562,45,558.5,45],["Q",555,45,553,45],["Q",551,45,549,45.5],["Q",547,46,546,48],["Q",545,50,544.5,50.5],["Q",544,51,543.5,53.5],["Q",543,56,542.5,58.5],["Q",542,61,542,63.5],["Q",542,66,542.5,68.5],["Q",543,71,544,73.5],["Q",545,76,545.5,77.5],["Q",546,79,547,79.5],["Q",548,80,549,80.5],["Q",550,81,550.5,81],["Q",551,81,552,81],["Q",553,81,554,81],["Q",555,81,557,80],["Q",559,79,561,76.5],["Q",563,74,563.5,71.5],["Q",564,69,564,67],["Q",564,65,564,63.5],["Q",564,62,563.5,61],["Q",563,60,561.5,58.5],["Q",560,57,559,55.5],["Q",558,54,557,53],["Q",556,52,553.5,50.5],["Q",551,49,548,47],["Q",545,45,542.5,44],["Q",540,43,537,42],["Q",534,41,528.5,39.5],["Q",523,38,519,38],["Q",515,38,511,38],["Q",507,38,505.5,38],["Q",504,38,503,38],["Q",502,38,501.5,39.5],["Q",501,41,500.5,42.5],["Q",500,44,499,46],["Q",498,48,498,50.5],["Q",498,53,497.5,55],["Q",497,57,497,58],["Q",497,59,496.5,60.5],["Q",496,62,495.5,63.5],["Q",495,65,495,67],["Q",495,69,495,70],["Q",495,71,495,73],["Q",495,75,495.5,77],["Q",496,79,497,80.5],["Q",498,82,500,84.5],["Q",502,87,503,87.5],["Q",504,88,504.5,88.5],["Q",505,89,506.5,90],["Q",508,91,511,92],["Q",514,93,514.5,93],["Q",515,93,516.5,93],["Q",518,93,519,93],["Q",520,93,521,93],["Q",522,93,523,93],["Q",524,93,525,92.5],["Q",526,92,527,91.5],["Q",528,91,528.5,91],["Q",529,91,529,90.5],["L",529,90]],"pathOffset":{"x":586.5,"y":132.5}}],"background":""}'
    );

    $scope.getConsoleJSON = function () {
        return consoleJSONValue;
    };
    $scope.setConsoleJSON = function (value) {
        consoleJSONValue = value;
    };
    $scope.getConsoleSVG = function () {
        return consoleSVGValue;
    };
    $scope.setConsoleSVG = function (value) {
        consoleSVGValue = value;
    };
    $scope.getConsole = function () {
        return consoleValue;
    };
    $scope.setConsole = function (value) {
        consoleValue = value;
    };

    $scope.loadSVGWithoutGrouping = function () {
        _loadSVGWithoutGrouping(consoleSVGValue);
    };
    $scope.loadSVG = function () {
        _loadSVG(consoleSVGValue);
    };

    var _loadSVG = function (svg) {
        fabric.loadSVGFromString(svg, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).centerObject(obj).renderAll();
            obj.setCoords();
        });
    };

    var _loadSVGWithoutGrouping = function (svg) {
        fabric.loadSVGFromString(svg, function (objects) {
            canvas.renderOnAddRemove = false;
            canvas.add.apply(canvas, objects);
            canvas.renderOnAddRemove = true;
            canvas.renderAll();
        });
    };

    $scope.saveJSON = function () {
        _saveJSON(JSON.stringify(canvas));
    };

    var _saveJSON = function (json) {
        $scope.setConsoleJSON(json);
    };

    $scope.loadJSON = function () {
        _loadJSON(consoleJSONValue);
    };

    var _loadJSON = function (json) {
        canvas.loadFromJSON(json, function () {
            canvas.renderAll();
        });
    };

    function initCustomization() {
        if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
            Cufon.fonts.delicious.offsetLeft = 75;
            Cufon.fonts.delicious.offsetTop = 25;
        }

        fabric.Object.prototype.set({
            transparentCorners: false,
            borderColor: '#58b3f9',
            borderDashArray: [4, 4],
            cornerColor: '#58b3f9',
            cornerSize: 8,
            hasRotatingPoint: true,
            centeredRotation: true
        });

        fabric.util.requestAnimFrame(function render() {
            canvas.renderAll();
            fabric.util.requestAnimFrame(render);
        });

        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            fabric.Object.prototype.cornerSize = 30;
        }

        if (document.location.search.indexOf('guidelines') > -1) {
            initCenteringGuidelines(canvas);
            initAligningGuidelines(canvas);
        }

        canvas.setDimensions({ width: $scope.configs.width, height: $scope.configs.height });
        canvas.backgroundColor = $scope.configs.backgroundColor;
        canvas.calcOffset();
        canvas.renderAll();

        updateCanvasState();

        setTimeout(function () {
            if (canvas.width > $('#bd-wrapper')[0].clientWidth)
                $('#bd-wrapper').scrollLeft((canvas.width - $('#bd-wrapper').width()) / 2);
            else
                $('#canvas-wrapper').css({ 'left': ($('#bd-wrapper')[0].clientWidth - canvas.width) / 2 });

            if (canvas.height > $('#bd-wrapper')[0].clientHeight)
                $('#bd-wrapper').scrollTop((canvas.height - $('#bd-wrapper').height()) / 2);
            else
                $('#canvas-wrapper').css({ 'top': ($('#bd-wrapper')[0].clientHeight - canvas.height) / 2 });
        }, 100);
    }

    initCustomization();

    function addTexts() {
        var iText = new fabric.IText('lorem ipsum\ndolor\nsit Amet\nconsectetur', {
            left: 100,
            top: 150,
            fontFamily: 'Helvetica',
            fill: '#333',
            styles: {
                0: {
                    0: { fill: 'red', fontSize: 20 },
                    1: { fill: 'red', fontSize: 30 },
                    2: { fill: 'red', fontSize: 40 },
                    3: { fill: 'red', fontSize: 50 },
                    4: { fill: 'red', fontSize: 60 },

                    6: { textBackgroundColor: 'yellow' },
                    7: { textBackgroundColor: 'yellow' },
                    8: { textBackgroundColor: 'yellow' },
                    9: { textBackgroundColor: 'yellow' }
                },
                1: {
                    0: { textDecoration: 'underline' },
                    1: { textDecoration: 'underline' },
                    2: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    3: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' },
                    4: { fill: 'green', fontStyle: 'italic', textDecoration: 'underline' }
                },
                2: {
                    0: { fill: 'blue', fontWeight: 'bold' },
                    1: { fill: 'blue', fontWeight: 'bold' },
                    2: { fill: 'blue', fontWeight: 'bold' },

                    4: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    5: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    6: { fontFamily: 'Courier', textDecoration: 'line-through' },
                    7: { fontFamily: 'Courier', textDecoration: 'line-through' }
                },
                3: {
                    0: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    1: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    2: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    3: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' },
                    4: { fontFamily: 'Impact', fill: '#666', textDecoration: 'line-through' }
                }
            }
        });

        var iText2 = new fabric.IText('foo bar\nbaz\nquux', {
            left: 400,
            top: 150,
            fontFamily: 'Helvetica',
            fill: '#333',
            styles: {
                0: {
                    0: { fill: 'red' },
                    1: { fill: 'red' },
                    2: { fill: 'red' }
                },
                2: {
                    0: { fill: 'blue' },
                    1: { fill: 'blue' },
                    2: { fill: 'blue' },
                    3: { fill: 'blue' }
                }
            }
        });

        canvas.add(iText, iText2);
    }

    //addTexts(); //rilk


    $scope.getPreserveObjectStacking = function () {
        return canvas.preserveObjectStacking;
    };
    $scope.setPreserveObjectStacking = function (value) {
        return canvas.preserveObjectStacking = value;
    };

    $scope.getEnableRetinaScaling = function () {
        return canvas.enableRetinaScaling;
    };
    $scope.setEnableRetinaScaling = function (value) {
        canvas.enableRetinaScaling = value;
        canvas.setDimensions({
            width: canvas.width,
            height: canvas.height
        });
        return value
    };

    $scope.getSkipOffscreen = function () {
        return canvas.skipOffscreen;
    };
    $scope.setSkipOffscreen = function (value) {
        return canvas.skipOffscreen = value;
    };

    $scope.getFreeDrawingMode = function () {
        return canvas.isDrawingMode;
    };
    $scope.setFreeDrawingMode = function (value) {
        canvas.isDrawingMode = !!value;
        $scope.$$phase || $scope.$digest();
    };

    $scope.freeDrawingMode = 'Pencil';

    $scope.getDrawingMode = function () {
        return $scope.freeDrawingMode;
    };
    $scope.setDrawingMode = function (type) {
        $scope.freeDrawingMode = type;

        if (type === 'hline') {
            canvas.freeDrawingBrush = $scope.vLinePatternBrush;
        }
        else if (type === 'vline') {
            canvas.freeDrawingBrush = $scope.hLinePatternBrush;
        }
        else if (type === 'square') {
            canvas.freeDrawingBrush = $scope.squarePatternBrush;
        }
        else if (type === 'diamond') {
            canvas.freeDrawingBrush = $scope.diamondPatternBrush;
        }
        else if (type === 'texture') {
            canvas.freeDrawingBrush = $scope.texturePatternBrush;
        }
        else {
            canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);
        }

        $scope.$$phase || $scope.$digest();
    };

    $scope.getDrawingLineWidth = function () {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.width;
        }
    };
    $scope.setDrawingLineWidth = function (value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
        }
    };

    $scope.getDrawingLineColor = function () {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.color;
        }
    };
    $scope.setDrawingLineColor = function (value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    $scope.getDrawingLineShadowWidth = function () {
        if (canvas.freeDrawingBrush && canvas.freeDrawingBrush.shadow) {
            return canvas.freeDrawingBrush.shadow.blur || 1;
        }
        else {
            return 0
        }
    };
    $scope.setDrawingLineShadowWidth = function (value) {
        if (canvas.freeDrawingBrush) {
            var blur = parseInt(value, 10) || 1;
            if (blur > 0) {
                canvas.freeDrawingBrush.shadow = new fabric.Shadow({ blur: blur, offsetX: 10, offsetY: 10 });
            }
            else {
                canvas.freeDrawingBrush.shadow = null;
            }
        }
    };

    $scope.getIndexObj = function () {
        var activeObj = canvas.getActiveObject();
        if (!activeObj) return;
        //canvas.renderAll();
        var value = (activeObj && canvas.getObjects().indexOf(activeObj)) + 1;
        $('#zindex').val(value).attr("data-value", value);
        return value;
    }

    $scope.getObjectType = function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj == null)
            return '';
        return activeObj.usingType ? activeObj.usingType : activeObj.type;
    };
    $scope.getObjectName = function () {
        return getActiveProp('name');
    };

    $scope.setDrawingLineColor = function (value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    $scope.isSelectObject = function () {
        var object = canvas.getActiveObject();
        if (!object) return false;
        return true;
    };


    function initBrushes() {
        if (!fabric.PatternBrush) return;

        initVLinePatternBrush();
        initHLinePatternBrush();
        initSquarePatternBrush();
        initDiamondPatternBrush();
        //initImagePatternBrush();
    }
    initBrushes();

    //function initImagePatternBrush() {
    //    var img = new Image();
    //    img.src = appPath + 'images/assets/honey_im_subtle.png';
    //    $scope.texturePatternBrush = new fabric.PatternBrush(canvas);
    //    $scope.texturePatternBrush.source = img;
    //}

    function initDiamondPatternBrush() {
        $scope.diamondPatternBrush = new fabric.PatternBrush(canvas);
        $scope.diamondPatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRect().width;

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };
    }

    function initSquarePatternBrush() {
        $scope.squarePatternBrush = new fabric.PatternBrush(canvas);
        $scope.squarePatternBrush.getPatternSrc = function () {

            var squareWidth = 10, squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };
    }

    function initVLinePatternBrush() {
        $scope.vLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.vLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }

    function initHLinePatternBrush() {
        $scope.hLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.hLinePatternBrush.getPatternSrc = function () {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }

    $scope.disabledValueSetAssign = function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj == null || activeObj.type == 'textbox')
            return false;
        return ['barcode', 'qrcode'].indexOf(activeObj.usingType) == -1;
    };
    $scope.initProperties = function () {
        $('.prop-assignment-slot').addClass('hidden');
        $('.prop-background').addClass('hidden');
        $('.prop-font').addClass('hidden');
        $('.prop-opacity').addClass('hidden');
        $('.prop-orientation').addClass('hidden');
        $('.prop-rotate').removeClass('hidden');
        $('.prop-scale-type').addClass('hidden');
        $('.prop-value-set').addClass('hidden');
        $('.prop-value-set ul.nav-tabs > li > a[href="#assignment"]').prop('disabled', false);

        var activeObj = canvas.getActiveObject();
        if (activeObj == null)
            return;

        if (activeObj.type == 'rect') {
            $('.prop-assignment-slot').removeClass('hidden');
            $('.prop-background').removeClass('hidden');
            $('.prop-opacity').removeClass('hidden');
        }

        if (activeObj.type == 'textbox') {
            $('.prop-font').removeClass('hidden');
            $('.prop-opacity').removeClass('hidden');
            $('.prop-value-set').removeClass('hidden');
        }

        if (activeObj.type == 'image') {
            $('.prop-value-set').removeClass('hidden');

            if (['barcode', 'qrcode'].indexOf(activeObj.usingType) == -1) {
                $('.prop-opacity').removeClass('hidden');

                if (activeObj.usingType != 'video')
                    $('.prop-scale-type').removeClass('hidden');
            }
            else {
                $('.prop-rotate').addClass('hidden');
                $('.prop-value-set ul.nav-tabs > li > a[href="#assignment"]').prop('disabled', true);
            }
        }

        if (activeObj.type == 'line')
            $('.prop-orientation').removeClass('hidden');
    };
    $scope.setOrientation = function (value) {
        if (['landscape', 'portrait'].indexOf(value) == -1 || $scope.configs.orientation == value)
            return;

        var newDimension = {
            width: $scope.configs.height,
            height: $scope.configs.width
        };
        $scope.configs.width = newDimension.width;
        $scope.configs.height = newDimension.height;
        $scope.configs.orientation = value;

        updateCanvasDimension();
    };

    $scope.redo = function () {
        if ($scope.objectHanlder.redoFinishedStatus) {
            if ($scope.objectHanlder.states.length > 0 && $scope.objectHanlder.currentState < $scope.objectHanlder.states.length - 1) {
                $scope.objectHanlder.redoFinishedStatus = 0;
                $scope.objectHanlder.redoStatus = true;

                var canvasData = $scope.objectHanlder.states[$scope.objectHanlder.currentState + 1];
                if ($.isEmptyObject(canvasData)) {
                    $scope.objectHanlder.redoFinishedStatus = 1;
                    $scope.objectHanlder.redoStatus = false;
                    return;
                }

                layer.clear();

                canvas.loadFromJSON(canvasData, function () {
                    canvas.renderAll();

                    $scope.objectHanlder.currentState += 1;
                    $scope.objectHanlder.redoFinishedStatus = 1;
                    $scope.objectHanlder.redoStatus = false;
                });
            }
        }
    }
    $scope.undo = function () {
        if ($scope.objectHanlder.undoFinishedStatus) {
            if ($scope.objectHanlder.states.length > 0 && $scope.objectHanlder.currentState > 0) {
                $scope.objectHanlder.undoFinishedStatus = 0;
                $scope.objectHanlder.undoStatus = true;

                var canvasData = $scope.objectHanlder.states[$scope.objectHanlder.currentState - 1];
                if ($.isEmptyObject(canvasData)) {
                    $scope.objectHanlder.undoFinishedStatus = 1;
                    $scope.objectHanlder.undoStatus = false;
                    return;
                }

                layer.clear();

                canvas.loadFromJSON(canvasData, function () {
                    canvas.renderAll();

                    $scope.objectHanlder.currentState -= 1;
                    $scope.objectHanlder.undoFinishedStatus = 1;
                    $scope.objectHanlder.undoStatus = false;
                });
            }
        }
    }
};

function watchCanvas($scope) {
    canvas.on('object:added', function (obj) {
        eval(obj.target.renderLayer + '("' + obj.target.id + '","' + obj.target.name + '")');

        if (canvas.fromFile)
            return;

        updateCanvasState(function () {
            var coord = { left: 0, top: 0 };
            if ($scope.dropToCanvas.has) {
                coord.left = $scope.dropToCanvas.x;
                coord.top = $scope.dropToCanvas.y;

                $scope.dropToCanvas.has = false;
                $scope.dropToCanvas.x = 0;
                $scope.dropToCanvas.y = 0;
            }
            else {
                var scale = canvasScale / 100;
                coord.left = (($scope.configs.width - obj.target.width * obj.target.scaleX) * scale) / 2;
                coord.top = (($scope.configs.height - obj.target.height * obj.target.scaleY) * scale) / 2;
            }

            obj.target.set({
                left: coord.left * 100 / canvasScale,
                top: coord.top * 100 / canvasScale
            }).setCoords();

            obj.target.set({
                originLeft: obj.target.left,
                originTop: obj.target.top,
                pivotXRatio: 50,
                pivotYRatio: 50
            });

            canvas.setActiveObject(obj.target);
        });
    });
    canvas.on('object:modified', function (obj) {
        updateCanvasState();
    });
    canvas.on('object:removed', function (obj) {
        $('#' + obj.target.id).parent().remove();
        updateCanvasState();
    });

    canvas.on('object:moving', function (obj) {
        var left = $method_canvas.getLeft($scope.configs.width, obj.target); //number.parseFixed(target.left, 2, 0);
        var top = $method_canvas.getTop($scope.configs.height, obj.target);
        $('.text-position-x').val(number.formatFixed(left, 2, 0));
        $('.text-position-y').val(number.formatFixed(top, 2, 0));

        //updateRotatePosition(obj.target);
    });
    canvas.on('object:rotating', function (obj) {
        $('.text-transform-rotate').val(number.formatFixed(obj.target.angle, 2, 0));

        //updateRotatePosition(obj.target);
    });
    canvas.on('object:scaling', function (obj) {
        // Transform scale
        var scaleX = number.parseFixed(obj.target.scaleX, 2, 0);
        var scaleY = number.parseFixed(obj.target.scaleY, 2, 0);
        $('.text-transform-scale-x').attr('data-value', scaleX).val(number.formatFixed(scaleX, 2, 0));
        $('.text-transform-scale-y').attr('data-value', scaleY).val(number.formatFixed(scaleY, 2, 0));

        var left = $method_canvas.getLeft($scope.configs.width, obj.target); //number.parseFixed(target.left, 2, 0);
        var top = $method_canvas.getTop($scope.configs.height, obj.target);
        $('.text-position-x').val(number.formatFixed(left, 2, 0));
        $('.text-position-y').val(number.formatFixed(top, 2, 0));

        // Position
        //$('.text-position-x').val(number.formatFixed(opt.target.left, 2, 0));
        //$('.text-position-y').val(number.formatFixed(opt.target.top, 2, 0));

        // Size
        var width = number.parseFixed(obj.target.width * scaleX, 2, 0);
        var height = number.parseFixed(obj.target.height * scaleY, 2, 0);
        $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
        $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

        //fontSize
        var fontSize = (obj.target.fontSize * ((obj.target.scaleX + obj.target.scaleY) / 2)).toFixed(0);
        $("#txtFontSize").attr("data-value", fontSize).val($method_commonjs.convertString(fontSize));

        //updateRotatePosition(obj.target);
    });

    function updateScope() {
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();

        $('.out-list-layer li:not(.layer-title) a').removeClass('active');
        //$('#canvas-rotate').removeClass('active');

        var activeObject = canvas.getActiveObject();
        if (activeObject != null) {
            // Manual text
            $('.manual-text').val(activeObject.text);

            var left = $('.wr-archor-point-l').width() * activeObject.pivotXRatio / 100;
            var top = $('.wr-archor-point-l').height() * activeObject.pivotYRatio / 100;
            updatePivotPoint(left, top, activeObject.pivotXRatio, activeObject.pivotYRatio);

            $('#' + activeObject.id).addClass('active');
            //if (['barcode', 'qrcode'].indexOf(activeObject.usingType) == -1)
            //    $('#canvas-rotate').addClass('active');

            // Transform rotate
            $('.text-transform-rotate').val(number.formatFixed(activeObject.angle, 2, 0));

            // Transform scale
            var scaleX = number.parseFixed(activeObject.scaleX, 2, 0);
            var scaleY = number.parseFixed(activeObject.scaleY, 2, 0);
            $('.text-transform-scale-x').attr('data-value', scaleX).val(number.formatFixed(scaleX, 2, 0));
            $('.text-transform-scale-y').attr('data-value', scaleY).val(number.formatFixed(scaleY, 2, 0));

            // Position
            $('.text-position-x').val(number.formatFixed(activeObject.left, 2, 0));
            $('.text-position-y').val(number.formatFixed(activeObject.top, 2, 0));

            // Size
            var width = number.parseFixed(activeObject.width * scaleX, 2, 0);
            var height = number.parseFixed(activeObject.height * scaleY, 2, 0);
            $('.text-size-width').attr('data-value', width).val(number.formatFixed(width, 2, 0));
            $('.text-size-height').attr('data-value', height).val(number.formatFixed(height, 2, 0));

            $("#hide-start").prop("checked", false);
        }
    };

    canvas.on('object:selected', updateScope);
    canvas.on('path:created', updateScope);
    canvas.on('selection:updated', updateScope);
    canvas.on('selection:cleared', updateScope);
};

kitchensink.controller('CanvasControls', function ($scope) {

    $scope.configs = {
        name: '16-9 Landscape 2x4',
        orientation: 'landscape',
        formatPresets: 'Regular TV screen (16:9)',
        width: 1920,
        height: 1200,//1080,
        //width: 900,
        //height: 300,
        backgroundColor: '#fff',
    };
    $scope.dropToCanvas = {
        has: false,
        x: 0,
        y: 0
    };
    $scope.objectHanlder = {
        states: [],
        currentState: -1,
        undoStatus: false,
        redoStatus: false,
        undoFinishedStatus: 1,
        redoFinishedStatus: 1
    };
    $scope.getActiveStyle = getActiveStyle;

    addAccessors($scope);
    watchCanvas($scope);

});