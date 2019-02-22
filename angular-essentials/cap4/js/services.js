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