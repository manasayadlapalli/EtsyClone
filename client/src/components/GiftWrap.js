import React, { Component } from "react";
import { render } from "react-dom";
import { Checkbox } from "antd";

export class GiftWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: []
    };
  }

  render() {
    const CheckboxGroup = Checkbox.Group;
    return (
      <div className="App">
        <CheckboxGroup onChange={(value) => this.setState({ checked: value })}>
          <Checkbox value="1">
            Gift wrap?
            {this.state.checked.indexOf("1") !== -1 ? (
              <input type={text}></input>
            ) : null}
          </Checkbox>
        </CheckboxGroup>
      </div>
    );
  }
}

render(<GiftWrap />, document.getElementById("root"));
