parking.controller('parkingCtrl', function ($scope, 
        parkingFactory, parkingService, parkingServiceProvider) {

    $scope.title = 'Parking Lot';

    let data = new Date();

    $scope.cars = [
        { plate: '6MBV006', entrance: data },
        { plate: '5BBM299', entrance: data },
        { plate: '5BBM242', entrance: data },
        { plate: '5AOJ230', entrance: data }
    ];

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

});