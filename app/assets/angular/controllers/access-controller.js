
var app = angular.module('app');
app.controller('AccessController', ['$log', '$scope', 'Accessor', 'Garage', 'Friend', 'FriendsCanAccessGarage', 'FriendsCannotAccessGarage', 'BroadcastChange', function($log, $scope, Accessor, Garage, Friend, FriendsCanAccessGarage, FriendsCannotAccessGarage, BroadcastChange) {

	$scope.garages = Garage.query();
	$scope.editingGarageId = 0;
	$scope.editing = false;
	$scope.isNew = false;
	
	$scope.garageChanged = function() {
		$log.debug($scope.editingGarageId);
	    $scope.friendsCanAccess = FriendsCanAccessGarage.query({garageId: $scope.editingGarageId});
	    $scope.friendsCannotAccessGarage = FriendsCannotAccessGarage.query({garageId: $scope.editingGarageId});
		$scope.garage = Garage.get({id: $scope.editingGarageId})
	}
		
    //Destroy method for deleting a friend
    $scope.remove = function(index) {
		$log.debug("remove accessor: " + $scope.friendsCanAccess[index].accessor_id);
        //Tell the server to remove the object
        Accessor.remove({id: $scope.friendsCanAccess[index].accessor_id}, function() {
            //If successful, add it to to be friends
            $scope.friendsCannotAccessGarage.splice(0, 0, $scope.friendsCanAccess[index]);
            //If successful, remove it from our collection
            $scope.friendsCanAccess.splice(index, 1);
        });
    }
    

	//Define a 'save' method which will be called from the view.
	$scope.save = function(newFriend) {
	    //Create the Accessor object to be sent to the server
    	$log.debug("friend id: " + newFriend.friendId);
    	$log.debug("garage id: " + $scope.editingGarageId);
        var accessor = new Accessor({code: newFriend.code, garage_id: $scope.editingGarageId, friend_id: newFriend.friendId});
        
    	$log.debug(newFriend.friendId);
    	
	    //Attempt a save to the back-end
        accessor.$save(function(response) {
        	$log.debug(response);
        	// refresh date since the new added friend
            //$scope.friendsCanAccess = FriendsCanAccessGarage.query({garageId: $routeParams.id});
            //$scope.friendsCannotAccessGarage = FriendsCannotAccessGarage.query({garageId: $routeParams.id});

            console.log("#################################");
            console.log("lenfth of $scope.friendsCannotAccessGarage.length is " + $scope.friendsCannotAccessGarage.length + ",   newFriend.friendId="+ newFriend.friendId);
            for (var index=0 ; index<$scope.friendsCannotAccessGarage.length; index++) {
                console.log("$scope.friendsCannotAccessGarage[index].friend_id is " + $scope.friendsCannotAccessGarage[index].friend_id);
                if (""+$scope.friendsCannotAccessGarage[index].friend_id === ""+newFriend.friendId) {
                      console.log(" Loop is going to break at index: " + index) 
                      $scope.friendsCannotAccessGarage[index].accessor_id=response.id; 
                      $scope.friendsCannotAccessGarage[index].code=response.code;

                      //If successful, add it to friends
                      $scope.friendsCanAccess.splice($scope.friendsCanAccess.length, 0, $scope.friendsCannotAccessGarage[index]);
                      //If successful, remove it from our collection
                      $scope.friendsCannotAccessGarage.splice(index, 1);
                      break;
                }
            }
            console.log("#################################");
	
	        //Empty the code
            newFriend.code = "";
	        if ( $scope.friendsCannotAccessGarage.length > 0 )
	        	newFriend.friendId = $scope.friendsCannotAccessGarage[0].friend_id
	
	    }, function(response) {
	
	        //If there's a failure set the 'errors' scope variable so it'll be reflected in the view.
	        $scope.errors = response.data.errors;
	    });
	}
    
    $scope.$on('GarageChanged', function() {
      $scope.garages = Garage.query();
  	  $scope.editingGarageId = 0;
    });
    
    $scope.$on('FriendChanged', function() {
    	if ( $scope.editingGarageId > 0 ) {
    	    $scope.friendsCanAccessGarage = FriendsCanAccessGarage.query({garageId: $scope.editingGarageId});
    	    $scope.friendsCannotAccessGarage = FriendsCannotAccessGarage.query({garageId: $scope.editingGarageId});
    	}
    });
    
    $scope.$on('showGarageAccess', function() {
    	$scope.editingGarageId = BroadcastChange.garageIndex;
    	$scope.garageChanged();
    });
}]);
