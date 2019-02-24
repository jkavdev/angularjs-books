parking.directive('alert', function () {

    return {
        restrict: 'E',
        scope: {
            topic: '@',
            description: '@',
            close:'&'
        },
        templateUrl: "js\\alert.html",
        replace: true
    }

});