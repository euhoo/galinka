const func2 = () => {
	const module1 = new Galinka();
	module1.setState('module1', { 'someModule1Data': ['this is data from module 1', '123'] });
	const data = module1.getState();
	console.log(data);
};
func2();