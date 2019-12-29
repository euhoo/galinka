import {toDosStore} from '../storeNames';
import {addStoreConstructors} from '../../galinka';

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

export default () => {
	const del = (id, oldState = []) => oldState.filter(item => !(item.id === id));
	const add = (data, oldState = []) => [data, ...oldState];
	addStoreConstructors([[toDosStore.add, add], [toDosStore.del, del]], toDosStore.name);
};