import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Input(props) {
  return (
    <input
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className="inputView"
    ></input>
  );
}

class Select extends React.Component {
  render() {
    return (
      <select
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onChange}
        className="selectView"
      >
        <option value="cm">cm</option>
        <option value="mm">mm</option>
        <option value="m">m</option>
      </select>
    );
  }
}
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "", selectFrom: "mm", selectTo: "mm", result: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleChangeSelect(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(name);
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // alert("提交的源数据: " + this.state.inputValue);
    let n = this.state.inputValue;
    if (this.state.selectFrom == "cm") {
      n = n * 10;
    } else if (this.state.selectFrom == "m") {
      n = n * 100;
    }
    if (this.state.selectTo == "cm") {
      n = n / 10.0;
    } else if (this.state.selectTo == "m") {
      n = n / 100.0;
    }
    n += this.state.selectTo;
    this.setState({ result: n });
    event.preventDefault();
  }

  render() {
    return (
      <div className="content">
        <div className="resultView">
          <h1>{this.state.result}</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="fromView">
          <label>
            输入需要转换的值:
            <Input
              name="sourceNumber"
              value={this.state.inputValue}
              onChange={this.handleChange}
              className="inputView"
            />
          </label>
          <Select
            name="selectFrom"
            value={this.state.selectFrom}
            onChange={(e) => this.handleChangeSelect(e)}
          />
          <Select
            name="selectTo"
            value={this.state.selectTo}
            onChange={(e) => this.handleChangeSelect(e)}
          />
          <input type="submit" value="提交" className="buttonView"/>
        </form>
        
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <MainForm />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
