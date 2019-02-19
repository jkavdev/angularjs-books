parking.controller('parkingCtrl', function ($scope) {

    $scope.title = 'Parking.......';

    $scope.cars = [
        { plate: '6MBV006' },
        { plate: '5BBM299' },
        { plate: '5BBM242' },
        { plate: '5AOJ230' }
    ];

    $scope.colors = [
        "Black",
        "White",
        "Red",
        "Yellow",
        "Blue"
    ];

    $scope.park = function (car) {
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



});