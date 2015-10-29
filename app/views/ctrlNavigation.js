'use strict';

function ctrlNavigation($scope,$log,$route,$routeParams,$location,$anchorScroll,$timeout,$q, srvCordova, srvAnalytics, srvData,srvConfig) {

  $scope.appLoggedIn = false;
  $scope.appUser = null;
  $scope.appUserCols = [];
  $scope.appHistoricCols = [];
  $scope.appLangs = [
    {title:'English', code:'en'},
    {title:'Français', code:'fr'},
    {title:'Espagnol', code:'es'}
  ];


  $scope.appSafeApply = function(fn) {
    var phase = this.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      this.$apply(fn);
    }
  };

  // spinner
  $scope.navAfterInitSpinnerShow = function() {
    $scope.navInit();
    $timeout(function() {},100);
  };

  $scope.navAfterInitSpinnerHide = function() {
  };
  // spinner - end




  $scope.navInit = function() {
    $scope.navJustLogin();
  };

  $scope.navJustLogin = function(){
    var userLoggedIn = srvData.getUserLoggedIn();
    if (userLoggedIn) $scope.navSetLogin(true);
  };


  $scope.navSetLogin = function(b) {
    $scope.appLoggedIn = b;
    if (!$scope.appLoggedIn) {
      $location.path('/login');
    }
  };

  $scope.navIsLogin = function(b) {
    //verify if it's just a refresh page
    if (!$scope.appLoggedIn) {
      $scope.navJustLogin();
    }
    return $scope.appLoggedIn;
  };


  $scope.navIsActive = function (viewLocation) {
    return viewLocation === $location.path();
  };

  $scope.navRedirect = function(pathToGo) {
    var url = $location.url();
    var path = $location.path();
    var loggedIn = $scope.navIsLogin();
    if (!loggedIn) $location.path('/login');
    else if (pathToGo) $location.path(pathToGo);
  };

  $scope.navBack = function(){
    /* jshint -W117 */
    //alert("remove jshint...");
    if (history) history.back();
    /* jshint +W117 */
  };

  $scope.navTraceClick = function(event) {
    srvAnalytics.add('EventMLE', 'MLE-'+event);
  };



/*
  $scope.navGetNumberedId = function(idToTransform) {
    if (!idToTransform) return 0;

    //var numberExtracted = idToTransform.replace( /^\D+/g, '');
    //var numberExtracted = idToTransform.match(/\d+/);
    var numberExtracted = idToTransform.match(/\d/g);
    numberExtracted = numberExtracted.join("");

    if (!numberExtracted) {
      var asciiCode = idToTransform.charCodeAt(0);
      if (idToTransform.length > 1) asciiCode += idToTransform.charCodeAt(1);
      if (idToTransform.length > 10) asciiCode += idToTransform.charCodeAt(10);
      numberExtracted = asciiCode;
    }
    //var number = parseInt(numberExtracted);
    return numberExtracted;
  };
*/



  $scope.appChangeLang = function(lang) {
    srvConfig.setConfigLang(lang);
  };

  $scope.appBindUserLoggedIn = function() {
    var self = this;
    var deferred = $q.defer();
    $scope.userCols = srvData.User.columns;
    var userMain = srvData.getUserLoggedIn();

    if (userMain && userMain.email) {
      srvData.User.findOneByEmail(userMain.email)
      .then(function (user) {
        srvData.setUserLoggedIn(user);
        deferred.resolve(user);
      })
      .catch(function (msg) {
        deferred.reject(msg);
      });
    }
    else deferred.reject('No user to find');

    return deferred.promise;
  };

  //--------------------
  // INITIALIZATION
  //$scope.navInit();


}

angular.module('crtl.Navigation', []).controller('ctrlNavigation', ctrlNavigation);
//ctrlNavigation.$inject = ['$scope','$log','$route','$routeParams','$location','$anchorScroll','$timeout','$q','srvCordova','srvAnalytics', 'srvData'];
