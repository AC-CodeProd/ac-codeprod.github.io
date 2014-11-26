
"use strict";var Remaining_Capital=angular.module("Remaining_Capital",["ngRoute","ngPaginate","ngScrollTop"]);Remaining_Capital.service("CalculatePaymentsService",function(){var _self=this;_self.getPayments=function(outstandingCapital,annualRate,totalPayments){var outstandingCapital=outstandingCapital,annualRate=annualRate,totalPayments=totalPayments,t=annualRate/12,m=outstandingCapital*t*Math.pow(1+t,totalPayments)/(Math.pow(1+t,totalPayments)-1),g=m-t*outstandingCapital,monthly=m,datas=[],data={maturity_number:0,outstanding_capital:outstandingCapital,monthly:monthly,real_gain:g};datas.push(data);for(var i=1,max=totalPayments;max>=i;i++)outstandingCapital=datas[i-1].outstanding_capital-g,g=m-t*outstandingCapital,data={maturity_number:i,outstanding_capital:outstandingCapital,monthly:monthly,real_gain:g},datas.push(data);return datas}}),Remaining_Capital.controller("PageCtrl",function($rootScope,$scope,$route,CalculatePaymentsService){console.log("PageCtrl"),$scope.outstandingCapital=155e3,$scope.annualRate=.035,$scope.totalPayments=350,$scope.$watch("outstandingCapital + annualRate + totalPayments",function(){if(angular.isUndefined($scope.outstandingCapital)||angular.isUndefined($scope.annualRate)||angular.isUndefined($scope.totalPayments))$scope.datas=[];else{var outstandingCapital=angular.element(document.getElementById("outstanding-capital")),annualRate=angular.element(document.getElementById("annual-rate")),totalPayments=angular.element(document.getElementById("total-payments"));angular.isNumber($scope.outstandingCapital)?(outstandingCapital.parent().addClass("has-success"),outstandingCapital.parent().removeClass("has-error")):outstandingCapital.parent().addClass("has-error"),angular.isNumber($scope.annualRate)?(annualRate.parent().addClass("has-success"),annualRate.parent().removeClass("has-error")):annualRate.parent().addClass("has-error"),angular.isNumber($scope.totalPayments)?(totalPayments.parent().addClass("has-success"),totalPayments.parent().removeClass("has-error")):totalPayments.parent().addClass("has-error"),$scope.datas=CalculatePaymentsService.getPayments($scope.outstandingCapital,$scope.annualRate,$scope.totalPayments)}})});