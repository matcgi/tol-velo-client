'use strict';

// Declare app level module which depends on filters, and services
angular.module('myAngularApp.config', [])

// from package.json
.constant("appName","tdc")
.constant("appVersion","15.6.39")
.constant("appServerUrlLocal","http://localhost:9000/todoc")
.constant("appServerUrlRemote", "https://xxxx.com/todoc")


.constant("appGAID","UA-63329886-4")

.run(function($route, gettextCatalog){
    gettextCatalog.debug = true;

    //ie https://github.com/angular/angular.js/issues/1213
    $route.reload();
});
