var app = angular.module('myapp', []);
app.controller('myctrl', function ($scope, $window) {
    $scope.title = "Online NoteBook"
    $scope.obj = {};
    $scope.obj.bookletName = '';
    $scope.booklet = [];
    $scope.totalPage = 5;
    $scope.bookletId = 0;
    $scope.noteBooks = [];
    $scope.notebook = false;
    $scope.contentAction = true;
    $scope.saveBtn = true;
    $scope.editBtn = false;
    $scope.viewId = 0;
    var key = 'nootBookContent';

    Array.prototype.inArray = function (comparer) {
        console.log("comparer fun", comparer);
        console.log("this in comparer", this);
        for (var i = 0; i < this.length; i++) {
            if (comparer(this[i])) return true;
        }
        return false;
    };

    Array.prototype.pushIfNotExist = function (element, comparer) {
        console.log("check elm ", element);
        console.log("comparen in ", comparer);
        if (!this.inArray(comparer)) {
            this.push(element);
        }
    };

    $scope.creatBooklet = function () {
        console.log(" $scope.obj.bookletName", $scope.obj.bookletName)
        if ($scope.obj.bookletName !== '') {
            $scope.bookletId++;
            $scope.notebook = true;
            console.log("$scope.bookletId", $scope.bookletId);
            if ($scope.booklet.length === 0) {

                $scope.booklet.push({
                    'bookletName': $scope.obj.bookletName,
                    'bookletId': $scope.bookletId
                });
                console.log("booklet length is 0", $scope.booklet);
            } else if ($scope.booklet.length > 0) {

                var element = {
                    'bookletName': $scope.obj.bookletName,
                    'bookletId': $scope.bookletId
                };
                console.log("element in greater then", element);
                $scope.booklet.pushIfNotExist(element, function (e) {
                    return e.bookletId === element.bookletId && e.bookletName === element.bookletName;
                });
                console.log("booklet length is greater then 0", $scope.booklet);
            }
            $window.localStorage['bookletName'] = JSON.stringify($scope.booklet);
            $scope.reset();
        } else {
            console.log('please mention a name')
        }


    }
    
    $scope.saveBooklet = function () {
        console.log("current bookletID", $scope.bookletId);
        $scope.contentAction = true;
        $scope.saveBtn = true;
        $scope.editBtn = false;
        if ($scope.noteBooks.length > 0) {
            console.log("some data in array")
            var element = {
                'bookletId': $scope.viewId,
                'headingPage1': $scope.obj.headingPage1,
                'contentPage1': $scope.obj.contentPage1,
                'headingPage2': $scope.obj.headingPage2,
                'contentPage2': $scope.obj.contentPage2,
                'headingPage3': $scope.obj.headingPage3,
                'contentPage3': $scope.obj.contentPage3,
                'headingPage4': $scope.obj.headingPage4,
                'contentPage4': $scope.obj.contentPage4,
                'headingPage5': $scope.obj.headingPage5,
                'contentPage5': $scope.obj.contentPage5,
            };

            console.log("before push into array", element);
            $scope.noteBooks.pushIfNotExist(element, function (e) {
                return e.bookletId === element.bookletId;
            });
            console.log("$scope.notebook after add", $scope.noteBooks)
            for (var i = 0; i < $scope.noteBooks.length; i++) {
                if ($scope.noteBooks[i].bookletId === element.bookletId) {
                    console.log("id is alreay exit i have save content", element.bookletId);
                    $scope.noteBooks[i].bookletId = element.bookletId;
                    $scope.noteBooks[i].headingPage1 = element.headingPage1;
                    $scope.noteBooks[i].contentPage1 = element.contentPage1;
                    $scope.noteBooks[i].headingPage2 = element.headingPage2;
                    $scope.noteBooks[i].contentPage2 = element.contentPage2;
                    $scope.noteBooks[i].headingPage3 = element.headingPage3;
                    $scope.noteBooks[i].contentPage3 = element.contentPage3;
                    $scope.noteBooks[i].headingPage4 = element.headingPage4;
                    $scope.noteBooks[i].contentPage4 = element.contentPage4;
                    $scope.noteBooks[i].headingPage5 = element.headingPage5;
                    $scope.noteBooks[i].contentPage5 = element.contentPage5;
                }
            }

        } else if ($scope.noteBooks.length === 0) {
            console.log("array is null so i push new value")
            $scope.noteBooks.push({
                'bookletId': $scope.viewId,
                'headingPage1': $scope.obj.headingPage1,
                'contentPage1': $scope.obj.contentPage1,
                'headingPage2': $scope.obj.headingPage2,
                'contentPage2': $scope.obj.contentPage2,
                'headingPage3': $scope.obj.headingPage3,
                'contentPage3': $scope.obj.contentPage3,
                'headingPage4': $scope.obj.headingPage4,
                'contentPage4': $scope.obj.contentPage4,
                'headingPage5': $scope.obj.headingPage5,
                'contentPage5': $scope.obj.contentPage5,
            });
        }
        $window.localStorage[key] = JSON.stringify($scope.noteBooks);
        $scope.getlocalstoragedata(key);
    }

    $scope.getlocalstoragedata = function (key) {
        if ($window.localStorage[key] != undefined) {
            var notes = JSON.parse($window.localStorage[key]);
            console.log('get all the booklet from localstorage', notes);
            return notes;
        }

    }

    $scope.viewBooklet = function (id) {
        console.log('view id is', id)
        $scope.reset()
        $scope.viewId = id;
        $scope.notesContent = $scope.getlocalstoragedata(key);
        console.log("notescontent", $scope.notesContent);
        for(var i=0; i < $scope.notesContent.length; i++){
            console.log('local storage data', $scope.notesContent[i].bookletId )
            if($scope.notesContent[i].bookletId === id){
                console.log("selected view data is", $scope.notesContent[i])
                $scope.obj.headingPage1 = $scope.notesContent[i].headingPage1;
                $scope.obj.contentPage1 = $scope.notesContent[i].contentPage1;
                $scope.obj.headingPage2 = $scope.notesContent[i].headingPage2;
                $scope.obj.contentPage2 = $scope.notesContent[i].contentPage2;
                $scope.obj.headingPage3 = $scope.notesContent[i].headingPage3;
                $scope.obj.contentPage3 = $scope.notesContent[i].contentPage3;
                $scope.obj.headingPage4 = $scope.notesContent[i].headingPage4;
                $scope.obj.contentPage4 = $scope.notesContent[i].contentPage4;
                $scope.obj.headingPage5 = $scope.notesContent[i].headingPage5;
                $scope.obj.contentPage5 = $scope.notesContent[i].contentPage5;
                break;
            }
        }
       
    }

    $scope.editInbooklet = function(){
        $scope.contentAction = false;
        $scope.saveBtn = false;
        $scope.editBtn = true;
    }
    $scope.reset = function () {
        $scope.obj.bookletName = '';
        $scope.obj.headingPage1 = '';
        $scope.obj.contentPage1 = '';
        $scope.obj.headingPage2 = '';
        $scope.obj.contentPage2 = '';
        $scope.obj.headingPage3 = '';
        $scope.obj.contentPage3 = '';
        $scope.obj.headingPage4 = '';
        $scope.obj.contentPage4 = '';
        $scope.obj.headingPage5 = '';
        $scope.obj.contentPage5 = '';
        $scope.viewId = $scope.bookletId;
    }
    $scope.bookletreset = function(){
        var x = confirm("press ok to remove all notebooks from localstorage");
        if(x === true){
            $window.localStorage.clear();
            $scope.reset();
            $scope.booklet = [];
            $scope.saveBtn = false;
            $scope.editBtn = false;
            $scope.notebook = false;
            $scope.contentAction = false;
        }
    }

});
