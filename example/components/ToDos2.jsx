import React from "react";
import { connect } from '../../galinka';
import { toDosStore } from '../storeNames';

const ToDos = (props) => {
    const store = props[toDosStore.name];
    const toDosData = store ? store.map(item => <li key={item.id}>{item.data}</li>) : null;
    return (
        <React.Fragment>
            <div> Todo2</div>
            <ul>{toDosData}</ul>
        </React.Fragment>
    )
}
export default connect(ToDos, toDosStore.name); 
