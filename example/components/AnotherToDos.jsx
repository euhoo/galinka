import React, { Component } from "react";
import Galinka from '../../galinka';

const inputStore = new Galinka('anotherToDos');

export default class AnotherToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () => {
        const stateFunc = () => {
            this.setState({ demoValue: '' })
        };
        inputStore.addStateFunc(stateFunc, 'anotherToDos');
    };


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
