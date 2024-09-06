var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
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
});