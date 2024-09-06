var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http, $timeout, $window) {
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


  $scope.animals = [];
  $scope._refreshPageData = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/animals'
    }).then(function successCallback(response) {
      $scope.animals = response.data;
    }, function errorCallback(response) {
      console.log(response.statusText);
    });
  }
  $scope._refreshPageData();
  $scope.citylist = ['','臺北市','新北市','桃園市','臺中市','臺南市','高雄市','基隆市',"新竹市","嘉義市","新竹縣","苗栗縣","彰化縣","南投縣","雲林縣","嘉義縣","屏東縣","宜蘭縣","花蓮縣","臺東縣","澎湖縣","金門縣","連江縣"];
  $scope.animalGenderlist = ['', '無', '公', '母'];
  $scope.animalTypelist = ['','狗','貓','兔','鳥','其他'];
  $scope.animalSizelist = ['','小型', '中型', '大型'];
  $scope.animalAgelist = ['', '不確定', '幼年期(貓狗<1歲)', '青年期(貓狗1~2歲)', '成年期(貓狗2~7歲)', '中年期(貓狗7~9歲)', '老年期(貓狗>9歲)'];
  $scope.animalEgolist = ['','友善','活潑','安靜','害羞','精力充沛','聰明','保護欲強'];
  $scope.animalHealthlist = ['','健康','良好','欠佳','康復中','不確定'];
  $scope.animal = {
    animalID: -1,
    animalName: '',
    animalGender: $scope.animalGenderlist[0],
    animalType: $scope.animalTypelist[0],
    animalAge: $scope.animalAgelist[0],
    animalPersonality: '',
    animalChipID: '',
    animalLocation: $scope.citylist[0],
    animalSize: $scope.animalSizelist[0],
    isVaccine: null,
    animalMemo: '',
    isNeuter: null,
    animalHealth: '',
    animalPhoto: "尚未設定",
    memberID: $scope.userNow.memberID
  };
const baseUrl = 'http://localhost:8080/uploads/animal_photos/';
$scope.getPhotoUrl = function (photoPath) {
  return baseUrl + photoPath;
};

  //上傳動物
  $scope.addAnimal = function () {
    // 遍歷 $scope.animal 物件中的每個屬性，空字串改為'user未填寫'
    for (let key in $scope.animal) {
      if ($scope.animal.hasOwnProperty(key)) {
        //if(!$scope.animal[key] || $scope.animal[key].trim() === '') {
        //    $scope.animal[key] = 'user未填寫';        }
        if (typeof $scope.animal[key] === 'string' && !$scope.animal[key].trim()) {
          $scope.animal[key] = 'user未填寫';
        }/*
        else if ($scope.animal[key] === null || $scope.animal[key] === undefined) {
          $scope.animal[key] = 'user未填寫';
        }*/
      }
    }//下面開始打包成[(這是Json)animalModel, animalPhoto(這是file裝不進json)]
    var formData = new FormData();
    formData.append("animalModel", JSON.stringify($scope.animal));
    formData.append("animalPhoto", $("#animalPhoto")[0].files[0]);
    //check console.log & upload with POST
    console.log(formData.get('animalModel'));
    console.log(formData.get('animalPhoto').name);
    $http.post('http://localhost:8080/animals/savephoto', formData, {
      // Let the browser set the Content-Type for FormData
      headers: { 'Content-Type': undefined },
      transformRequest: angular.identity
    }).then(function (response) {
      alert("File uploaded successfully and data processed: " + JSON.stringify(response.data));
      $scope.myUploadAnimals();
    }).catch(function (error) {
      console.error('Error:', error);
      console.error('ErrorBody:', error.data);
      alert("Error uploading file and data." + error.data);
    });
  }

  //我上傳的動物列表頁面
  $scope.filterTitle = {
    nowTitle: '動物領養篩選結果',
    Titlelist: ['動物領養篩選結果', '我上傳的動物列表', '我心儀的動物領養申請狀態', '有人想領養我上傳的動物-審核領養者資訊']
  }
  $scope.myUploadAnimals = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/animals/memberid/' + $scope.userNow.memberID
    }).then(function successCallback(response) {
      $scope.animals = response.data;
    }, function errorCallback(response) {
      console.log(response.statusText);
    });
    $scope.filterTitle.nowTitle = '我上傳的動物列表';
  }
  //動物領養篩選結果
  $scope.findAnimal = function () {
    console.log(angular.toJson($scope.animal));
    $http({
      method: 'POST',
      url: 'http://localhost:8080/animals/filter',
      data: angular.toJson($scope.animal),
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      $scope.animals = response.data;
      alert("Find successfully and data processed: " + JSON.stringify(response.data));
    }).catch(function (error) {
      console.error('Error:', error);
      console.error('ErrorBody:', error.data);
      alert("Error uploading file and data." + error.data);
    });
    $scope.filterTitle.nowTitle = '動物領養篩選結果';
  }
  // 刷新页面
  $scope.reloadPage = function () { window.location.reload(); };
  //在新分頁檢視動物詳細資料
  $scope.newPageWithData = function () {
    // 將資料轉換為 URL 查詢參數
    var data = {
      userNow: JSON.stringify($scope.userNow),
      animal: JSON.stringify($scope.animal)
    };
    // 編碼資料以適應 URL
    var queryString = $.param(data);
    // 打開新頁面
    window.open('Page2.html?' + queryString, '_blank');
  };
  //產生動物訂單
  $scope.addAdoptOrder = function (animal) {
    console.log(animal);
    console.log(angular.toJson(animal));
    $http({
      method: 'POST',
      url: 'http://localhost:8080/adoptOtdersM',
      data: angular.toJson(animal),
      headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
      $scope.animals = response.data;
      alert("您心儀的動物已送至Po文者審核: " + JSON.stringify(response.data));
    })


  }



});
