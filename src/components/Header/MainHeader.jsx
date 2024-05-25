import React, { Fragment } from "react";
import Nav from "./Nav/Nav";
import Main from "./Main/Main";

const MainHeader = () => {
  return (
    <Fragment>
      <Nav />
      <Main />
    </Fragment>
  );
};

export default MainHeader;
