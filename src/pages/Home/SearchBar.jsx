import React, { useState, useRef, useEffect } from "react";
import searchIcon from "./search-solid.svg"
import spinIcon from "./spinner-solid.svg";
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
  const [receivedQuery, addReceived] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const STARWARS_API_URL = process.env.REACT_APP_STARWARS_API_URL;
  const [currentSel, selectCurrent] = useState(0);
  const history = useHistory();

  let timeout = useRef();
  useEffect(() => {
    if (!timeout.current) {
      timeout.current = setTimeout(function () {
        setThrottledQuery(nameQuery);
        timeout.current = undefined;
      }, 400);
    }
    if (!nameQuery.length) {
      setNamequery("");
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
          receivedQuery={receivedQuery}
          alt="delteIcon"
          onClick={handleDelete}
        />
        <SearchSpinnerIcon
          src={isloading ? spinIcon : searchIcon}
          isloading={isloading}
          alt="search_icon"
        />
        {nameQuery.length > 0 && receivedQuery.length > 0 && <BottomLine />}
      </SpinDeleteHolder>
      {nameQuery.length > 0 && !isloading && receivedQuery.length > 0 && (
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
