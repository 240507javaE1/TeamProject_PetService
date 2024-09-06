var app = angular.module("MemberManagement", []);

// Controller Part
app.controller("MemberManagementController", function ($scope, $http, $timeout){

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

//左側邊攔"登出登入"&右上下拉選單"會員登出"會觸發的方法
$scope.logout = function(goPage) {
  var userNow = JSON.parse(sessionStorage.getItem('userNow'));
  if(userNow) {
    sessionStorage.removeItem('userNow');
    $scope.userNow = "現在使用者身分是:訪客"
    console.log($scope.userNow);
  }else{ //是訪客的話幫你跳頁到goPage即login.html
    $window.location.href = goPage; // 
  }
}
/***複製的部分到這就好，下面是組員自己的方法等 */




  // 下拉選項資料
  $scope.servicetypelist = ['到府照顧', '洗澡', '遛狗', '挖貓砂'];
  $scope.citylist = ['臺北市', '新北市', '桃園市', '新竹市'];
  $scope.distlist = {
    '臺北市': {
      distlist: ['中正區', '大同區', '中山區', '萬華區', '信義區', '松山區', '大安區', '南港區', '北投區', '內湖區', '士林區', '文山區']
    },
    '新北市': {
      distlist: ['板橋區', '新莊區', '泰山區', '林口區', '淡水區', '金山區', '八里區', '萬里區', '石門區', '三芝區', '瑞芳區', '汐止區', '平溪區', '貢寮區', '雙溪區', '深坑區', '石碇區', '新店區', '坪林區', '烏來區', '中和區', '永和區', '土城區', '三峽區', '樹林區', '鶯歌區', '三重區', '蘆洲區', '五股區']
    },
    '桃園市': {
      distlist: ['中壢區', '平鎮區', '龍潭區', '楊梅區', '新屋區', '觀音區', '桃園區', '龜山區', '八德區', '大溪區', '復興區', '大園區', '蘆竹區']
    },
    '新竹市': {
      distlist: ['東區', '北區', '香山區']
    }
  };

  // 初始化開始時間
  var startDatePicker = new Pikaday({
    field: document.getElementById('startDate'),
    format: 'YYYY-MM-DD',
    onSelect: function(date) {
      $scope.$apply(function() {
        $scope.startDate = moment(date).format('YYYY-MM-DD');
      });
    }
  });

  // 初始化結束時間
  var endDatePicker = new Pikaday({
    field: document.getElementById('endDate'),
    format: 'YYYY-MM-DD',
    onSelect: function(date) {
      $scope.$apply(function() {
        $scope.endDate = moment(date).format('YYYY-MM-DD');
      });
    }
  });

  // 日期變化
  $scope.$watch('startDate', function(newVal, oldVal) {
    if (newVal && $scope.endDate && moment(newVal).isAfter($scope.endDate)) {
      $scope.dateError = true;
    } else {
      $scope.dateError = false;
    }
  });

  $scope.$watch('endDate', function(newVal, oldVal) {
    if (newVal && $scope.startDate && moment(newVal).isBefore($scope.startDate)) {
      $scope.dateError = true;
    } else {
      $scope.dateError = false;
    }
  });

  // 在控制器销毁时清理 Pikaday 实例
  $scope.$on('$destroy', function() {
    startDatePicker.destroy();
    endDatePicker.destroy();
  });
  $scope.timeOptions = [];
for (let hour = 8; hour < 20; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    let timeString = 
      (hour < 10 ? '0' + hour : hour) + ':' + 
      (minute === 0 ? '00' : minute) + ':00';
    $scope.timeOptions.push(timeString);
  }
}

  // 初始化開始與結束時間
  $scope.startTime = '8:00';
  $scope.endTime = '8:30';

  // 監聽時間變化
  $scope.$watch('startTime', function(newVal, oldVal) {
    if (newVal && $scope.endTime && newVal >= $scope.endTime) {
      // 如果開始時間晚於或等於結束時間，自動調整結束時間。
      let index = $scope.timeOptions.indexOf(newVal);
      if (index < $scope.timeOptions.length - 1) {
        $scope.endTime = $scope.timeOptions[index + 1];
      }
    }
  });

  $scope.$watch('endTime', function(newVal, oldVal) {
    if (newVal && $scope.startTime && newVal <= $scope.startTime) {
      //結束時間早於開始時間，自動調整開始時間
      let index = $scope.timeOptions.indexOf(newVal);
      if (index > 0) {
        $scope.startTime = $scope.timeOptions[index - 1];
      }
    }

});
//寫入一個member身分(member2)
$scope.member = [];
$scope.member2 = {
  memberID : 2,
  address : "",
  email : "BBB",
  gender : "BBB",
  name : "BBB",
  password : "BBB",
  phone : "BBB",
  roleLevel : "2",
  memberphoto:"path",
  username:"BBB",
  petInfo:"2"
};


//選擇適合的小幫手
$scope.members = []; // 初始化適合的members列表
$scope.acceptTimes = [];

// 搜索members的方法
$scope.selectMember = function () {
    $scope.errorMessage = null;

    var params = {
        serviceType: $scope.findServiceType,
        cityName: $scope.findCitySelection,
        distName: $scope.findDistSelection,
        startDate: $scope.startDate,
        endDate: $scope.endDate,
        startTime: $scope.startTime,
        endTime: $scope.endTime,
    };

    console.log("Sending request with params:", params);

    $http.get('http://localhost:8080/member/search', { params: params })
    .then(function (response) {
        console.log("Received response:", response.data);
        $scope.members = response.data.map(function(member) {
            var relevantTime = member.acceptTimes[0];
            var serviceProduct = member.serviceproduct.find(s => s.serviceType === $scope.findServiceType);
            
            return {
                name: member.name,
                memberID: member.memberID,
                serviceType: $scope.findServiceType,
                cityName: $scope.findCitySelection,
                distName: $scope.findDistSelection,
                startDate: relevantTime.startDate,
                endDate: relevantTime.endDate,
                startTime: relevantTime.startTime || '全天',
                endTime: relevantTime.endTime || '皆可',
                price: serviceProduct ? serviceProduct.price : 'N/A'
            };
        });
    }, function (error) {
            console.error("Error in fetching members:", error);
            $scope.errorMessage = "搜索小幫手時發生錯誤，請稍後再試。";
        });
};
//將資料帶到order
$scope.storeData = function(member) {
//  localStorage.setItem('selectedMember', JSON.stringify(member));

localStorage.setItem('selectedMember', JSON.stringify({
  name: member.name,
  memberID: member.memberID  // 確保這裡存儲了memberID
}));
  localStorage.setItem('selectedServiceType', $scope.findServiceType);
  localStorage.setItem('selectedStartDate', $scope.startDate);
  localStorage.setItem('selectedEndDate', $scope.endDate);
  localStorage.setItem('selectedStartTime', $scope.startTime);
  localStorage.setItem('selectedEndTime', $scope.endTime);
  localStorage.setItem('selectedPrice', member.price);
  localStorage.setItem('loggedInMember', JSON.stringify($scope.member2));
};


});