app.directive("multipleSelectionTag", function(){
    return {
        restrict:'E',
        scope:{
            availableColors:'=colorslist',
            multipleDemo:'=multy'
        },
        templateUrl:'js/template/multiple-selection-tag.html',
        controller:function($scope){
            console.log("scope dir", $scope.multipleDemo);
        },
        link:function(scope,elem,attr){}
    }
})