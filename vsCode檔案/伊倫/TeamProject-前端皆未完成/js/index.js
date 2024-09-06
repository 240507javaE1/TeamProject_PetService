var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http, $timeout) {
  //這是當前User，會從Session抓資料出來覆蓋，沒資料就長得像下面的"訪客"
  $scope.userNow = {
    memberID: -1,
    name: "訪客",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    roleLevel: 0,
    memberPhoto: "./memberPhoto/_default.png"
  };
  //下面是每次F5重整時會從session把userNow資訊抓下來覆蓋
  $scope.loginTitle='訪客請登入或註冊';
  $timeout(function() {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if (userNow) {
        $scope.userNow = userNow;
        console.log('User loaded:', $scope.userNow);
        $scope.loginTitle='會員:'+$scope.userNow.name+' 您好';
    }else {
        console.log('No user found in session storage.');
        $scope.loginTitle='訪客請登入或註冊';
  }}, 0); // $timeout延迟执行，确保 AngularJS 完全初始化


/* 備註:
*    每位組員應將上述2區塊補充進自己的.js檔案，或<script>區塊
*   建議就擺在最上面，頁面啟動時會從session把userNow資訊抓下來覆蓋
*   session內沒有userNow資訊供覆蓋的話，
*   當前頁面帶著的userNOW資訊就是上面預設的樣子，視為是訪客模板
*                                               by Kevin
*/



});
