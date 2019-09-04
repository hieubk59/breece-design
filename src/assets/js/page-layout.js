var outerLayout, middleLayout, innerLayout, middleLayoutFt, innerLayoutFt;
$(document).ready(function () {
    outerLayout = $('.out-container-mid').layout({
        center__paneSelector: ".outer-center"
        //,	west__paneSelector:		".outer-west"
    , east__paneSelector: ".outer-east"
    , south__paneSelector: ".outer-south" 
        //,	west__size:				125
    , east__size: 300
    , south__size: 200
    , spacing_open: 2 // ALL panes
    , spacing_closed: 24 // ALL paness
    , togglerContent_open: '<div class="ui-icon"></div>'
    , togglerContent_closed: '<div class="ui-icon"></div>'
    , north__spacing_open: 0
        //,	south__spacing_open:	0
    , center__onresize: "middleLayout.resizeAll"
    });

    middleLayout = $('div.outer-center').layout({
        center__paneSelector: ".middle-center"
        //,	west__paneSelector:		".middle-west"
    , east__paneSelector: ".middle-east"
    , west__size: 100
    , east__size: 217
    , spacing_open: 2  // ALL panes
    , spacing_closed: 24 // ALL panes
    , togglerContent_open: '<div class="ui-icon"></div>'
    , togglerContent_closed: '<div class="ui-icon"></div>'
    , center__onresize: "innerLayout.resizeAll"

    });

    innerLayout = $('div.middle-center').layout({
        center__paneSelector: ".inner-center"
        //,	west__paneSelector:		".inner-west"
        //,	east__paneSelector:		".inner-east"
        //,	west__size:				75
        //,	east__size:				75
    , spacing_open: 2  // ALL panes
    , spacing_closed: 24  // ALL panes
    , west__spacing_closed: 12
    , east__spacing_closed: 12
    , togglerContent_open: '<div class="ui-icon"></div>'
    , togglerContent_closed: '<div class="ui-icon"></div>'
    });

    middleLayoutFt = $('div.outer-south').layout({
        center__paneSelector: ".middle-south"
    , east__paneSelector: ".middle-east-south"
    , west__size: 100
    , east__size: 520
    , spacing_open: 2  // ALL panes
    , spacing_closed: 24 // ALL panes
    , togglerContent_open: '<div class="ui-icon"></div>'
    , togglerContent_closed: '<div class="ui-icon"></div>'
    , center__onresize: "innerLayoutFt.resizeAll"
    });

    innerLayoutFt = $('div.middle-south').layout({
        center__paneSelector: ".inner-south"
    , spacing_open: 2  // ALL panes
    , spacing_closed: 24  // ALL panes
    , west__spacing_closed: 12
    , east__spacing_closed: 12
    , togglerContent_open: '<div class="ui-icon"></div>'
    , togglerContent_closed: '<div class="ui-icon"></div>'
    //, onresize_end: function () {
    //    setTimeout(function () {
    //        resetLayoutToggler();
    //    }, 10);
    //    return false; // false = Cancel
    //}
    });
    resetLayoutToggler();

    $('body').on('mousedown', '.ui-layout-toggler.ui-layout-toggler-south', function () {
        setTimeout(function () {
            resetLayoutToggler();
        }, 500);
    });
});

function resetLayoutToggler() {
    var hbox = $('.middle-east.two').height();
    $(".out-cont-nav-right.two").css({ "max-height": hbox - 137 });

    var hbox3 = $('.outer-east.three').height();
    $(".out-cont-nav-right.three").css({ "max-height": hbox3 - 78 });

    var hbox5 = $('.middle-east-south.five').height();
    $(".out-cont-nav-right.five").css({ "max-height": hbox5 - 110 });
}

$(window).resize(function () {
    setTimeout(function () {
        //var hbox = $('.middle-east.two').height();
        //$(".out-cont-nav-right.two").css({ "max-height": hbox - 137 });
        //var hbox3 = $('.outer-east.three').height();
        //$(".out-cont-nav-right.three").css({ "max-height": hbox3 - 78 });
        //var hbox5 = $('.middle-east-south.five').height();
        //$(".out-cont-nav-right.five").css({ "max-height": hbox5 - 110 });
        resetLayoutToggler();
    }, 500);
});