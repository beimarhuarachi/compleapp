angular
	.module('complejo.common')
	.directive('cdSidebar', cdSideBar);

cdSideBar.$inject = [];

function cdSideBar() {
	var directiva = {
		restrict : 'AE',
		replace : true,
		templateUrl : 'common/sidebar-menu/sidebar-menu.view.html',
		scope : {
			funciones : '='
		}
	}

	return directiva;
}