console.log("000000000");
var app = angular.module("UserManagement", []);

app.controller('myCtrl', function ($scope, $http, $timeout, $window) {
  /***可從這複製，注意上面最少要有function($scope, $http, $timeout, $window) */
  $scope.userNow = "現在使用者身分是:訪客"

  //下面是每次F5重整時會從session把userNow資訊抓下來
  $scope.loginTitle = '訪客請登入/註冊';
  $scope.loginMenu_1 = '登入頁面';
  $timeout(function () {
    var userNow = JSON.parse(sessionStorage.getItem('userNow'));
    if (userNow) {
      $scope.userNow = userNow;
      if ($scope.userNow.roleLevel == 3) {
        console.log('User loaded:', $scope.userNow);
        $scope.loginTitle = '會員:' + $scope.userNow.name + ' 您好';
        $scope.loginMenu_1 = '會員登出';
      } else {
        console.log('不是管理員');
        console.log('User loaded:', $scope.userNow);
        $scope.loginTitle = '會員:' + $scope.userNow.name + ' 您好';
        $scope.loginMenu_1 = '會員登出';
        alert("您不是管理員哦!");
        window.location.href = '/vsCode檔案/Jack/寵物服務媒合平台/index.html';
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
      $window.location.href = goPage; // 
    }
  }
});

//專屬member
app.controller('MemberManagementController', function ($scope, $http) {
  console.log("僅到MemberController");

  $scope.members = [];


  $http.get('http://localhost:8080/member').then(function (response) {
    $scope.members = response.data;
    console.log(response.data);

  });




  $scope.form = {
    memberID: -1,
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    roleLevel: "",
    memberPhoto: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitMember = function () {

    var method = "";
    var url = "";
    if ($scope.form.memberID == -1) {
      method = "POST",
        url = 'http://localhost:8080/member';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/memberM/' + $scope.form.memberID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete member by Id
  $scope.removeMember = (member) => {
    alert(member.memberID);
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/memberM/' + member.memberID
    }).then(_success, _error);
  };

  //In case of edit member, populate form with member data
  $scope.editMember = function (member) {
    $scope.form.memberID = member.memberID;
    $scope.form.name = member.name;
    $scope.form.username = member.username;
    $scope.form.password = member.password;
    $scope.form.email = member.email;
    $scope.form.phone = member.phone;
    $scope.form.address = member.address;
    $scope.form.gender = member.gender;
    $scope.form.roleLevel = member.roleLevel;
    $scope.form.memberPhoto = member.memberPhoto;
  };

  /* Private Methods */
  //HTTP GET- get all members collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/member'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.members = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.memberID = "",
      $scope.name = "",
      $scope.username = "",
      $scope.password = "",
      $scope.email = "",
      $scope.phone = "",
      $scope.address = "",
      $scope.gender = "",
      $scope.roleLevel = "",
      $scope.memberPhoto = "";
  };
});

//專屬Animal
app.controller('AnimalManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到AnimalController");

  $scope.animal = [];


  $http.get('http://localhost:8080/animals').then(function (response) {
    $scope.animal = response.data;
    console.log(response.data);

  });

  $scope.form = {
    animalID: -1,
    animalName: "",
    animalGender: "",
    animalType: "",
    animalAge: "",
    animalPersonality: "",
    animalChipID: "",
    animalLocation: "",
    animalSize: "",
    isVaccine: "",
    animalMemo: "",
    isNeuter: "",
    animalHealth: "",
    animalPhoto: "",
    memberID: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitAnimal = function () {

    var method = "";
    var url = "";
    if ($scope.form.animalID == -1) {
      method = "POST",
        url = 'http://localhost:8080/animals';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/animals/' + $scope.form.animalID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete animal by Id
  $scope.removeAnimal = (animal) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/animalM/' + animal.animalID
    }).then(_success, _error);
  };

  //In case of edit animal, populate form with animal data
  $scope.editAnimal = function (animal) {
    $scope.form.animalID = animal.animalID;
    $scope.form.animalName = animal.animalName;
    $scope.form.animalGender = animal.animalGender;
    $scope.form.animalType = animal.animalType;
    $scope.form.animalAge = animal.animalAge;
    $scope.form.animalPersonality = animal.animalPersonality;
    $scope.form.animalChipID = animal.animalChipID;
    $scope.form.animalLocation = animal.animalLocation;
    $scope.form.animalSize = animal.animalSize;
    $scope.form.isVaccine = animal.isVaccine;
    $scope.form.animalMemo = animal.animalMemo;
    $scope.form.isNeuter = animal.isNeuter;
    $scope.form.animalHealth = animal.animalHealth;
  };

  /* Private Methods */
  //HTTP GET- get all animals collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/animals'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.animal = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.animalID = "",
      $scope.animalName = "",
      $scope.animalGender = "",
      $scope.animalType = "",
      $scope.animalAge = "",
      $scope.animalPersonality = "",
      $scope.animalChipID = "",
      $scope.animalLocation = "",
      $scope.animalSize = "",
      $scope.isVaccine = "",
      $scope.animalMemo = "",
      $scope.isNeuter = "",
      $scope.animalHealth = "",
      $scope.animalPhoto = "",
      $scope.memberID = ""

  };
});

//專屬ServiceProduct
app.controller('ServiceProductManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到ServiceProductController");

  $scope.serviceproduct = [];


  $http.get('http://localhost:8080/serviceproduct').then(function (response) {
    $scope.serviceproduct = response.data;
    console.log(response.data);

  });

  $scope.form = {
    ID: -1,
    price: "",
    memberID: "",
    isDeleted: "",
    serviceType: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitServiceProduct = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/serviceProductM';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/serviceProductM/' + $scope.form.ID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete serviceproduct by Id
  $scope.removeServiceProduct = (serviceproduct) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/serviceProductM/' + serviceproduct.ID
    }).then(_success, _error);
  };

  //In case of edit animal, populate form with animal data
  $scope.editServiceProduct = function (serviceproduct) {
    $scope.form.ID = serviceproduct.ID;
    $scope.form.price = serviceproduct.price;
    $scope.form.memebrID = serviceproduct.memberID;
    $scope.form.isDeleted = serviceproduct.isDeleted;
    $scope.form.serviceType = serviceproduct.serviceType;
  };

  /* Private Methods */
  //HTTP GET- get all serviceproduct collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/serviceproduct'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.serviceproduct = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.ID = "",
    $scope.price = "",
    $scope.memberID = "",
    $scope.isDeleted = "",
    $scope.serviceType = "";
  };
});

//專屬AcceptLocation
app.controller('AcceptLocationManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到AcceptLocationController");

  $scope.acceptlocation = [];

  //eclipse的acceptlocation.controller url打打錯(acceplocation)
  $http.get('http://localhost:8080/acceplocation').then(function (response) {
    $scope.acceptlocation = response.data;
    console.log(response.data);

  });

  $scope.form = {
    ID: -1,
    cityName: "",
    distName: "",
    memberID: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitAcceptLocation = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/acceptlocationIdM';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/acceptlocationIdM/' + $scope.form.ID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete acceptlocation by Id
  $scope.removeAcceptLocation = (acceptlocation) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/acceptlocationIdM/' + acceptlocation.ID
    }).then(_success, _error);
  };

  //In case of edit animal, populate form with animal data
  $scope.editAcceptLocation = function (acceptlocation) {
    $scope.form.ID = acceptlocation.ID;
    $scope.form.cityName = acceptlocation.cityName;
    $scope.form.distName = acceptlocation.distName;
    $scope.form.memberID = acceptlocation.memberID;
  };

  /* Private Methods */
  //HTTP GET- get all acceptlocation collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/acceplocation'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.acceptlocation = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.ID = "",
    $scope.cityName = "",
    $scope.distName = "",
    $scope.memberID = "";
  };
});

//專屬AcceptTime
app.controller('AcceptTimeManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到AcceptTimeController");

  $scope.accepttime = [];


  $http.get('http://localhost:8080/acceptime').then(function (response) {
    $scope.accepttime = response.data;
    console.log(response.data);

  });

  $scope.form = {
    ID: -1,
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    memberID: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitAcceptTime = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/acceptTimeM';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/acceptTimeIdM/' + $scope.form.ID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete accepttime by Id
  $scope.removeAcceptTime = (accepttime) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/acceptTimeIdM/' + accepttime.ID
    }).then(_success, _error);
  };

  //In case of edit animal, populate form with accepttime data
  $scope.editAcceptTime = function (accepttime) {
    $scope.form.ID = accepttime.ID;
    $scope.form.startDate = accepttime.startDate;
    $scope.form.endDate = accepttime.endDate;
    $scope.form.startTime = accepttime.startTime;
    $scope.form.endTime = accepttime.endTime;
    $scope.form.memberID = accepttime.memberID;
  };

  /* Private Methods */
  //HTTP GET- get all accepttime collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/acceptTimeM'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.accepttime = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.ID = "",
    $scope.startDate = "",
    $scope.endDate = "",
    $scope.startTime = "",
    $scope.endTime = "",
    $scope.memberID = "";
  };
});

//專屬Orders
app.controller('OrderManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到OrderController");

  $scope.orders = [];


  $http.get('http://localhost:8080/order2').then(function (response) {
    $scope.orders = response.data;
    console.log(response.data);

  });

  $scope.form = {
    OrderID: -1,
    orderAddress: "",
    serviceDate: "",
    serviceTime: "",
    orderMemo: "",
    total: "",
    orderStatus: "",
    orderCreateDate: "",
    role1MemberID: "",
    role2MemberID: "",
    petID: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitOrder = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/order2';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/order2/' + $scope.form.OrderID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete order by Id
  $scope.removeAcceptTime = (orders) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/order2/' + orders.OrderID
    }).then(_success, _error);
  };

  //In case of edit animal, populate form with order data
  $scope.editOrder = function (orders) {
    $scope.form.OrderID = orders.OrderID;
    $scope.form.orderAddress = orders.orderAddress;
    $scope.form.serviceDate = orders.serviceDate;
    $scope.form.serviceTime = orders.serviceTime;
    $scope.form.orderMemo = orders.orderMemo;
    $scope.form.total = orders.total;
    $scope.form.total = orders.total;
    $scope.form.orderStatus = orders.orderStatus;
    $scope.form.orderCreateDate = orders.orderCreateDate;
    $scope.form.role1MemberID = orders.role1MemberID;
    $scope.form.role2MemberID = orders.role2MemberID;
    $scope.form.petID = orders.petID;
  };

  /* Private Methods */
  //HTTP GET- get all order collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/order2'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.orders = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.OrderID = "",
    $scope.orderAddress = "",
    $scope.serviceDate = "",
    $scope.serviceTime = "",
    $scope.orderMemo = "",
    $scope.total = "";
    $scope.orderStatus = "";
    $scope.orderCreateDate = "";
    $scope.role1MemberID = "";
    $scope.role2MemberID = "";
    $scope.petID = "";
  };
});

//專屬AdoptOrder
app.controller('AdoptOrderManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到AdoptOrderController");

  $scope.adoptorders = [];


  $http.get('http://localhost:8080/adoptOrdersM').then(function (response) {
    $scope.adoptorders = response.data;
    console.log(response.data);

  });

  $scope.form = {
    adoptID: -1,
    animalID: "",
    orderCreateTime: "",
    orderMemo: "",
    memberID: ""
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitAdoptOrder = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/adoptOrdersM';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/adoptOrdersM/' + $scope.form.adoptID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete adoptorder by Id
  $scope.removeAdoptOrder = (adoptorders) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/adoptOrdersM/' + adoptorders.adoptID
    }).then(_success, _error);
  };

  //In case of edit adoptorder, populate form with adoptorder data
  $scope.editadoptOrder = function (adoptorders) {
    $scope.form.adoptID = adoptorders.adoptID;
    $scope.form.animalID = adoptorders.animalID;
    $scope.form.orderCreateTime = adoptorders.orderCreateTime;
    $scope.form.orderMemo = adoptorders.orderMemo;
    $scope.form.memberID = adoptorders.memberID;
  };

  /* Private Methods */
  //HTTP GET- get all order collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/adoptOrdersM'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.adoptorders = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.adoptID = "",
    $scope.animalID = "",
    $scope.orderCreateTime = "",
    $scope.orderMemo = "",
    $scope.memberID = ""
  };
});

//專屬Pets
app.controller('PetsManagementController', function ($scope, $http) {
  //測試用
  console.log("僅到PetsManagementController");

  $scope.adoptorders = [];


  $http.get('http://localhost:8080/petM').then(function (response) {
    $scope.pets = response.data;
    console.log(response.data);

  });

  $scope.form = {
    petID: -1,
    petName: "",
    petGender: "",
    petType: "",
    petAge: "",
    petHealth: "",
    petSize: "",
    petPhoto: "",
    memberID: "",
  };

  //Now load the data from server
  _refreshPageData();

  //HTTP POST PUT use if/else to add/edit
  $scope.submitPets = function () {

    var method = "";
    var url = "";
    if ($scope.form.ID == -1) {
      method = "POST",
        url = 'http://localhost:8080/petM';
    } else {
      method = "PUT",
        url = 'http://localhost:8080/petM/' + $scope.form.petID;
    }

    $http({
      method: method,
      url: url,
      data: angular.toJson($scope.form),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(_success, _error);
  };

  //HTTP DELETE- delete pets by Id
  $scope.removePets = (pets) => {
    $http({
      method: 'DELETE',
      url: 'http://localhost:8080/petM/' + pets.petID
    }).then(_success, _error);
  };

  //In case of edit pets, populate form with adoptorder data
  $scope.editpets = function (pets) {
    $scope.form.petID = pets.petID;
    $scope.form.petName = pets.petName;
    $scope.form.petGender = pets.petGender;
    $scope.form.petType = pets.petType;
    $scope.form.petAge = pets.petAge;
    $scope.form.petHealth = pets.petHealth;
    $scope.form.petSize = pets.petSize;
    $scope.form.petPhoto = pets.petPhoto;
    $scope.form.memberID = pets.memberID;
  };

  /* Private Methods */
  //HTTP GET- get all order collection
  function _refreshPageData() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/petM'

      //現場手刻一個function{}
    }).then(function successCallback(response) { $scope.pets = response.data; },
      function errorCallback(response) { console.log(response.statusText); });
  }

  function _success(response) {
    _refreshPageData();
    _clearForm()
  }

  function _error(response) {
    console.log(response.statusText);
  }

  //Clear the form
  function _clearForm() {
    $scope.petID = "",
    $scope.petName = "",
    $scope.petGender = "",
    $scope.petType = "",
    $scope.petAge = "",
    $scope.petHealth = "",
    $scope.petSize = "",
    $scope.petPhoto = "",
    $scope.memberID = ""
  };





});