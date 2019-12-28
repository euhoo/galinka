import React, { Component } from "react";
import G from '../../build/galinka';

const inputStore = G('anotherToDos');

export default class AnotherToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () =>  inputStore.addStateFunc(() => this.setState({}), 'anotherToDos','anotherToDoID1');

    render() {
        console.log('rendering ANOTHER TODOS');
        const data = inputStore.getStore();
        const toDos = data ? data.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> another Todo</div>
                <ul>{toDos}</ul>
            </React.Fragment>
        )
    }
}
