var tubeTravelApp = angular.module('TubeTravelApp', []);

tubeTravelApp.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({enable: false, rewriteLinks: false}).hashPrefix('!');
}])

tubeTravelApp.controller('HomeCtrl', ['$scope', function($scope) {
  $scope.year = '1994';

//http url
 // '/scrape/'+$scope.year
  // $scope.changeYear = function() {

  // }
}]);