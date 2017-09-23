var app = angular.module('mymod', []);
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];
        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
});
app.filter('customitems', function () {
    return function (input, label) {
        if (!label) {
            return input;
        }
        var newarr = [];
        angular.forEach(input, function (data) {
            if (data.label === label) {
                newarr.push(data);
                console.log(" data sort by label");
            }
        })
        return newarr;
    }
});
app.controller('myctrl', function ($scope, $http) {
    $scope.title = "Data flow in a format of excel"
    $scope.showloader = false;
    $scope.hideloader = true;
    $scope.selected = {};
    var limit = 14;
    var offset = 0;
    $scope.selected.selectedCategories = '';

    // Get data from cj.json files
    $http.get('cj.json').then(function (suc, err) {
        if (suc) {
            console.log("get cj data", suc);
            $scope.mainData = suc.data.result;
            // console.log("maindata is", $scope.mainData);
            var copydata = angular.copy($scope.mainData);
            $scope.datalist = copydata;
            // console.log("copy of the data", copydata)
            $scope.datalist = $scope.datalist.splice(offset, limit);
            // console.log("after limit the data",$scope.datalist)
            $scope.categorieslist = [];
            if ($scope.datalist.length > 0) {
                console.log("yes data is", $scope.datalist)
                for (var i = 0; i < $scope.datalist.length; i++) {
                    // console.log("inner value found",$scope.datalist[i].values )
                    angular.forEach($scope.datalist[i].values, function (element) {
                        // console.log("inner data", element);
                        $scope.categorieslist.push({
                            label: element.label
                        })
                        var callloader = $scope.callloader;
                        callloader();
                        $scope.hideloader = false;
                    });
                }
                console.log("$scope.categorieslist ", $scope.categorieslist);
                return $scope.categorieslist;
            }
        } else if (err) {
            console.log("data not found", err);
        }
    });

    // Data according to 14 days limit
    $scope.nextdata = function (val) {
        $scope.datalist.splice(0, $scope.datalist.length);
        console.log("before datalist", $scope.datalist);
        console.log("my main data ", $scope.mainData);
        var setOfData = angular.copy($scope.mainData);
        $scope.ReqNextData = setOfData;
        if (val > 0) {
            $scope.selected.selectedCategories = '';
            console.log("req for next 14 days", val);
            console.log("before datalist", $scope.datalist);
            $scope.datalist = $scope.ReqNextData.splice(val, limit);
            console.log("after datalist", $scope.datalist);
            return $scope.datalist
        } else if (val == 0) {
            $scope.selected.selectedCategories = '';
            console.log("req for default 14 days", val);
            console.log("before datalist", $scope.datalist);
            $scope.datalist = $scope.ReqNextData.splice(val, limit);
            console.log("after datalist", $scope.datalist);
            return $scope.datalist
        } else {
            $scope.selected.selectedCategories = '';
            return $scope.datalist
        }

    }

    // Call Loader
    $scope.callloader = function () {

        if ($scope.hideloader == false) {
            console.log("stop load");
            $scope.showloader = false;
        } else if ($scope.hideloader == true) {
            console.log("start load");
            $scope.showloader = true;
        }
    }
    var callloader = $scope.callloader;
    callloader();

    // Watch the element
    $scope.$watch('selected.selectedCategories', function (newval) {
        console.log("selected categories is", newval);
    })
    $scope.$watch('showloader', function (newval) {
        console.log("showloader status", newval);
    })
    $scope.$watch('hideloader', function (newval) {
        console.log("hideloader status", newval);
    })
})
app.directive('loader', function () {
    return {
        restrict: 'AE',
        template: `<div id="loading-all" class="all-cls-ldr ng-hide">
                        <div class="inr-ldr">
                            <div class="loader">
                            </div>
                        </div>
                    </div>`
    }
});