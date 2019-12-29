import React, { Component } from "react";
import InputComponent from './InputComponent.jsx';
import ToDos from './ToDos.jsx';
import AnotherInputComponent from './AnotherInputComponent.jsx';
import AnotherToDos from './AnotherToDos.jsx';
import ToDos2 from './ToDos2.jsx';
import G from '../../build/galinka';
import VisibilityBtn from './VisibilityBtn.jsx';

const storeId = 'anotherInputVisibility';

class MyComponent extends Component {

  render() {
    const isInvisible = G.getStore(storeId);
    return (
      <div className="element-wrapper">
        <div className="element element-left">
          <InputComponent />
          <ToDos />
          <ToDos2 />
        </div>
        {isInvisible && <VisibilityBtn storeName={storeId} />}
        {!isInvisible &&
          <div className="element element-right">
            <AnotherInputComponent />
            <AnotherToDos />
          </div>
        }
      </div>
    );
  }
}
export default G(MyComponent, [storeId]);