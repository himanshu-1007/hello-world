    <%@ page contentType="text/html;charset=UTF-8" language="java" %>
        <html>

        <head>
        <title>Payment Portal</title>
        <script src="/webapp/views/js/mobik.js"></script>
        </head>
        <body ng-app="kycApp">


        <div ng-controller="kycController">

        <div class="container box-shadow--3dp">
        <input type="radio" ng-change="activate(1)">PayFees &nbsp; &nbsp; &nbsp; &nbsp;

        <input type ="radio" ng-change="activate(2)">Registration Form &nbsp;

        <table st-table="paymentdata" st-safe-src="data" ng-if="check()" class="table" border=0>

        <tr>
        <td>
        <label>Institution</label>
        <br/>
        <input type="text" ng-model="institution" ng-change="afterInstitutionSelect()">
        </td>
        </tr>

        <tr>
        <td>
        <label ng-if="institutionSelectMap==true">Location</label>
        <br/>
        <input type="text" ng-model="location" ng-if="institutionSelectMap==true" ng-change="afterLocationSelect()">
        </td>
        </tr>

        <tr>
        <td>
        <label ng-if="institutionSelectMap==true && locationSelectMap==true">Name</label>
        <br/>
        <input type="text" ng-model="name" ng-if="institutionSelectMap==true && locationSelectMap==true">
        </td>
        </tr>

        <tr>
        <td>
        <label ng-if="institutionSelectMap==true && locationSelectMap==true">ID</label>
        <input type="text" ng-model="id" ng-if="institutionSelectMap==true && locationSelectMap==true">
        </td>
        </tr>

        <tr>
        <td>
        <button type="button" ng-model="id" ng-if="institutionSelectMap==true && locationSelectMap==true" class="btn btn-primary btn-sm form-control" ng-click="submit()"> Submit</button>
        </td>
        </tr>
        </table>

        </div>
        </div>
        </body>
        </html>
