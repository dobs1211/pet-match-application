var myApp = angular.module( 'myApp', [] );

myApp.controller( 'testApiController',[ '$scope', '$http', function( $scope, $http ){
  $scope.testAPI = function(){
    console.log( 'in testAPI');
    var data = {
      apikey: 'o7JXfPql',
      objectType: "dogs",
      objectAction: "publicSearch",
      search: {
        resultStart: 0,
        resultLimit: 20,
        resultSort: "animalID",
        resultOrder: "asc",
        calcFoundRows: "Yes",
        filters: [
          {
            fieldName: "animalStatus",
            operation: "equals",
            criteria: "Available",
          },
          {
            fieldName: "animalSpecies",
            operation: "equals",
            criteria: "dog",
          },
          {
            fieldName: "animalLocation",
            operation: "equals",
            criteria: "92117",
          },
          {
            fieldName: "animalLocationDistance",
            operation: "radius",
            criteria: "30",
          },
        ],
        fields: [ "animalID","animalOrgID","animalName","animalBreed","animalLocation" ]
      }
    }

    var apiURL = 'https://api.rescuegroups.org/http/json';
    console.log( 'apiURL: ' + apiURL );
    $http({
      method: 'POST',
      url: apiURL,
      headers: {'Content-Type': 'application/json'},
      body: data
    }).then( function( response ){
      console.log( "response.data: " + response.data );
    }); // end api hit test
  };
}]);