import React, { Component } from "react";
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
	constructor() {
		if (!this.__proto__.G) this.init();
	}

	addStoreConstructors = (arrOfConstructors, storeName) => {
		// [['type1', func1], ['type2', func2]];

		arrOfConstructors.forEach(item => {
			const id = this.getId();
			const [type, updateFunc] = item;
			const storeConstructor = { updateFunc, id, storeName };
			this.__proto__.G.storeConstructors[type] ?
				this.__proto__.G.storeConstructors[type].push(storeConstructor)
				:
				this.__proto__.G.storeConstructors[type] = [storeConstructor]
		})
		// {'add':[funcObj1, funcobj2], 'del':[funcObj3]}
	};

	updateStore = (type, data) => {
		const arrOfStoreConstructors = this.__proto__.G.storeConstructors[type];
		arrOfStoreConstructors.forEach(storeConstructorObj => {
			const { updateFunc, storeName } = storeConstructorObj;
			const currentStore = this.__proto__.G.stores[storeName];
			this.__proto__.G.stores[storeName] = updateFunc(data, currentStore);
			this.reRender(this.__proto__.G.renderFuncs, storeName);
		})
	};

	init = () => {
		this.__proto__.G = {
			stores: {},
			storeConstructors: {},
			currentId: 1,
			renderFuncs: {},
			settings: {
				isHistory: false,
			},
		};
	};

	getStore = (storeName) => this.__proto__.G.stores[storeName];

	getAllStores = () => this.__proto__.G.stores;

	delProperty = (obj, id) => {
		// в будущем реализовать что-то попроизводительнее
		delete obj[id];
	};

	getId = () => this.__proto__.G.currentId++;

	reRender = (renderFuncsObj = {}, name) => {
		const arrOfFuncObjs = Object.values(renderFuncsObj);
		arrOfFuncObjs.forEach(({ stateFunc, storeName }) => {
			if (storeName === name) {
				stateFunc();
			}
		});
	};

	addRenderFunc = (stateFunc, storeName, id) => this.__proto__.G.renderFuncs[id] = { stateFunc, storeName, id };
	delRenderFunc = (id) => this.delProperty(this.__proto__.G.renderFuncs, id)

}

const G = new Galinka();

export default (name) => new Galinka(name);

export const addStoreConstructors = (arrOfConstructors, storeName) => G.addStoreConstructors(arrOfConstructors, storeName);
export const updateStore = (type, data) => G.updateStore(type, data);
export const getId = () => G.getId();

export const connect = (WrappedComponent, storeName) => {
	const id = G.getId();
	class Wrapper extends Component {
		constructor(componentProps) {
			super();
			this.settedProps = componentProps.props || {};
			// this.settedProps[storeName] = store;	
		}
		componentDidMount = () => G.addRenderFunc(() => { this.setState({}) }, storeName, id);
		componentWillUnmount = () => G.delRenderFunc(id);
		render() {
			const store = G.getStore(storeName) || null;
			const allProps = {...this.settedProps, [storeName]: store}
			return (
				<WrappedComponent {...allProps} />
			)
		}
	}
	return Wrapper
}
