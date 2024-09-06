var app = angular.module('myApp', []);
app.controller('myCtrl_preSet', runPreSetting );
app.controller('myCtrl_animaladd', runAnimaladd );
function runPreSetting($scope, $http) {
  $scope.userNow = {
    memberID:2,
	  name:"BBB",
	  username:"BBB",
	  password:"BBB",
	  email:"BBB",
	  phone:"BBB",
	  address:"BBB",
	  gender:"BBB",
	  roleLevel:2,
	  memberPhoto:"path"
  };
  $scope.animals = [];
  _refreshPageData();
  function _refreshPageData() {
    $http({
      method : 'GET',
      url : 'http://localhost:8080/animals'
    }).then(function successCallback(response) {
      $scope.animals = response.data;
    }, function errorCallback(response) {
      console.log(response.statusText);
    });
  }
}
function runAnimaladd($scope, $http) {
//HTTP POST/PUT methods for add/edit employee
$scope.animal = {
  animalID: -1,
  animalName: $scope.addAnimalName,
  animalGender: $scope.addAnimalGender,
  animalType: $scope.addAnimalType,
  animalAge: $scope.addAnimalAge,
  animalPersonality: $scope.addAnimalPersonality,
  animalChipID: $scope.addAnimalChipID,
  animalLocation: $scope.addAnimalLocation,
  animalSize: $scope.addAnimalSize,
  isVaccine: $scope.addIsVaccine,
  animalMemo: $scope.addAnimalMemo,
  isNeuter: $scope.addIsNeuter,
  animalHealth: $scope.addAnimalHealth,
  animalPhoto: "",
  memberID: $scope.userNow.memberID
};
$scope.addAnimal = function() {
  var formData = new FormData();
  formData.append("animalModel", JSON.stringify($scope.animal));
  formData.append("animalPhoto", $("#animalPhoto")[0].files[0]);
  //upload with POST
  $http.post('/animals/savePhoto', formData, {
    // Let the browser set the Content-Type for FormData
    headers: {'Content-Type': undefined  },
    transformRequest: angular.identity
  }).then(function(response) {
    alert("File uploaded successfully and data processed: " + JSON.stringify(response.data));
    myUploadAnimals;
  }).catch(function(error) {
    console.error('Error:', error);
    alert("Error uploading file and data.");
  });



  var method = "";
  var url = "";
  if ($scope.animal.animalID == -1) {
    //Id is absent so add employee - POST operation
    method = "POST";
    url = 'http://localhost:8080/animals';
  } else {
    //If Id is present, it's edit operation - PUT operation
    method = "PUT";
    url = 'http://localhost:8080/animals/' + $scope.animal.animalID;
  }

  $http({
    method : method,
    url : url,
    data : angular.toJson($scope.animal),
    headers : {
      'Content-Type' : 'application/json'
    }
  }).then( _success, _error );
};

$scope.checkInput=function() {
  const elements = document.querySelectorAll('.needcheck');
      elements.forEach(element => {
        
      
      
      });
}

function _success(response) {
  location.reload(); // F5刷新页面
  //_refreshPageData();
  //_clearForm()
}
function _error(response) {
  console.log(response.statusText);
}
//Clear the form
function _clearForm() {
  $scope.animal.animalID = -1;
};


}

















app.controller('myCtrl', runMyCtrl );
function runMyCtrl($scope, $http) {
  $scope.userNow = {
    memberID:2,
	  name:"BBB",
	  username:"BBB",
	  password:"BBB",
	  email:"BBB",
	  phone:"BBB",
	  address:"BBB",
	  gender:"BBB",
	  roleLevel:2,
	  memberPhoto:"path",
  };
  $scope.citylist = {
    不限地區 :{distlist:['不限地區'], nowDist:'不限地區'},
    台北市 : {
      distlist: ['中正區','大同區','中山區','萬華區','信義區','松山區','大安區','南港區','北投區','內湖區','士林區','文山區'],
      nowDist: '中正區'    },
    新北市 : {
      distlist: ['板橋區','新莊區','泰山區','林口區','淡水區','金山區','八里區','萬里區','石門區','三芝區','瑞芳區','汐止區','平溪區','貢寮區','雙溪區','深坑區','石碇區','新店區','坪林區','烏來區','中和區','永和區','土城區','三峽區','樹林區','鶯歌區','三重區','蘆洲區','五股區'],
      nowDist: '板橋區'    },
    基隆市 : {
      distlist: ['仁愛區','中正區','信義區','中山區','安樂區','暖暖區','七堵區'],
      nowDist: '仁愛區'    }
  };$scope.findAnimalLocation = $scope.citylist.不限地區;
  $scope.animalGenderlist = ['不限性別','公','母']
  $scope.animalTypelist = ['不限種類','貓','狗','其他']
  $scope.animalSizelist = ['不限體型','小型','中型','大型']
  $scope.animalAgelist = ['不限年齡','幼年期(貓狗<1歲)','青年期(貓狗1~2歲)','成年期(貓狗2~7歲)','中年期(貓狗7~9歲)','老年期(貓狗>9歲)']
  //$scope.animalPersonalitylist = ['溫柔','黏人','有氣質','愛玩','安靜','害羞','活潑']
  $scope.employees = [];
  $scope.form = {
    id : -1,
    firstName : "",
    lastName : "",
    email : ""
  };
};




/*    日期選擇器模板，需要搭配的javascript，供參考

// 建立日期選擇器模板
//initDatePickers();
function initDatePickers() {
  new Pikaday({ 
      field: document.getElementById('startDate'),
      format: 'YYYY-MM-DD',
      onSelect: function() {
          document.getElementById('startDate').value = this.toString();
      }
  });
}
// 初始化需要的模板
document.addEventListener('DOMContentLoaded', () => {
  //generateTimeOptions();
  initDatePickers();
  //displayStaff(); // 初始顯示服務人員
});

*/