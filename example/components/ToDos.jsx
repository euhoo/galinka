import React, { Component } from "react";
import Galinka from '../../galinka';

const inputStore = new Galinka('toDos');

export default class ToDos extends Component {
    state = {
        data:'',
    };
    componentDidMount = () => {
        const stateFunc = () => {
            this.setState({demoValue:''}, )
        };
        inputStore.addStateFunc(stateFunc, 'toDos');
    };


    render() {
        const data = inputStore.getStore();

        const toDos = data ? data.map(item => <div key={item.id}>{item.data}</div>) : null;
        return (
            <div>
                {toDos}
            </div>
        )
    }
}
