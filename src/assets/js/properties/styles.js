//opacity
var sliderfull = document.getElementById("opaRange-full");
var outputfull = document.getElementById("show-opa-per-full");
sliderfull.oninput = function () {
    outputfull.innerHTML = this.value + "%";
};
$(".click-opacity-full").on("click", function () {
    event.stopPropagation();
    $(".slider.show-opa-full").addClass("active");
});
$(document).on('click', function (event) {
    if (!$(event.target).closest('.slider.show-opa-full').length) {
        $(".slider.show-opa-full").removeClass("active");
    }
});
//end

// document keyup
$(document).on('keyup', function (e) {
    // if key is Delete
    if (e.which == 46) {
        // remove the same div you clicked on
        $('div.ToDelete').remove();
        $(".layer-square").removeClass("active");

        // to remove the parent
        //$('div.ToDelete').parent().remove();
    }
});

$("div.dg-controls").on("click", function () {
    event.stopPropagation();
    $('div.dg-controls').addClass("edit");
});
$(document).on('click', function (event) {
    if (!$(event.target).closest('div.dg-controls').length) {
        $("div.dg-controls").removeClass("edit");
    }
});

//-------------------------------//
$method_stylesjs = {
    setFontSize: function (value) {
        var object = canvas.getActiveObject();
        if (!object) return;
        var scaleX = 1, scaleY = 1;
        if (object.scaleX > object.scaleY) {
            scaleX = object.scaleX / object.scaleY;
        }
        else if (object.scaleX < object.scaleY) {
            scaleY = object.scaleY / object.scaleX;
        }
        if (scaleX === 1 && scaleY > 1) {
            var ratio = (scaleX + scaleY) / 2;
            value = parseFloat(value / ratio).toFixed(2);
        }
        object.set({ fontSize: value, scaleX: scaleX, scaleY: scaleY, width: (object.width * (object.scaleX / scaleX)), height: (object.height * (object.scaleY / scaleY)) });

        object.setCoords();
        canvas.requestRenderAll();

        updateCanvasState();
    },
    event: function () {
        $('#txtFontSize').change(function () {
            var value = $method_commonjs.convertInt($(this).val());
            var valueBefor = $(this).attr("data-value");
            if (!$.isNumeric(value)) {
                $(this).val($method_commonjs.convertString(valueBefor));
                return;
            };
            $method_stylesjs.setFontSize(parseInt(value, 10));

            $('.selectpicker[bind-value-to="fontSize"]').val(value).selectpicker('refresh');
            $(this).attr("data-value", value).val($method_commonjs.convertString(value));
        });

        $('#txtStrokeWidth').change(function () {
            var value = $method_commonjs.convertInt($(this).val());
            var valueBefor = $(this).attr("data-value");
            if (!$.isNumeric(value)) {
                $(this).val($method_commonjs.convertString(valueBefor));
                return;
            };
            setActiveStyle('strokeWidth', value);
            $('.selectpicker[bind-value-to="strokeWidth"]').val(value).selectpicker('refresh');
            $(this).attr("data-value", value).val($method_commonjs.convertString(value));
        });

        $('.select-scale-type').select2({ minimumResultsForSearch: -1 });
        $('.select-scale-type').change(function () {
            var activeObject = canvas.getActiveObject();
            if (activeObject == null)
                return;

            activeObject.scaleType = $(this).val();
            reloadImage(activeObject);
        });
        $('.select-scale-type').val('center').change();
    }
}
$(document).ready(function () {
    $method_stylesjs.event();
});