angular.module('starter.controllers', [])

.controller('AppCtrl', function ($rootScope,
                                 $scope,
                                 $ionicModal,
                                 $timeout,
                                 $auth,
                                 $ionicLoading) {

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    })
    .then(function(modal) {
      $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function () {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    $auth.submitLogin($scope.loginData)
      .then(function (resp) {
        $rootScope.$on('auth:login-success', function (ev, user) {
          $scope.currentUser = angular.extend(user, $auth.retrieveData('auth_headers'));
        });
        $ionicLoading.hide();
        $scope.closeLogin();
      })
      .catch(function (error) {
        $ionicLoading.hide();
        $scope.errorMessage = error;
      });
    };

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  })

  .controller('PerformanceCtrl', function($scope, performaceData, $ionicLoading, $ionicPopup){

    $scope.saveData = function(person){
      var data = {performance_data: {data: {message: person.cooperMessage}}};
      $ionicLoading.show({
        template: 'Saving...'
      });
      performaceData.save(data, function(response){
        $ionicLoading.hide();
        $scope.showAlert('Sucess', response.message);
      }, function(error){
        $ionicLoading.hide();
        $scope.showAlert('Failure', error.statusText);
      })
    };

    $scope.retrieveData = function(){
      $ionicLoading.show({
        template: 'Retrieving data...'
      });
      performaceData.query({}, function(response){
        $state.go('app.data', {savedDataCollection: response.entries});
        $ionicLoading.hide();
      }, function(error){
        $ionicLoading.hide();
        $scope.showAlert('Failure', error.statusText);
      })
    };

    $scope.showAlert = function(message, content) {
      var alertPopup = $ionicPopup.alert({
        title: message,
        template: content
      });
      alertPopup.then(function(res) {
      // Place some action here if needed...
      });
    };
  })

  .controller('DataCtrl', function ($scope, $stateParams) {
    $scope.$on('$ionicView.enter', function () {
      $scope.savedDataCollection = $stateParams.savedDataCollection;
      $scope.labels = getLabels($scope.savedDataCollection);
      $scope.data = [];
      angular.forEach($scope.labels, function(label){
        $scope.data.push(getCount($scope.savedDataCollection, label));
      });
      $scope.radardata = [$scope.data];
    });


    function getLabels(collection) {
      var uniqueLabels = [];
      for (i = 0; i < collection.length; i++) {
        if (collection[i].data.message && uniqueLabels.indexOf(collection[i].data.message) === -1) {
          uniqueLabels.push(collection[i].data.message);
        }
      }
      return uniqueLabels;
    }

    function getCount(arr, value){
      var count = 0;
      angular.forEach(arr, function(entry){
        count += entry.data.message == value ? 1 : 0;
      });
      return count;
    }
  })

.controller('TestController', function($scope) {
  $scope.gender = ['Male', 'Female']
  $scope.ageValues = {
    min: 20,
    max: 60,
    value: 20
  };

  $scope.distanceValues = {
    min: 1000,
    max: 3500,
    value: 1000
  };

  $scope.data = {};
  $scope.calculateCooper = function() {
    var person = new Person({
      gender: $scope.data.gender,
      age: $scope.data.age,
      distance: $scope.data.distance,
    });

    person.assessCooper($scope.data);
    $scope.person = person;
    console.log($scope.person)
    };
  });
