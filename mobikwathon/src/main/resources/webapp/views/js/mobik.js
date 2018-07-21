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
    $scope.location;
    $scope.institution;
    $scope.name;
    $scope.id;
    $scope.flag=0;
    $scope.institutionSelectMap;
    $scope.locationSelectMap;
    $scope.activate=function(i){
        if(i==1)
           $scope.flag=1;
        else
        {
            $scope.flag=2;
            alert("Work in progress");
            }
        };

      $scope.check=function() {


          if ($scope.flag == 1)
              return true;
          else
              return false;
      };

     $scope.afterInstitutionSelect=function(){

          if($scope.institution!="")
              $scope.institutionSelectMap=true;

          else
              $scope.institutionSelectMap=false;
          };

     $scope.afteLocationSelect=function(){

         if($scope.location!="")
             $scope.locationSelectMap=true;
         else
             $scope.locationSelectMap=false;

         }


       $scope.submit=function(){

         if($scope.name=="")
         {
             alert("name is empty");
             return ;

         }
           if($scope.location=="")
           {
               alert("name is empty");
               return ;

           }
           if($scope.id=="")
           {
               alert("name is empty");
               return ;

           }

           if($scope.institution=="")
           {
               alert("name is empty");
               return ;

           }

           var form_data={"institution":$scope.institution,"location":$scope.location,"name":$scope.name,"rollnumber":$scope.id};
            kycService.submit_data(form_data);


            }








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





}]);


kycApp.service("kycService", ["$http", "kycUtils", function ($http, kycUtils,FileSaver) {
    var service = new function () {

        return {

            submit_data: function (data_form) {
                return $http(
                    {

                        method: 'POST',
                        url: kycUtils.buildUrl("payDetails"),
                        data: JSON.stringify(data_form)
                    }
                )
                    .success(function (response) {

                        if (response.success)
                            alert(response.data);
                        else
                            alert("SOmething went wrong");
                        return response.success;
                    });
            },


        };
    };
        return service;
}]);

kycApp.service("kycUtils", [function () {
    var utils = new function () {

        return {
            buildUrl: function (url) {
                return "/mobikwathon/" + url;
            },
            popupOpen: function () {
            }
        };
    };
    return utils;
}]);



