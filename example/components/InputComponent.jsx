import React, { Component } from "react";
import {updateStore, getId} from '../../galinka';
import {toDosStore} from '../storeNames';

export default class InputComponent extends Component {
    state = {
        value: '',
    };

    inputHandler = (value) => {
        const data = {
            id: getId(),
            data: value,
        };
        updateStore(toDosStore.add, data);
        this.setState({ value: '' })
    };

    change = ({ target }) => {
        const { value } = target;
        this.setState({ value })
    };

    render = () => {
        // console.log('rendering INPUT');
        const input = <input type="text" onChange={this.change} value={this.state.value}/>
        const btn = <div className="btn btn-success" onClick={() => this.inputHandler(this.state.value)}>ADD</div>
        return (
            <React.Fragment>
                <div>input1</div>
                {input}
                {btn}
            </React.Fragment>
        );

    }
}
