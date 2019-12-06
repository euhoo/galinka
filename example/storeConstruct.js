const GalinkaConstructor = new Galinka('InputComponent')

const add = (data, oldState) => [data, ...oldState];

const storeConstructorObj = {
	type:'add',
	func: add,
}

GalinkaConstructor.setStoreConstructor(storeConstructorObj);
