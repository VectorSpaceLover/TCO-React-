import React from "react";

import newsletter_arrow from "../images/newsletter_arrow.svg";

import fb from "../images/fb.svg";

import "../App.css";

import "./Footer.css";

import Sitemap from "../Screens/Sitemap";

import { Link, NavLink } from "react-router-dom";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";

const axios = require("axios");

const MODAL_OPEN_CLASS6 = "body--popup--open6";
const MODAL_OPEN_CLASS2 = "body--popup--open2";

var classn = [];
var errors = [];

class App extends React.Component {
  togglePopup6() {
    this.setState({ addClass6: !this.state.addClass6 });
  }
  togglePopup2() {
    this.setState({ addClass2: !this.state.addClass2 });
  }

  constructor(props) {
    super(props);

    this.state = {
      addClass6: false,
      fields: {},
      ErrorPost: [],
      classn: {},
      ThankyouPost: [],
      errors: {},
      Footer: [],
      addClass2: false,
      FooterMenu: [],

      FooterSocialicons: []
    };

    this.SubmitNewsLetterForm = this.SubmitNewsLetterForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);
  }

  componentWillMount() {
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/thankyou-messages",

      responseType: "json"
    })
      .then(response => {
        var Data = response.data;

        var ThankyouPost = [];

        Data.map((item, index) => {
          ThankyouPost.push(item);
        });

        this.setState({ ThankyouPost: ThankyouPost });
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/error-messages",

      responseType: "json"
    })
      .then(response => {
        var Data = response.data;

        var ErrorPost = [];

        Data.map((item, index) => {
          ErrorPost.push(item);
        });

        this.setState({ ErrorPost: ErrorPost });
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/footers",

      responseType: "json"
    })
      .then(response => {
        if (response.status == 200) {
          var Data = response.data;

          var Footer = [];

          Data.map((item, index) => {
            //  console.log(item.FooterContactText);

            Footer.push(item);
          });

          this.setState({ Footer: Footer });
        }
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/footer-menus",

      responseType: "json"
    })
      .then(response => {
        if (response.status == 200) {
          var Data = response.data;

          var FooterMenu = [];

          Data.map((item, index) => {
            FooterMenu.push(item);
          });

          this.setState({ FooterMenu: FooterMenu });
        }
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/footer-social-icons",

      responseType: "json"
    })
      .then(response => {
        if (response.status == 200) {
          var Data = response.data;

          var FooterSocialicons = [];

          Data.map((item, index) => {
            FooterSocialicons.push(item);
          });

          this.setState({ FooterSocialicons: FooterSocialicons });
        }
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({
      fields
    });
  }

  SubmitNewsLetterForm(e) {
    debugger;
    e.preventDefault();

    if (this.validateForm()) {
      let fields = this.state.fields;

      fields.TopCEONewsletter = true;

      this.setState({ fields: fields });

      const requestBody = {
        EmailAddress: fields.emailid,
        TopCEONewsletter: fields.TopCEONewsletter
      };

      axios({
        method: "POST",

        url: GLOBAL.SITE_URL + "/subscribe-newsletters",

        responseType: "json",
        data: requestBody
      })
        .then(response => {
          let url =
            GLOBAL.CRMAPIDATA.APIURL +
            "subscribers/5ddfbd7b0296c41925fcfd2eb86b2418.json";
          var username = GLOBAL.CRMAPIDATA.APIKey;
          var password = GLOBAL.CRMAPIDATA.APIPassword;
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
          );
          myHeaders.append("Content-type", "application/json; charset=UTF-8");
          var Data = {
            EmailAddress: fields.emailid,
            TopCEONewsletter: fields.TopCEONewsletter,
            Resubscribe: true,
            RestartSubscriptionBasedAutoresponders: true,
            ConsentToTrack: "Yes"
          };

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify(Data)
          };
          const proxyurl = "https://cors-anywhere.herokuapp.com/";

          fetch(proxyurl + url, requestOptions)
            .then(response => response.text())
            .then(result => {
              console.log(result);
              this.setState({ addClass2: true });

              fields["emailid"] = "";

              this.setState({ fields: fields });
            })
            .catch(error => {
              console.log(error);
              this.setState({ addClass6: true });
              console.log("Error");
            });
        })

        .catch(err => {
          console.log(err);
          this.setState({ addClass6: true });
          console.log("Error");
        });
    }
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

  validateForm() {
    let fields = this.state.fields;

    this.setState({ errors: [], classn: [] });

    let errors = [];

    let classn = [];

    let formIsValid = true;

    if (!fields["emailid"]) {
      formIsValid = false;

      errors["emailid"] = "Enter your email address";

      classn["emailid"] = "error";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;

        errors["emailid"] = "Enter valid email address";

        classn["emailid"] = "error";
      }
    }

    this.setState({
      errors: errors,

      classn: classn

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  render() {
    if (this.state.addClass2) {
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS6);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
    }

    return (
      <footer>
        <div className="container">
          <div className="footer_top">
            <div className="row">
              {this.state.Footer.map((item, index) => {
                if (item.SelectColumn == "Column1") {
                  return (
                    <div className="column col-4" key = {index}>
                      <h5>{item.Footertitle}</h5>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.FooterContactText
                        }}
                      ></div>

                      <a href={item.ButtinLink} target="_blank">
                        {item.ButtonText}
                      </a>
                    </div>
                  );
                }
              })}

              {this.state.Footer.map((item, index) => {
                if (item.SelectColumn == "Column2") {
                  return (
                    <div className="column col-4" key = {index}>
                      <h5>{item.Footertitle}</h5>

                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.FooterContactText
                        }}
                      ></div>

                      <a href={item.ButtinLink}>{item.ButtonText}</a>
                    </div>
                  );
                }
              })}

              <div className="column col-4">
                {this.state.Footer.map((item, index) => {
                  if (item.SelectColumn == "Column3") {
                    return (
                      <div key = {index}>
                        <h5>{item.Footertitle}</h5>

                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.FooterContactText
                          }}
                        ></div>

                        <div className="nesletter_form">
                          <form
                            method="post"
                            name="NewsLetterForm"
                            onSubmit={this.SubmitNewsLetterForm}
                            className="newsletter_form"
                            id="newsletter_form"
                          >
                            <input
                              type="email"
                              placeholder="Enter Email Address*"
                              name="emailid"
                              maxLength="255"
                              onChange={this.handleChange}
                              onKeyUp={this.handleKeyUpChange}
                            />

                            <button type="submit">
                              <img src={newsletter_arrow} />
                            </button>
                            <div className="errorMsg">
                              {this.state.errors.emailid}
                            </div>
                          </form>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="footer_bottm">
            <div className="row">
              <div className="column col-6 col-xs-12">
                <ul className="footer_menu">
                  {this.state.FooterMenu.map((item, index) => {
                    return (
                      <li key = {index}>
                        <NavLink to={"/" + item.Link}>{item.Title}</NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="column col-6 col-xs-12">
                <ul className="social_icons">
                  {this.state.FooterSocialicons.map((item, index) => {
                    return (
                      <li key = {index}>
                        <a href={item.LInk} target="_blank">
                          {item.Title == "Facebook" ? (
                            <img src={fb} height="15px" width="7px" />
                          ) : item.Title == "Twitter" ? (
                            <img src="twitter.svg" height="15px" width="18px" />
                          ) : item.Title == "Instagram" ? (
                            <img
                              src="instagram.svg"
                              height="15px"
                              width="18px"
                            />
                          ) : (
                            <img
                              src="linkedin.svg"
                              height="15px"
                              width="15px"
                            />
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {this.state.addClass6 ? (
          <div className="details_popup thank_you_popup attend_details_popup error_popup">
            <div className="all_popup">
              <div className="details_popup_content container">
                <button
                  onClick={this.togglePopup6.bind(this)}
                  className="details_popup_close"
                >
                  <img src={search_close} />
                </button>

                <div className="container attend_form_section">
                  <div className="row">
                    <div className="column col-12">
                      {this.state.ErrorPost.length > 0
                        ? this.state.ErrorPost.map((item, index) => {
                            return (
                              <div className="theme_selection_block">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                                <div
                                  className="thankyou_txt"
                                  dangerouslySetInnerHTML={{
                                    __html: item.Contant
                                  }}
                                ></div>
                                <a href={item.ButtonLink} className="btn">
                                  <span>{item.ButtonText}</span>
                                </a>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.addClass2 ? (
          <div className="details_popup thank_you_popup attend_details_popup ">
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
                    <div className="column col-12">
                      {this.state.ThankyouPost.length > 0
                        ? this.state.ThankyouPost.map((item, index) => {
                            return (
                              <div className="theme_selection_block">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                                <div className="thankyou_txt">
                                  <h3>Thank you for signing up to Top CEO!</h3>
                                  <p>
                                    We will be in touch with updates on the
                                    Conference & Awards ceremony
                                  </p>
                                </div>
                                <a href={item.ButtonLink} className="btn">
                                  <span>{item.ButtonText}</span>
                                </a>
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </footer>

      /*================================================================================================HTML============================================================================================*/
    );
  }
}

export default App;
