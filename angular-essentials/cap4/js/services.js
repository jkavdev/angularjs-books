parking.factory('parkingFactory', function (parkingConfig) {

    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;

        return {
            period: parkingPeriod,
            price: parkingPrice
        }
    }

    return {
        calculateTicket: _calculateTicket
    }

});

parking.service('parkingService', function (parkingConfig) {

    this.calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;

        return {
            period: parkingPeriod,
            price: parkingPrice
        }
    }

});

parking.provider('parkingServiceProvider', function (parkingConfig) {

    var _parkingRate = parkingConfig.parkingRate;

    var _calculateTicket = function (car) {
        var departHour = new Date().getHours();
        var entranceHour = car.entrance.getHours();
        var parkingPeriod = departHour - entranceHour;
        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;

        return {
            period: parkingPeriod,
            price: parkingPrice
        }
    }

    this.setParkingRate = function (rate) {
        _parkingRate = rate;
    }

    this.$get = function () {
        return {
            calculateTicket: _calculateTicket
        }
    }

});

parking.factory('parkingHttpFacade', function ($http) {

    const uriCars = 'http://localhost:8081/cars';

    var _getCars = function () {
        return $http.get(uriCars);
    }

    var _park = function (car) {
        return $http.post(uriCars, car);
    }

    return {
        getCars: _getCars,
        park: _park
    }

});