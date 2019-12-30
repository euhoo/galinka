import React, { Component } from "react";
import { connect } from '../../galinka';
import {anotherToDosStore} from '../storeNames';

class AnotherToDos extends Component {
    render() {
        // console.log('rendering ANOTHER TODOS');
        const store = this.props[anotherToDosStore.name];
        const toDosData = store ? store.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> another Todo</div>
                <ul>{toDosData}</ul>
            </React.Fragment>
        )
    }
}

export default connect(AnotherToDos, anotherToDosStore.name, React);