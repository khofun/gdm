var app = angular.module('app');

app.controller('GarageController', ['$resource', '$scope', 'Garage', 'BroadcastChange', function($resource, $scope, Garage, BroadcastChange) {
    //Grab all garages from the server
    $scope.garages = Garage.query();

    //Destroy method for deleting a garage
    $scope.destroy = function(index) {

        //Tell the server to remove the object
        Garage.remove({id: $scope.garages[index].id}, function() {
            //If successful, remove it from our collection
            $scope.garages.splice(index, 1);
            BroadcastChange.garageChanged();
        });
    }
    
    $scope.open_close = function(garage) {
    	if ( garage.state=='open')
    		garage.state = 'closed';
    	else
    		garage.state = 'open';
    	Garage.update(garage);
    }
   
    $scope.edit = function(garage) {
    	garage.isEditing = true;
    }
    
    //The save method which is called when the user wants to submit their data
    $scope.save = function(garage) {

        //Save the garage object
        Garage.update(garage, function() {
        	// turn off editing
        	garage.isEditing = false;
            BroadcastChange.garageChanged();

        }, function(response) {

            //Post response objects to the view
            garage.errors = response.data.errors;
        });
    }
    
    //The add method which is called when the user wants to add a new garage
    $scope.add = function(newGarage) {

        //Create the garage object to send to the back-end, default state is closed
    	newGarage.state = "closed";
        var garage = new Garage(newGarage);

        //Save the garage object
        garage.$save(function(response) {

            $scope.garages.splice($scope.garages.length, 0, response);
            newGarage.name = newGarage.master_code = newGarage.location = "";
            BroadcastChange.garageChanged();

        }, function(response) {

            //Post response objects to the view
            $scope.errors = "have error: " + response.data.errors;
        });
    }
    

    // switch to the tab that manage the access
    $scope.accesses = function(index) {
    	BroadcastChange.showGarageAccess(index);
    	BroadcastChange.showAccess();
    }

}]);

