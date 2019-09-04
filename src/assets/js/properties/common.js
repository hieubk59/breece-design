$method_commonjs = {
    convertInt: function (val) {
        if (val.indexOf("px") >= 0) {
            val = val.substring(0, val.length - 2);
        }
        if (val.indexOf("%") >= 0) {
            val = val.substring(0, val.length - 1);
        }
        return parseInt(val);
    },
    convertFloat: function (val) {
        if (val.indexOf("px") >= 0) {
            val = val.substring(0, val.length - 2);
        }
        if (val.indexOf("%") >= 0) {
            val = val.substring(0, val.length - 1);
        }
        return number.parseFixed(val, 2, 0);
    },
    convertString: function (val, isPixel) {
        isPixel = (typeof isPixel === "undefined") ? true : isPixel;
        return val + (isPixel ? "px" : "%");
    },
}