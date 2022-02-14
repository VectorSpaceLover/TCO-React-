import React, { Component } from "react";

import { render } from "@testing-library/react";
import ResponsiveMenu from "react-responsive-navbar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import LazyLoad from "react-lazyload";
import SmoothImage from "react-smooth-image";

import search from "../images/search.svg";
import mobile_search from "../images/mobile_search.svg";

import "../App.css";
import "./Header.css";
import Popup from "./search_popup";
import GLOBAL from "../Global";
import search_close from "../images/close.svg";
import FloatingLabel from "floating-label-react";
import PhoneInput from "react-phone-number-input";
const axios = require("axios");
const MODAL_OPEN_CLASS = "body--menu--open";
const MODAL_OPEN_CLASS3 = "body--popup--open3";
const divStyle = {
  marginTop: "0px",
};
var OptionData = [];
var classn = [];
var errors = [];
var rclassn = [];
var rerrors = [];
var pclassn = [];
var perrors = [];
// import axios from "axios";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      addClass: false,
      addClass3: false,
      Logo: "",
      mobile_logo: "",
      HeaderMenu: [],
      fields: {},
      rfields: {},
      pfields: {},
      errors: {},
      rerrors: {},
      perrors: {},
      classn: {},
      rclassn: {},
      pclassn: {},
      checkd: false,
      IndustryName: [],
      ThemeName: [],
      ErrorPost: [],
      ThankyouPost: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.rhandleChange = this.rhandleChange.bind(this);
    this.phandleChange = this.phandleChange.bind(this);
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);
    this.rhandleKeyUpChange = this.rhandleKeyUpChange.bind(this);
    this.phandleKeyUpChange = this.phandleKeyUpChange.bind(this);
    this.togglePopup3 = this.togglePopup3.bind(this);
  }
  componentWillMount() {
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/logos",
      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            if (item.Title == "desktop") {
              var LOGO = item.Image;
              this.setState({ Logo: GLOBAL.SITE_URL + LOGO.url });
            } else if (item.Title == "mobile") {
              var LOGO = item.Image;
              this.setState({ mobile_logo: GLOBAL.SITE_URL + LOGO.url });
            }
          });
        }
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });

    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/menus",
      responseType: "json",
    })
      .then((response) => {
        if (response.status == 200) {
          var Data = response.data;

          var HeaderMenu = [];
          Data.map((item, index) => {
            HeaderMenu.push(item);
          });
          HeaderMenu.sort(function (a, b) {
            return a.SeqID - b.SeqID;
          });
          this.setState({ HeaderMenu: HeaderMenu });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({
      fields,
    });
  }

  rhandleChange(e) {
    let rfields = this.state.rfields;

    rfields[e.target.name] = e.target.value;

    this.setState({
      rfields,
    });
  }

  rhandleKeyUpChange(e) {
    var name = e.target.name;
    var maxLength = e.target.maxLength;
    if (e.target.type == "textarea") maxLength = 1000;

    var var_len = e.target.value.length;

    if (maxLength != "-1" && var_len != 0 && maxLength <= var_len) {
      rerrors[name] =
        "Please reduce the text to under " + maxLength + " characters";

      rclassn[name] = "error";
    } else {
      rerrors[name] = "";

      rclassn[name] = "";
    }
    this.setState({ rerrors: rerrors, rclassn: rclassn });
  }

  handleKeyUpChange(e) {
    var name = e.target.name;
    var maxLength = e.target.maxLength;
    if (e.target.type == "textarea") maxLength = 1000;

    var var_len = e.target.value.length;

    if (maxLength != "-1" && var_len != 0 && maxLength <= var_len) {
      errors[name] =
        "Please reduce the text to under " + maxLength + " characters";

      classn[name] = "error";
    } else {
      errors[name] = "";

      classn[name] = "";
    }
    this.setState({ errors: errors, classn: classn });
  }

  submituserRegisterForm = (e) => {
    e.preventDefault();

    if (this.pvalidateForm()) {
      if (this.state.pfields.files != "" && this.state.pfields.files != null) {
        this.setState({
          psubmitDisabled: true,
          psubmitDisabledText: "Files are being uploaded, please wait...",
        });
      }

      const formElement = document.querySelector("#become_partner");
      var formdata = new FormData(formElement);

      axios({
        method: "post",
        data: formdata,
        url: GLOBAL.SITE_URL + "/upload",

        responseType: "json",
      })
        .then((response) => {
          debugger;
          var Data = response.data;

          this.state.pfields.Complementaryinformationattachments = Data[0];
          let pfields = this.state.pfields;

          this.setState({ pfields: pfields });

          // alert("Form submitted");

          var subscribecheck = pfields.subscribecheck == true ? true : false;
          var mediaquest = pfields.mediaquest == true ? true : false;

          var MobileNumber = pfields.phonenumber;
          if (MobileNumber.indexOf("+") < 0) {
            MobileNumber = "+" + MobileNumber;
          }

          const requestBody = {
            CompanyName: pfields.companyname,
            Industry: pfields.industry,
            ContactpointName: pfields.contactpointname,
            LastName: pfields.lastname,
            Position: pfields.position,
            Email: pfields.email,
            Phonenumber: MobileNumber,
            Selectthemeofinterest: pfields.selectthemeofinterest,
            aboutyourinterests: pfields.tellus,
            SubscribetoUpdates: subscribecheck,
            SubscribetoMediaQuest: mediaquest,
            Complementaryinformationattachments:
            pfields.Complementaryinformationattachments,
          };

          axios({
            method: "POST",

            url: GLOBAL.SITE_URL + "/become-a-partners",

            responseType: "json",
            data: requestBody,
          })
            .then((response) => {
              delete requestBody["Complementaryinformationattachments"];

              let url =
                GLOBAL.CRMAPIDATA.APIURL +
                "subscribers/f4f5c676c54c67b3d9af25883677514c.json";
              var username = GLOBAL.CRMAPIDATA.APIKey;
              var password = GLOBAL.CRMAPIDATA.APIPassword;
              var myHeaders = new Headers();
              myHeaders.append(
                "Authorization",
                "Basic " + btoa(username + ":" + password)
              );
              myHeaders.append(
                "Content-type",
                "application/json; charset=UTF-8"
              );
              var Data = {
                EmailAddress: pfields.email,
                name: pfields.username + " " + pfields.lastname,
                CustomFields: [
                  { key: "LastName", value: pfields.lastname },
                  { key: "CompanyName", value: pfields.companyname },
                  { key: "PhoneNumber", value: MobileNumber },
                  { key: "Position", value: pfields.position },
                  { key: "Industry", value: pfields.industry },
                  { key: "about your interests", value: pfields.tellus },
                ],

                Resubscribe: true,
                RestartSubscriptionBasedAutoresponders: true,
                ConsentToTrack: "Yes",
              };

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                redirect: "follow",
                body: JSON.stringify(Data),
              };
              const proxyurl = "https://cors-anywhere.herokuapp.com/";

              fetch(proxyurl + url, requestOptions)
                .then((response) => response.text())
                .then((result) => {
                  console.log(result);
                  this.setState({ addClass: false });
                  this.setState({ addClass1: false });
                  this.setState({ addClass2: true });
                  this.setState({
                    submitDisabled: false,
                    submitDisabledText: "",
                  });
                })
                .catch((error) => {
                  this.setState({ addClass6: true });
                  console.log(error);
                  this.setState({
                    submitDisabled: false,
                    submitDisabledText: "",
                  });
                });
            })

            .catch((err) => {
              console.log(err);
              this.setState({ addClass6: true });
              console.log("Error");
              this.setState({
                submitDisabled: false,
                submitDisabledText: "",
              });
            });
        })

        .catch((err) => {
          this.setState({ addClass6: true });
          console.log(err);
          this.setState({
            submitDisabled: false,
            submitDisabledText: "",
          });
          console.log("Error");
        });
    }
  };

  phandleChange(e) {
    let pfields = this.state.pfields;

    pfields[e.target.name] = e.target.value;

    this.setState({
      pfields,
    });
  }

  phandleKeyUpChange(e) {
    var name = e.target.name;
    var maxLength = e.target.maxLength;
    if (e.target.type == "textarea") maxLength = 1000;

    var var_len = e.target.value.length;

    if (maxLength != "-1" && var_len != 0 && maxLength <= var_len) {
      perrors[name] =
        "Please reduce the text to under " + maxLength + " characters";

      pclassn[name] = "error";
    } else {
      perrors[name] = "";

      pclassn[name] = "";
    }
    this.setState({ perrors: perrors, pclassn: pclassn });
  }

  togglePopup3() {
    this.setState({ addClass3: !this.state.addClass3 });
  }

  toggle() {
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if (this.state.addClass3) {
      console.log(MODAL_OPEN_CLASS3);
      document.body.classList.add(MODAL_OPEN_CLASS3);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS3);
    }

    if (navigator.userAgent.indexOf("Mac OS X") != -1) {
      document.body.classList.add("mac");
    } else {
      document.body.classList.add("pc");
    }

    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-2">
              <div className="header_logo">
                <a href="/" className="dekstop_show">
                  {/*   <LazyLoad height={200} once  offset={100}>
			        <img
                    src={this.state.Logo}
                    align="left"
                    className="dekstop_show"
                  />
			      </LazyLoad> */}

                  <SmoothImage
                    align="left"
                    className="dekstop_show"
                    src={this.state.Logo}
                    alt="logo"
                    height={65}
                    transitionTime={1.0}
                  />
                </a>
                {/*  <img
                    src={this.state.Logo}
                    align="left"
                    className="dekstop_show"
                  /> */}
                <a href="/" className="mobile_show">
                  <SmoothImage
                    align="left"
                    src={this.state.mobile_logo}
                    alt="logo"
                    height={65}
                    transitionTime={1.0}
                  />

                  {/* <img src={this.state.mobile_logo} align="left" className="mobile_show" />*/}
                </a>
              </div>
            </div>
            <div className="col-10">
              <div className="header_top_menu">
                <ul>
                  {this.state.HeaderMenu.map((item, index) => {
                    return (
                      <li className={item.Class} key = {index}>
                        <NavLink to={"/" + item.Link}>{item.Title}</NavLink>
                      </li>
                    );
                  })}
                  <li className="search_icon">
                    <a onClick={this.togglePopup.bind(this)}>
                      <img src={search} className="dekstop_show" />
                      <img src={mobile_search} className="mobile_show" />
                    </a>
                  </li>
                  <li className="mobile_show toggle_menu">
                    <a onClick={this.toggle.bind(this)}>
                      <span></span>
                      <span></span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="header_bottom_menu " ref="toggle-div">
                <ul>
                  {this.state.HeaderMenu.map((item, index) => {
                    return (
                      <li className={item.Class} key = {index}>
                        {item.Class == "popup_button" && (
                          <button className="active" onClick={()=> window.open("https://preregister.topceo.me/", "_blank")}>
                            <span>{item.Title}</span>
                          </button>
                        )}
                        {item.Class == "link_button" && (
                          <NavLink
                            to={"/" + item.Link}
                            onClick={this.toggle.bind(this)}
                          >
                            <span>{item.Title}</span>
                          </NavLink>
                        )}
                        {!['popup_button', 'link_button'].includes(item.Class) && (
                          <NavLink
                            to={"/" + item.Link}
                            onClick={this.toggle.bind(this)}
                          >
                            {item.Title}
                          </NavLink>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.showPopup ? (
          <Popup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
        {this.state.addClass3 ? (
          <div className="details_popup  attend_details_popup">
            <div className="all_popup">
              <div className="details_popup_content container">
                <button
                  onClick={this.togglePopup3.bind(this)}
                  className="details_popup_close"
                >
                  <img src={search_close} />
                </button>

                <div className="container">
                  <div className="row">
                    <div className="column col-12">
                      <div className="theme_selection_block">
                        <form
                          method="post"
                          name="userRegisterForm"
                          id="become_partner"
                          onSubmit={this.submituserRegisterForm}
                          className="contact_from"
                        >
                          <div className="container">
                            <div className="row">
                              <div className="column col-12">
                                <p>
                                  Are you interested in sponsoring a Top CEO
                                  activity during the event? Fill in the
                                  following information:
                                </p>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="companyname"
                                  name="companyname"
                                  placeholder="Company Name*"
                                  type="text"
                                  maxLength="255"
                                  value={this.state.pfields.companyname}
                                  className={this.state.pclassn.companyname}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.companyname}
                                </div>
                              </div>
                              <div className="column col-6">
                                <select
                                  id="industry"
                                  name="industry"
                                  value={this.state.pfields.industry}
                                  className={this.state.pclassn.industry}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                >
                                  <option>Industry*</option>
                                  {this.state.IndustryName.length > 0
                                    ? this.state.IndustryName.map(
                                      (item, index) => {
                                        return (
                                          <option>
                                            {item.IndustryName}
                                          </option>
                                        );
                                      }
                                    )
                                    : null}
                                </select>

                                <div className="prrorMsg">
                                  {this.state.perrors.industry}
                                </div>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="contactpointname"
                                  name="contactpointname"
                                  placeholder="Contact point Name*"
                                  type="text"
                                  maxLength="255"
                                  value={this.state.pfields.contactpointname}
                                  className={
                                    this.state.pclassn.contactpointname
                                  }
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.contactpointname}
                                </div>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="lastname"
                                  maxLength="255"
                                  name="lastname"
                                  placeholder="Last Name*"
                                  type="text"
                                  value={this.state.pfields.lastname}
                                  className={this.state.pclassn.lastname}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.lastname}
                                </div>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="position"
                                  name="position"
                                  placeholder="Position*"
                                  type="text"
                                  maxLength="255"
                                  value={this.state.pfields.position}
                                  className={this.state.pclassn.position}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.position}
                                </div>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="email"
                                  name="email"
                                  maxLength="255"
                                  placeholder="Email*"
                                  type="email"
                                  value={this.state.pfields.email}
                                  className={this.state.pclassn.email}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.email}
                                </div>
                              </div>

                              <div className="column col-12">
                                <PhoneInput
                                  id="phonenumber"
                                  name="phonenumber"
                                  maxLength="20"
                                  value={this.state.pfields.phonenumber}
                                  className={this.state.pclassn.phonenumber}
                                  placeholder="Mobile Number*"
                                  onChange={(e) =>
                                    (this.state.pfields.phonenumber = e)
                                  }
                                  onKeyUp={this.phandleKeyUpChange}
                                />

                                <div className="errorMsg">
                                  {this.state.perrors.phonenumber}
                                </div>
                              </div>

                              <div className="column col-12">
                                <p>
                                  Tell us more about your interest in
                                  sponsoring Top CEO:
                                </p>
                              </div>

                              <div className="column col-6">
                                <FloatingLabel
                                  id="tellus"
                                  name="tellus"
                                  placeholder="Tell us more about your interests"
                                  type="text"
                                  maxLength="255"
                                  value={this.state.pfields.tellus}
                                  className={this.state.pclassn.tellus}
                                  onChange={(evt) =>{
                                    this.setState(() => ({
                                        value: evt.currentTarget.value,
                                    }));
                                    this.phandleChange(evt);
                                    }
                                  }
                                  // onChange={this.phandleChange}
                                  onKeyUp={this.phandleKeyUpChange}
                                />
                                <div className="errorMsg">
                                  {this.state.perrors.tellus}
                                </div>
                              </div>

                              <div className="column col-6 file_upload">
                                <FloatingLabel
                                  id="complementary"
                                  name="files"
                                  maxLength="255"
                                  placeholder="Complementary information & attachments"
                                  type="file"
                                  value={this.state.pfields.complementary}
                                  className={this.state.pclassn.complementary}
                                  onChange={(evt) => {
                                    this.phandleChange(evt);
                                  }}
                                  onKeyUp={this.phandleKeyUpChange}
                                />
                              </div>

                              <div className="column col-12">
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="checkbox1"
                                    name="subscribecheck"
                                    value={this.state.pfields.subscribecheck}
                                    onChange={(e) => {
                                      this.phandleChange({
                                        target: {
                                          name: e.target.name,
                                          value: e.target.checked,
                                        },
                                      });
                                    }}
                                  />

                                  <label for="checkbox1">
                                    Subscribe to get updates on upcoming guest
                                    speakers, workshops and more!
                                  </label>
                                </div>

                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="mediaquest"
                                    name="mediaquest"
                                    value={this.state.pfields.mediaquest}
                                    onChange={(e) => {
                                      this.phandleChange({
                                        target: {
                                          name: e.target.name,
                                          value: e.target.checked,
                                        },
                                      });
                                    }}
                                  />

                                  <label for="mediaquest">
                                    Subscribe to receive updates from
                                    Mediaquest partners
                                  </label>
                                </div>
                              </div>

                              <div className="column col-12">
                                <div className="errorMsg">
                                  {this.state.formerror}
                                </div>

                                <button
                                  type="submit"
                                  className="btn"
                                  disabled={this.state.psubmitDisabled}
                                >
                                  <span>Submit</span>
                                </button>
                                <div
                                  className="errorMsg submit_err"
                                  style={divStyle}
                                >
                                  {this.state.psubmitDisabledText}
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    );
  }
}
export default Header;
