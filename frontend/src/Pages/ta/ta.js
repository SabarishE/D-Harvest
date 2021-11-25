import "./ta.css";
import "../pages.css";
import { toast } from "react-toastify";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";

import { useState } from "react";
import { TAsample } from "./sample.js";
export const Allrecipes = () => {
  const [scrape, setscrape] = useState("Breakfast");
  const [flag, setflag] = useState(false);
  return (
    <>
      <div className="TA-page">
        <div className="TA-header">
          <div className="TA-header-about">
            <p>
              Allrecipes.com, Inc. is a food-focused online social networking
              service. The recipes on the website are posted by members of the
              Allrecipes.com community and then copyedited by staff. Members of
              the community can also rate and review recipes, as well as add
              photos of the finished dish. Recipes are categorized by season,
              type (such as appetizer or dessert), and ingredients.
              <a
                href="https://www.allrecipes.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={require("../../media/link.png").default} alt="link"></img>
              </a>
            </p>
          </div>
          <div className="TA-header-logo">
            <img src={require("./arlogo.png").default} alt="arslogo" />
          </div>
        </div>
        <TAmenu setscrape={setscrape} scrape={scrape} setflag={setflag} />
        <TAcontent scrape={scrape} setflag={setflag} flag={flag} />
        <div className="TA-content"></div>
      </div>
    </>
  );
};

const TAmenu = ({ setscrape, scrape, setflag }) => {
  const MenuOptionHandler = (e) => {
    setscrape(e.target.innerHTML);
  };

  return (
    <div className="TA-menu">
      <div className="TA-menu-chosen">
        <h3>Chosen recipe :</h3>
        <input type="text" readOnly value={scrape} />
        <button onClick={() => setflag(true)}>Go !</button>
      </div>
      <div className="TA-menu-bar">
        <button onClick={(e) => MenuOptionHandler(e)}>Breakfast</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Lunch</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Breads</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Soups</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Indian</button>
        <button onClick={(e) => MenuOptionHandler(e)}>Italian</button>
      </div>
    </div>
  );
};
const TAcontent = ({ scrape, setflag, flag }) => {
  const [TAdata, setTAdata] = useState(TAsample);

  if (flag) {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    console.log("scrape is ", scrape);
    axios
      .get(
        `https://d-harvest.herokuapp.com/web-scrape/Allrecipes/${scrape}`,
        options
      )
      .then((res) => {
        console.log("TA data for ", scrape, res);
        setflag(false);
        if (res.data.Error) {
          return toast("Error in scrapping Allrecipes data", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
        }
        setTAdata([...res.data.Data]);
      })
      .catch((err) => {
        console.log("Error in scrapping Allrecipes data", err);
        toast("Error in scrapping Allrecipes data", {
          position: toast.POSITION.BOTTOM_RIGHT
        });
        setflag(false);
      });
  }

  return (
    <div className="TA-content">
      <div className="loader-div">
        <GridLoader color={"orange"} loading={flag} size={10} />
      </div>
      {TAdata.length <= 0 ? (
        ""
      ) : (
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Rating</th>
              <th>Author</th>
              <th>URL</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {TAdata.map((ele, i) => {
              return (
                <tr key={i ^ 3}>
                  <td>{i + 1}</td>
                  <td>{ele.Name.trim()}</td>
                  <td>{ele.Rating}</td>
                  <td>{ele.Author}</td>

                  <td>
                    <a href={ele.URL} target="_blank" rel="noreferrer">
                      {ele.URL}
                    </a>
                  </td>

                  <td>{ele.Summary.trim()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
