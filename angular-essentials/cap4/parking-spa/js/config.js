parking.config(function ($httpProvider, $routeProvider, $locationProvider,
    parkingServiceProviderProvider) {
    parkingServiceProviderProvider.setParkingRate(10);

    $httpProvider.interceptors.push('httpTimestampInterceptor');

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/parking', {
            templateUrl: 'parking.html',
            controller: 'parkingCtrl'
        })
        .when('/car/:id', {
            templateUrl: 'car.html',
            controller: 'carCtrl'
        })
        .otherwise({
            redirecTo: '/parking'
        });
});