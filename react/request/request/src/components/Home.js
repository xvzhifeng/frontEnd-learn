import React from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <h1>fetch and axios</h1>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Link to="/Axios">
              <Button>Axios</Button>
            </Link>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Link to="/Fetch">
              <Button>Fecth</Button>
            </Link>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};
