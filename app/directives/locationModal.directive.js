(function(){
    'use strict';

    angular
        .module('WeatherApp')
        .directive('locationModal', locationModal);

        locationModal.$inject = ['LocationService'];

        function locationModal(LocationService){
            var directive = {
                restrict: 'E',
                templateUrl: 'app/directives/templates/locationModal.html',
                scope: {},
                link: linkFn,
                controller: LocationModalController,
                controllerAs: 'LMC',
                bindToController: true
            };

            return directive;
        }

        function linkFn(scope, element, attrs) {}

        LocationModalController.$inject = ['LocationService', 'WeatherService', '$element'];

        function LocationModalController(LocationService, WeatherService, $element) {
            var vm = this;
            vm.location = {
                country_code: '',
                zip_code: '',
                step: 0
            };

            vm.getLocation = function(){
                if (vm.location.step == 0) {
                    _getGeoLocation();
                } else {
                    LocationService.getLocationByCountry(
                        vm.location.zip_code,
                        vm.location.country_code)
                    .then(function(response){
                        if (response.cod != '200') _hideModal();
                        WeatherService.setLocationName(response.name)
                            .setWeather(response.weather[0])
                            .setTemperature(response.main.temp);
                        _hideModal();
                    }, function(error){
                        console.error(error);
                    });
                }
                vm.location.step = 0;
            }

            vm.denyLocation = function(){
                if (vm.location.step == 0) {
                    vm.location.step++;
                    return;
                } else {
                    _hideModal();
                    vm.location.step = 0;
                }
            }

            function _getGeoLocation(){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position){
                        LocationService.getLocationByCoords(
                            position.coords.latitude,
                            position.coords.longitude)
                        .then(function(response){
                            if (response.cod != '200') _hideModal();
                            WeatherService.setLocationName(response.name)
                                .setWeather(response.weather[0])
                                .setTemperature(response.main.temp);
                            _hideModal();
                        }, function(error){
                            console.error(error);
                        });
                    })
                } else {
                    console.log('no support');
                }
            }

            function _hideModal() {
                $element[0].style.display = 'none';
            }
        }
})();
