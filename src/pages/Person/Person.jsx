import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { CircularProgress, Grid } from "@material-ui/core";

function Person() {
  const [crnPerson, setCrnPerson] = useState([]);
  const STARWARS_API_URL = process.env.REACT_APP_STARWARS_API_URL;
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    let url = window.location.href
    url = url.split("/")
    let personId  = url[url.length - 1]
    var config = {
      method: "get",
      url: `${STARWARS_API_URL}people/${personId}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        setCrnPerson(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setIsloading(false);
      });
  }, [STARWARS_API_URL]);
  return (
    <>
      {isloading && (
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      )}
      {!isloading && <Grid style={{color:"white"}}>Hai</Grid>}
    </>
  );
}

export { Person };
