// import clonedeep from 'lodash.clonedeep';
/*
1.Остается вопрос, стоит ли оставить везде обращение через __proto__ или можно убрать.
Пока что вернул везде, чтобы избежать намеренного совпадения, если пользователь вдруг создаст у класса Galinka свойство galinka.
Вообще говоря, такое поведение противоречит здравому смыслу, поэтому, в будущем, вероятно, уберу __proto__ везде

2.console.log сейчас оставил для history для наглядного отображения истории,
а так же поставил console.log в рендеры компонентов для того, чтобы убедиться в том, что рендеринг будет вызываться только для тех компонентов,
в которых используются обновленные данные

3.Сейчас ре-рендеринг основан просто на запуске переданной в callback функции setState с ненужными данными. Как вариант можно обойтись без
reducers, а в коллбэке передавать функцию, изменяющую store и дальнейший вызов setState с необходимыми данными. Далее в рендере данные брыть
сразу из state компонента. Мне этот способ не нравится по причине излишнего усложнения работы с хранилищем и смешивания данных, которые компонент
может сам хранить в своем state с данными, которые туда будет дописывать galinka. Вариант с вызовом setState из callback при изменении данных кажется
мне хоть и костылем, но костылем,не добавляющем лишней сложности. К тому же таким образом я использую уже оптимизированный метод react для перерисовки.

4.History работает, но пока заккоментировал его.Причина - импорт lodash. необходимо настраивать сборку, чтобы получать один минифицированный
корректный файл. Пока не настроил - выключил. сейчас это не первоочередное.

*/

class Galinka {
	constructor(storeName) {
		this.storeName = storeName;
		if (!this.__proto__.G) this.init();
	}

	init = () => {
		this.__proto__.G = {
			stores: {},
			history: [],
			reducers: {},
			renderFuncs: {},
			currentId: 1,
			settings: {
				isHistory: false,
			},
		};
	};

	delProperty = (obj, id) => {
		// в будущем реализовать что-то попроизводительнее
		delete obj[id];
	};

	addId = () => this.__proto__.G.currentId++;
	enableHistory = () => this.__proto__.G.settings.isHistory = true;
	disableHistory = () => this.__proto__.G.settings.isHistory = false;

	reRender = (renderFuncsObj = {}) => {
		const arrOfFuncObjs = Object.values(renderFuncsObj);
		arrOfFuncObjs.forEach(({ stateFunc, storeName }) => {
			if (storeName === this.storeName || storeName === '') {
				stateFunc();
			}
			if (storeName === '') {
				//создание инстанса без имени - ошибка
				throw new Error('You made instance of Galinka and execute addRenderFunc method without store name')
			}
		});
	};

	addReducer = ({ type, updateFunc }) => {
		const id = this.addId();
		this.__proto__.G.reducers[this.storeName] = this.__proto__.G.reducers[this.storeName] ?
			{ ...this.__proto__.G.reducers[this.storeName], [type]: updateFunc, id }
			:
			{ [type]: updateFunc, id };
	};

	addReducers = (arrOfreducers) => arrOfreducers.forEach(this.addReducer);

	addRenderFunc = (stateFunc, storeName = this.storeName || '', id = 'notSetted') => this.__proto__.G.renderFuncs[id] = { stateFunc, storeName, id };
	delRenderFunc = (id) => this.delProperty(this.__proto__.G.renderFuncs, id)

	updateStore = (type, data) => {
		const reducer = this.__proto__.G.reducers[this.storeName][type];
		const currentStore = this.__proto__.G.stores[this.storeName];
		this.__proto__.G.stores[this.storeName] = reducer(data, currentStore);
		if (this.__proto__.G.settings.isHistory) {
			/* отключаю пока history */
			// this.addToHistory(this.__proto__.G.stores);
			// const history = this.getFullHistory();
			// console.log(history);
		}
		this.reRender(this.__proto__.G.renderFuncs);
	};

	getStore = (storeName = this.storeName) => {
		if (storeName) {
			return this.__proto__.G.stores[storeName];
		} else {
			//создание инстанса без имени - ошибка
			throw new Error('You made instance of Galinka and execute getStore method without store name')
		}
	};

	getAllStores = () => this.__proto__.G.stores;

	/* отключаю пока history
addToHistory = (currentAppStores) => {
	if (!this.__proto__.G.settings.isHistory) {
		throw new Error('History is disabled. For using this method please execute enableHistory method at Galinka settings or any instance of Galinka');
	}
	const current = clonedeep(currentAppStores);
	this.__proto__.G.history = [...this.__proto__.G.history, current];
};


	getFullHistory = () => {
		if (!this.__proto__.G.settings.isHistory) {
			throw new Error('History is disabled. For using this method please execute enableHistory method at Galinka settings or any instance of Galinka');
		};
		return this.__proto__.G.history;
	};
	*/
}
export default (name) => new Galinka(name);
