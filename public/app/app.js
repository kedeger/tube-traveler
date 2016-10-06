var tubeTravelApp = angular.module('TubeTravelApp', ['ngSanitize']).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
       // Allow same origin resource loads.
   'self',
   // Allow loading from our assets domain.  Notice the difference between * and **.
   'http://www.youtube.com/embed/**']);
});

tubeTravelApp.config(['$locationProvider', function($locationProvider){
  $locationProvider.html5Mode({enable: false, rewriteLinks: false}).hashPrefix('!');
}])

tubeTravelApp.controller('HomeCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
  $scope.year = '1900';
  $scope.min = 1900;
  $scope.max = 2016;

  $scope.getYear = function() {
    var req = {
      url: '/scrape/'+ $scope.year,
      method: 'GET'
    }

    $http(req).then(function success(res) {
      $scope.prepUrl = function(id) {
        $scope.myLink = $sce.trustAsResourceUrl($scope.link.url);
      }




      // $scope.link = { 'text' : '<a href="#">Link</a>'};
      // // $scope.sanLink = $sce.trustAsResourceUrl($scope.link.text);
      // $sce.trustAsHtml($scope.link.text);
      $scope.myLink = res.data.link;
      $scope.youtubeId = res.data.youtubeId;
      console.log(res.data.youtubeId);
    }, function error(res) {
      console.log(res);
    });
  }
}]);