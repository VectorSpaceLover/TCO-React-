import React, { Component } from "react";

import "../App.css";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";

import payimg_img1 from "../images/payimg_img1.png";
import payimg_img2 from "../images/payimg_img2.png";
import payimg_img3 from "../images/payimg_img3.png";
import payimg_img4 from "../images/payimg_img4.png";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";
const MODAL_OPEN_CLASS1 = "body--popup--open1";
const MODAL_OPEN_CLASS2 = "body--payment--popup--open";
class Attend_new extends Component {
  componentDidMount() {
    document.title = "Attend_new";
  }

  constructor(props) {
    super(props);

    this.state = {
      fields: {},

      rfields: {},

      errors: {},

      rerrors: {},

      classn: {},

      rclassn: {},

      checkd: false,

      addClass: false,
      addClass1: false,
      addClass2: false,
      AttendPost: [],
      SAttendPost: [],
    };

    this.handleChange = this.handleChange.bind(this);

    // this.submituserContactForm = this.submituserContactForm.bind(this);

    this.rhandleChange = this.rhandleChange.bind(this);

    //	this.submituserRegisterForm = this.submituserRegisterForm.bind(this);
  }

  componentWillMount() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Basic a2VKNUNkV0NFSlFjK2I1MEMvam9VVFJONkpTT0p0bjlrenlSY1pCVHBxaUR5bExJRjdGVkFXdVR2MVQvQ081bkF1N2dxLzdtSTgza1JXQzJvbVE1MmhVNUxyeGRXbXVwSFYrbFdIeXNNYUg0RXBNdURTSUsrVlZzS3hhYnM1YWxoR2d2R2VXNkkvK253L3JjVExkWkZRPT06eA=="
    );

    var requestOptions = {
      headers: myHeaders,
    };

    fetch("https://api.createsend.com/api/v3.2/clients.json", requestOptions)
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/attend-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var AttendPost = [];

        Data.map((item, index) => {
          AttendPost.push(item);
        });

        this.setState({ AttendPost: AttendPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/attend-selection-sections",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SAttendPost = [];

        Data.map((item, index) => {
          SAttendPost.push(item);
        });

        this.setState({ SAttendPost: SAttendPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  togglePopup(e) {
    var list_id = e.currentTarget.dataset.id;
    this.state.rfields.TicketType = list_id;
    this.setState({ TicketType: list_id });
    this.setState({ addClass: !this.state.addClass });
  }

  togglePopup1(e) {
    this.setState({ addClass1: !this.state.addClass1 });
  }

  togglePopup2(e) {
    this.setState({ addClass2: !this.state.addClass2 });
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.validationue;

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

  submituserContactForm = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      let fields = {};

      fields["inquiry"] = "";

      fields["emailid"] = "";

      fields["username"] = "";

      fields["lastname"] = "";

      fields["company"] = "";

      fields["title"] = "";

      fields["industry"] = "";

      fields["country"] = "";

      fields["mobileno"] = "";

      fields["invitecode"] = "";

      fields["cardnumber"] = "";

      this.setState({ fields: fields });

      //	alert("Form submitted");
    }
  };

  submituserRegisterForm = (e) => {
    e.preventDefault();

    if (this.rvalidateForm()) {
      debugger;

      let rfields = this.state.rfields;

      console.log("rfields");
      console.log(rfields);

      // rfields["inquiry"] = "";

      // rfields["emailid"] = "";

      // rfields["username"] = "";

      // rfields["lastname"] = "";

      // rfields["company"] = "";

      // rfields["title"] = "";

      // rfields["industry"] = "";

      // rfields["country"] = "";

      // rfields["mobileno"] = "";

      // rfields["invitecode"] = "";

      rfields["cardnumber"] = "";

      this.setState({ rfields: rfields });

      alert("Form submitted");

      var subscribecheck = rfields.subscribecheck == "" ? true : false;
      var mediaquest = rfields.mediaquest == "" ? true : false;

      const requestBody = {
        First_Name: rfields.username,
        LastName: rfields.lastname,
        Email: rfields.emailid,
        Company: rfields.company,
        Title: rfields.title,
        Industry: rfields.industry,
        Country: rfields.country,
        MobileNumber: rfields.mobileno,
        SubscribetoUpdates: subscribecheck,
        SubscribetoMediaQuest: mediaquest,
        // TicketType: "test",
        // TicketValue: "test"
      };

      axios({
        method: "POST",

        url: GLOBAL.SITE_URL + "/event-attendees",

        responseType: "json",
        data: requestBody,
      })
        .then((response) => {
          var Data = response.data;

          var AttendPost = [];

          Data.map((item, index) => {
            AttendPost.push(item);
          });

          this.setState({ AttendPost: AttendPost });
        })

        .catch((err) => {
          console.log(err);

          console.log("Error");
        });

      var myHeaders = new Headers();
      myHeaders.append(
        "Authorization",
        "Basic a2VKNUNkV0NFSlFjK2I1MEMvam9VVFJONkpTT0p0bjlrenlSY1pCVHBxaUR5bExJRjdGVkFXdVR2MVQvQ081bkF1N2dxLzdtSTgza1JXQzJvbVE1MmhVNUxyeGRXbXVwSFYrbFdIeXNNYUg0RXBNdURTSUsrVlZzS3hhYnM1YWxoR2d2R2VXNkkvK253L3JjVExkWkZRPT06eA=="
      );

      var requestOptions = {
        method: "GET",
        mode: "no-cors",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://api.createsend.com/api/v3.2/clients.json?pretty=true",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };

  validateForm() {
    let fields = this.state.fields;

    let errors = {};

    let classn = {};

    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;

      errors["username"] = "*Enter your username.";

      classn["username"] = "error";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["username"] = "*Enter alphabet characters only.";

        classn["username"] = "error";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;

      errors["emailid"] = "*Enter your email-ID";

      classn["emailid"] = "error";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;

        errors["emailid"] = "*Enter valid email-ID";

        classn["emailid"] = "error";
      }
    }

    if (!fields["mobileno"]) {
      formIsValid = false;

      errors["mobileno"] = "Enter your mobile no.";

      classn["mobileno"] = "error";
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (
        !fields["mobileno"].match(
          /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-\s]?){2}\d{4}/g
        )
      ) {
        formIsValid = false;

        errors["mobileno"] = "Invalid Mobile Number";

        classn["mobileno"] = "error";
      }
    }

    this.setState({
      errors: errors,

      classn: classn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  rvalidateForm() {
    let rfields = this.state.rfields;

    let rerrors = {};

    let rclassn = {};

    let formIsValid = true;

    if (!rfields["username"]) {
      formIsValid = false;

      rerrors["username"] = "*Enter your username.";

      rclassn["username"] = "error";
    }

    if (typeof rfields["username"] !== "undefined") {
      if (!rfields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["username"] = "*Enter alphabet characters only.";

        rclassn["username"] = "error";
      }
    }

    if (!rfields["emailid"]) {
      formIsValid = false;

      rerrors["emailid"] = "*Enter your email-ID";

      rclassn["emailid"] = "error";
    }

    if (typeof rfields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(rfields["emailid"])) {
        formIsValid = false;

        rerrors["emailid"] = "*Enter valid email-ID";

        rclassn["emailid"] = "error";
      }
    }

    if (!rfields["mobileno"]) {
      formIsValid = false;

      rerrors["mobileno"] = "Enter your mobile no.";

      rclassn["mobileno"] = "error";
    }

    if (typeof rfields["mobileno"] !== "undefined") {
      if (
        !rfields["mobileno"].match(
          /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-\s]?){2}\d{4}/g
        )
      ) {
        //     if (!rfields["mobileno"].match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
        formIsValid = false;

        rerrors["mobileno"] = "Invalid Mobile Number";

        rclassn["mobileno"] = "error";
      }
    }

    this.setState({
      rerrors: rerrors,

      rclassn: rclassn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  checkbox() {
    this.setState({ checkd: !this.state.checkd });
  }

  render() {
    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if (this.state.addClass1) {
      document.body.classList.add(MODAL_OPEN_CLASS1);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS1);
    }

    if (this.state.addClass2) {
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if ((document.title = "Attend")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }

    return (
      <div className="main_content">
        {this.state.AttendPost.length > 0
          ? this.state.AttendPost.map((item, index) => {
            if (item.SelectSection == "Section1") {
              return (
                <section className="theme_banner_section attend_banner_section">
                  <img src={GLOBAL.SITE_URL + item.Image.url} />

                  <div className="theme_banner_content">
                    <div className="container">
                      <h2>{item.Title}</h2>

                      <p>{item.SubTitle}</p>

                      <a href={item.ButtonLink} className="btn">
                        <span>{item.ButtonText}</span>
                      </a>
                    </div>
                  </div>
                </section>
              );
            }
          })
          : null}

        <section className="theme_selection_section attend_main_section">
          <div className="theme_selection_bg">
            <div className="attend_top_section">
              {this.state.AttendPost.length > 0
                ? this.state.AttendPost.map((item, index) => {
                  if (item.SelectSection == "Section2") {
                    return (
                      <div className="container">
                        <h2>
                          <span>{item.SubTitle}</span>
                          {item.Title}
                        </h2>

                        <div
                          className="top_text_content"
                          dangerouslySetInnerHTML={{ __html: item.Content }}
                        ></div>
                      </div>
                    );
                  }
                })
                : null}
            </div>

            <div className="attend_table_section">
              <div className="container">
                <div className="snip1214">
                  {this.state.SAttendPost.length > 0
                    ? this.state.SAttendPost.map((item, index) => {
                      return (
                        <div
                          className={item.id == 2 ? "featured plan" : "plan"}
                        >
                          {item.id == 2 ? (
                            <h3 className="plan-title">Most Popular</h3>
                          ) : (
                            ""
                          )}

                          <div className="plan-cost">
                            <span className="plan-type">{item.Title}</span>
                            <span className="plan-price">
                                {item.SubTitle}
                              </span>
                          </div>

                          <ul className="plan-features">
                            <li>
                              <img
                                src={GLOBAL.SITE_URL + item.InfoImage1.url}
                              />
                              {item.InfoText1}
                            </li>
                            <li>
                              <img
                                src={GLOBAL.SITE_URL + item.InfoImage2.url}
                              />
                              {item.InfoText2}
                            </li>
                            <li>
                              <img
                                src={GLOBAL.SITE_URL + item.InfoImage3.url}
                              />
                              {item.InfoText3}
                            </li>
                            <li>
                              <img
                                src={GLOBAL.SITE_URL + item.InfoImage4.url}
                              />
                              {item.InfoText4}
                            </li>
                            <li>
                              <img
                                src={GLOBAL.SITE_URL + item.InfoImage5.url}
                              />
                              {item.InfoText5}
                            </li>
                            {/* <li><img src={ GLOBAL.SITE_URL + item.InfoImage6.url} />{item.InfoText6}</li>*/}
                          </ul>

                          <div className="plan-select">
                            <a
                              data-id={item.id}
                              onClick={this.togglePopup.bind(this)}
                              className="btn"
                            >
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      );
                    })
                    : null}

                  {this.state.AttendPost.length > 0
                    ? this.state.AttendPost.map((item, index) => {
                      if (item.Title == "Selection Bottom Text") {
                        return (
                          <div
                            dangerouslySetInnerHTML={{ __html: item.Content }}
                          ></div>
                        );
                      }
                    })
                    : null}
                </div>
              </div>
            </div>

            <div className="attend_form_section">
              <form
                method="post"
                name="userContactForm"
                onSubmit={this.submituserContactForm}
                className="contact_from"
              >
                <div className="container">
                  <h2>Already have a ticket invite code?</h2>

                  <p className="top_text_content">
                    If you’ve been invited, you will need to register to receive
                    your e-ticket.
                  </p>

                  <div className="form_section">
                    <div className="row">
                      <div className="column col-6">
                        <FloatingLabel
                          id="invitecode"
                          name="invitecode"
                          placeholder="Invite Code"
                          type="text"
                          value={this.state.fields.invitecode}
                          className={this.state.classn.invitecode}
                          onChange={(evt) =>
                            this.setState(() => ({
                              value: evt.currentTarget.value,
                            }))
                          }
                          onChange={this.handleChange}
                        />
                      </div>

                      <div className="column col-12">
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            id="checkbox"
                            name="subscribecheck"
                            value={this.state.fields.subscribecheck}
                            onChange={this.handleChange}
                            onClick={this.checkbox.bind(this)}
                          />

                          <label for="checkbox">
                            Subscribe to get updates on upcoming guest speakers,
                            workshops and more!
                          </label>
                        </div>

                        {/* <input type="submit" className="btn" value="Register & Get your Ticket" /> */}

                        <button
                          type="submit"
                          className="btn"
                          onClick={this.togglePopup1.bind(this)}
                        >
                          <span>Register & Get your Ticket</span>
                        </button>

                        <button
                          type="submit"
                          className="btn"
                          onClick={this.togglePopup2.bind(this)}
                        >
                          <span>Payment</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {this.state.addClass ? (
          <div className="details_popup  attend_details_popup">
            <div className="details_popup_content container">
              <button
                onClick={this.togglePopup.bind(this)}
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
                        onSubmit={this.submituserRegisterForm}
                        className="contact_from"
                      >
                        <div className="container">
                          <h3>Finalize Registration</h3>

                          <p>
                            Finalize the registration and wait for approval as
                            soon as possible.
                          </p>
                          <input
                            type="hidden"
                            id="TicketType"
                            value={this.state.TicketType}
                            name="TicketType"
                          />
                          <div className="row">
                            <div className="column col-6">
                              <FloatingLabel
                                id="username"
                                name="username"
                                placeholder="First Name"
                                type="text"
                                value={this.state.rfields.username}
                                className={this.state.rclassn.username}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />

                              <div className="errorMsg">
                                {this.state.rerrors.username}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                type="text"
                                value={this.state.rfields.lastname}
                                className={this.state.rclassn.lastname}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />

                              <div className="errorMsg">
                                {this.state.rerrors.lastname}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="email"
                                name="emailid"
                                placeholder="Email Address"
                                type="email"
                                value={this.state.rfields.emailid}
                                className={this.state.rclassn.emailid}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />

                              <div className="errorMsg">
                                {this.state.rerrors.emailid}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="company"
                                name="company"
                                placeholder="Company"
                                type="text"
                                value={this.state.rfields.company}
                                className={this.state.rclassn.company}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="title"
                                name="title"
                                placeholder="Title"
                                type="text"
                                value={this.state.rfields.title}
                                className={this.state.rclassn.title}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />
                            </div>

                            <div className="column col-6">
                              <select
                                name="industry"
                                value={this.state.rfields.industry}
                                onChange={this.rhandleChange}
                                placeholder="Industry"
                              >
                                <option>Industry</option>
                              </select>
                            </div>

                            <div className="column col-6">
                              <select
                                name="country"
                                value={this.state.rfields.country}
                                onChange={this.rhandleChange}
                                placeholder="Country"
                              >
                                <option>Country</option>
                              </select>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="mobileno"
                                name="mobileno"
                                placeholder="Title"
                                type="text"
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                placeholder="Mobile Number"
                                value={this.state.rfields.mobileno}
                                className={this.state.rclassn.mobileno}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.rhandleChange}
                              />

                              <div className="errorMsg">
                                {this.state.rerrors.mobileno}
                              </div>
                            </div>

                            <div className="column col-12">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  id="checkbox1"
                                  name="subscribecheck"
                                  value={this.state.rfields.subscribecheck}
                                  onChange={this.rhandleChange}
                                  onClick={this.checkbox.bind(this)}
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
                                  value={this.state.rfields.mediaquest}
                                  onChange={this.rhandleChange}
                                  onClick={this.checkbox.bind(this)}
                                />

                                <label for="mediaquest">
                                  Subscribe to get udpated from other MediaQuest
                                  Events and Publications
                                </label>
                              </div>

                              {/* <input type="submit" className="btn" value="Submit" /> */}

                              <button type="submit" className="btn">
                                <span>Submit</span>
                              </button>
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
        ) : null}

        {this.state.addClass1 ? (
          <div className="details_popup  attend_details_popup ">
            <div className="details_popup_content container">
              <button
                onClick={this.togglePopup1.bind(this)}
                className="details_popup_close"
              >
                <img src={search_close} />
              </button>

              <div className="container attend_form_section">
                <div className="row">
                  <div className="column col-12">
                    <div className="theme_selection_block">
                      <form
                        method="post"
                        name="userContactForm"
                        onSubmit={this.submituserContactForm}
                        className="contact_from"
                      >
                        <div className="container">
                          <input
                            type="hidden"
                            id="TicketType"
                            value={this.state.TicketType}
                            name="TicketType"
                          />
                          <div className="row">
                            <div className="column col-6">
                              <FloatingLabel
                                id="username"
                                name="username"
                                placeholder="First Name"
                                type="text"
                                value={this.state.fields.username}
                                className={this.state.classn.username}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />

                              <div className="errorMsg">
                                {this.state.errors.username}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="lastname"
                                name="lastname"
                                placeholder="Last Name"
                                type="text"
                                value={this.state.fields.lastname}
                                className={this.state.classn.lastname}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />

                              <div className="errorMsg">
                                {this.state.errors.lastname}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="email"
                                name="emailid"
                                placeholder="Email Address"
                                type="email"
                                value={this.state.fields.emailid}
                                className={this.state.classn.emailid}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />

                              <div className="errorMsg">
                                {this.state.errors.emailid}
                              </div>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="company"
                                name="company"
                                placeholder="Company"
                                type="text"
                                value={this.state.fields.company}
                                className={this.state.classn.company}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="title"
                                name="title"
                                placeholder="Title"
                                type="text"
                                value={this.state.fields.title}
                                className={this.state.classn.title}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />
                            </div>

                            <div className="column col-6">
                              <select
                                name="industry"
                                value={this.state.fields.industry}
                                onChange={this.handleChange}
                                placeholder="Industry"
                              >
                                <option>Industry</option>
                              </select>
                            </div>

                            <div className="column col-6">
                              <select
                                name="country"
                                value={this.state.fields.country}
                                onChange={this.handleChange}
                                placeholder="Country"
                              >
                                <option>Country</option>
                              </select>
                            </div>

                            <div className="column col-6">
                              <FloatingLabel
                                id="mobileno"
                                name="mobileno"
                                type="text"
                                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                                placeholder="Mobile Number"
                                value={this.state.fields.mobileno}
                                className={this.state.classn.mobileno}
                                onChange={(evt) =>
                                  this.setState(() => ({
                                    value: evt.currentTarget.value,
                                  }))
                                }
                                onChange={this.handleChange}
                              />

                              <div className="errorMsg">
                                {this.state.errors.mobileno}
                              </div>
                            </div>

                            <div className="column col-12">
                              <div className="checkbox">
                                <input
                                  type="checkbox"
                                  id="checkbox"
                                  name="subscribecheck"
                                  value={this.state.fields.subscribecheck}
                                  onChange={this.handleChange}
                                  onClick={this.checkbox.bind(this)}
                                />

                                <label for="checkbox">
                                  Subscribe to get updates on upcoming guest
                                  speakers, workshops and more!
                                </label>
                              </div>

                              {/* <input type="submit" className="btn" value="Register & Get your Ticket" /> */}

                              <button type="submit" className="btn">
                                <span>Register & Get your Ticket</span>
                              </button>
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
        ) : null}

        {this.state.addClass2 ? (
          <div className="details_popup  payment_popup">
            <div className="all_popup">
              <div className="details_popup_content container">
                <button
                  onClick={this.togglePopup2.bind(this)}
                  className="details_popup_close"
                >
                  <img src={search_close} />
                </button>

                <div className="container attend_form_section">
                  <div className="row">
                    <div className="column col-7">
                      <div className="theme_selection_block">
                        <form
                          method="post"
                          name="userContactForm"
                          onSubmit={this.submituserContactForm}
                          className="contact_from"
                        >
                          <div className="container">
                            <input
                              type="hidden"
                              id="TicketType"
                              value={this.state.TicketType}
                              name="TicketType"
                            />
                            <div className="row">
                              <div className="column col-12">
                                <h3>Payment</h3>
                              </div>
                              <div className="column col-12">
                                <FloatingLabel
                                  id="cardnumber"
                                  name="cardnumber"
                                  placeholder="Card Number"
                                  type="text"
                                  value={this.state.fields.cardnumber}
                                  className={this.state.classn.cardnumber}
                                  onChange={(evt) =>
                                    this.setState(() => ({
                                      value: evt.currentTarget.value,
                                    }))
                                  }
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="column col-4">
                                <select
                                  name="expirymonth"
                                  value={this.state.fields.industry}
                                  onChange={this.handleChange}
                                  placeholder="Expiry Month"
                                >
                                  <option>Expiry Month</option>
                                </select>
                              </div>

                              <div className="column col-4">
                                <select
                                  name="expiryyear"
                                  value={this.state.fields.expiryyear}
                                  onChange={this.handleChange}
                                  placeholder="Expiry Year"
                                >
                                  <option>Expiry Year</option>
                                </select>
                              </div>

                              <div className="column col-4">
                                <FloatingLabel
                                  id="securitycode"
                                  name="securitycode"
                                  placeholder="Security Code"
                                  type="text"
                                  value={this.state.fields.securitycode}
                                  className={this.state.classn.securitycode}
                                  onChange={(evt) =>
                                    this.setState(() => ({
                                      value: evt.currentTarget.value,
                                    }))
                                  }
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="column col-12">
                                <FloatingLabel
                                  id="nameoncard"
                                  name="nameoncard"
                                  placeholder="Name on Card"
                                  type="text"
                                  value={this.state.fields.nameoncard}
                                  className={this.state.classn.nameoncard}
                                  onChange={(evt) =>
                                    this.setState(() => ({
                                      value: evt.currentTarget.value,
                                    }))
                                  }
                                  onChange={this.handleChange}
                                />
                              </div>

                              <div className="column col-12">
                                <button type="submit" className="btn">
                                  <span>Pay Now</span>
                                </button>
                              </div>
                              <div className="column col-12">
                                <p>We accept</p>
                                <ul>
                                  <li>
                                    <img src={payimg_img1} />
                                  </li>
                                  <li>
                                    <img src={payimg_img2} />
                                  </li>
                                  <li>
                                    <img src={payimg_img3} />
                                  </li>
                                  <li>
                                    <img src={payimg_img4} />
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="column col-5">
                      <div className="order_content">
                        <h5>Order Summary</h5>
                        <h6>2 day - Conference & Award Ceremony</h6>
                        <p>
                          Quantity x <span>1</span>
                        </p>
                        <div className="total">
                          <div className="total_text">Total</div>
                          <div className="total_price">$250</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Attend_new;
