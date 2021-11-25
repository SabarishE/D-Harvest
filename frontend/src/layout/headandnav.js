import { useContext } from "react";
import { navbarContext } from "../App";
import { Link, useHistory } from "react-router-dom";

import "./layout.css";

export const Header = () => {
  const { drawer, setdrawer } = useContext(navbarContext);

  const history = useHistory();

  const setNavBarDrawer = () => {
    setdrawer(!drawer);
  };

  return (
    <div className="header">
      <div className="header-1">
        <span className="header-menuicon">
          <img
            src={require("../media/menu.png").default}
            alt="logo"
            onClick={setNavBarDrawer}
          />
        </span>
      </div>
      <div className="header-2" onClick={() => history.push("/homepage")}>
        <span className="header-title">D-Harvest</span>
        <span className="header-logo">
          <img src={require("../media/scraper.png").default} alt="logo" />
        </span>
      </div>
    </div>
  );
};

export const NavBar = () => {
  return (
    <div className="body-left">
      {" "}
      <Link to="/ars" className="link">
        <span className="nav-item">ARS techica</span>
      </Link>{" "}
      <Link to="/ar" className="link">
        <span className="nav-item">All recipes</span>{" "}
      </Link>{" "}
      <Link to="/olx" className="link">
        <span className="nav-item">Olx </span>{" "}
      </Link>{" "}
    </div>
  );
};

export const NavBarDrawer = () => {
  const { drawer, setdrawer } = useContext(navbarContext);
  const setNavBarDrawer = () => {
    setdrawer(!drawer);
  };
  return (
    <div
      className={drawer ? "nav-drawer active" : "nav-drawer"}
      id="nav-drawer"
    >
      <Link to="/ars" className="link">
        <span className="nav-item">ARS techica</span>
      </Link>{" "}
      <Link to="/ar" className="link">
        <span className="nav-item">All recipes</span>{" "}
      </Link>{" "}
      <Link to="/olx" className="link">
        <span className="nav-item">Olx </span>{" "}
      </Link>{" "}
      <span className="nav-item-drawerclose" onClick={setNavBarDrawer}>
        <img src={require("../media/up.png").default} alt="scroll-up" />
      </span>
    </div>
  );
};
