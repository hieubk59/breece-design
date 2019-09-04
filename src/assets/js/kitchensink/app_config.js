var kitchensink = angular.module('kitchensink', []);

kitchensink.config(function ($interpolateProvider) {
    $interpolateProvider
      .startSymbol('{[')
      .endSymbol(']}');
});

kitchensink.directive('ngDisabled', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.ngDisabled, function (newVal) {
                $($element).prop('disabled', newVal);
            });
        }
    };
});

kitchensink.directive('ngInitObject', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.ngInitObject);
        }
    };
});

kitchensink.directive('bindValueTo', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            var prop = capitalize($attrs.bindValueTo),
                getter = 'get' + prop,
                setter = 'set' + prop;

            $element.on('change keyup select', function () {
                if ($element[0].type !== 'checkbox') {
                    $scope[setter] && $scope[setter](this.value);
                }
            });

            $element.on('click', function () {
                if ($element[0].type === 'checkbox') {
                    if ($element[0].checked) {
                        $scope[setter] && $scope[setter](true);
                    }
                    else {
                        $scope[setter] && $scope[setter](false);
                    }
                }
            })

            $scope.$watch($scope[getter], function (newVal) {
                if ($element[0].type === 'radio') {
                    var radioGroup = document.getElementsByName($element[0].name);
                    for (var i = 0, len = radioGroup.length; i < len; i++) {
                        radioGroup[i].checked = radioGroup[i].value === newVal;
                    }
                }
                else if ($element[0].type === 'checkbox') {
                    $element[0].checked = newVal;
                }
                else {
                    $element.val(newVal);
                }
            });
        }
    };
});

kitchensink.directive('objectButtonsEnabled', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.objectButtonsEnabled, function (newVal) {
                
                $($element).find('.object-action').prop('disabled', !newVal);
                $($element).find('a.object-action').attr('disabled', !newVal);

                $('.object-action.selectpicker').attr('disabled', !newVal).selectpicker('refresh');
                $($element).find('.gradient-colorpicker.object-action').asColorPicker(newVal ? 'enable' : 'disable');

                //
                $($element).find('div.object-action').attr('disabled', !newVal);
                setTimeout(function () {
                    $("#hide-start").prop('disabled', true);
                    if ($(".out-list-layer > li> a").hasClass('active')) {
                        $("#hide-start").prop('disabled', false);
                    }

                    $(".archor-point.object-action").addClass("wr-archor-point-l").removeClass("wr-archor-point-2");
                    if (!newVal) {
                        $(".archor-point.object-action").addClass("wr-archor-point-2").removeClass("wr-archor-point-l");
                    }
                }, 50);
                //
            });
            
        }
    };
});