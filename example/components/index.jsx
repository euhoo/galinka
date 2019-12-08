import React, { Component } from "react";
import InputComponent from './InputComponent.jsx';
import ToDos from './ToDos.jsx';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <InputComponent />
        <ToDos />
      </div>
    );
  }
}
export default MyComponent;