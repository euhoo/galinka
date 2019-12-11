import React, { Component } from "react";
import InputComponent from './InputComponent.jsx';
import ToDos from './ToDos.jsx';
import AnotherInputComponent from './AnotherInputComponent.jsx';
import AnotherToDos from './AnotherToDos.jsx';
import ToDos2 from './ToDos2.jsx';

class MyComponent extends Component {
  render() {
    return (
      <div className="element-wrapper">
        <div className="element element-left">
          <InputComponent />
          <ToDos />
          <ToDos2 />
        </div>
        <div className="element element-right">
          <AnotherInputComponent />
          <AnotherToDos />
        </div>
      </div>
    );
  }
}
export default MyComponent;