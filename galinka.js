export default class Galinka {
	constructor(storeName) {
		this.storeName = storeName;
		if (!this.__proto__.isAppInited) this.initStoreApp();
	}

	updateStore = (type, data) => {
		const storeConstructor = this.storeConstructors[this.storeName][type];
		const currentStore = this.__proto__.stores[this.storeName];
		const updatedStore = storeConstructor(data, currentStore);
		this.__proto__.stores[this.storeName] = updatedStore;
		this.addToHistory(this.__proto__.stores);
		this.executeStateFuncs(this.__proto__.stateFuncs);
	};

	executeStateFuncs = (arrOfFuncObjs = []) => {
		arrOfFuncObjs.forEach(funcObj => {
			if (funcObj.storeName === this.storeName) {
				const {stateFunc} = funcObj;
				stateFunc();
			}
			if (funcObj.storeName === '') {
				//	ToDo решить что делать в этой ситуации. Это ситуация, когда инстанс класса инициализирован без
				//	аргументом и addStateFunc вызван без второго аргумента
			}
		});
	};

	getStore = (storeName = this.storeName) => {
		if (storeName) {
			return this.__proto__.stores[storeName];
		} else {
			//ToDo подумать, что возвращать при случае отсутствия storeName. Это ситуация, когда инстанс класса инициализирован
			// без аргументов и getStore вызван тоже без аргументов
			return '';
		}
	};

	getAllStores = () => this.__proto__.stores;

	addStoreConstructor = (storeConstructorObj) => {
		const {type, updateFunc} = storeConstructorObj;
		const obj = {[type]: updateFunc, id: this.addId()};
		this.storeConstructors[this.storeName] = this.storeConstructors[this.storeName] ?
			{...this.storeConstructors[this.storeName], [type]: updateFunc, id: this.addId()}
			:
			{[type]: updateFunc, id: this.addId()};
		console.log(this.storeConstructors);
	};

	addStoreConstructors = (arrOfStoreConstructors) => {
		arrOfStoreConstructors.forEach((item) => this.addStoreConstructor(item));
	};

	addToHistory = (currentAppStores) => {
		this.__proto__.history = [...this.__proto__.history, currentAppStores];
	};

	getFullHistory = () => this.history;

	initStoreApp = () => {
		//ToDo поместить все объекты ниже в один
		if (!this.__proto__.stores) this.__proto__.stores = {};
		if (!this.__proto__.history) this.__proto__.history = [];
		if (!this.__proto__.storeConstructors) this.__proto__.storeConstructors = {};
		if (!this.__proto__.stateFuncs) this.__proto__.stateFuncs = [];
		if(!this.__proto__.uniqueIdCounter) this.__proto__.uniqueIdCounter = 1;
		this.__proto__.isAppInited = true;
	};

	addId = () => {
		this.__proto__.uniqueIdCounter += 1;
		return this.__proto__.uniqueIdCounter;
	};

	addStateFunc = (stateFunc, storeName = this.storeName || '') => this.__proto__.stateFuncs.push({ stateFunc, storeName, id:this.addId() });
}
