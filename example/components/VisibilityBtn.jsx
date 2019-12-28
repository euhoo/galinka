import React, { Component } from "react";
import G from '../../build/galinka';

let inputVisibilityStore;
export default class VisibilityBtn extends Component {

    componentDidMount = () => {
        const { storeName } = this.props;
        inputVisibilityStore = G(storeName);
    }

    changeVisibility = () => {
       inputVisibilityStore.updateStore('changeVisibility');
    }
    render() {
        const {storeName} = this.props;
        const isInvisible = inputVisibilityStore && inputVisibilityStore.getStore ? inputVisibilityStore.getStore(storeName) : false;  
        const title = isInvisible ? 'open' : 'close';
        return (<div className="btn btn-warning  my-change-btn" onClick={this.changeVisibility}>{title}</div>)
    }
}