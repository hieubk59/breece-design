var number = {
    isNumber: function (value) {
        if (value === undefined || value === null || value === '' || value === 'undefined' || value === 'null')
            return false;
        return !isNaN(value);
    },
    formatFixed: function (value, digit, nullValue) {
        if (!number.isNumber(digit))
            digit = 0;

        value = number.parseFloat(value, nullValue);
        if (value != null)
            value = value.toFixed(digit);

        return value;
    },
    parseInt: function (value, nullValue) {
        if (number.isNumber(value))
            return parseInt(value);

        if (number.isNumber(nullValue))
            return parseInt(nullValue);

        return null;
    },
    parseFloat: function (value, nullValue) {
        if (number.isNumber(value))
            return parseFloat(value);

        if (number.isNumber(nullValue))
            return parseFloat(nullValue);

        return null;
    },
    parseFixed: function (value, digit, nullValue) {
        if (!number.isNumber(digit))
            digit = 0;

        value = number.parseFloat(value, nullValue);
        if (value != null)
            value = parseFloat(value.toFixed(digit));

        return value;
    }
};

$(document.body).on('focus', 'input[data-type="number"]', function () {
    $(this).select();
});
$(document.body).on('keypress', 'input[data-type="number"]', function (evt) {
    var code = evt.which;
    if (evt.which == undefined)
        code = evt.charCode;

    if (code == 13) {
        $(this).blur();
        return false;
    }

    var char = String.fromCharCode(code);
    if (!/^-?\d*\.?\d*$/.test(char))
        return false;

    if (char == '-' && (this.selectionStart != 0 || $(this).val().indexOf('-') != -1))
        return false;

    var dataLength = number.parseInt($(this).attr('data-length'), 18);
    if ($(this).val().length == dataLength)
        return false;
});