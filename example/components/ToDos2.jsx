import React, { Component } from "react";
import { connect } from '../../galinka';
import {toDosStore} from '../storeNames';

class ToDos extends Component {
    render() {
        // console.log('rendering TODOS2');
        const store = this.props[toDosStore.name];
        const toDosData = store ? store.map(item => <li key={item.id}>{item.data}</li>) : null;
        return (
            <React.Fragment>
                <div> Todo2</div>
                <ul>{toDosData}</ul>
            </React.Fragment>
        )
    }
}
export default connect(ToDos, toDosStore.name); 
