import React, { Component } from "react";
import Galinka from '../../galinka';

const inputStore = new Galinka('toDos');

export default class ToDos extends Component {
    state = {
        data:'',
    }
    componentDidMount = () => {
        const id = setInterval(() => {
            const data = inputStore.getStore();
            if(data) this.setState({ data });
        }, 100);
        this.setState({ id });
    }

    componentWillUnmount = () => {
        const { id } = this.state;
        clearInterval(id);
    }

    render() {
       const { data } = this.state;
        
        const toDos = data ? data.map(item => <div key={item.id}>{item.data}</div>) : null;
        return (
            <div>
                {toDos}
            </div>
        )
    }
}