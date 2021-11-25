import "../pages.css";
import "./olx.css";

import { toast } from "react-toastify";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import { useState } from "react";

import { olxSample } from "./sample";

export const Olx = () => {
  const [scrape, setscrape] = useState("Homepage");
  const [flag, setflag] = useState(false);
  return (
    <>
      <div className="OLX-page">
        <div className="OLX-header">
          <div className="OLX-header-about">
            <p>
              The OLX marketplace is a platform for buying and selling services
              and goods such as electronics, fashion items, furniture, household
              goods, cars and bikes.OLX operates an online marketplace for
              consumer-to-consumer sales, particularly targeting users in
              emerging markets.
              <a href="https://www.olx.in/" target="_blank" rel="noreferrer">
                <img src={require("../../media/link.png").default} alt="link"></img>
              </a>
            </p>
          </div>
          <div className="OLX-header-logo">
            <img src={require("./olxlogo.png").default} alt="arslogo" />
          </div>
        </div>
        <OLXmenu setscrape={setscrape} scrape={scrape} setflag={setflag} />
        <OLXcontent scrape={scrape} setflag={setflag} flag={flag} />
      </div>
    </>
  );
};

const OLXmenu = ({ setscrape, scrape, setflag }) => {
  const MenuOptionHandler = (e) => {
    setscrape(e.target.innerHTML);
  };

  return (
    <div className="OLX-menu">
      <div className="OLX-menu-chosen">
        <h3>Chosen product :</h3>
        <input type="text" readOnly value={scrape} />
        <button onClick={() => setflag(true)}>Go !</button>
      </div>
      <div className="OLX-menu-bar">
        <button onClick={(e) => MenuOptionHandler(e)}>Homepage</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Houses</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Cars</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Mobiles</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Books</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Music Instruments</button>
      </div>
    </div>
  );
};
const OLXcontent = ({ scrape, setflag, flag }) => {
  const [OLXdata, setOLXdata] = useState(olxSample);

  if (flag) {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    console.log("scrape is ", scrape);
    axios

      .get(`https://d-harvest.herokuapp.com/web-scrape/OLX/${scrape}`, options)
      .then((res) => {
        setflag(false);
        console.log("OLX data for ", scrape, res);

        if (res.data.Error) {
          return toast("Error in scrapping OLX data", {
            position: "bottom-right"
          });
        } else {
          return setOLXdata([...res.data.Data]);
        }
      })
      .catch((err) => {
        setflag(false);
        toast("Error in scrapping OLX data", {
          position: "bottom-right"
        });
        console.log("error in getting all transactions", err);
      });
  }

  return (
    <div className="OLX-content">
      <div className="loader-div">
        <GridLoader color={"rgb(119, 0, 255)"} loading={flag} size={10} />
      </div>
      {OLXdata.length <= 0 ? (
        ""
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Location</th>
              <th>Posted on</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {OLXdata.map((ele, i) => {
              return (
                <tr key={i ^ 3}>
                  <td>{i + 1}</td>
                  <td>{ele.Name}</td>
                  <td>{ele.Price}</td>
                  <td>{ele.Location}</td>
                  <td>{ele.PostedOn}</td>
                  <td>
                    <a href={ele.DetailsLink} target="_blank" rel="noreferrer">
                      {ele.DetailsLink}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
