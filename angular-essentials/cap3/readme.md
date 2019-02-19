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