class Galinka {
	constructor(storeName) {
		this.storeName = storeName;
		if (!this.__proto__.isAppInited) this.initStoreApp();
	}

	

	setState = (state, data) => {
		const oldState = this.__proto__.stores[state] ? this.__proto__.stores[state] : {};
		const newState = { ...oldState, state };
		this.__proto__.stores[state] = this.__proto__.stores[state] ? { ...this.__proto__.stores[state], ...data } : { ...data };
		//добавлять здесь историю после того как корректно буду добавлять обновлять state
	}

	getState = (state) => {
		if (!this.__proto__.isAppInited) return console.error('Galinka have not been inited and there is no state here. Please use Galinka.setState() before')
		if (!state) return this.__proto__.stores;
		return this.__proto__.stores[state];
	}

	setStore = (type, newStore) => {
		const storeConstructor = this.storeConstructors[this.storeName][type];
		const updatedStore = storeConstructor(newStore);
		const updatedStores = this.__protp__.stores.map(item => {
			if (item.type === type) return updatedStore;
			return item;
		});
		this.__proto__.stores = updatedStores;
	}

	setStoreConstructor = (storeConstructorObj) => {
		//здесь все конструкторы Store пишутся в прототип
		const { type, func } = storeConstructorObj;
		this.storeConstructors[this.storeName] = this.storeConstructors[this.storeName] ?
			{ ...this.storeConstructors[storeName], [type]: func }
			:
			{ [type]: func };
			console.log(this.__proto__.storeConstructors)
	}

	addHistory = (currentAppState) => {
		this.__proto__.history = [...this.__proto__.history, currentAppState];
	}

	initStoreApp = () => {
		if (!this.__proto__.stores) this.__proto__.stores = {};
		if (!this.__proto__.history) this.__proto__.history = [];
		if (!this.__proto__.storeConstructors) this.__proto__.storeConstructors = {};
		this.__proto__.isAppInited = true;
	}
}