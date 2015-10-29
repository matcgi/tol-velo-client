'use strict';

// Declare app level module which depends on filters, and services
angular.module('myAngularApp.config', [])

// from package.json
.constant("appName","tolvelo")
.constant("appVersion","15.6.39")
.constant("appServerUrlLocal","http://localhost:9000/tol-velo")
.constant("appServerUrlRemote", "http://matcgi.koding.io:5984/tol-velo")


.constant("appGAID","UA-63329886-4")

.run(function($route, gettextCatalog){
    gettextCatalog.debug = true;

    //ie https://github.com/angular/angular.js/issues/1213
    $route.reload();
});
