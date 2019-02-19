# Data Handling   

# Expressions

* podemos alterar a forma de interagir com o angular com `expressions`
* indicamos que estamos acessando as propriedades do objeto fornecido pelo `model`


        <td>{{car.plate}}</td>
        <td>{{car.color}}</td>
        <td>{{car.entrancce}}</td>

# Filters

# Currency

* utilizando o ``filter`` de moeda
* sera exibido `R$10,00`


        {{10 | currency}}

* informando o simbolo da moeda


        {{10 | currency:'R$'}}

* sera exibido `R$10,00`

* por padrao o `locale` do `angularjs` eh o `US` americano
* para alterar o `locale` do `pt-BR` brasil, precisamos adicionar ao projeto o arquivo com as definicoes dos `locales`


        <script src="js/lib/angular-locale_pt-br.js"></script>

# Date

* utilizando o `filter` de data
* sera exibida a seguinte data, `1 de fev de 2019`


        {{car.entrance | date}}

* sera exibida a data com os seguintes formato
* data exibida `fev 01/02/2019 00:00:00`


        {{car.entrance | date:'MMM dd/MM/yyyy HH:mm:ss'}}

# Uppercase e Lowercase

* utilizando filtros de caracteres minusculos e maiusculos
* o `angularjs` tambem aceita `pipeline` de `filters`, podendo serem utilizados varios `filters` de uma vez
* o texto sera transformado para minusculo, depois para maiusculo, resultado `6MBV006`


        <td>{{car.plate | lowercase | uppercase}}</td>

* o texto sera transformado para maiusculo, depois para minusculo, resultado `6mbv006`


        <td>{{car.plate | uppercase | lowercase}}</td>

# Diretiva `Plate`        

* criando uma diretiva que pegar o resultado do atributo `car.plate` e aplicar um filtro no valor
* definindo a diretiva com o nome `plate`


        parking.filter('plate', function () {
                return function (input) {
                        var firstPart = input.substring(0, 3);
                        var secondPart = input.substring(0, 3);
                        return `${firstPart} - ${secondPart}`;
                }
        });

* registrando o `filter` criado


        <script src="js/filters.js"></script>

* utilizando o `filter` criado         
* resultado sera de `5BBM299` para `5BB - M299`


        <td>{{car.plate | plate}}</td>

# Validacao de dados com formularios 

* definindo o formulario, no `angularjs` tem que se ter o nome do formulario

        <form name="carForm">
        </form>

* definindo os campos do formulario, tem que se ter o nome dos `inputs` no formulario, com o atributo `name` preenchido

        <form name="carForm">
                <input type="text" name="plateField" placeholder="What's the plate?" ng-model="car.plate" ng-required="true"
                        ng-minglength="6" ng-minglength="10" ng-pattern="/[A-Z]{3}[0-9]{3,7}/">
                <select name="colorField" ng-model="car.color" ng-options="color for color in colors" ng-required="true">
                        <option value="">Pick a Color</option>
                </select>
        </form>

* habilitando o botao de adicionar, apenas se o formulario estiver valido, com todos os dado preenchidos corretamente
* `carForm.$invalid` contem a `flag` indicando se todos os `inputs` do formularios estao de acordo


        <button ng-click="park(car)" ng-disabled="carForm.$invalid">Park</button>

* modificando o componente de mensagens de acordo com o estado dos `inputs` do formulario 
* se tanto o campo `plate` ou `color`, nao estiver de acordo, sera exibido uma mensagem pelo componente


        <alert ng-show="(carForm.plateField.$dirty && carForm.plateField.$invalid)
                            || (carForm.colorField.$dirty && carForm.colorField.$invalid)" topic="{{alertTopic}}"
            description="{{alertMessage}}" close="closeAlert()"></alert>

* definindo validacoes basicas ao campo, como valor obrigatorio, valor minimo e maximo de caracteres, formato do valor a ser informado


        <input type="text" name="plateField" placeholder="What's the plate?" ng-model="car.plate" ng-required="true"
            ng-minglength="6" ng-minglength="10" ng-pattern="/[A-Z]{3}[0-9]{3,7}/">

* exibindo outras mensagens mais espeficas do campo `plate`            


        <span ng-show="carForm.plateField.$error.required">You must inform the plate of the car!</span><br>
        <span ng-show="carForm.plateField.$error.minlength">The plate must have at least 6 characters!</span><br>
        <span ng-show="carForm.plateField.$error.maxlength">The plate must have at most 10 characters!</span><br>
        <span ng-show="carForm.plateField.$error.pattern">The plate must start with non-digits, followed by 4 to 7
            numbers!</span><br>