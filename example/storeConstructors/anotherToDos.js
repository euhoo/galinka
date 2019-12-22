import G from '../../build/galinka';

export default () => {

	const thisStoreStructure = [
		{
			id:'someUniqueId',
			data:'some string data',
		},
		{
			id:'someAnotherUniqueId',
			data:'some another string data',
		},
	];

	const toDos = G('anotherToDos');

	const del = (id, oldState = []) => oldState.filter(item => !(item.id === id));
	const add = (data, oldState = []) => [data, ...oldState];
	toDos.addStoreConstructors([{ type: 'add', updateFunc: add }, { type: 'del', updateFunc: del }]);
};
