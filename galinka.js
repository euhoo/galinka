import React, { Component } from "react";

class Galinka {
	constructor() {
		if (!this.__proto__.G) this.init();
	}

	addReducers = (arrOfReducers, storeName) => arrOfReducers.forEach(item => {
		const id = this.getId();
		const [type, updateFunc] = item;
		const reducer = { updateFunc, id, storeName };
		this.__proto__.G.reducers[type] ? this.__proto__.G.reducers[type].push(reducer) : this.__proto__.G.reducers[type] = [reducer]
	});

	updateStore = (type, data) => this.__proto__.G.reducers[type].forEach(reducersObj => {
		const { updateFunc, storeName } = reducersObj;
		const currentStore = this.__proto__.G.stores[storeName];
		this.__proto__.G.stores[storeName] = updateFunc(data, currentStore);
		this.reRender(this.__proto__.G.renderFuncs, storeName);
	});

	init = () => this.__proto__.G = {
		stores: {},
		reducers: {},
		currentId: 1,
		renderFuncs: {},
	};

	getStore = (storeName) => this.__proto__.G.stores[storeName];
	getAllStores = () => this.__proto__.G.stores;
	delProperty = (obj, id) => delete obj[id];	// в будущем реализовать что-то попроизводительнее
	getId = () => this.__proto__.G.currentId++;
	addRenderFunc = (stateFunc, storeName, id) => this.__proto__.G.renderFuncs[id] = { stateFunc, storeName, id };
	delRenderFunc = (id) => this.delProperty(this.__proto__.G.renderFuncs, id)

	reRender = (renderFuncsObj = {}, name) => {
		const arrOfFuncObjs = Object.values(renderFuncsObj);
		arrOfFuncObjs.forEach(({ stateFunc, storeName }) => {
			if (storeName === name) {
				stateFunc();
			}
		});
	};
}
export default (name) => new Galinka(name);

const G = new Galinka();

export const addReducers = (arrOfReducers, storeName) => G.addReducers(arrOfReducers, storeName);
export const updateStore = (type, data) => G.updateStore(type, data);
export const getId = () => G.getId();

export const connect = (WrappedComponent, storeName) => class Wrapper extends Component {
	constructor(wrappedComponentProps) {
		super();
		this.wrappedComponentProps = wrappedComponentProps.props || {};
		this.id = G.getId();
	}
	componentDidMount = () => G.addRenderFunc(() => { this.setState({}) }, storeName, this.id);
	componentWillUnmount = () => G.delRenderFunc(this.id);
	render = () => <WrappedComponent {...{ ...this.wrappedComponentProps, [storeName]: G.getStore(storeName) }} />
}
