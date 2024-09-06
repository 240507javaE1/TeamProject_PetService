// 文件名: order-management.js

var app = angular.module("OrderManagement", []);

// 定義localhost
app.constant('API_BASE_URL', 'http://localhost:8080');

app.controller("OrderManagementController", function ($scope, $http, API_BASE_URL, $timeout) {

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
      alert("訪客請先登入或註冊");
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
$scope.myPet = [];
function loadPetInfo() {
    var memberID = getMemberIDFromSession();
    if (memberID) {
        $http.get('http://localhost:8080/pet/search/' + memberID)
            .then(function(response) {
                console.log(response.data);
                $scope.myPet = response.data;
                console.log(response.data[0]);
                console.log(response.data[1]);
                if (response.data && response.data.length > 0 && response.data[0].pet) {
                    $scope.petInfo = response.data[0].pet[0].petName;
                } else {
                    $scope.petInfo = "無寵物資訊";
                }
            })
            .catch(function(error) {
                console.error('Error fetching pet info:', error);
                $scope.petInfo = "無法獲取寵物資訊";
            });
    } else {
        $scope.petInfo = "請先登入";
    }
}

// 在控制器初始化時調用此方法
loadPetInfo();




    // 初始化 scope 
    $scope.serviceCount = 1; // 默認服務次數
    $scope.totalPrice = 0;   // 初始化總金額
    //default data of orders
    $scope.orders=[];
    $scope.order={
        orderID:-1,
        member:"",
        petID:-1,
        role1Member:-1,
        role2Member:-1,
        total:-1,
        orderCreatData:"",
        orderAddress:"",
        orderMemo:"",
        orderStatus:"",
        serviceDate:"",
        serviceTime:""
    };
    /*//methods for add/edit orders
    $scope.submitOrder=function(){
        
    }*/

    // 自動填入表單
    function populateForm() {
        // 從localStorage擷取資料
        const member = JSON.parse(localStorage.getItem('selectedMember'));
        const serviceType = localStorage.getItem('selectedServiceType');
        const startDate = localStorage.getItem('selectedStartDate');
        const endDate = localStorage.getItem('selectedEndDate');
        const startTime = localStorage.getItem('selectedStartTime');
        const endTime = localStorage.getItem('selectedEndTime');
        // 從 localStorage 獲取登入會員資料
        const loggedInMember = JSON.parse(localStorage.getItem('loggedInMember'));
        
        // 填入表單
        $scope.assistant = member.name;
        $scope.assistantID = member.memberID;  
        $scope.serviceType = serviceType;
        $scope.startDate = startDate;
        $scope.endDate = endDate;
        $scope.startTime = startTime;
        $scope.endTime = endTime;
    
        // 使用登入會員的資料填充表單
        $scope.memberName = loggedInMember.name;
        $scope.memberID = loggedInMember.memberID;
        $scope.orderAddress = loggedInMember.address; // 設置服務地址
        $scope.myPet= loggedInMember.petInfo; // 設置寵物信息

      /*  // 擷取登入會員資料
        $http.get(API_BASE_URL + '/member/info')
            .then(function(response) {
                $scope.memberName = response.data.name;
                $scope.petInfo = response.data.petInfo;
            })
            .catch(function(error) {
                console.error('Error fetching member info:', error);
                $scope.memberName = "無會員訊息";
                $scope.petInfo = "無會員訊息";
            });*/

        // 從 localStorage 取得資料並計算金額
        var selectedPrice = parseFloat(localStorage.getItem('selectedPrice')) || 0;
        $scope.selectedPrice = selectedPrice; // 保存price到 scope
        calculateTotalPrice();
    }

    // 計算總金額
    function calculateTotalPrice() {
        $scope.totalPrice = $scope.selectedPrice * $scope.serviceCount;
    }

    // 頁面跳轉填充表單
    populateForm();

    // 服務次數變化時修改總金額
    $scope.$watch('serviceCount', function(newVal, oldVal) {
        calculateTotalPrice();
    });

    // 生成Order
    $scope.submitOrder = function() {
        var currentDate = new Date();
        // 检查 petID 是否正确
        var selectedPet = $scope.x; // 假设 $scope.x 是选中的宠物对象
        if (!selectedPet) {
            alert("請選擇服務寵物");
            return;
        }
    
        var orderData = {
            orderID: -1, // 后端會自動生成
            orderAddress: $scope.orderAddress,
            serviceDate: $scope.startDate,
            serviceTime: $scope.startTime,
            orderMemo: $scope.orderMemo,
            total: $scope.totalPrice,
            orderStatus: "未確認",
            orderCreateDate: currentDate.toISOString(), // 轉換為 ISO 字符串格式
            role1MemberID:  $scope.userNow.memberID, // 确保是数值
            role2MemberID: $scope.assistantID, // 确保是数值
            petID: selectedPet.petID // 确保传递的是数值ID
        };
    
        $http.post(API_BASE_URL + '/order', orderData)
            .then(function(response) {
                console.log("訂單成功提交:", response.data);
                alert("訂單已成功提交!");
                // 可以在這裡添加頁面跳轉邏輯
            })
            .catch(function(error) {
                console.error("提交訂單時發生錯誤:", error);
                alert("提交訂單失敗，請稍後再試。");
            });
    };
});
