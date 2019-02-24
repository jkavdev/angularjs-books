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

# `Interceptors`

* criaremos um `interceptor` para adicionar sempre na requisicao um parametro de quando foi feito a requisicao
* um `interceptor` eh apenas uma `factory`
* criando o `interceptor`
* como o `interceptor` intercepta tudo, realizamos uma verificacao para apenas as requisicoes do `backend`


        parking.factory('httpTimestampInterceptor', function () {
                return {
                        'request': function (config) {
                                if (config.url.startsWith('http')) {
                                        const timestamp = Date.now();
                                        config.url = `${config.url}?ts=${timestamp}`
                                }
                                return config
                        }
                }
        });

* registrando o `interceptor` no `config` do angularjs


        parking.config(function ($httpProvider) {
                $httpProvider.interceptors.push('httpTimestampInterceptor');
        });

* importando arquivos na aplicacao


        <script src="js/inteceptors.js"></script>
        <script src="js/config.js"></script>

# Single Page Application

# Router

* importando o `router` do `angularjs` para realizar o roteamento das telas da aplicacao

        
        <script src="js/lib/angular-route.js"></script>

* registrando o novo modulo


        var parking = angular.module('parking', ['ngAnimate', 'ngRoute']);

* configurando as rotas
* criaremos duas rotas, uma para a listagem de carros, e outra para exibicao dos detalhes do carro
* para a configuracao das rotas utilizamos o `$routeProvider`
* configuramos uma rota com o metodo `when`, onde indicamos o caminho para chamar esta rota `/parking`
* indicamos onde esta o `html` e o `controller`
* e se for digitado qualquer outra rota desconhecida, ele redireciona para o `/parking`, trabalho feito com o `otherwise`


        parking.config(function ($routeProvider) {
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

* refatorando a tela `index.html`                
* temos apenas a definicao das dependencias utilizadas pela aplicacao
* e a diretiva de roteamento `<div ng-view></div>`, deixando a cargo do `ngRoute` o gerenciamento de telas


        <!DOCTYPE html>
        <html ng-app="parking">
        <head>
                <script src="js/lib/angular.js"></script>
                <script src="js/lib/angular-route.js"></script>
                <script src="js/config.js"></script>
        </head>
        <body>
                <div ng-view></div>
        </body>
        </html>

* criando o arquivo com a listagem de carros `parking.html`


        <input type="text" ng-model="criteria" placeholder="What are you looking for?">
        <table ng-show="cars.length">
        <thead>
                <tr>
                <th></th>
                <th><a href="" ng-click="field = 'plate'; order=!order">Plate</a></th>
                <th><a href="" ng-click="field = 'color'; order=!order">Color</a></th>
                <th><a href="" ng-click="field = 'entrance'; order=!order">Entrance</a></th>
                <th>depart</th>
                <th>depart</th>
                </tr>
        </thead>
        <tbody>
                <tr ng-class="{selected: car.selected}"
                ng-repeat="(index, car) in cars | filter:criteria | orderBy:field:order">
                <td><input type="checkbox" ng-model="car.selected"></td>
                <td>{{car.plate | plate}}</td>
                <td>{{car.color}}</td>
                <td>{{car.entrance | date:'dd/MM/yyyy HH:mm'}}</td>
                <td><button ng-click="calculateTicketFactory(car)">depart with factory</button></td>
                <td><button ng-click="calculateTicketService(car)">depart with service</button></td>
                <td><button ng-click="calculateTicketServiceProvider(car)">depart with service provider</button></td>
                <td><a href="#/car/{{car.id}}">{{car.plate | plate}}</a></td>
                </tr>
        </tbody>
        </table>
        <div ng-hide="cars.length">
        The parking lot is empty
        </div>
        <form name="carForm" novalidate>
        <alert ng-show="(carForm.plateField.$dirty && carForm.plateField.$invalid)
                                || (carForm.colorField.$dirty && carForm.colorField.$invalid)" topic="{{alertTopic}}"
                description="{{alertMessage}}" close="closeAlert()"></alert>

        <span ng-show="carForm.plateField.$error.required">You must inform the plate of the car!</span><br>
        <span ng-show="carForm.plateField.$error.minlength">The plate must have at least 6 characters!</span><br>
        <span ng-show="carForm.plateField.$error.maxlength">The plate must have at most 10 characters!</span><br>
        <span ng-show="carForm.plateField.$error.pattern">The plate must start with non-digits, followed by 4 to 7
                numbers!</span><br>
        <input type="text" name="plateField" placeholder="What's the plate?" ng-model="car.plate" ng-required="true"
                ng-minglength="6" ng-minglength="10" ng-pattern="/[A-Z]{3}[0-9]{3,7}/">

        <select name="colorField" ng-model="car.color" ng-options="color for color in colors" ng-required="true">
                <option value="">Pick a Color</option>
        </select>
        <button ng-click="park(car)" ng-disabled="carForm.$invalid">Park</button>
        </form>

* criando o arquivo com os detalhes do carro `car.html`


        <h3>Car Details</h3>
        <h5>Plate</h5> {{car.plate}}
        <h5>Color</h5> {{car.color}}
        <h5>Entrance</h5> {{car.entrance | date:'dd/MM/yyyy hh:mm'}}
        <h5>Period</h5> {{ticket.period}}
        <h5>Price</h5> {{ticket.price | currency}}
        <button ng-click="depart(car)">Depart</button>
        <a href="#/parking">Back to parking</a>

* acessando as telas pelo roteamento
* acessando a listagem de carros


        http://localhost:8080/#/parking


* acessando os dados do carro em especifico


        http://localhost:8080/#/car/2

* realizando a navegacao de rotas com `links html`
* sera realizado um direcionamento para a rota de carro, passando o id do carro


        <td><a href="#/car/{{car.id}}">{{car.plate | plate}}</a></td>

* direcionando para a rota de carros  

        <a href="#/parking">Back to parking</a>        

* passando parametros com `$routeParams`        
* na rota de carros indicamos que receberemos o id do carro pela rota `/car/:id`


        .when('/car/:id', {
            templateUrl: 'car.html',
            controller: 'carCtrl'
        })

* recebendo o paramento no `controller` com `$routeParams`
* acessando o valor pelo nome `$routeParams.id`


        parking.controller('carCtrl', function ($routeParams) {
                const retrieveCar = function (id) {
                        parkingHttpFacade.retrieveCar(id)
                }
                retrieveCar($routeParams.id);
        })