# Dependency Injection

# Factory
* colocando regras negocio em uma `factory`
* definindo a `factory`


        parking.factory('parkingService', function (parkingConfig) {
                var _calculateTicket = function (car) {
                        var departHour = new Date().getHours();
                        var entranceHour = new Date().getHours();
                        var parkingPeriod = departHour - entranceHour;
                        var parkingPrice = parkingPeriod * parkingConfig.parkingRate;
                        return {
                                period: parkingPeriod,
                                price: parkingPrice
                        }
                }
                return {
                        calculateTicket: _calculateTicket
                }
        });

* criando `constant` no `angular` referente a taxa da vaga


        parking.constant('parkingConfig', {
                parkingRate: 10
        });

* acessando a `factory` no `controller`


        parking.controller('parkingCtrl', function ($scope, parkingService) {
                $scope.calculateTicket = function (car) {
                        $scope.ticket = parkingService.calculateTicket(car);
                }
        });

* importando os arquivos criados no `index.html`


        <script src="js/constants.js"></script>
        <script src="js/services.js"></script>

* utilizando a funcao


        <td><button ng-click="calculateTicketFactory(car)">depart with factory</button></td>

# Service        

* criando uma `service`


        parking.service('parkingService', function (parkingConfig) {
                this.calculateTicket = function (car) {
                        .....
                        return {
                                period: parkingPeriod,
                                price: parkingPrice
                        }
                }
        });

# Provider

* criando um `provider`

* com o `provider` podemos configura-lo antes que seja servido como dependencia para a aplicacao
* e ele expoem seu comportamento atraves do metodo `$get`


        parking.provider('parkingServiceProvider', function (parkingConfig) {
                var _parkingRate = parkingConfig.parkingRate;
                var _calculateTicket = function (car) {
                        .....
                        return {
                                period: parkingPeriod,
                                price: parkingPrice
                        }
                }
                this.setParkingRate = function (rate) {
                        _parkingRate = rate;
                }
                this.$get = function () {
                        return {
                               calculateTicket: _calculateTicket
                        }
                }

        });

* como podemos configurar o `provider` temos o `setParkingRate` para ser atribuido na configuracao
* configurando funcionalidade

        
        parking.config(function (parkingServiceProvider) {
                parkingServiceProvider.setParkingRate(10);
        });

# `$http`, realizando requisicoes com a `api service` de `http` do `angularjs`

* realizando uma requisicao pra obter os carros pelo `backend`

* importando a `service` do `angularjs` que realiza requisicoes `http`


        parking.controller('parkingCtrl', function ($http))

* utilizando o verbo `get` para obter os dados

        const retrieveCars = function () {
                $http.get('http://localhost:8081/cars')
                .then((resp, status, headers, config) => {
                        console.log('carros buscados: ', resp.data);
                }).catch((error, status, header, config) => console.error('deu erro: ', error));
        }

* utilizando o verbo `post` para salvar o carro

        $scope.park = function (car) {
                $http.post(uriCars, car)
                .then((resp, status, headers, config) => {
                        console.log('car saved: ', resp.data);
                }).catch((error, status, header, config) => console.error('deu erro: ', error));
        }

* criando uma `facade` sobre os metodos da `service` `$http`

        parking.factory('parkingHttpFacade', function ($http) {
        const uriCars = 'http://localhost:8081/cars';
        var _getCars = function () {
                return $http.get(uriCars);
        }
        var _park = function (car) {
                return $http.post(uriCars, car);
        }
        return {
                getCars: _getCars,
                park: _park
        }
        });

* refatorando codigo do `controller`


        const retrieveCars = function () {
                parkingHttpFacade.getCars()
                .then((resp, status, headers, config) => {
                        console.log('carros buscados: ', resp.data);
                }).catch((error, status, header, config) => console.error('deu erro: ', error));
        }

        $scope.park = function (car) {
                parkingHttpFacade.park(car)
                .then((resp, status, headers, config) => {
                        console.log('car saved: ', resp.data);
                }).catch((error, status, header, config) => console.error('deu erro: ', error));

        }


# Configurando os `headers` da `service $http`
* para configuracoes que precisam ser atualizadas, antes da aplicacao subir, utiliza-se o `run`
* por padrao o `$http` tem no `header` o valor `Accept: "application/json, text/plain, */*"`
* alteraremos para apenas `application/json`


        parking.run(function ($http) {
                $http.defaults.headers.common.Accept = 'application/json';
                console.log('headers alterado: ', $http.defaults.headers)
        })

* habilitando `cache` com o `angularjs`
* sera armazenado as respostas do servidor, e sera retornado o mesmo resultado, caso a requisicao seja a mesma
* mas cuidado, pois algumas funcionalidades necessitam de dados atualizados


        parking.run(function ($http) {
                $http.defaults.cache = true;
        });

* testando
* sera apenas realizado a primeira requisicao, depois sera utilizado o mesmo resultado da primeira requisicao

        //com o cache habilitado
        retrieveCars();
        retrieveCars();
        retrieveCars();

