var app = angular.module('myapp', []);
app.controller('myctrl', function ($scope, $http) {
    $scope.obj = {};

    var url = 'http://elpisdesign.com/apply.php';
    var config = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
    $scope.postCall = function () {
        console.log($scope.obj)
        var data = JSON.stringify($scope.obj);
        $http.post(url, data, config).then(function (suc, err) {
            if (suc) {
                console.log('suc', suc);
                $scope.success = suc.data;

                alert("successfully requested", suc);
            } else if (err) {
                alert("failed to requested");
            }
        })
    }

})