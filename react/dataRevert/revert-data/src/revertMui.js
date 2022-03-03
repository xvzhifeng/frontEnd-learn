import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Grid } from "@mui/material";

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

class SelectX extends React.Component {
  render() {
    return (
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled-label">
            {this.props.label}
          </InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            label={this.props.label}
            name={this.props.name}
            value={this.props.value}
            onChange={this.props.onChange}
            // className="selectView"
          >
            <MenuItem value="cm">cm</MenuItem>
            <MenuItem value="mm">mm</MenuItem>
            <MenuItem value="m">m</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}
class MainForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      selectFrom: "mm",
      selectTo: "mm",
      result: "",
    };

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
      <div>
        <div className="revertMuiContent">
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Amount"
                id="fullWidth"
                name="sourceNumber"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <SelectX
                name="selectFrom"
                value={this.state.selectFrom}
                onChange={(e) => this.handleChangeSelect(e)}
                label="from"
              />
            </Grid>
            <Grid item xs={2}>
              <SelectX
                name="selectTo"
                value={this.state.selectTo}
                onChange={(e) => this.handleChangeSelect(e)}
                label="to"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="large"
                onClick={this.handleSubmit}
              >
                提交
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <div className="resultViewMui">
                <h1>{this.state.result}</h1>
              </div>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default function RevertMui() {
  return (
    <div>
      <MainForm />
    </div>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));
