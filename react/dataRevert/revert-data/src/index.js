import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import Revert from "./revert";
import RevertMui from "./revertMui";
import { Grid } from "@mui/material";

function App() {
  return (
    <div>
      <h1>距离单位转换器</h1>
      <Router>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={4}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/Revert">
              <Button variant="contained" size="large">
                原始
              </Button>
            </Link>
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/RevertMui">
              <Button variant="contained" size="large">
                MUI
              </Button>
            </Link>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Route path="/Revert" component={Revert} />
        <Route path="/RevertMui" component={RevertMui} />
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
