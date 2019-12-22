import React, { Component } from "react";
import G from '../../build/galinka';

const inputStore = G('toDos');

export default class ToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () => {
        inputStore.addStateFunc(this.setState, 'toDos');
    };

    render() {
        console.log('rendering TODOS2');
        const data = inputStore.getStore();
        const toDos = data ? data.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> Todo2</div>
                <ul>{toDos}</ul>
            </React.Fragment>
        )
    }
}
