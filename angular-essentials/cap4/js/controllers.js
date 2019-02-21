parking.controller('parkingCtrl', function ($scope) {

    $scope.car = {
        plate: '',
        color: '',
        entrance: Date,
    }

    $scope.title = 'Parking Lot';

    $scope.cars = [
        { plate: '6MBV006', entrance: '2019-02-01' },
        { plate: '5BBM299', entrance: '2019-11-10' },
        { plate: '5BBM242', entrance: '2019-12-02' },
        { plate: '5AOJ230', entrance: '2019-06-05' }
    ];

    $scope.colors = [
        "Black",
        "White",
        "Red",
        "Yellow",
        "Blue"
    ];

    $scope.park = function (carForm) {

        console.log(carForm)

        // car.entrance = new Date();
        // $scope.cars.push(angular.copy(car));
        // delete $scope.car;
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