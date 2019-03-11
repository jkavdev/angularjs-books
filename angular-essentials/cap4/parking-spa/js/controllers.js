parking.controller('parkingCtrl', function ($scope, $log,
    cars,
    parkingFactory, parkingService, parkingServiceProvider,
    parkingHttpFacade) {

    $log.info('Logging com angularjs $log');
    $log.debug('aperecera caso debug esteje habilitado');
    $log.info('Logging com angularjs $log');
    $log.error('Logging com angularjs $log');
    $log.warn('Logging com angularjs $log');

    $scope.title = 'Parking Lot';

    $scope.colors = [
        "Black",
        "White",
        "Red",
        "Yellow",
        "Blue"
    ];

    $scope.removeCars = function () {
        $scope.cars = [];
    }

    $scope.showAlert = true;
    $scope.alertTopic = 'Something went wrong!';
    $scope.alertMessage = 'You must inform the plate and the color of the car!';
    $scope.closeAlert = function () {
        $scope.showAlert = false;
    }

    $scope.calculateTicketFactory = function (car) {
        $scope.ticket = parkingFactory.calculateTicket(car);
        $scope.departed = true;
        car.departed = new Date();
        $scope.car = car;
        $scope.cars = $scope.cars.filter(item => item !== car);
    }

    $scope.calculateTicketService = function (car) {
        $scope.ticket = parkingService.calculateTicket(car);
        $scope.departed = true;
        car.departed = new Date();
        $scope.car = car;
        $scope.cars = $scope.cars.filter(item => item !== car);
    }

    $scope.calculateTicketServiceProvider = function (car) {
        $scope.ticket = parkingServiceProvider.calculateTicket(car);
        $scope.departed = true;
        car.departed = new Date();
        $scope.car = car;
        $scope.cars = $scope.cars.filter(item => item !== car);
    }

    const retrieveCars = function () {
        parkingHttpFacade.getCars()
            .then((resp, status, headers, config) => {
                let cars = resp.data;
                console.log('carros buscados: ', cars);
                cars.forEach(item => item.entrance = new Date(item.entrance))
                $scope.cars = cars;
            }).catch((error, status, header, config) => console.error('deu erro: ', error));
    }

    $scope.park = function (car) {
        parkingHttpFacade.park(car)
            .then((resp, status, headers, config) => {
                console.log('car saved: ', resp.data);
                delete $scope.car;
                retrieveCars();
            }).catch((error, status, header, config) => console.error('deu erro: ', error));

    }

    //com o cache habilitado, sera apenas requisicao ao servidor uma vez
    retrieveCars();
    retrieveCars();
    retrieveCars();

});

parking.controller('carCtrl', function ($scope, $routeParams, $location, $window,
    car,
    parkingHttpFacade, parkingService) {

    $scope.depart = function (car) {
        parkingHttpFacade.deleteCar(car.id)
            .then(() => $location.path('/parking'))
            .catch(error => {
                console.error('erro: ', error);
                $window.location.href = 'error.html';
            })
    }

    const retrieveCar = function (car) {
        $scope.car = car;
        $scope.ticket = parkingService.calculateTicket(car);
    }

    retrieveCar(car);
})