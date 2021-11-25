import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { navbarContext } from "../App";
import { useState } from "react";
import "./layout.css";
import { NavBar, NavBarDrawer } from "./headandnav";

import { ArsTechnica } from "../Pages/ars/ars";
import { Allrecipes } from "../Pages/ta/ta";
import { Olx } from "../Pages/olx/olx";

export const Body = () => {
  const [topscroll, settopscroll] = useState(false);
  const { drawer, setdrawer } = useContext(navbarContext);
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      settopscroll(true);
    } else {
      settopscroll(false);
    }
  }

  const scrolltopHandler = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      <div className="body">
        <NavBar />
        <NavBarDrawer drawer={drawer} setdrawer={setdrawer} />

        <div className="body-right">
          <Switch>
            <Route exact path="/homepage">
              <Homepage />
            </Route>
            <Route exact path="/ars">
              <ArsTechnica />
            </Route>
            <Route exact path="/ar">
              <Allrecipes />
            </Route>
            <Route exact path="/olx">
              <Olx />
            </Route>

            <Route path="*">
              <Homepage />
            </Route>
          </Switch>
          <ToastContainer />
          <button
            id="scroll-top-btn"
            onClick={scrolltopHandler}
            style={topscroll ? { display: "block" } : { display: "none" }}
          >
            <img src={require("../media/scrollup.png").default} alt="scroll-top" />
          </button>
        </div>
      </div>
    </>
  );
};

const Homepage = () => {
  return (
    <div
      className="home"
      style={{ backgroundImage: `url(${require("../media/homebg.png").default}` }}
    >
      <h1>
        D-Harvest is a web scrapper tool which enables parsing the HTML and
        extracts necessary data.
      </h1>
      <h2> Choose a website to scrape</h2>
    </div>
  );
};
