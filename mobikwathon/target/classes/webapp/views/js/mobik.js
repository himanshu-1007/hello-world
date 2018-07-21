var kycApp = angular.module("kycApp", ['smart-table']);
kycApp.controller('kycController', ["$scope",'$filter', "kycService", "kycUtils", function ($scope,$filter , kycService, kycUtils) {
    $scope.selectedTrans = {};
    $scope.userRole = 'ROLE_KYC';
    $scope.dateTo = new Date();
    $scope.dateFrom = new Date($scope.dateTo.getTime() - (1 * 24 * 3600000)).getTime();
    $scope.dateTo = new Date().getTime();
    $scope.timer = 1000;
    $scope.data = [];
    $scope.updateData = [];
    $scope.updateDisplayedData=[];
    $scope.requestType='ALL';
    $scope.requestStatus='ALL';
    $scope.panOptions = [{name: "YES", id: 0}, {name: "NO", id: 1}];
    $scope.searchOptions=['Request ID','Email','Cell'];

    $scope.statusOptions=['ALL','OTP_REQUESTED','BIOMETRIC_REQUESTED','OTP_VERIFIED','KYC_COMPLETE','CANCELLED'];

    $scope.typeOptions=['ALL','KYC','EKYC'];
    $scope.selectedSearch='Request ID';
    $scope.selectedStatusMap = {};
    $scope.selectedPanStatusMap={};
    $scope.selectedStatus={};
    $scope.selectedPanStatus={};
    $scope.summary={ACCEPTED:0,CANCELLED:0,RECEIVED:0,INITIATED:0,COMPLETE:0};
    $scope.displayedData=[];
    $scope.request;
    $scope.supportedCities={};
    $scope.newCity={name:"",kyc:"",ekyc:"",edit:false};

    $scope.getRole = function(){
        kycService.getRole().then(function (data) {
            $scope.userRole=data.role;
        }, function () {
            alert("User role not able to determine") ;
        });
    };

    $scope.globalSearch = function(param,option){
        kycService.globalSearch(param,option).then(function (data) {
            if( data==null || !data || data.success==false){
                alert(" Nothing found !!");return ;
            }

            $scope.data=data;
            $scope.displayedData=[].concat($scope.data);
        }, function () {
            alert("No record found") ;
        });

    };

    $scope.afterselect=function (requestId) {
        if($scope.selectedStatusMap[requestId].newStatus!=""){
            $scope.selectedStatus[requestId]=true;
        }else {
            $scope.selectedStatus[requestId] = false;
        }
    };
    $scope.afterpanselect=function(requestId){
        if($scope.selectedPanStatusMap[requestId]!=""){
            $scope.selectedPanStatus[requestId]=true;

        }else {
            $scope.selectedPanStatus[requestId] = false;
        }

    };

    $scope.changeKycStatus=function (requestId,kycVersion) {

        var d;
        for(var i=0;i<$scope.data.length;i++){
            d=$scope.data[i];
            if(d.requestId==requestId){
                break;
            }
        }

        var newStatus=$scope.selectedStatusMap[requestId].newStatus;

        if(newStatus==""){
            alert("please select a status to be updated!");
            return false;
        }

        var extraParam="";
        if(newStatus==="CANCELLED"){
            extraParam=prompt("Please provide a reason for cancellation");
            if(extraParam===""){
                alert("Error! No reason provided");
                return false;
            }
        }

        kycService.changeKycStatus(requestId,newStatus,extraParam,kycVersion);
    };

    $scope.kycComplete = function (requestId,flag) {

        var id=0;
        var version="V2";
        for(var i=0;i<$scope.data.length;i++){
            if($scope.data[i].requestId==requestId){
                id=i;
                version=$scope.data[i].kycVersion;
                break;
            }
        }

        var fd = new FormData();

        if(document.getElementById("kyc-complete-"+requestId).value == "") {
            alert("please select a file");
            return;
        }

        var panStatus=$scope.selectedPanStatusMap[requestId];

        if(panStatus==""){
            alert("please select a pan status to be updated!");
            return false;
        }
        fd.append("file", document.getElementById('kyc-complete-'+requestId).files[0] );
        fd.append("requestId", requestId);
        fd.append("version", version);
        fd.append("pan",panStatus)
        fd.append("flag",flag);
        kycService.kycComplete(fd).then(function (serverResponse) {
                if(serverResponse.data.success){
                    $scope.data[id].status="COMPLETED";
                    document.getElementById("kyc-complete-"+requestId).value= "";
                }
            }
            , function () {
                return;
            }
        );

    };

    $scope.uploadExcel = function () {

        var fd = new FormData();

        if(document.getElementById("bulkUpdateFile").value == "") {
            alert("please select a file");
            return;
        }

        fd.append("excelSheet", document.getElementById("bulkUpdateFile").files[0] );

        kycService.bulkUpdate(fd).then(function (response) {

            }
            , function () {
                return;
            }
        );
    };

    $scope.getExcel = function (start, end,status,type) {
        var endTime = new Date().getTime();
        var curTime = new Date(new Date() - (1 * 24 * 3600000)).getTime();
        start = (start == null ) ? curTime : (angular.isNumber(start) ? start : start.getTime() );
        end = (end == null) ? endTime : (angular.isNumber(end) ? end : new Date(new Date(end).getTime() + 1 * 24 * 3600000).getTime() );

        window.open(kycUtils.buildUrl("getExcel?startDate=" + start + "&endDate=" + end + "&requestType=" + type + "&requestStatus=" + status));

    };

    $scope.downloadfile=function(requestId){

        window.open(kycUtils.buildUrl("download?requestId=" + requestId));



    };

    $scope.getRole();

}]);


kycApp.service("kycService", ["$http", "kycUtils", function ($http, kycUtils,FileSaver) {
    var service = new function () {

        return {
            getRole : function(){
                return $http.post(kycUtils.buildUrl("getRole")).then(function (response) {
                    return response.data;
                }, function () {
                    return false;
                });
            },


            globalSearch : function(param,option){
                return $http.get(kycUtils.buildUrl("search?param=" + param+ "&option="+option )).then(function (response) {
                    return response.data.data;
                }, function () {
                    return false;
                });
            },

            load: function (start, end,type,status) {
                return $http.get(kycUtils.buildUrl("getRequests?startDate=" + start + "&endDate=" + end + "&requestType=" + type + "&requestStatus=" + status)).then(function (response) {
                    if(response.data.success)
                        return response.data.data;
                    alert(response.data.message.text)
                    return false;
                }, function () {
                    return false;
                });
            },

            kycComplete: function (formData) {
                return $http({
                    method: 'POST',
                    url: kycUtils.buildUrl("kycComplete"),
                    data: formData,
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                    .success(function (response) {
                        if(response.success)
                            alert("file submitted successfully");
                        else if(response.message != null && response.message.text != null)
                            alert(response.message.text + ", errorCode:" + response.message.code);
                        else
                            alert("something went wrong");
                        return response.success;
                    }).error(function () {
                        alert("Fail ");
                        return false;
                    });


            },

            changeKycStatus: function (requestId,newStatus,extraParam,kycVersion) {
                return $http({
                    method: 'POST',
                    url: kycUtils.buildUrl("updateKycStatus"),
                    data: {'requestId':requestId,'status':newStatus,'reason':extraParam,'version':kycVersion}
                })
                    .success(function (response) {
                        if(response.success)
                            alert(response.data);
                        else if(response.message != null && response.message.text != null)
                            alert(response.message.text + ", errorCode:" + response.message.code);
                        else
                            alert("something went wrong");
                        return response.success;
                    }).error(function () {
                        alert("Fail ");
                        return false;
                    });
            },


            bulkUpdate: function (formData) {
                return $http({
                    method: 'POST',
                    url: kycUtils.buildUrl("updateByExcel"),
                    data: formData,
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                    .success(function (response) {
                        alert("Success");
                        var filename='export.csv';
                        var csv=JSON2CSV(response.data);
                        csv= 'data:text/csv;charset=utf-8,' + escape(csv);
                        var link = document.createElement('a');
                        link.setAttribute('href', csv);
                        link.setAttribute('download', filename);
                        link.click();
                        return true;
                    }).error(function () {
                        alert("Fail ");
                        return false;
                    });


            }


        }
    };

    return service;
}]);

kycApp.service("kycUtils", [function () {
    var utils = new function () {

        return {
            buildUrl: function (url) {
                return "/conops/dashboard/kyc/newflow/" + url;
            },
            popupOpen: function () {
            }
        };
    };
    return utils;
}]);


function JSON2CSV(objArray) {
    var headers = ['Request ID', 'Status'];
    var variables = ['requestId', 'message'];


    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;

    var str = '';
    for (var i = 0; i < headers.length; i++) {
        str += headers[i] + ',';
    }
    str += '\r\n';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var j = 0; j < variables.length; j++) {
            if (line != '') line += ','
            line += array[i][variables[j]];
        }
        str += line + '\r\n';
    }

    return str;
}
