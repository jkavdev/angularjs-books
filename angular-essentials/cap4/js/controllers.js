parking.controller('parkingCtrl', function ($scope,
    parkingFactory, parkingService, parkingServiceProvider,
    parkingHttpFacade) {

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