import React, { useRef, useState, useEffect, useContext } from "react";
import "../index.css";
// import Header from './Header';
import firebase from "firebase/app";
// import SignIn from './auth/SignIn';
import { withFirestore, useFirestore } from "react-redux-firebase";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from "styled-components";
import { UserContext } from "../userContext";
import { MyContext } from "../context.js";
import axios from "axios";
import { message } from "antd";
import { Spinner } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

const theme = {
  font: "Courier",
  primary: "#0a192f",
  secondary: "#303C55",
  light: "#ccd6f6",
  white: "#e6f1ff",
};

const categories = {
  Appliances: " ",
  "Apps & Games": " ",
  "Arts, Crafts & Sewing": " ",
  Automotive: " ",
  Baby: " ",
  "Beauty & Personal Care": " ",
  Books: " ",
  "CDs & Vinyl": " ",
  "Camera & Photo": " ",
  "Cell Phones": " ",
  "Clothing, Shoes & Jewelry": " ",
  "Collectible Currencies": " ",
  "Computers & Accessories": " ",
  "Digital Music": " ",
  Electronics: " ",
  "Entertainment Collectibles ": " ",
  "Grocery & Gourmet Foods": " ",
  "Handmade Products": " ",
  "Health & Household": " ",
  "Home & Kitchen": " ",
  "Industrial & Scientific": " ",
  "Kitchen & Dining": " ",
  "Movies & TV": " ",
  "Musical Instruments": " ",
  "Office Products": " ",
  "Patio, Lawn & Garden": " ",
  "Pet Supplies": " ",
  Software: " ",
  "Sports & Outdoors": " ",
  "Sports Collectibles": " ",
  "Tools & Home Improvements": " ",
  "Toys & Games": " ",
  "Video Games": " ",
};
const prices = {
  "$0-1.99": " ",
  "$2-10": " ",
  "$10.01- 30": " ",
  "$30.01- 50": " ",
  "$50.01-75": " ",
  "$75.01-100": " ",
  "$100.01-150": " ",
  "$150.01-200": " ",
  "$200.01-500": " ",
  "$500.01-1000": " ",
  "$1000.01-1500": " ",
  "$1500.01-2000": " ",
  "$2000.01-2750": " ",
  "$2750-$3500": " ",
  "$3500.01+": " ",
};

const Upload = (props) => {
  const firestore = useFirestore();
  const [value, setValue] = useState(UserContext);
  const [amazon, checkAmazon] = useState(false);
  const [shopify, checkShopify] = useState(false);
  const [category, checkCategory] = useState("Appliances");
  const [price, checkPrice] = useState("$0-1.99");
  const [asin, checkAsin] = useState("");
  const [mainPicName, checkName] = useState("");
  const [email, checkEmail] = useState(null);
  // const [timeStamp, changeTime] = useState(0)
  const fileInput = useRef();
  const primaryFile = useRef();
  const context = useContext(MyContext);
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const [deleteBool, setDeleteBool] = useState(false);
  const database = firebase.database();
  const [successBool, checkSuccess] = useState(false);
  const [inputList, setInputList] = useState([{ email: "" }]);
  const [uploading, setUploading] = useState(false);

  let mainList = {};
  let timeStamp = "";

  const ocShowAlert = (message, background = "#3089cf") => {
    setTimeout(function () {
      alert(message);
    }, 3000);
  };

  const handleAmazonCheck = () => {
    checkAmazon(!amazon);
  };

  const handleAsinCheck = (e) => {
    console.log(e);
    checkAsin(e);
    console.log(asin);
  };

  const handleShopifyCheck = () => {
    checkShopify(!shopify);
  };

  const handleCategory = (e) => {
    checkCategory(e);
    console.log(category);
  };

  const handlePrice = (e) => {
    checkPrice(e);
    console.log(price);
  };

  const handleEmail = (e) => {
    checkEmail(e);
    console.log(email);
  };

  const handleSuccess = (e) => {
    checkSuccess(e);
  };

  // const changeTimeStamp = (t) => {
  //   changeTime(t);
  //   console.log(timeStamp)
  // }

  const handleAddMain = (name) => {
    checkName((prevState) => prevState + name);
    console.log(mainPicName);
  };

  function uploadRequest(files) {
    console.log(typeof files);
    let data = new FormData();
    Object.values(files).forEach((f) => {
      data.append("file", f);
    });
    console.log(data);
    console.log(user);

    axios
      .post("https://infinite-gorge-14963.herokuapp.com/api/upload", data, {
        // axios.post('http://localhost:5000/api/upload', data, {
        headers: {
          userName: user.displayName,
          timeStamp: Date.now(),
        },
      })
      .then((response) => {
        addInfoToDb(response);
        handleSuccess(true);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  const addInfoToDb = (resp) => {
    let mainUrl = "";
    let otherUrls = "";
    let emails = "";
    console.log(amazon, shopify);
    console.log(category);
    console.log(mainList["main"]);
    console.log(email);
    inputList.forEach((email) => {
      emails += email["email"] + "|";
    });
    console.log(emails);
    resp["data"]["Data"].forEach((d) => {
      let temp = d["Key"].split("/");
      console.log(d);
      console.log(temp[temp.length - 3]);
      timeStamp = temp[temp.length - 3];
      if (temp[temp.length - 1] == mainList["main"]) {
        console.log("this is the main", d["Bucket"], d["Key"]);
        mainUrl = d["Location"];
      } else {
        console.log(d["Bucket"], d);
        otherUrls += d["Location"] + "|";
      }
    });

    try {
      firebase
        .database()
        .ref("transactions/" + user.displayName + "_" + timeStamp)
        .set({
          timeStamp: timeStamp,
          asin: asin,
          mainPic: mainUrl,
          otherPics: otherUrls,
          category: category,
          amazon: amazon,
          shopify: shopify,
          price: price,
          email: emails,
        });

      return firestore.collection("transactions").add({
        user: user.displayName,
        timeStamp: timeStamp,
        asin: asin,
        mainPic: mainUrl,
        otherPics: otherUrls,
        category: category,
        amazon: amazon,
        shopify: shopify,
        price: price,
        email: emails,
      });
    } catch (error) {
      message.error(error.message);
    }

    console.log(mainUrl, "all the rest", otherUrls);
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    let mainPic = primaryFile.current.files;
    mainPic[0]["primary"] = true;
    mainList["main"] = mainPic[0]["name"];

    console.log(mainPic[0]["name"]);
    let file = fileInput.current.files;
    file = [...file, mainPic[0]];
    console.log(mainPic);
    console.log(file);
    uploadRequest(file);
  };
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    console.log(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { email: "" }]);
  };

  useEffect(() => {
    // callApi();
    setUser(auth.currentUser);
    if (auth.currentUser) {
      setValue(auth.currentUser);
      checkEmail(auth.currentUser.email);
    }
  }, [context.state.user]);
  if (document.getElementById("form")) {
    document
      .getElementById("form")
      .addEventListener("submit", function (event) {
        event.preventDefault();
      });
  }

  return (
    <React.Fragment>
      {user ? (
        <div className="form-container">
          <form onSubmit={handleFileUpload} className="form">
            <div>
              <label>Select you primary image:</label>
              <input
                type="file"
                name="main-pic"
                ref={primaryFile}
                text="Upload file"
              />
              <br></br>
              <label>Select the rest of your images:</label>
              <input type="file" multiple name="profile_pic" ref={fileInput} />
              <br></br>
              <label>For which platforms?</label>
              <br></br>
              <label>Amazon</label>
              <input
                type="checkbox"
                value="amazon"
                onChange={handleAmazonCheck}
              />
              <label>Shopify</label>
              <input
                type="checkbox"
                value="shopify"
                onChange={handleShopifyCheck}
              />
              <br></br>
              <label>Amazon ASIN, JAN, EAN, 13-digit ISBN or UPC:</label>
              <input
                type="html/text"
                name="asin"
                onChange={(e) => handleAsinCheck(e.currentTarget.value)}
              />
              <br></br>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => handleCategory(e.currentTarget.value)}
              >
                {Object.keys(categories).map((c) => (
                  <option value={c}>{c}</option>
                ))}
              </select>
              <label>Price Range</label>
              <select
                value={prices}
                onChange={(e) => handlePrice(e.currentTarget.value)}
              >
                {Object.keys(prices).map((c) => (
                  <option value={c}>{c}</option>
                ))}
              </select>
              <br />
              <label>Email to:</label>
              {/* <input
                className="email-input"
                type="email"
                defaultValue=""
                onChange={(e) => handleEmail(e.currentTarget.value)}
              /> */}
              {inputList.map((x, i) => {
                return (
                  <div className="box">
                    <input
                      className="email-input"
                      type="email"
                      value={x.email}
                      onChange={(e) => handleInputChange(e, i)}
                      name="email"
                    />

                    <div className="btn-box">
                      {inputList.length !== 1 && (
                        <button
                          onClick={() => handleRemoveClick(i)}
                          className="mr10"
                        >
                          Remove
                        </button>
                      )}
                      {inputList.length - 1 === i && (
                        <button onClick={handleAddClick}>Add</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {uploading ? <Spinner animation="border" /> :
                <input
                  type="submit"
                  name="btn_upload_profile_pic"
                  value="Upload"
                />
              }
            </div>
          </form>
        </div>
      ) : (
          ""
        )}
      {console.log("screech")}

      {successBool ? message.success("upload complete") : ""}
      {successBool ? <Redirect to="/profile" /> : ""}
    </React.Fragment>
  );
};

export default withFirestore(Upload);
