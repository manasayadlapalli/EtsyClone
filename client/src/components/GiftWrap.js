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
    console.log(this.state.checked, "checked items");
    return (
      <div className="App">
        <CheckboxGroup onChange={(value) => this.setState({ checked: value })}>
          <Checkbox value="1">
            Gift wrap?
            {this.state.checked.indexOf("1") !== -1 ? (
              <h6> Gift packaging added!</h6>
            ) : null}
          </Checkbox>
        </CheckboxGroup>
      </div>
    );
  }
}

render(<GiftWrap />, document.getElementById("root"));
