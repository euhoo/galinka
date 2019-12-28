import React, { Component } from "react";
import G from '../../build/galinka';

const inputStore = G('toDos');
const id = 'toDosID';

export default class ToDos extends Component {
    state = {
        data: '',
    };
    componentDidMount = () => inputStore.addRenderFunc(() => this.setState({}), 'toDos', id);

    componentWillUnmount =() => inputStore.delRenderFunc(id);

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
