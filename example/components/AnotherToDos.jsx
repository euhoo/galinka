import React, { Component } from "react";
import G from '../../build/galinka';
import VisibilityBtn from './VisibilityBtn.jsx';

const inputStore = G('anotherToDos');
const id = 'anotherToDoID1';

export default class AnotherToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () =>  inputStore.addRenderFunc(() => this.setState({}), 'anotherToDos', id);

    componentWillUnmount =() => inputStore.delRenderFunc(id);

    render() {
        console.log('rendering ANOTHER TODOS');
        const data = inputStore.getStore();
        const toDos = data ? data.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <VisibilityBtn storeName='anotherInputVisibility'/>
                <div> another Todo</div>
                <ul>{toDos}</ul>
            </React.Fragment>
        )
    }
}
