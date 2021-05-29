import React, { useState, useRef, useEffect } from "react";
import searchIcon from "./search-solid.svg";
import spinIcon from "./load-icon-png-7948.png";
import deleteIcon from "./delete.svg";
import {
  InputBlock,
  SearchSpinnerIcon,
  SuggestionBlock,
  AllResult,
  Deleter,
  SpinDeleteHolder,
  BottomLine,
} from "./ComponentsStyled";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const [nameQuery, setNamequery] = useState("");
  const [throttledQuery, setThrottledQuery] = useState("");
  // const receivedQuery = useRef([
  //   {
  //     name: "Wilhuff Tarkin",
  //     height: "180",
  //     mass: "unknown",
  //     hair_color: "auburn, grey",
  //     skin_color: "fair",
  //     eye_color: "blue",
  //     birth_year: "64BBY",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/21/",
  //     films: ["http://swapi.dev/api/films/1/", "http://swapi.dev/api/films/6/"],
  //     species: [],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-10T16:26:56.138000Z",
  //     edited: "2014-12-20T21:17:50.330000Z",
  //     url: "http://swapi.dev/api/people/12/",
  //   },
  //   {
  //     name: "Boba Fett",
  //     height: "183",
  //     mass: "78.2",
  //     hair_color: "black",
  //     skin_color: "fair",
  //     eye_color: "brown",
  //     birth_year: "31.5BBY",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/10/",
  //     films: [
  //       "http://swapi.dev/api/films/2/",
  //       "http://swapi.dev/api/films/3/",
  //       "http://swapi.dev/api/films/5/",
  //     ],
  //     species: [],
  //     vehicles: [],
  //     starships: ["http://swapi.dev/api/starships/21/"],
  //     created: "2014-12-15T12:49:32.457000Z",
  //     edited: "2014-12-20T21:17:50.349000Z",
  //     url: "http://swapi.dev/api/people/22/",
  //   },
  //   {
  //     name: "Finis Valorum",
  //     height: "170",
  //     mass: "unknown",
  //     hair_color: "blond",
  //     skin_color: "fair",
  //     eye_color: "blue",
  //     birth_year: "91BBY",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/9/",
  //     films: ["http://swapi.dev/api/films/4/"],
  //     species: [],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-19T17:21:45.915000Z",
  //     edited: "2014-12-20T21:17:50.379000Z",
  //     url: "http://swapi.dev/api/people/34/",
  //   },
  //   {
  //     name: "Bib Fortuna",
  //     height: "180",
  //     mass: "unknown",
  //     hair_color: "none",
  //     skin_color: "pale",
  //     eye_color: "pink",
  //     birth_year: "unknown",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/37/",
  //     films: ["http://swapi.dev/api/films/3/"],
  //     species: ["http://swapi.dev/api/species/15/"],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T09:47:02.512000Z",
  //     edited: "2014-12-20T21:17:50.407000Z",
  //     url: "http://swapi.dev/api/people/45/",
  //   },
  //   {
  //     name: "Kit Fisto",
  //     height: "196",
  //     mass: "87",
  //     hair_color: "none",
  //     skin_color: "green",
  //     eye_color: "black",
  //     birth_year: "unknown",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/44/",
  //     films: [
  //       "http://swapi.dev/api/films/4/",
  //       "http://swapi.dev/api/films/5/",
  //       "http://swapi.dev/api/films/6/",
  //     ],
  //     species: ["http://swapi.dev/api/species/21/"],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T10:18:57.202000Z",
  //     edited: "2014-12-20T21:17:50.424000Z",
  //     url: "http://swapi.dev/api/people/53/",
  //   },
  //   {
  //     name: "Yarael Poof",
  //     height: "264",
  //     mass: "unknown",
  //     hair_color: "none",
  //     skin_color: "white",
  //     eye_color: "yellow",
  //     birth_year: "unknown",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/48/",
  //     films: ["http://swapi.dev/api/films/4/"],
  //     species: ["http://swapi.dev/api/species/25/"],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T10:34:48.725000Z",
  //     edited: "2014-12-20T21:17:50.437000Z",
  //     url: "http://swapi.dev/api/people/57/",
  //   },
  //   {
  //     name: "Barriss Offee",
  //     height: "166",
  //     mass: "50",
  //     hair_color: "black",
  //     skin_color: "yellow",
  //     eye_color: "blue",
  //     birth_year: "40BBY",
  //     gender: "female",
  //     homeworld: "http://swapi.dev/api/planets/51/",
  //     films: ["http://swapi.dev/api/films/5/"],
  //     species: ["http://swapi.dev/api/species/29/"],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T16:46:40.440000Z",
  //     edited: "2014-12-20T21:17:50.457000Z",
  //     url: "http://swapi.dev/api/people/65/",
  //   },
  //   {
  //     name: "Jango Fett",
  //     height: "183",
  //     mass: "79",
  //     hair_color: "black",
  //     skin_color: "tan",
  //     eye_color: "brown",
  //     birth_year: "66BBY",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/53/",
  //     films: ["http://swapi.dev/api/films/5/"],
  //     species: [],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T16:54:41.620000Z",
  //     edited: "2014-12-20T21:17:50.465000Z",
  //     url: "http://swapi.dev/api/people/69/",
  //   },
  //   {
  //     name: "Tarfful",
  //     height: "234",
  //     mass: "136",
  //     hair_color: "brown",
  //     skin_color: "brown",
  //     eye_color: "blue",
  //     birth_year: "unknown",
  //     gender: "male",
  //     homeworld: "http://swapi.dev/api/planets/14/",
  //     films: ["http://swapi.dev/api/films/6/"],
  //     species: ["http://swapi.dev/api/species/3/"],
  //     vehicles: [],
  //     starships: [],
  //     created: "2014-12-20T19:46:34.209000Z",
  //     edited: "2014-12-20T21:17:50.491000Z",
  //     url: "http://swapi.dev/api/people/80/",
  //   },
  // ]);
  const [receivedQuery, addReceived] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const STARWARS_API_URL = process.env.REACT_APP_STARWARS_API_URL;
  const [currentSel, selectCurrent] = useState(1);
  const history = useHistory();

  let timeout = useRef();
  useEffect(() => {
    if (!timeout.current && nameQuery !== "") {
      timeout.current = setTimeout(function () {
        setThrottledQuery(nameQuery);
        timeout.current = undefined;
      }, 500);
    }
    if (nameQuery === "") {
      clearTimeout(timeout.current);
      addReceived([]);
    }
  }, [nameQuery]);

  useEffect(() => {
    if (throttledQuery !== "") {
      setIsloading(true);
      var config = {
        method: "get",
        url: `${STARWARS_API_URL}people/?search=${throttledQuery}`,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          addReceived(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          setIsloading(false);
        });
    }
  }, [STARWARS_API_URL, throttledQuery]);

  const handleInput = (e) => {
    setNamequery(e.target.value);
  };

  const moveToPersonPage = (url) => {
    url = url.split("/");
    const personId = url[url.length - 2];
    history.push(`person/${personId}`);
  };

  const handleKeyMoves = (e) => {
    if (e.keyCode === 40) {
      if (currentSel >= receivedQuery.length) {
        selectCurrent(1);
      } else {
        selectCurrent((prev) => prev + 1);
      }
    } else if (e.keyCode === 38) {
      if (currentSel === 1) {
        selectCurrent(receivedQuery.length);
      } else {
        selectCurrent((prev) => prev - 1);
      }
    } else if (e.keyCode === 27) {
      selectCurrent(1);
    } else if (e.keyCode === 13) {
      let crn = receivedQuery[currentSel - 1];
      let url = crn.url;
      moveToPersonPage(url);
    }
  };

  const handleDelete = () => {
    addReceived([]);
    setNamequery("");
  };

  return (
    <>
      <InputBlock
        placeholder="Search by name"
        result={receivedQuery}
        onChange={handleInput}
        value={nameQuery}
        maxLength="20"
        onKeyUp={handleKeyMoves}
      />
      <SpinDeleteHolder>
        <Deleter
          src={deleteIcon}
          nameQuery={nameQuery}
          alt="delteIcon"
          onClick={handleDelete}
        />
        <SearchSpinnerIcon
          src={isloading ? spinIcon : searchIcon}
          isloading={isloading}
          alt="search_icon"
        />
        {receivedQuery.length > 0 && <BottomLine />}
      </SpinDeleteHolder>
      {!isloading && receivedQuery.length > 0 && (
        <>
          <AllResult selected={currentSel}>
            {receivedQuery.map(({ name, birth_year, gender, url }, index) => (
              <SuggestionBlock
                key={index}
                url={url}
                onClick={() => moveToPersonPage(url)}
              >
                <div>
                  <div>{name}</div>
                  <div>{birth_year}</div>
                </div>
                <div>{gender}</div>
              </SuggestionBlock>
            ))}
          </AllResult>
        </>
      )}
    </>
  );
};

export { SearchBar };
