class Galinka {
	initGalina = () => {
		if(!this.__proto__.Galina) this.__proto__.Galina = {};
		if(!this.__proto__.GalinaHistory) this.__proto__.GalinaHistory = [];
		this.__proto__.isGalinaInited = true;
	}
	setState = (state, data) => {
		if(!this.__proto__.isGalinaInited) this.initGalina();
		const oldState = this.__proto__.Galina[state] ? this.__proto__.Galina[state] : {};
		const newState = { ...oldState, state };
		this.__proto__.Galina[state] = this.__proto__.Galina[state] ? {...this.__proto__.Galina[state], ...data} : { ...data };
		//добавлять здесь историю после того как корректно буду добавлять обновлять state
	}
	getState = (state) => {
		if(!this.__proto__.isGalinaInited) return console.error('Galina have not been inited and there is no state here. Please use Galina.setState() before')
		if(!state) return this.__proto__.Galina;
		return this.__proto__.Galina[state];
	}
	addHistory = (currentAppState) => {
		this.__proto__.GalinaHistory = [...this.__proto__.GalinaHistory, currentAppState];
	}
}