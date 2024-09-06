// 文件名: order-management.js

var app = angular.module("OrderManagement", []);

// 定義localhost
app.constant('API_BASE_URL', 'http://localhost:8080');

app.controller("OrderManagementController", function ($scope, $http, API_BASE_URL) {
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
        $scope.petInfo = loggedInMember.petInfo; // 設置寵物信息

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
        var orderData = {
            orderID: -1, // 後端會自動生成
            orderAddress: $scope.orderAddress,
            serviceDate: $scope.startDate,
            serviceTime: $scope.startTime,
            orderMemo: $scope.orderMemo,
            total: $scope.totalPrice,
            orderStatus: "未確認",
            orderCreateDate: currentDate.toISOString(), // 轉換為 ISO 字符串格式
            role1MemberID: $scope.memberID,//parseInt(localStorage.getItem('loggedInMemberID')),
            role2MemberID: $scope.assistantID,
            petID: $scope.petInfo // 確保 petInfo 包含正確的 id
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
