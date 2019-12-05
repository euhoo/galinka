const func1 = () => {
	const module2 = new Galinka();
	module2.setState('module2', {'m2': 'this is data from module 2'} );
	const data = module2.getState();
	console.log(data);
};
func1();