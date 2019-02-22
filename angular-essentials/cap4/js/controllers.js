parking.controller('parkingCtrl', function ($scope, $http,
    parkingFactory, parkingService, parkingServiceProvider) {

    $scope.title = 'Parking Lot';

    $scope.colors = [
        "Black",
        "White",
        "Red",
        "Yellow",
        "Blue"
    ];

    $scope.park = function (car) {
        car.entrance = new Date();
        $scope.cars.push(angular.copy(car));
        delete $scope.car;
    }

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
        $http.get('http://localhost:8081/cars')
            .then((resp, status, headers, config) => {
                console.log('carros buscados: ', resp.data);
                $scope.cars = resp.data;
            }).catch((error, status, header, config) => console.error('deu erro: ', error));
    }

    retrieveCars();

});