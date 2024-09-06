var app = angular.module("UserManagement", []);

app.service('DataService', function () {
  this.userNow = null;

  this.setUserNow = function (user) {
    this.userNow = user;
  };

  this.getUserNow = function () {
    return this.userNow;
  };
});

app.controller('myCtrl', function ($scope, $http, $timeout, DataService) {
  //這是當前User，會從Session抓資料出來覆蓋，沒資料就長得像下面的"訪客"
  $scope.userNow = "現在使用者身分是:訪客"
  //下面是每次F5重整時會從session把userNow資訊抓下來覆蓋
  $scope.loginTitle = '訪客請登入或註冊';
  $scope.loginMenu_1 = '登入頁面';
  $timeout(function () {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if (userNow) {
      $scope.userNow = userNow;
      if ($scope.userNow.roleLevel != 1) {
        //alert("已經是小幫手，請更新服務" + $scope.userNow.roleLevel);
        DataService.setUserNow(userNow);
        console.log('User loaded:', $scope.userNow);
        $scope.loginTitle = '會員:' + $scope.userNow.name + ' 您好';
        $scope.loginMenu_1 = '會員登出';
      } else {
        console.log('尚未成為小幫手');
        DataService.setUserNow(userNow);
        console.log('User loaded:', $scope.userNow);
        $scope.loginTitle = '會員:' + $scope.userNow.name + ' 您好';
        $scope.loginMenu_1 = '會員登出';
        alert("尚未成為小幫手，請先成為小幫手再來查看您的訂單");
        window.location.href = '/vsCode檔案/伊倫/TeamProject-前端皆未完成/serviceIndex.html';
      }
    } else {
      console.log('No user found in session storage.');
      $scope.userNow = "現在使用者身分是:訪客"
      $scope.loginTitle = '訪客請登入/註冊';
      $scope.loginMenu_1 = '登入頁面';
      alert("訪客請先登入或註冊");
      window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/login.html';
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



app.controller('OrderFilterController', function ($scope, $http, DataService, $timeout, $interval) {
  $scope.selectedStatus = '';
  $scope.filteredOrders = [];
  $scope.upcomingOrders = [];
  $scope.allOrders = [];
  $scope.uncheckOrders = [];

  //更新所有訂單列表
  // $scope.getAllOrderLists = function () {
  //   var userNow = DataService.getUserNow();
  //   var memberID = userNow ? userNow.memberID : null;
  //   $http.get('http://localhost:8080/serviceorder/' + memberID).then(function (response) {
  //     //這裡還要處理ID，因為ID是從session抓下來的，所以這裡還沒有ID，先用3代替
  //     $scope.allOrders = response.data;
  //     $scope.getUpcomingOrders();
  //     $scope.getUnCheckOrders();
  //     $scope.handleFilter($scope.selectedStatus);
  //   });
  // };

  $scope.getAllOrderLists = function () {
    var userNow = DataService.getUserNow();
    if (userNow && userNow.memberID) {
      var memberID = userNow.memberID;
      $http.get('http://localhost:8080/serviceorder/' + memberID).then(function (response) {
        $scope.allOrders = response.data;
        $scope.getUpcomingOrders();
        $scope.getUnCheckOrders();
        $scope.handleFilter($scope.selectedStatus);
      });
    } else {
      console.log('等待用戶數據加載...');
    }
  };

  // 定期檢查用戶數據是否已加載
  var checkInterval = $interval(function () {
    var userNow = DataService.getUserNow();
    if (userNow && userNow.memberID) {
      $interval.cancel(checkInterval);
      $scope.getAllOrderLists();
    }
  }, 100);

  // 確保在控制器銷毀時取消interval
  $scope.$on('$destroy', function () {
    if (checkInterval) {
      $interval.cancel(checkInterval);
    }
  });

  // 網頁一執行時就從後端獲取所有訂單數據
  $scope.getAllOrderLists();

  //取得未確認的訂單
  $scope.getUnCheckOrders = function () {
    $scope.uncheckOrders = $scope.allOrders.filter(function (order) {
      return order.orderStatus === '未確認';
    });
  };

  //依照狀態篩選訂單
  $scope.handleFilter = function (selectedStatus) {
    var userNow = DataService.getUserNow();
    if (userNow && userNow.memberID) {
      var memberID = userNow.memberID;
      $http.get('http://localhost:8080/serviceorder/' + memberID + '/' + selectedStatus).then(function (response) {
        $scope.filteredOrders = response.data;
      });
    } else {
      console.log('等待用戶數據加載...');
    }
    // $http.get('http://localhost:8080/serviceorder/'+memberID+'/' + selectedStatus).then(function (response) {
    //   //這裡還要處理ID，因為ID是從session抓下來的，所以這裡還沒有ID，先用3代替
    //   $scope.filteredOrders = response.data;
    // });
  };

  //取得未來一週的訂單
  $scope.getUpcomingOrders = function () {
    var oneWeekLater = new Date();
    oneWeekLater.setDate(oneWeekLater.getDate() + 7);

    $scope.upcomingOrders = $scope.allOrders.filter(function (order) {
      var orderDate = new Date(order.serviceDate);
      return order.orderStatus === '確認' && orderDate <= oneWeekLater && orderDate >= new Date();
    });
  };

  //接受訂單
  $scope.confirmOrder = function (orderID) {
    if (confirm('您確定要接受這個訂單嗎？')) {
      $http.put('http://localhost:8080/serviceorder/' + orderID + '/confirm').then(function (response) {
        $scope.getAllOrderLists();
      });
    }
  };

  //拒絕訂單
  $scope.rejectOrder = function (orderID) {
    if (confirm('您確定要拒絕這個訂單嗎？')) {
      $http.put('http://localhost:8080/serviceorder/' + orderID + '/reject').then(function (response) {
        $scope.getAllOrderLists();
      });
    }
  };


});