class Galinka {

	constructor(storeConstructors) {
		this.storeConstructors = storeConstructors;
	}

	initState = () => {
		if(!this.__proto__.Galinka) this.__proto__.Galinka = {};
		if(!this.__proto__.GalinkaHistory) this.__proto__.GalinkaHistory = [];
		this.__proto__.isGalinkaInited = true;
	}

	setState = (state, data) => {
		if(!this.__proto__.isGalinkaInited) this.initState();
		const oldState = this.__proto__.Galinka[state] ? this.__proto__.Galinka[state] : {};
		const newState = { ...oldState, state };
		this.__proto__.Galinka[state] = this.__proto__.Galinka[state] ? {...this.__proto__.Galinka[state], ...data} : { ...data };
		//добавлять здесь историю после того как корректно буду добавлять обновлять state
	}

	getState = (state) => {
		if(!this.__proto__.isGalinkaInited) return console.error('Galinka have not been inited and there is no state here. Please use Galinka.setState() before')
		if(!state) return this.__proto__.Galinka;
		return this.__proto__.Galinka[state];
	}

	setStore = (type, newStore) => {
		const storeConstructor = this.storeConstructors.find(constructor => {
			constructor.type === type;
		});
		const updatedStore = storeConstructor(newStore);
		const updatedStores = this.__protp__.GalinkaStores.map(item => {
			if(item.type === type) return updatedStore;
			return item;
		});
		this.__proto__.GalinkaStores = updatedStores;
	}

	setStoreConstructor = (type, storeConstructor) => {
		//прописать добавление конструкторов store по типу
	}

	addHistory = (currentAppState) => {
		this.__proto__.GalinkaHistory = [...this.__proto__.GalinkaHistory, currentAppState];
	}
}