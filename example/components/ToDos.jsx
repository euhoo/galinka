import React, { Component } from "react";
import { connect } from '../../galinka';
import {toDosStore } from '../storeNames';

class ToDos extends Component {
    render() {
        // console.log('rendering TODOS');
        const toDos = this.props[toDosStore.name];
        const toDosData = toDos ? toDos.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> Todo1</div>
                <ul>{toDosData}</ul>
            </React.Fragment>
        )
    }
}
export default connect(ToDos, toDosStore.name, React);
