parking.config(function ($httpProvider, $routeProvider, $locationProvider,
    parkingServiceProviderProvider) {
    parkingServiceProviderProvider.setParkingRate(10);

    $httpProvider.interceptors.push('httpTimestampInterceptor');

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/parking', {
            templateUrl: 'parking.html',
            controller: 'parkingCtrl',
            resolve: {
                'cars': function (parkingHttpFacade) {
                    return parkingHttpFacade.getCars();
                }
            }

        })
        .when('/car/:id', {
            templateUrl: 'car.html',
            controller: 'carCtrl',
            resolve: {
                'car': function (parkingHttpFacade, $route) {
                    var id = $route.current.params.id;
                    return parkingHttpFacade.retrieveCar(id);
                }
            }
        })
        .otherwise({
            redirecTo: '/parking'
        });
});