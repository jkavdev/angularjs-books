# Directives

# `ngApp` diretiva que registra o modulo principal da aplicacao

* definindo o modulo princiapl

        var parking = angular.module('parking', []);

* registrando o modulo criado ao `html`        

        <html ng-app="parking">

* pode haver apenas um modulo principal por `html`     
* o teste abaixo nao imprime nada do modulo `outro`


        var outro = angular.module('outro', []);
        outro.controller('teste', function ($scope) {
            $scope.funciona = 'Funcionando'
        });

        <html ng-app="parking">
                <body ng-controller="parkingCtrl">
                        <h3>Parkinngg</h3>
                        <div ng-app="outro">
                                <div ng-controller="teste">{{funciona}}</div>
                        </div>
                </body>
        </html>


# `ngController` diretiva que registra um ``controller`` para uma porção de `html`

* ao vincular um `html` e `controller`, eles comecam  a compartilhar o mesmo `scope`


        parking.controller('parkingCtrl', function ($scope) {}

        <body ng-controller="parkingCtrl"></body>

* podemos separar o codigo do `controller` em varios outros `controllers`
* os `controllers` filhos herdam todos o comportamento do pai
* e podendo sobreescrever o conteudo caso as propriedades iguais
* como no caso da funcao `park`

        parking.controller('parkingCtrl', function ($scope) {
            $scope.park = function (car) {
                console.log('parkingCtrl');
            }
        });
        parking.controller('parkingAddCarCtrl', function ($scope) {
            $scope.park = function (car) {
                console.log('parkingAddCarCtrl');
            }
        });
        <body ng-controller="parkingCtrl">
                <button ng-controller="parkingAddCarCtrl" ng-click="park(car)">Park</button>
        </body>

# `ngBind` diretiva que liga um valor do `model` e sobreescreve o conteudo da `tag html`


        $scope.title = 'Parking.......';
        <h3 ng-bind="title"></h3>

* a vantagem de se utilizar `ngBind`, eh que o conteudo nao sera exibindo ao usuario, caso gere algum erro na pagina

# `ngBindHtml` diretiva que liga um valor do `model` em `html` e sobreescreve o conteudo da `tag html`

* essa diretiva vem `angular-sanitize.js`, que evitar ataques de injecao de conteudo maliciosos nas tags


        <script src="../js-deps/angular-sanitize.js"></script>
        $scope.titleHtml = '<b>Parking.......</b>';

        <h3 ng-bind-html="titleHtml"></h3>

# `ngRepeat` diretiva itera sobre um array


        $scope.cars = [
                { plate: '6MBV006' },
                { plate: '5BBM299' },
                { plate: '5AOJ230' }
        ];        

        <tbody>
            <tr ng-repeat="car in cars">
                <td>{{car.plate}}</td>
            </tr>
        </tbody>

* podemos obter ainda varios objects de auxilio com o `ngReapeat`        
* `$index` contem a posicao do objeto na iteracao
* `$first` informa se eh o primeiro registro
* `$middle` informa se eh o registro do meio
* `$last` informa se eh o ultimo registro
* `$odd` informa se a posicao do registro e impar
* `$even` informa se a posicao do registro e par


        <tr ng-repeat="(index, car) in cars">
                <td>{{index +' - '+ car.plate}}</td>
                <td>{{$first ? 'primeiro' : ''}}</td>
                <td>{{$middle ? 'do meio' : ''}}</td>
                <td>{{$last ? 'ultimo' : ''}}</td>
                <td>{{$odd ? 'primo' : ''}}</td>
                <td>{{$even ? 'par' : ''}}</td>
        </tr>

# `ngModel` diretiva cria um vinculo com o `scope`

* ela mode pode ser utilizada por `inputs`, `selects` e `textareas`


        <input type="text" ng-model="car.plate">

* sera criado o seguinte objeto no `scope`        


        'car': {
                plate: ''
        }

# `ngClick` diretiva de evento do click

* ao clicar no botao passamos como parametro o proprio valor do `model 'car'`

        $scope.park = function (car) {
                console.log('car');
        }
        <button ng-controller="parkingAddCarCtrl" ng-click="park(car)">Park</button>

# `ngDisable` diretiva que desabilita o uso de um componente `html`

* o botao sera desabilitado caso o campo plate nao seja preenchido

        <button ng-disable="!car.plate">Park</button>

# `ngClass` diretiva usada para adicionar `classes css` dinamicamente

* indicamos quando o valor do atributo `car.selected` for `true` a classe `selected`
* sera atribuida a linha, deixando o `background` amarelo
* podemos alterar o valor de `selected` atraves do `checkbox` adicionado, apontando para `car.selected`


        .selected {
            background-color: #FAFAD2;
        }
        <tr ng-class="{selected: car.selected}" ng-repeat="(index, car) in cars">
                <td><input type="checkbox" ng-model="car.selected"></td>
        </tr>


# `ngOptions` diretiva usada para preecher os dados de um `select`

        $scope.colors = [
                "Black",
                "White",
                "Yellow",
                "Blue"
        ];

        <select ng-model="car.color" ng-options="color for color in colors">
                <option value="">Pick a Color</option>
        </select>

# `ngStyle` diretiva usada aplicar um `style` dinamicamente

* indicamos para aplicar a cor que estiver no em `car.color`


        <td><span ng-style="{color: car.color}" ng-bind="car.color"></span></td>

# `ngShow e ngHide` diretivas usadas para mudar a visibilidade de um componente `html`

* a tabela sera exibida se ouver elementos no `array` de carros
* e a `div` de mensagem de vazio sera exibida caso o `array` de carros esteja vazia
* o `angular` altera apenas a visibilidade do componente com `css`
* mas ainda sim, podemos ver o conteudo no `html` da pagina gerado

        <table ng-show="cars.length">
                .....
        </table>        

        <div ng-hide="cars.length">
                The parking lot is empty
        </div>        

# `ngIf` diretiva usada para dizer se o componente `html` sera renderizado ou nao

* indicamos que a coluna sera apenas rederizada caso o valor `car.color` este preenchido


        <td ng-if="car.color"><span ng-style="{color: car.color}" ng-bind="car.color"></span></td>

# `ngInclude` diretiva usada injetar paginas, fragmentos em outras paginas       

* estamos incluindo uma pagina na pagina da aplicacao, contendo a funcao re remover todos os carros


        $scope.removeCars = function () {
                $scope.cars = [];
        }

        <body ng-controller="parkingCtrl">
                <div ng-include="'menu.html'"></div>
                <h3 ng-bind="title"></h3>
        </body>

        <div ng-include="'menu.html'"></div>

        <button ng-click="removeCars()"></button>

# A propria Diretiva        

* criando uma diretiva para informacoes
* indicando qual sera a forma que a diretiva sera chamada `restrict: 'E'`, no caso eh em forma de elemento
* com `scope` definimos valores que serao passados para a diretiva
* `@` o valor eh passado como uma `string`
* `&` podemos passar funcoes para a diretiva
* `templateUrl` indicamos aonde esta o `html` da diretiva
* `replace` indica que o codigo, a html que chama o a diretiva sera subituida pelo html da diretiva
* `transclude` indica que podemos ter `tags html` dentro da diretiva


        parking.directive('alert', function () {
                return {
                        restrict: 'E',
                        scope: {
                                topic: '@',
                                description: '@',
                                close:'&'
                        },
                        templateUrl: "js\\alert.html",
                        replace: true
                }
        });

* acessamos os valores atribuidos a diretiva normalmente, pois esta no `scope`


        <div class="alert">
                <span class="alert-topic" ng-bind="topic"> Something went wrong!</span>
                <span class="alert-description" ng-bind="description"> You must inform the plate and the color of  the car!</span>
                <a href="" ng-click="close()">Close</a>
        </div>

* utilizando a diretiva

        $scope.showAlert = true;
        $scope.alertTopic = 'Something went wrong!';
        $scope.alertMessage = 'You must inform the plate and the color of the car!';
        $scope.closeAlert = function () {
                $scope.showAlert = false;
        }

        <alert ng-show="showAlert" topic="{{alertTopic}}" description="{{alertMessage}}" close="closeAlert()"></alert>        