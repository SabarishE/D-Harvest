import "./ars.css";
import "../pages.css";
import { toast } from "react-toastify";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";

import { useState } from "react";
import { arsSample } from "./sample.js";

export const ArsTechnica = () => {
  const [scrape, setscrape] = useState("Cars");
  const [flag, setflag] = useState(false);
  return (
    <div className="ARS-page">
      <div className="ARS-header">
        <div className="ARS-header-about">
          <p>
            Ars Technica is a website covering news and opinions in technology,
            science, politics, and society. It publishes news, reviews, and
            guides on issues such as computer hardware and software, science,
            technology policy, and video games.{" "}
            <a href="https://arstechnica.com/" target="_blank" rel="noreferrer">
              <img src={require("../../media/link.png").default} alt="link"></img>
            </a>
          </p>
        </div>
        <div className="ARS-header-logo">
          <img src={require("./arslogo.png").default} alt="arslogo" />
        </div>
      </div>
      <ARSmenu setscrape={setscrape} scrape={scrape} setflag={setflag} />
      <ARScontent scrape={scrape} setflag={setflag} flag={flag} />
    </div>
  );
};

const ARSmenu = ({ setscrape, scrape, setflag }) => {
  const MenuOptionHandler = (e) => {
    setscrape(e.target.innerHTML);
  };

  return (
    <div className="ARS-menu">
      <div className="ARS-menu-chosen">
        <h3>Chosen topic :</h3>
        <input type="text" readOnly value={scrape} />
        <button onClick={() => setflag(true)}>Go !</button>
      </div>
      <div className="ARS-menu-bar">
        <button onClick={(e) => MenuOptionHandler(e)}>Cars</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Science</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Gadgets</button>
        <button onClick={(e) => MenuOptionHandler(e)}>IT</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Entertainment</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Tech-policy</button>
      </div>
    </div>
  );
};

const ARScontent = ({ scrape, setflag, flag }) => {
  const [ARSdata, setARSdata] = useState(arsSample);

  if (flag) {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    console.log("scrape is ", scrape);
    axios
      .get(
        `https://d-harvest.herokuapp.com/web-scrape/ARStechnica/${scrape}`,
        options
      )
      .then((res) => {
        console.log("ARS data for ", scrape, res.data.Data);
        setflag(false);
        if (res.data.Error) {
          return toast("Error in scrapping ARS technica data", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
        setARSdata([...res.data.Data]);
      })
      .catch((err) => {
        setflag(false);
        toast("Error in scrapping ARS technica data", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        console.log("Error in scrapping ARS technica data", err);
      });
  }

  return (
    <div className="ARS-content">
      <div className="loader-div">
        <GridLoader color={"rgb(255, 68, 0)"} loading={flag} size={10} />
      </div>

      {ARSdata.length <= 0 ? (
        ""
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Heading</th>
              <th>Excerpt</th>
              <th>Author</th>
              <th>Time</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {ARSdata.map((ele, i) => {
              return (
                <tr key={i ^ 3}>
                  <td>{i + 1}</td>
                  <td>{ele.heading}</td>
                  <td>{ele.excerpt}</td>
                  <td>{ele.author}</td>
                  <td>{ele.time}</td>
                  <td>{ele.commentsCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
