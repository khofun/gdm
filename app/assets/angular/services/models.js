'use strict';

var app = angular.module('app');
app.factory('BroadcastChange', function($rootScope) {

    var broadcaster = {};
    
    // let other controller know that we have changes on garage info
    broadcaster.garageChanged = function() {
        $rootScope.$broadcast('GarageChanged');
    };;

    // let other controller know that we have changes on friend info
    broadcaster.friendChanged = function() {
        $rootScope.$broadcast('FriendChanged');
    };
    
    // let other controller (AccessController) know that we want you to show the friend who can access the garage
    broadcaster.showGarageAccess = function(index) {
    	broadcaster.garageIndex = index;
        $rootScope.$broadcast('showGarageAccess');
    };
    
    // let other controller (TabController) know that we want you to show the friend who can access the garage
    broadcaster.showAccess = function() {
        $rootScope.$broadcast('showAccess');
    };
    
    return broadcaster;
});

app.factory('Garage', ['$resource', function($resource) {
    return $resource("/garages/:id", {id: '@id'}, {'update': {method:'PUT'}, 'remove': {method: 'DELETE', headers: {'Content-Type': 'application/json'}}});
}]);

app.factory('FriendsCanAccessGarage', ['$resource', function($resource) {
    return $resource('/garages/:garageId/friends', {garageId: '@garageId'}, {'update': {method:'PUT'}, 'remove': {method: 'DELETE', headers: {'Content-Type': 'application/json'}}});
}]);

app.factory('FriendsCannotAccessGarage', ['$resource', function($resource) {
    return $resource('/garages/:garageId/tobefriends', {garageId: '@garageId'}, {'update': {method:'PUT'}, 'remove': {method: 'DELETE', headers: {'Content-Type': 'application/json'}}});
}]);

app.factory('Accessor', ['$resource', function($resource) {
    return $resource("/accessors/:id", {id: '@id'}, {'update': {method:'PUT'}, 'remove': {method: 'DELETE', headers: {'Content-Type': 'application/json'}}});
}]);

app.factory('Friend', ['$resource', function($resource) {
    return $resource("/friends/:id", {id: '@id'}, {'update': {method:'PUT'}, 'remove': {method: 'DELETE', headers: {'Content-Type': 'application/json'}}});
}]);
