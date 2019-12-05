
angular.module('App', [])
.controller('MyAppCtrl', ['$scope',
	($scope) => {
		$scope.componentTitle ='Компонент1';
		const ctrl1Galinka = new Galinka();
		const module1State = ctrl1Galinka.getState('module1');
		const module2State = ctrl1Galinka.getState('module2');
		// ctrl1Galinka.setState('ctrl1', {'input': ''});
		// ctrl1Galinka.setState('ctrl1', {'input2': ''});
		const data1 = module1State['someModule1Data'];
		const data2 = module2State['m2'];
		$scope.data1Obj = data1;
		$scope.data2 = data2;
		$scope.allAppState = ctrl1Galinka.getState();
		$scope.setInput1 = model => {
			ctrl1Galinka.setState('ctrl1', {'input1': model});
		};
		$scope.setInput2 = model => {
			ctrl1Galinka.setState('ctrl1', {'input2': model});
		};
	}])
	.controller('MyAppCtrl2', ['$scope',
	($scope) => {
		$scope.componentTitle ='Компонент2';
		const ctrl2Galinka = new Galinka();
		$scope.allAppState = ctrl2Galinka.getState();
	}]);