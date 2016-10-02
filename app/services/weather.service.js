(function(){

    'use strict';

    angular
        .module('WeatherApp')
        .service('WeatherService', WeatherService);

        WeatherService.$inject = [];

        function WeatherService(){
            var service = {};

            _init();

            function _init(){
                service.weather_info = {
                    location_name: '',
                    temperature: '',
                    weather: {}
                };

                service.setLocationName = _setLocationName;
                service.getWeatherInfo = _getWeatherInfo;
                service.setWeather = _setWeather;
                service.setTemperature = _setTemperature;
            }

            function _setLocationName(location_name){
                service.weather_info.location_name = location_name;
                return service;
            }

            function _setWeather(weather){
                service.weather_info.weather = weather;
                return service;
            }

            function _setTemperature(temperature){
                service.weather_info.temperature = temperature;
                return service;
            }

            function _getWeatherInfo(){
                return service.weather_info;
            }

            return service;
        };
})();
