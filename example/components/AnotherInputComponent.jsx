import React, { Component } from "react";
import Galinka from '../../galinka';
import uniqueid from 'lodash.uniqueid';

const inputStore = new Galinka('anotherToDos');

export default class AnotherInputComponent extends Component {
    state = {
        value: '',
    };

    inputHandler = (value) => {
        const data = {
            id: uniqueid(),
            data: value,
        };
        inputStore.updateStore('add', data);
        this.setState({ value: '' })
    };

    change = ({ target }) => {
        const { value } = target;
        this.setState({ value })
    };

    render = () => {
        console.log('rendering ANOTHER INPUT');
        const input = <input type="text" onChange={this.change} value={this.state.value}/>
        const btn = <div className="btn btn-success" onClick={() => this.inputHandler(this.state.value)}>ADD</div>
        return (
            <React.Fragment>
                <div>another input</div>
                {input}
                {btn}
            </React.Fragment>
        );

    }
}
