export default class Galinka {
	constructor(storeName) {
		this.storeName = storeName;
		if (!this.__proto__.isAppInited) this.initStoreApp();
	}
	updateStore = (type, data) => {
		const storeConstructor = this.storeConstructors[this.storeName][type];
		const currentStore = this.__proto__.stores[this.storeName];
		const updatedStore = storeConstructor(data, currentStore);
		this.__proto__.stores[this.storeName] =  updatedStore;
		this.addToHistory(this.__proto__.stores)
	}
	getStore = (storeName = this.storeName) => {
		if(storeName) return this.__proto__.stores[storeName];
	}
	getAllStores = () => this.__proto__.stores;

	addStoreConstructor = (storeConstructorObj) => {
		//здесь все конструкторы Store пишутся в прототип
		const { type, updateFunc } = storeConstructorObj;
		this.storeConstructors[this.storeName] = this.storeConstructors[this.storeName] ?
			{ ...this.storeConstructors[this.storeName], [type]: updateFunc }
			:
			{ [type]: updateFunc };
	}

	addStoreConstructors = (arrOfStoreConstructors) => {
		arrOfStoreConstructors.forEach((item) => this.addStoreConstructor(item));
	}

	addToHistory = (currentAppStores) => {
		this.__proto__.history = [...this.__proto__.history, currentAppStores];
	}

	initStoreApp = () => {
		if (!this.__proto__.stores) this.__proto__.stores = {};
		if (!this.__proto__.history) this.__proto__.history = [];
		if (!this.__proto__.storeConstructors) this.__proto__.storeConstructors = {};
		this.__proto__.isAppInited = true;
	}

}