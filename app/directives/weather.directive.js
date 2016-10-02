(function(){
    'use strict';

    angular
        .module('WeatherApp')
        .directive('weatherBlock', weatherBlock);

        function weatherBlock(){
            var directive = {
                restrict: 'E',
                templateUrl: 'app/directives/templates/weatherBlock.html',
                scope: {},
                link: linkFn,
                controller: WeatherBlockController,
                controllerAs: 'WBC',
                bindToController: true
            };

            return directive;
        }

        function linkFn(scope, element, attrs) {}

        WeatherBlockController.$inject = ['WeatherService'];

        function WeatherBlockController(WeatherService){
            var vm = this;

            vm.weatherInfo = WeatherService.getWeatherInfo();
        }
})();
