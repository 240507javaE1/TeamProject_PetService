var app = angular.module("serviceApp", []);

app.controller('bodyController', function ($scope, $http, $timeout, DataService) {
    //這是當前User，會從Session抓資料出來覆蓋，沒資料就長得像下面的"訪客"
    $scope.userNow = "現在使用者身分是:訪客"
    //下面是每次F5重整時會從session把userNow資訊抓下來
    $scope.loginTitle = '訪客請登入/註冊';
    $scope.loginMenu_1 = '登入頁面';
    $timeout(function () {
        var userNow = JSON.parse(sessionStorage.getItem('userNow'));
        console.log(userNow);
        if (userNow) {
            $scope.userNow = userNow;
            console.log('userNow:', $scope.userNow);
            $scope.loginTitle = '會員:' + $scope.userNow.name + ' 您好';
            $scope.loginMenu_1 = '會員登出';
        } else {
            console.log('No user found in session storage.');
            $scope.userNow = "現在使用者身分是:訪客"
            $scope.loginTitle = '訪客請登入/註冊';
            $scope.loginMenu_1 = '登入頁面';
        }
    }, 0); // $timeout延迟执行，确保 AngularJS 完全初始化

    //左側邊攔"登出登入"&右上下拉選單"會員登出"會觸發的方法
    $scope.logout = function (goPage) {
        var userNow = JSON.parse(sessionStorage.getItem('userNow'));
        if (userNow) {
            sessionStorage.removeItem('userNow');
            $scope.userNow = "現在使用者身分是:訪客"
            console.log($scope.userNow);
            window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/index.html';
        } else { //是訪客的話幫你跳頁到goPage即login.html
            window.location.href = goPage; // 
        }
    }


    /* 備註:
    *    每位組員應將上述2區塊補充進自己的.js檔案，或<script>區塊
    *   建議就擺在最上面，頁面啟動時會從session把userNow資訊抓下來覆蓋
    *   session內沒有userNow資訊供覆蓋的話，
    *   當前頁面帶著的userNOW資訊就是上面預設的樣子，視為是訪客模板
    *                                               by Kevin
    */



});

app.service('DataService', function () {
    this.userNow = null;

    this.setUserNow = function (user) {
        this.userNow = user;
    };

    this.getUserNow = function () {
        return this.userNow;
    };
});
