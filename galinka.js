// import clonedeep from 'lodash.clonedeep';
/*
1.Остается вопрос, стоит ли оставить везде обращение через __proto__ или можно убрать.
Пока что вернул везде, чтобы избежать намеренного совпадения, если пользователь вдруг создаст у класса Galinka свойство galinka.
Вообще говоря, такое поведение противоречит здравому смыслу, поэтому, в будущем, вероятно, уберу __proto__ везде

2.console.log сейчас оставил для history для наглядного отображения истории,
а так же поставил console.log в рендеры компонентов для того, чтобы убедиться в том, что рендеринг будет вызываться только для тех компонентов,
в которых используются обновленные данные

3.Сейчас ре-рендеринг основан просто на запуске переданной в callback функции setState с ненужными данными. Как вариант можно обойтись без
storeConstructors, а в коллбэке передавать функцию, изменяющую store и дальнейший вызов setState с необходимыми данными. Далее в рендере данные брыть
сразу из state компонента. Мне этот способ не нравится по причине излишнего усложнения работы с хранилищем и смешивания данных, которые компонент
может сам хранить в своем state с данными, которые туда будет дописывать galinka. Вариант с вызовом setState из callback при изменении данных кажется
мне хоть и костылем, но костылем,не добавляющем лишней сложности. К тому же таким образом я использую уже оптимизированный метод react для перерисовки.

4.History работает, но пока заккоментировал его.Причина - импорт lodash. необходимо настраивать сборку, чтобы получать один минифицированный
корректный файл. Пока не настроил - выключил. сейчас это не первоочередное.

*/

 class Galinka {
	constructor(storeName) {
		this.storeName = storeName;
		if (!this.__proto__.galinka) this.initStoreApp();
	}

	updateStore = (type, data) => {
		const storeConstructor = this.__proto__.galinka.storeConstructors[this.storeName][type];
		const currentStore = this.__proto__.galinka.stores[this.storeName];
		const updatedStore = storeConstructor(data, currentStore);
		this.__proto__.galinka.stores[this.storeName] = updatedStore;
		if (this.__proto__.galinka.settings.isHistory) {
			/* отключаю пока history */
			// this.addToHistory(this.__proto__.galinka.stores);
			// const history = this.getFullHistory();
			// console.log(history);
		}
		this.executeStateFuncs(this.__proto__.galinka.stateFuncs);
	};

	enableHistory = () => {
		this.__proto__.galinka.settings.isHistory = true;
	};

	disableHistory = () => {
		this.__proto__.galinka.settings.isHistory = false;
	};

	executeStateFuncs = (arrOfFuncObjs = []) => {
		arrOfFuncObjs.forEach(funcObj => {
			const { stateFunc, storeName } = funcObj;
			if (storeName === this.storeName || storeName === '') {
				stateFunc();
			}
			if (storeName === '') {
				//создание инстанса без имени - ошибка
				throw new Error('You made instance of Galinka and execute addStateFunc method without store name')
			}
		});
	};

	getStore = (storeName = this.storeName) => {
		if (storeName) {
			return this.__proto__.galinka.stores[storeName];
		} else {
			//создание инстанса без имени - ошибка
			throw new Error('You made instance of Galinka and execute getStore method without store name')
		}
	};

	getAllStores = () => this.__proto__.galinka.stores;

	addStoreConstructor = (storeConstructorObj) => {
		const { type, updateFunc } = storeConstructorObj;
		this.__proto__.galinka.storeConstructors[this.storeName] = this.__proto__.galinka.storeConstructors[this.storeName] ?
			{ ...this.__proto__.galinka.storeConstructors[this.storeName], [type]: updateFunc, id: this.addId() }
			:
			{ [type]: updateFunc, id: this.addId() };
	};

	addStoreConstructors = (arrOfStoreConstructors) => {
		arrOfStoreConstructors.forEach((item) => this.addStoreConstructor(item));
	};

	initStoreApp = () => {
		this.__proto__.galinka = {
			stores: {},
			history: [],
			storeConstructors: {},
			stateFuncs: [],
			uniqueIdCounter: 0,
			settings: {
				isHistory: false,
			},
		};
	};

	addId = () => {
		this.__proto__.galinka.uniqueIdCounter += 1;
		return this.__proto__.galinka.uniqueIdCounter;
	};

	addStateFunc = (stateFunc, storeName = this.storeName || '') => this.__proto__.galinka.stateFuncs.push({ stateFunc, storeName, id: this.addId() });

	/* отключаю пока history
addToHistory = (currentAppStores) => {
	if (!this.__proto__.galinka.settings.isHistory) {
		throw new Error('History is disabled. For using this method please execute enableHistory method at Galinka settings or any instance of Galinka');
	}
	const current = clonedeep(currentAppStores);
	this.__proto__.galinka.history = [...this.__proto__.galinka.history, current];
};


	getFullHistory = () => {
		if (!this.__proto__.galinka.settings.isHistory) {
			throw new Error('History is disabled. For using this method please execute enableHistory method at Galinka settings or any instance of Galinka');
		};
		return this.__proto__.galinka.history;
	};
	*/
}
export default (name) => new Galinka(name);
