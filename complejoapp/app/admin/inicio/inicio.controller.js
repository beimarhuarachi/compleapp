angular
	.module('complejo.admin')
	.controller('InicioController', InicioController);

InicioController.$inject = ['$scope', '$log'];

function InicioController($scope, $log) {
	var vm = this;

	vm.complejo = $scope.complejo;
}