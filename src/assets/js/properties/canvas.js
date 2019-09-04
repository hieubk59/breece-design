var $arguments_canvasjs = { clipboard: new Object(), actionCut: false };
$method_canvasjs = {
    getHeightForWidth: function (width, widthBefore, height) {
        if ($('.btn-size-all.nav-top').hasClass('active')) {
            var ratio = width / widthBefore;
            height = height * ratio;
        }
        return parseInt(height, 10);
    },
    getWidthForHeight: function (height, heightBefore, width) {
        if ($('.btn-size-all.nav-top').hasClass('active')) {
            var ratio = height / heightBefore;
            width = width * ratio;
        }
        return parseInt(width, 10);
    },
    getRandomInt: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    onKeyDownHandler: function (event) {
        var key, evt;
        if (window.event) {
            key = window.event.keyCode; evt = window.event;
        } else {
            key = event.keyCode; evt = event;
        }
        if (['A'].indexOf(evt.target.tagName) == -1 && $(evt.target).is(':focus')) return;

        switch (key) {
            // Shortcuts
            case 67: // Ctrl+C
                if (event.ctrlKey) {
                    event.preventDefault();
                    $method_canvasjs.copy(false);
                }
                break;
                // Paste (Ctrl+V)
            case 86: // Ctrl+V
                if (event.ctrlKey) {
                    event.preventDefault();
                    $method_canvasjs.paste();
                }
                break;
            case 88: // Ctrl+X
                if (event.ctrlKey) {
                    event.preventDefault();
                    $method_canvasjs.copy(true);
                }
                break;
            default:
                // TODO
                break;
        }
    },
    createName: function (name) {
        name = name || $arguments_canvasjs.clipboard.name;
        if (name.indexOf("coppy") == -1) {
            name = name + " coppy"
        } else {
            var array = name.split("coppy");
            var number = 0;
            if (array.length > 1) {
                number = array[array.length - 1];
                if (number === "")
                    number = 0;
            }
            name = name.replace("coppy" + number, "coppy");
            name = name + (parseInt(number) + 1);
        }
        return name;
    },
    copy: function (actionCut) {
        if (jQuery.isEmptyObject(canvas.getActiveObject())) return;

        canvas.getActiveObject().clone(function (cloned) {
            $arguments_canvasjs.clipboard = cloned;
            $(".paste-obj").removeClass('visible');
        });

        $arguments_canvasjs.actionCut = false;
        if (actionCut) {
            $arguments_canvasjs.actionCut = true;
            var $scope = angular.element(document.body).scope();
            $scope.removeSelected();
        }
    },
    paste: function () {
        //getRandomInt(-50, 50)
        if (jQuery.isEmptyObject($arguments_canvasjs.clipboard)) return;

        $arguments_canvasjs.clipboard.clone(function (clonedObj) {
            canvas.discardActiveObject();
            //clonedObj.set({
            //    //left: clonedObj.left + 10,
            //    //top: clonedObj.top + 10,
            //    evented: true,
            //});
            if (clonedObj.type === 'activeSelection') {
                // active selection needs a reference to the canvas.
                //clonedObj.canvas = canvas;
                var i = 0;
                clonedObj.forEachObject(function (obj) {
                    if (!$arguments_canvasjs.actionCut) {
                        obj.set("id", createKey());
                        var name = $method_canvasjs.createName(obj.name);
                        canvas.getObjects().forEach(function (o) {
                            if (name === o.name) {
                                $arguments_canvasjs.clipboard._objects[i].name = name;
                                name = $method_canvasjs.createName(name);
                            }
                        });
                        obj.set("name", name);
                    }
                    var top = parseFloat(obj.top)+10;// + ;
                    var left = parseFloat(obj.left) + 10;//+ getRandomInt(-50, 50);

                    $arguments_canvasjs.clipboard._objects[i].name.top += 10;
                    $arguments_canvasjs.clipboard._objects[i].name.left += 10;

                    canvas.add(obj);
                    canvas.item(canvas.size() - 1).set({ top: top, left: left, });
                    i++;
                });
                // this should solve the unselectability
                clonedObj.setCoords();
            } else {
                //add new name and id for coppy
                if (!$arguments_canvasjs.actionCut) {
                    clonedObj.set("id", createKey());
                    var name = $method_canvasjs.createName();
                    canvas.getObjects().forEach(function (o) {
                        if (name === o.name) {
                            $arguments_canvasjs.clipboard.name = name;
                            name = $method_canvasjs.createName();
                        }
                    });
                    clonedObj.set("name", name);
                }

                var top = parseFloat(clonedObj.top) + 10;// + ;
                var left = parseFloat(clonedObj.left) + 10;//+ getRandomInt(-50, 50);

                $arguments_canvasjs.clipboard.top += 10;
                $arguments_canvasjs.clipboard.left += 10;
                canvas.add(clonedObj);

                canvas.item(canvas.size() - 1).set({ top: top, left: left, }).setCoords();
            }
            canvas.setActiveObject(clonedObj);
            //updateRotatePosition(canvas.getActiveObject())
            if ($arguments_canvasjs.actionCut) {
                $arguments_canvasjs.clipboard = new Object();
                $(".paste-obj").addClass('visible');
            }
            canvas.requestRenderAll();
        });
    },
    event: function () {
        $('#canvasWidth').change(function () {
            var $scope = angular.element(document.body).scope();
            var value = $method_commonjs.convertInt($(this).val());
            if (!$.isNumeric(value)) {
                $(this).val($method_commonjs.convertString($scope.configs.width));
                return;
            }

            $scope.configs.height = $method_canvasjs.getHeightForWidth(value, $scope.configs.width, $scope.configs.height);
            $scope.configs.width = value;

            updateCanvasDimension();

            $(this).val($method_commonjs.convertString($scope.configs.width));
            $("#canvasHeight").val($method_commonjs.convertString($scope.configs.height));
        });
        $('#canvasHeight').change(function () {
            var $scope = angular.element(document.body).scope();
            var value = $method_commonjs.convertInt($(this).val());
            if (!$.isNumeric(value)) {
                $(this).val($method_commonjs.convertString($scope.configs.height));
                return;
            };

            $scope.configs.width = $method_canvasjs.getWidthForHeight(value, $scope.configs.height, $scope.configs.width);
            $scope.configs.height = value;

            updateCanvasDimension();

            $("#canvasWidth").val($method_commonjs.convertString($scope.configs.width));
            $(this).val($method_commonjs.convertString($scope.configs.height));
        });
        $('#txtObjectName').change(function () {
            var object = canvas.getActiveObject();
            if (!object) return;

            var value = $(this).val();
            $("a#" + object.id + ' label').html(value);
            object.set("name", value).setCoords();
            canvas.renderAll();

            updateCanvasState();
        });
        $('#hide-start').change(function () {
            if ($(".box-nav-left li > a.hand").hasClass("active"))
                return false;

            if ($(this).is(":checked")) {
                var layerId = $(".out-list-layer > li> a.active").prop('id');
                setActiveProp("visible", false);
                canvas.discardActiveObject().renderAll();
                $(".out-list-layer > li> a#" + layerId).addClass('active');
                $('<i class="fa fa-eye-slash cus-icon-abs"></i>').insertAfter(".out-list-layer > li> a#" + layerId);

            } else {
                var layerId = $(".out-list-layer > li> a.active").prop('id');
                canvas.getObjects().forEach(function (o) {
                    if (o.id === layerId)
                        canvas.setActiveObject(o);
                });
                setActiveProp("visible", true);
                canvas.renderAll();
                $(".out-list-layer > li> a.active").parent().find(".cus-icon-abs").remove();
            }

            updateCanvasState();
        });
        $('.manual-text').keyup(function () {
            var activeObject = canvas.getActiveObject();
            if (activeObject == null)
                return;

            var value = $(this).val();

            if (activeObject.type == 'image' && ['barcode', 'qrcode'].indexOf(activeObject.usingType) == -1) {
                $.get('FileToBase64.ashx?url=' + value, function (data) {
                    activeObject.imageSrc = data;
                    reloadImage(activeObject);
                });

                //if (['video'].indexOf(activeObject.usingType) != -1) {
                //    var video = document.getElementById('my-video');
                //    //$(video).removeAttr("width")
                //    if (video.src != value) {
                //        video.src = value;
                //        setTimeout(function () {
                //            video.currentTime = 5;
                //            if (video.videoWidth > 0) {
                //                var width = (360 / video.videoHeight) * video.videoWidth;
                //                var height = video.height;
                //                if (video.videoHeight < 360) {
                //                    width = video.videoWidth;
                //                    height = video.videoHeight;
                //                }
                //                activeObject.set({ width: width, height: height, scaleX: 1, scaleY: 1 });
                //                activeObject._element = video;

                //            } else {
                //                activeObject.setSrc(appPath + 'images/all/img-video.png')
                //                activeObject.set({ width: 115, height: 86, scaleX: 1, scaleY: 1 });
                //            }
                //            activeObject.setCoords();
                //            canvas.renderAll();

                //        }, 2000);
                //    }
                //}
            }

            activeObject.set('text', value).setCoords();
            canvas.renderAll();
        });

        $(".coppy-obj").parent("li").click(function () {
            $method_canvasjs.copy(false);
        });
        $(".paste-obj").parent("li").click(function () {
            $method_canvasjs.paste();
        });
        $(".cut-obj").parent("li").click(function () {
            $method_canvasjs.copy(true);
        });

        document.onkeydown = $method_canvasjs.onKeyDownHandler;

        fabric.Object.prototype.drawControls = function (ctx) {
            if (!this.hasControls) {
                return this;
            }
            var wh = this._calculateCurrentDimensions(),
                width = wh.x,
                height = wh.y,
                scaleOffset = this.cornerSize,
                left = -(width + scaleOffset) / 2,
                top = -(height + scaleOffset) / 2,
                methodName = this.transparentCorners ? 'stroke' : 'fill';
            ctx.save();
            ctx.strokeStyle = ctx.fillStyle = this.cornerColor;
            if (!this.transparentCorners) {
                ctx.strokeStyle = this.cornerStrokeColor;
            }
            this._setLineDash(ctx, this.cornerDashArray, null);
            // top-left
            this._drawControl('tl', ctx, methodName, left, top);
            // top-right
            this._drawControl('tr', ctx, methodName, left + width, top);
            // bottom-left
            this._drawControl('bl', ctx, methodName, left, top + height);
            // bottom-right
            this._drawControl('br', ctx, methodName, left + width, top + height);

            if (!this.get('lockUniScaling')) {
                // middle-top
                this._drawControl('mt', ctx, methodName, left + width / 2, top);
                // middle-bottom
                this._drawControl('mb', ctx, methodName, left + width / 2, top + height);
                // middle-right
                this._drawControl('mr', ctx, methodName, left + width, top + height / 2);
                // middle-left
                this._drawControl('ml', ctx, methodName, left, top + height / 2);
            }

            // middle-top-rotate
            if (this.hasRotatingPoint) {
                var rotate = new Image(), rotateLeft, rotateTop;
                rotate.src = appPath + 'images/all/icon-rotate.png';
                rotateLeft = (left + width / 2) - 3;
                rotateTop = top - this.rotatingPointOffset - 3;
                ctx.drawImage(rotate, rotateLeft, rotateTop, 15, 15);
            }

            ctx.restore();
            return this;
        }
    },
}
$(document).ready(function () {
    $method_canvasjs.event();
});