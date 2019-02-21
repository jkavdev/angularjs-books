parking.filter('plate', function () {

    return function (input) {
        var firstPart = input.substring(0, 3);
        var secondPart = input.substring(3);

        return `${firstPart} - ${secondPart}`;
    }

});