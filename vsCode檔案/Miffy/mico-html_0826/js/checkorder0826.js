var app = angular.module("CheckOrderManagement", []);
     
    //Controller Part
    app.controller("CheckOrderManagementController", function($scope, $http,$timeout) {
        $scope.userNow = {};
        $scope.members = {};

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
            alert("訪客請登入或註冊");
            window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/login.html';
    }}, 0); // $timeout延迟执行，确保 AngularJS 完全初始化

    //左側邊攔"登出登入"&右上下拉選單"會員登出"會觸發的方法
    $scope.logout = function(goPage) {
        var userNow = JSON.parse(sessionStorage.getItem('userNow'));
        if(userNow) {
        sessionStorage.removeItem('userNow');
        $scope.userNow = "現在使用者身分是:訪客"
        console.log($scope.userNow);
        window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/index.html';
        }else{ //是訪客的話幫你跳頁到goPage即login.html
        $window.location.href = goPage; // 
        }
    }
    /***複製的部分到這就好，下面是組員自己的方法等 */

    
  function getMemberIDFromSession() {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if (userNow && userNow.memberID) {
        return userNow.memberID;
    } else {
        console.log('No memberID found in session storage.');
        return null;
    }
}




      //Now load the data from server
        _refreshPageData();
        
        //寫入一個member身分(member2)
        $scope.member = [];
        $scope.member2 = {
        memberID : 2,
        address : "BBB",
        email : "BBB",
        gender : "BBB",
        name : "BBB",
        password : "BBB",
        phone : "BBB",
        role1member : "2",
        memberphoto:"path",
        username:"BBB",
        petInfo:"2",
        role1MemberID :"1",
        
        };
        // 自動填入表單
    function populateForm() {
      // 從 localStorage 獲取登入會員資料
      const loggedInMember = JSON.parse(localStorage.getItem('loggedInMember'));
       // 填入表單
          // 使用登入會員的資料填充表單
           $scope.memberName = loggedInMember.name;
          }



        //Initialize page with default data which is blank in this example
        $scope.orders=[];
        $scope.order={
        orderID:-1,
        member:"",
        petID:-1,
        role1MemberID:-1,
        role2MemberID:-1,
        total:-1,
        orderCreatData:"",
        orderAddress:"",
        orderMemo:"",
        orderStatus:"",
        serviceDate:"",
        serviceTime:""
    };
     
      function getMemberIDFromSession() {
        var userNow = JSON.parse(sessionStorage.getItem('userNow'));
        if (userNow && userNow.memberID) {
            return userNow.memberID;
        } else {
            console.log('No memberID found in session storage.');
            return null;
        }
    }

    function loadUserFromSession() {
      var userNowData = sessionStorage.getItem('userNow');
      if (userNowData) {
          $scope.userNow = JSON.parse(userNowData);
          console.log('User loaded:', $scope.userNow);
      } else {
          console.log('No userNow in session storage.');
      }
  }

  function _refreshPageData() {
      loadUserFromSession(); // 每次刷新數據時重新加載用戶信息

      var memberID = $scope.userNow.memberID;
      if (memberID) {
          $http({
              method: 'GET',
              url: 'http://localhost:8080/order/search/' + memberID
          }).then(function successCallback(response) {
              if (response.data && response.data.length > 0) {
                  $scope.orders = response.data;
              } else {
                  $scope.orders = [];
                  console.log('No orders found for this member.');
              }
          }, function errorCallback(response) {
              console.log('Error fetching orders:', response.statusText);
              $scope.orders = [];
          });
      } else {
          console.log('No memberID available to fetch orders.');
          $scope.orders = [];
      }
  }

  function _refreshPageData() {
    loadUserFromSession(); 

    var memberID = $scope.userNow.memberID;
    if (memberID) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/order/search/' + memberID
        }).then(function successCallback(response) {
            if (response.data && response.data.length > 0) {
                $scope.orders = response.data;
                console.log('Orders loaded:', $scope.orders); // 添加這行來檢查加載的訂單數據
            } else {
                $scope.orders = [];
                console.log('No orders found for this member.');
            }
        }, function errorCallback(response) {
            console.log('Error fetching orders:', response.statusText);
            $scope.orders = [];
        });
    } else {
        console.log('No memberID available to fetch orders.');
        $scope.orders = [];
    }
}

        //HTTP DELETE- delete order by Id
        $scope.removeOrder = (orderID) => {
            if (confirm("你確定要刪除此訂單嗎？")) {
                console.log("Attempting to delete order with ID:", orderID);
                $http({
                    method: 'DELETE',
                    url: 'http://localhost:8080/order/' + orderID
                }).then(function successCallback(response) {
                    console.log("Order deleted successfully");
                    _refreshPageData(); // 成功後刷新數據
                }, function errorCallback(response) {
                    console.log("Error while deleting order:", response.statusText);
                    _refreshPageData();
                });
            }
        };
        

// 初始化時載入數據
$timeout(_refreshPageData, 0);
$scope.helperNames = {};



    
      });

