parking.run(function ($http, $rootScope) {
    //valor padrao do accept 'Accept: "application/json, text/plain, */*"'
    //alterando para 'application/json'
    $http.defaults.headers.common.Accept = 'application/json';
    console.log('headers alterado: ', $http.defaults.headers)

    $http.defaults.cache = true;

    $rootScope.$on('$routeChangeStart', function (event, current, previous, rejection) {
        $rootScope.loading = true;
        console.log('change route evento', event);
        console.log('change route current', current);
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous, rejection) {
        $rootScope.loading = false;
    });

    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        $window.location.href = 'error.html';
    });

});