import G from '../../build/galinka';

export default () => {

    const thisStoreStructure = false;
    
    const inputVisibilityStore = G('anotherInputVisibility');
    
    const changeVisibility = (oldState = false, currentState = oldState) => !currentState;
    inputVisibilityStore.addReducer({ type: 'changeVisibility', updateFunc: changeVisibility }); 
}