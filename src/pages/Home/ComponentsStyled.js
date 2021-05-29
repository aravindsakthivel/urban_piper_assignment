import styled from "styled-components";

const InputBlock = styled.input`
  height: 50px;
  border-radius: 35px;
  border: 0;
  outline: 0;
  font-size: 16px;
  background: #2d2f30;
  color: #f2f2f2;
  padding-left: 15px;
  position: relative;
  left: 35px;
  margin-top: 20px;
  border-bottom-left-radius: ${({ result }) => (result.length ? 0 : "35px")};
  border-bottom-right-radius: ${({ result }) => (result.length ? 0 : "35px")};
  @media only screen and (max-width: 600px) {
    width: 250px;
  }
  @media only screen and (min-width: 600px) {
    width: 250px;
  }
  @media only screen and (min-width: 768px) {
    width: 450px;
  }
`;

const SearchSpinnerIcon = styled.img`
  width: ${({ isloading }) => (isloading ? "25px" : "15px")};
  background-color: ${({ isloading }) => (isloading ? "" : "yellow")};
  color: black;
  border-radius: 25px;
  padding: ${({ isloading }) => (isloading ? "5px" : "10px")};
  animation: ${({ isloading }) => (isloading ? "spin 2s linear infinite" : "")};
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Deleter = styled.img`
  width: 30px;
  border-right: 2px solid black;
  padding-right: 5px;
  margin-right: 5px;
  margin-bottom: 2px;
  visibility: ${({ nameQuery }) =>
    nameQuery.length > 0 ? "visible" : "hidden"};
`;

const SpinDeleteHolder = styled.div`
  float: right;
  position: relative;
  @media only screen and (max-width: 325px) {
    top: -45px;
    right: 30px;
    z-index: 1;
  }
  @media only screen and (min-width: 325px) {
    top: 27px;
    right: 55px;
    z-index: 1;
  }
`;

const SuggestionBlock = styled.div`
  background-color: #2d2f30;
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 7px;
  padding-top: 10px;
  padding-bottom: 5px;
  > div:nth-child(1) {
    > div:nth-child(1) {
      color: #f2f2f2;
    }
    > div:nth-child(2) {
      color: gray;
    }
  }
  > div:nth-child(2) {
    color: gray;
  }
  &:hover {
    background-color: #78909c;
  }
`;

const BottomLine = styled.div`
  position: absolute;
  color: white;
  border-top: 2px solid black;
  right: 0px;
  @media only screen and (max-width: 325px) {
    width: 240px;
  }
  @media only screen and (min-width: 325px) {
    width: 440px;
  }
`;

const AllResult = styled.div`
  position: relative;
  left: 35px;
  padding-bottom: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #2d2f30;
  @media only screen and (max-width: 600px) {
    width: 267px;
  }
  @media only screen and (min-width: 600px) {
    width: 250px;
  }
  @media only screen and (min-width: 768px) {
    width: 467px;
  }
  > div:nth-child(${({ selected }) => selected}) {
    background-color: #78909c;
  }
`;

const ClearBlock = styled.div`
  color: gray;
  position: relative;
  z-index: 3;
  bottom: 20px;
  right: -100px;
`;

export {
  InputBlock,
  SearchSpinnerIcon,
  Deleter,
  SuggestionBlock,
  AllResult,
  ClearBlock,
  SpinDeleteHolder,
  BottomLine,
};
