import React, { Component } from "react";
import Galinka from '../../galinka';
import { uniqueId } from 'lodash';

const inputStore = new Galinka('toDos');

export default class InputComponent extends Component {
    state = {
        value: '',
    };

    setInput = (value) => {
        const data = {
            id: uniqueId(),
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
        const input = <input type="text" onChange={this.change} value={this.state.value}/>
        const btn = <div className="btn btn-success" onClick={() => this.setInput(this.state.value)}>ADD</div>
        return (
            <React.Fragment>
                {input}
                {btn}
            </React.Fragment>
        );

    }
}
