const toDos = new Galinka('toDos'); //we need ta add name of Store here as a function argument

const add = (data, oldState = []) => [data, ...oldState];
const del = (id, oldState = []) => oldState.filter(item => !(item.id === id));

/* const add = {
	type: 'add',
	updateFunc: add,
};

const del = {
	type: 'del',
	updateFunc: del,
}; */

//toDos.addStoreConstructor(add);
//toDos.addStoreConstructor(del);
toDos.addStoreConstructors([{ type: 'add', updateFunc: add }, { type: 'add', updateFunc: del }]);

