# Adicionando o `AngularJs`

* importando arquivo do `angularjs` para a pagina

        <script src="angular.js"></script>

* criando o modulo principal da aplicacao


        var parking = angular.module('parking', []);

* registrando o modulo da aplicacao ao `html`        


        <html ng-app="parking">

* criando o `controller parkingCtrl` recendo como depedencia o `$scope`


        parking.controller('parkingCtrl', function ($scope) {}

* atribuindo ao `$scope` dois objetos


        $scope.cars = [];
        $scope.park = function (car) {}

* indicando ao `html` que um `controller` ficara responsavel por esta tag do `html`


        <body ng-controller="parkingCtrl">
            ....conteudo gerenciado pelo parkingCtrl
        </body>

* iterando sobre os valores de `cars` atribuidos ao `$scope`


        <tr ng-repeat="car in cars">
            <td>{{car.plate}}</td>
        </tr>

* adicionando dados ao `model`        
* sera criado um objeto car com uma atributo plate


        <input type="text" ng-model="car.plate">

* atribuindo um evento do angular para adicionar o valor digitado
* `ng-click` sera executado ao click no botao


        <button ng-click="park(car)">Park</button>