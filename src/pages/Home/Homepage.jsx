import React from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { Grid } from "@material-ui/core";
import { SearchBar } from "./SearchBar";

function HomePage() {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <img src={logo} alt="Star Wars Logo" className="star_wars_title" />
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <SearchBar />
      </Grid>
    </Grid>
  );
}

export { HomePage };
