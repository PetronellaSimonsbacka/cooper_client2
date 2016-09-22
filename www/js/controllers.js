angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $auth) {

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

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $auth.submitLogin($scope.loginData)
      .then(function (resp) {
            // handle success response
            $scope.closeLogin();
      })
      .catch(function (error) {
            // handle error response
      $scope.errorMessage = error;
      });

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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
      age: $scope.data.age
    });

    person.assessCooper($scope.data.distance);
    $scope.person = person;
    console.log($scope.person)
    };
  });
