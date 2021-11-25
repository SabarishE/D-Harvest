import "./styles.css";

import { useState, createContext } from "react";
import { Header } from "./layout/headandnav";
import { Body } from "./layout/body";
import { BrowserRouter as Router } from "react-router-dom";
export const navbarContext = createContext("");

export default function App() {
  const [drawer, setdrawer] = useState(false);

  return (
    <div className="App">
      <Router>
        <navbarContext.Provider value={{ drawer, setdrawer }}>
          <Header drawer={drawer} setdrawer={setdrawer} />
          <Body drawer={drawer} setdrawer={setdrawer} />
        </navbarContext.Provider>
      </Router>
    </div>
  );
}
