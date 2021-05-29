import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import { CircularProgress, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import starwars from "./star-wars-logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Person() {
  const [crnPerson, setCrnPerson] = useState([]);
  const classes = useStyles();
  const STARWARS_API_URL = process.env.REACT_APP_STARWARS_API_URL;
  const [isloading, setIsloading] = useState(true);
  useEffect(() => {
    let url = window.location.href;
    url = url.split("/");
    let personId = url[url.length - 1];
    var config = {
      method: "get",
      url: `${STARWARS_API_URL}people/${personId}`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        setCrnPerson(response.data);
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        <Grid item>
          {isloading ? (
            <CircularProgress />
          ) : (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={starwars}
                  title="star wars"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {crnPerson.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Born at {crnPerson.birth_year} {crnPerson.eye_color} eyes{" "}
                    {crnPerson.height} heighted and color of hair{" "}
                    {crnPerson.hair_color}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Films</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {crnPerson.films.length > 0 &&
                    crnPerson.films.map((ele, ind) => (
                      <div key={ind} style={{ marginTop: "10px" }}>
                        <a
                          href={ele}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={ind}
                        >
                          Film {ind + 1}
                        </a>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Star Ships
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {crnPerson.starships.length > 0 &&
                    crnPerson.starships.map((ele, ind) => (
                      <div style={{ marginTop: "10px" }} key={ind}>
                        <a
                          href={ele}
                          target="_blank"
                          rel="noopener noreferrer"
                          key={ind}
                        >
                          Ship {ind + 1}
                        </a>
                      </div>
                    ))}
                </AccordionDetails>
              </Accordion>
            </Card>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export { Person };
