(function(){
    'use strict';

    angular
        .module('WeatherApp')
        .controller('MainController', MainController);

        MainController.$inject = ['WeatherService'];

        function MainController(WeatherService){
            var vm = this;

            _init();

            function _init(){
                
            }
        };
})();
