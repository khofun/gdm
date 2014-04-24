var app = angular.module('app');

app.controller('FriendController', ['$resource', '$scope', 'Friend', 'BroadcastChange', function($resource, $scope, Friend, BroadcastChange) {
    //Grab all friends from the server
    $scope.friends = Friend.query();

    //Destroy method for deleting a friend
    $scope.destroy = function(index) {

        //Tell the server to remove the object
        Friend.remove({id: $scope.friends[index].id}, function() {
            //If successful, remove it from our collection
            $scope.friends.splice(index, 1);
            BroadcastChange.friendChanged();
        });
    }
    
    $scope.open_close = function(friend) {
    	if ( friend.state=='open')
    		friend.state = 'closed';
    	else
    		friend.state = 'open';
    	Friend.update(friend);
    }
   
    $scope.edit = function(friend) {
    	friend.isEditing = true;
    }
    
    //The save method which is called when the user wants to submit their data
    $scope.save = function(friend) {

        //Save the friend object
        Friend.update(friend, function() {
        	// turn off editing
        	friend.isEditing = false;
            BroadcastChange.friendChanged();

        }, function(response) {

            //Post response objects to the view
            friend.errors = response.data.errors;
        });
    }
    
    //The save method which is called when the user wants to submit their data
    $scope.add = function(newFriend) {

        //Create the friend object to send to the back-end, default state is closed
        var friend = new Friend(newFriend);

        //Save the friend object
        friend.$save(function(response) {

            $scope.friends.splice($scope.friends.length, 0, response);
            newFriend.first_name = newFriend.last_name = newFriend.phone_number = "";
            BroadcastChange.friendChanged();

        }, function(response) {

            //Post response objects to the view
            newItem.errors = response.data.errors;
        });
    }
}]);

