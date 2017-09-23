var app = angular.module('myapp', ['ngSanitize', 'ui.select']);

app.controller('myctrl', function ($scope) {
    $scope.availableColors = ['red', 'blue', 'green', 'black'];
    $scope.schoollist = [
        { id: 1, name: 'rahul' },
        { id: 2, name: 'pk' },
        { id: 3, name: 'annie' },
        { id: 4, name: 'amit' },
        { id: 5, name: 'sanjay' }
    ];
    $scope.person = {

    }
    $scope.newperson = {}
    $scope.multipleDemo = {
        colors: ['blue']
    }
    $scope.$watch('person.selected', function (newval) {
        console.log("ctrl before change select color is", newval);
        var c = newval;
        console.log("ctrl after change select color is", c);
    })
    $scope.reset = function () {
        $scope.multipleDemo.colors = [];
        $scope.person.selected = ""
        $scope.newperson.s = "";
    }
})