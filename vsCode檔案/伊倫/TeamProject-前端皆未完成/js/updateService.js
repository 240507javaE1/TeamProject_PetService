var app = angular.module('serviceApp', [])

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
                console.log('會員尚未成為小幫手');
                $scope.userNow = "現在使用者身分是:訪客";
                $scope.loginTitle = '訪客請登入/註冊';
                $scope.loginMenu_1 = '登入頁面';
                alert("尚未成為小幫手，請先成為小幫手再來更新服務");
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

app.service('DataService', function () {
    this.services = [];
    this.selectedDistricts = [];

    this.userNow = null;

    this.setUserNow = function (user) {
        this.userNow = user;
    };

    this.getUserNow = function () {
        return this.userNow;
    };

    this.setServices = function (services) {
        this.services = services;
    };

    this.setSelectedDistricts = function (districts) {
        this.selectedDistricts = districts;
    };

    this.getAllSelectedDistricts = function () {
        return this.selectedDistricts;
    };

    // 新增方法：獲取已選擇的服務
    this.getSelectedServices = function () {
        return this.services.filter(function (service) {
            return service.selected;
        });
    };

    this.initialData = null;

    this.setInitialData = function (data) {
        this.initialData = data;
    };

    this.getInitialData = function () {
        return this.initialData;
    };
});


//從後端抓小幫手的服務資料
app.controller('bodyController', function ($scope, $http, DataService, $interval) {
    $scope.servicedato = {};
    // var userNow = DataService.getUserNow();
    // var memberID = userNow ? userNow.memberID : null;
    // $http.get('http://localhost:8080/serviceproduct/' + memberID).then(function (response) {
    //     //這裡還要處理ID，因為ID是從session抓下來的，所以這裡還沒有ID，先用1代替
    //     $scope.servicedato = response.data;
    //     // 將資料傳遞給其他控制器
    //     DataService.setInitialData($scope.servicedato);
    // });

    function loadData() {
        var userNow = DataService.getUserNow();
        if (userNow && userNow.memberID) {
            var memberID = userNow.memberID;
            $http.get('http://localhost:8080/serviceproduct/' + memberID).then(function (response) {
                $scope.servicedato = response.data;
                DataService.setInitialData($scope.servicedato);
            });
        } else {
            console.log('等待用戶數據加載...');
        }
    }

    // 每100毫秒檢查一次，直到獲取到用戶數據
    var checkInterval = $interval(function () {
        if (DataService.getUserNow()) {
            $interval.cancel(checkInterval);
            loadData();
        }
    }, 100);

    // 確保在控制器銷毀時取消interval
    $scope.$on('$destroy', function () {
        if (checkInterval) {
            $interval.cancel(checkInterval);
        }
    });
});



//可提供的服務區域的controller
app.controller('ServiceController', function ($scope, DataService) {
    $scope.services = [
        { name: '到府照顧', selected: false, price: null },
        { name: '寵物美容', selected: false, price: null },
        { name: '寵物散步', selected: false, price: null },
        { name: '寵物住宿', selected: false, price: null }
    ];

    // 等待初始數據加載
    $scope.$watch(function () {
        return DataService.getInitialData();
    }, function (newData) {
        if (newData) {
            newData.products.forEach(function (product) {
                var service = $scope.services.find(s => s.name === product.serviceType);
                if (service && product.isDeleted !== true) {
                    service.selected = true;
                    service.price = product.price;
                }
            });
        }
    });

    DataService.setServices($scope.services);

    $scope.validatePrice = function (service) {
        if (service.selected && (!service.price || service.price <= 0 || !Number.isInteger(service.price))) {
            alert(service.name + '的價格必須是正整數，請重新輸入。');
            service.price = null; // 清空錯誤的輸入
        }
    };
});

//選擇服務地區的controller
app.controller('MainController', function ($scope, $http, DataService, $rootScope, $timeout) {
    $scope.cities = [];
    $scope.districts = {}; // 用於追蹤各城市的區域選擇狀態
    $scope.selectAllStates = {}; // 追蹤每個城市的"全選"狀態

    // 加載城市和地區數據
    $http.get('./otherData/cities.json').then(function (response) {
        $scope.cities = response.data.cities;
        // 初始化districts對象和selectAllStates
        $scope.cities.forEach(function (city) {
            $scope.districts[city.cityName] = {};
            $scope.selectAllStates[city.cityName] = false; // 初始化為未選中狀態
            city.distNames.forEach(function (district) {
                $scope.districts[city.cityName][district] = false;
            });
        });
    }, function (error) {
        console.error('無法載入城市數據', error);
    });

    // 等待初始數據加載
    $scope.$watch(function () {
        return DataService.getInitialData();
    }, function (newData) {
        if (newData) {
            $timeout(function () {
                newData.locations.forEach(function (location) {
                    if ($scope.districts[location.cityName]) {
                        $scope.districts[location.cityName][location.distName] = true;
                    }
                });
                $scope.updateSelectedDistricts();
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            });
        }
    });

    $scope.updateSelectedDistricts = function () {
        var selectedDistricts = [];
        $scope.cities.forEach(function (city) {
            city.distNames.forEach(function (district) {
                if ($scope.districts[city.cityName][district]) {
                    selectedDistricts.push({ city: city.cityName, district: district });
                }
            });
        });
        DataService.setSelectedDistricts(selectedDistricts);
        $rootScope.$broadcast('selectedDistrictsUpdated', selectedDistricts);
    };

    //點選"全選"之後觸發的function
    $scope.selectAllDistricts = function (city, event) {
        var isChecked = event.target.checked;
        city.distNames.forEach(function (district) {
            $scope.districts[city.cityName][district] = isChecked;
        });
        $scope.selectAllStates[city.cityName] = isChecked; // 更新該城市的"全選"狀態
        $scope.updateSelectedDistricts();
    };

    //點選某個區的checkbox之後觸發的function
    $scope.updateSelectAll = function (city) {
        var allSelected = city.distNames.every(function (district) {
            return $scope.districts[city.cityName][district];
        });
        $scope.selectAllStates[city.cityName] = allSelected;
        $scope.updateSelectedDistricts();
    };


    $scope.getAllSelectedDistricts = function () {
        return DataService.getAllSelectedDistricts();
    };


    // 移除已選取的區域
    $scope.removeDistrict = function (city, district) {
        $scope.districts[city][district] = false;
        $scope.updateSelectAll($scope.cities.find(function (c) {
            return c.cityName === city;
        }));
        $scope.updateSelectedDistricts();
    };

    // 監聽選中的城市變化
    $scope.$watch('selectedCity', function (newCity, oldCity) {
        if (newCity !== oldCity) {
            $scope.selectAll = $scope.selectAllStates[newCity.cityName];
        }
    });
});

app.controller('SelectedDistrictsController', function ($scope, $rootScope, DataService) {
    $scope.selectedDistricts = DataService.getAllSelectedDistricts();

    $rootScope.$on('selectedDistrictsUpdated', function (event, districts) {
        $scope.selectedDistricts = districts;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    });

    $scope.removeDistrict = function (city, district) {
        // 實現移除區域的邏輯
        // 更新 MainController 中的 $scope.districts
        // 然後調用 updateSelectedDistricts
        $scope.$parent.districts[city][district] = false;
        $scope.$parent.updateSelectAll($scope.cities.find(function (c) {
            return c.cityName === city;
        }));
        $scope.$parent.updateSelectedDistricts();
    };
});

//日期選擇的controller
app.controller('CalendarController', ['$scope', 'DataService', function ($scope, DataService) {
    var calendar;
    var userEvents = [];
    var initialDataLoaded = false;

    function initializeCalendar() {
        calendar = $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            select: function (start, end) {
                var newEvent = {
                    start: start,
                    end: end,
                    color: '#3a87ad'
                };
                addEvent(newEvent);
            },
            eventClick: function (calEvent, jsEvent, view) {
                if (confirm('是否要取消這個時間段的選擇？')) {
                    removeEvent(calEvent);
                }
            },
            editable: false,
            eventLimit: true,
            events: userEvents
        });
    }

    function addEvent(newEvent) {
        var overlappingEvents = findOverlappingEvents(newEvent);
        if (overlappingEvents.length > 0) {
            var mergedEvent = mergeEvents([newEvent].concat(overlappingEvents));
            removeEvents(overlappingEvents);
            userEvents.push(mergedEvent);
            calendar.fullCalendar('renderEvent', mergedEvent, true);
        } else {
            userEvents.push(newEvent);
            calendar.fullCalendar('renderEvent', newEvent, true);
        }
        calendar.fullCalendar('unselect');
    }

    function findOverlappingEvents(newEvent) {
        return userEvents.filter(function (existingEvent) {
            return newEvent.start < existingEvent.end && existingEvent.start < newEvent.end;
        });
    }

    function mergeEvents(events) {
        var start = moment.min(events.map(function (e) { return moment(e.start); }));
        var end = moment.max(events.map(function (e) { return moment(e.end); }));
        return {
            start: start,
            end: end,
            color: '#3a87ad'
        };
    }

    function removeEvents(eventsToRemove) {
        eventsToRemove.forEach(function (event) {
            userEvents = userEvents.filter(function (e) {
                return e.start.valueOf() !== event.start.valueOf() || e.end.valueOf() !== event.end.valueOf();
            });
            calendar.fullCalendar('removeEvents', function (e) {
                return e.start.valueOf() === event.start.valueOf() && e.end.valueOf() === event.end.valueOf();
            });
        });
    }

    function removeEvent(event) {
        removeEvents([event]);
    }

    function loadInitialEvents() {
        var initialData = DataService.getInitialData();
        if (initialData && initialData.times && !initialDataLoaded) {
            userEvents = initialData.times.map(function (time) {
                var start = moment(time.start);
                var end = moment(time.end);
                var isAllDay = !start.format('HH:mm:ss').match(/[1-9]/);

                if (isAllDay) {
                    end = end.add(1, 'day');
                }

                return {
                    start: start,
                    end: end,
                    allDay: isAllDay,
                    color: '#3a87ad'
                };
            });
            initialDataLoaded = true;
            if (calendar) {
                calendar.fullCalendar('removeEvents');
                calendar.fullCalendar('addEventSource', userEvents);
            }
        }
    }

    $scope.$watch(function () {
        return DataService.getInitialData();
    }, function (newData) {
        if (newData) {
            loadInitialEvents();
        }
    });

    $(document).ready(function () {
        initializeCalendar();
        loadInitialEvents();
    });

    // 提供一個方法來獲取當前的事件列表
    $scope.getCurrentEvents = function () {
        return userEvents;
    };
}]);


app.controller('ExportController', function ($scope, $http, DataService) {
    $scope.exportEvents = function () {
        var events = $('#calendar').fullCalendar('clientEvents');
        if (!Array.isArray(events)) {
            console.error('無法獲取事件數據');
            return;
        }

        var selectedServices = DataService.getSelectedServices();
        var selectedDistricts = DataService.getAllSelectedDistricts();

        // 檢查是否有選擇服務
        if (selectedServices.length === 0) {
            alert('請至少選擇一項服務並設定價格。');
            return;
        }

        // 檢查是否有選擇地區
        if (selectedDistricts.length === 0) {
            alert('請至少選擇一個服務地區。');
            return;
        }

        // 檢查是否有選擇時間
        if (events.length === 0) {
            alert('請至少選擇一個時間段。');
            return;
        }

        var userNow = DataService.getUserNow();
        var memberID = userNow ? userNow.memberID : null;

        var exportData = {
            memberID: memberID,
            products: selectedServices.map(function (service) {
                return {
                    serviceType: service.name,
                    price: service.price
                };
            }),
            locations: selectedDistricts.map(function (district) {
                return {
                    cityName: district.city,
                    distName: district.district
                };
            }),
            times: events.map(function (event) {
                var formatDateTime = function (momentObj) {
                    return momentObj.format('YYYY-MM-DD') + 'T' + momentObj.format('HH:mm:ss');
                };

                var start, end;
                if (event.allDay) {
                    start = event.start.format('YYYY-MM-DD');
                    end = event.end ? event.end.clone().subtract(1, 'day').format('YYYY-MM-DD') : start;
                } else {
                    start = formatDateTime(event.start);
                    end = event.end ? formatDateTime(event.end) : start;
                }

                return {
                    start: start,
                    end: end
                };
            })
        };

        // 發送數據到伺服器
        $http({
            method: 'PUT',
            url: 'http://localhost:8080/serviceproduct',
            data: exportData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            console.log('資料已成功發送到伺服器', response);
            alert('資料已成功修改，將跳轉到您的訂單');
            window.location.href = '/vsCode檔案/伊倫/TeamProject-前端皆未完成/orderlist.html';
        }, function (error) {
            console.error('發送資料時發生錯誤', error);
            alert('發送資料時發生錯誤，請查看控制台以獲取更多信息。');
        });

        console.log('匯出的資料：', JSON.stringify(exportData, null, 2));
    };
});