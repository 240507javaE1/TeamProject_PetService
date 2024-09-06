var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $timeout,$window) {
  /***可從這複製，注意上面最少要有function($scope, $http, $timeout, $window) */
  $scope.userNow = "現在使用者身分是:訪客"

  //下面是每次F5重整時會從session把userNow資訊抓下來
  $scope.loginTitle='訪客請登入/註冊';
  $scope.loginMenu_1='登入頁面';
  $timeout(function() {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if (userNow) {
        $scope.userNow = userNow;
        console.log('userNow:', $scope.userNow);
        $scope.loginTitle='會員:'+$scope.userNow.name+' 您好';
        $scope.loginMenu_1='會員登出';
    }else {
        console.log('No user found in session storage.');
        $scope.userNow = "現在使用者身分是:訪客"
        $scope.loginTitle='訪客請登入/註冊';
        $scope.loginMenu_1='登入頁面';
  }}, 0); // $timeout延迟执行，确保 AngularJS 完全初始化

  //左側邊攔"會員登出"&右上下拉選單"會員登出"會觸發的方法
  $scope.logout = function(goPage) {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if(userNow) {
      sessionStorage.removeItem('userNow');
      $scope.userNow = "現在使用者身分是:訪客"
      console.log($scope.userNow);
      window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/index.html';

    }else{ //是訪客的話幫你跳頁到 goPage即login.html
      $window.location.href = goPage; // 
    }
  }
/***複製的部分到這就好，下面是組員自己的方法等 */

//處理一下signup-2的性別欄位
$scope.genderlist=['不方便透露','男性','女性']
  //這是要送到java註冊或登入的userModel結構
  $scope.userModel = {
    memberID: -1,
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    gender: $scope.genderlist[0],
    roleLevel: 1,
    memberPhoto: "./memberPhoto/_default.png"
  };
  //下面是signup-1到2到3跳頁時要丟上session的userModel資料
  $scope.sessionUserModel = function(page) {
    sessionStorage.setItem('userModel', JSON.stringify($scope.userModel));
    $window.location.href = page;
  };
  //下面是跳頁時會從session把沒填完的userModel抓下來覆蓋
  $timeout(function() {
    var userModel = JSON.parse(sessionStorage.getItem('userModel'));
    if (userModel) {
        $scope.userModel = userModel;
        console.log('UserModel loaded:', $scope.userModel);
    }else {
        console.log('No userModel found in session storage.');
  }}, 1000); // $timeout延迟1000ms执行，确保 AngularJS 完全初始化

  //下面是signup-3"下一步"->註冊userModel資料
  $scope.addUserModel = function(page) {
    sessionStorage.setItem('userModel', JSON.stringify($scope.userModel));
    $http({ method : 'POST',
      url : 'http://localhost:8080/member',
      data : angular.toJson($scope.userModel),
      headers : { 'Content-Type' : 'application/json' }
    }).then(function(response) {
      $scope.userModel = response.data;
      alert("successfully add data: " + JSON.stringify(response.data));
      sessionStorage.removeItem('userModel');//會員註冊成功，清掉session用來註冊的userModel
    }).catch(function(error) {
      console.error('Error:', error);
      console.error('ErrorBody:', error.data);
      alert("Error uploading file and data:"+error.data);
    });
    $window.location.href = page;
  };

});