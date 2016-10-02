(function(){

    'use strict';

    angular
        .module('WeatherApp')
        .service('LocationService', LocationService);

        LocationService.$inject = ['$http', '$q'];

        function LocationService($http, $q){
            var service = {};
            var API_URL = "http://api.openweathermap.org/data/2.5/weather";
            var API_KEY = '90ba9873e51db191b6e77333b42e4618';
            var UNITS = 'metric';

            _init();

            function _init(){
                service.getLocationByCoords = _getLocationByCoords;
                service.getLocationByCountry = _getLocationByCountry;
            }

            function _getLocationByCoords(latitude, longitude){
                var defer = $q.defer();

                $http.get(API_URL,
                    { params: {
                        lat: latitude,
                        lon: longitude,
                        units: UNITS,
                        APPID: API_KEY
                    }})
                    .then(function(response){
                        defer.resolve(response.data);
                    }, function(error) {
                        defer.reject(error);
                    });

                return defer.promise;
            }

            function _getLocationByCountry(zip_code, country_code){
                var defer = $q.defer();

                $http.get(API_URL,
                    { params: {
                        zip: zip_code + ',' + country_code,
                        units: UNITS,
                        APPID: API_KEY
                    }})
                    .then(function(response){
                        defer.resolve(response.data);
                    }, function(error) {
                        defer.reject(error);
                    });

                return defer.promise;
            }

            return service;
        }
})();
