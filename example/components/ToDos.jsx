import React, { Component } from "react";
import Galinka from '../../galinka';

const inputStore = new Galinka('toDos');

export default class ToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () => {
        inputStore.addStateFunc(this.setState, 'toDos');
    };

    render() {
        console.log('rendering TODOS');
        const data = inputStore.getStore();
        const toDos = data ? data.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> Todo1</div>
                <ul>{toDos}</ul>
            </React.Fragment>
        )
    }
}
