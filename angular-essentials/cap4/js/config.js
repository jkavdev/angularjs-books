parking.config(function (parkingServiceProviderProvider, $httpProvider) {
    parkingServiceProviderProvider.setParkingRate(10);

    $httpProvider.interceptors.push('httpTimestampInterceptor');
});