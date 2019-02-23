parking.run(function ($http) {
    //valor padrao do accept 'Accept: "application/json, text/plain, */*"'
    //alterando para 'application/json'
    $http.defaults.headers.common.Accept = 'application/json';
    console.log('headers alterado: ', $http.defaults.headers)

    $http.defaults.cache = true;
});