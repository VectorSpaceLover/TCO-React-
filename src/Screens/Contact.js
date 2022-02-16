import React, { Component } from "react";

import "../App.css";

import { Helmet } from "react-helmet";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";
import countryList from "react-select-country-list";
import TextField from "@material-ui/core/TextField";

import "react-phone-number-input/style.css";

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";

const MODAL_OPEN_CLASS2 = "body--popup--open2";

var OptionData = [];
var classn = [];
var errors = [];
class Contact extends Component {
  state = { didMount: false };
  componentDidMount() {
    document.title = "Contact - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }
  togglePopup2() {
    this.setState({ addClass2: !this.state.addClass2 });
  }

  togglePopup6() {
    this.setState({ addClass6: !this.state.addClass6 });
  }

  constructor() {
    super();

    this.state = {
      seo: [],
      siteurl: "",
      fields: {},

      errors: {},

      classn: {},

      checkd: false,

      addClass6: false,
      addClass2: false,
      ErrorPost: [],

      ContactPost: [],

      IndustryName: [],

      ThankyouPost: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);

    this.submituserContactForm = this.submituserContactForm.bind(this);
  }

  componentWillMount() {
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/seos",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var seo = [];

        Data.map((item, index) => {
          seo.push(item);
        });

        this.setState({ seo: seo });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    OptionData = countryList().getData();

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/thankyou-messages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var ThankyouPost = [];

        Data.map((item, index) => {
          ThankyouPost.push(item);
        });

        this.setState({ ThankyouPost: ThankyouPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // contact-pages

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/contact-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var ContactPost = [];

        Data.map((item, index) => {
          ContactPost.push(item);
        });

        this.setState({ ContactPost: ContactPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/industry-names",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var IndustryName = [];

        Data.map((item, index) => {
          IndustryName.push(item);
        });

        this.setState({ IndustryName: IndustryName });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/error-messages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var ErrorPost = [];

        Data.map((item, index) => {
          ErrorPost.push(item);
        });

        this.setState({ ErrorPost: ErrorPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({
      fields,
    });
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

  submituserContactForm(e) {
    e.preventDefault();

    if (this.validateForm()) {
      let fields = this.state.fields;

      this.setState({ fields: fields });

      var subscribecheck = fields.subscribecheck == true ? true : false;
      var mediaquest = fields.mediaquest == true ? true : false;

      var MobileNumber = fields.mobileno;
      if (MobileNumber.indexOf("+") < 0) {
        MobileNumber = "+" + MobileNumber;
      }

      const requestBody = {
        SubjectofInquiry: fields.inquiry,
        FirstName: fields.username,
        LastName: fields.lastname,
        EmailAddress: fields.emailid,
        Company: fields.company,
        Title: fields.title,
        Industry: fields.industry,
        Country: fields.country,
        MobileNumber: MobileNumber,
        SubscribeTo: subscribecheck,
        SubscribetoMediaQuest: mediaquest,
        Writeyourmessage: fields.message,
      };

      axios({
        method: "POST",

        url: GLOBAL.SITE_URL + "/contact-forms",

        responseType: "json",
        data: requestBody,
      })
        .then((response) => {
          // var raw = JSON.stringify(requestBody);

          // var requestOptions = {
          //   method: "POST",
          //   headers: myHeaders,
          //   body: raw,
          //   mode: "no-cors"
          // };
          /* code for store data in cms start */
          /*Contact form (http://3.20.69.77:3000/contact) start*/
          /* list id : d6f217180a8cb171483fd920243ed7c3 */

          let url =
            GLOBAL.CRMAPIDATA.APIURL +
            "subscribers/d6f217180a8cb171483fd920243ed7c3.json";
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
            name: fields.username + " " + fields.lastname,
            CustomFields: [
              { key: "LastName", value: fields.lastname },
              { key: "SubjectofInquiry", value: fields.inquiry },
              { key: "Company", value: fields.company },
              { key: "Country", value: fields.country },
              { key: "MobileNumber", value: MobileNumber },
              { key: "Title", value: fields.title },
              { key: "Industry", value: fields.industry },
              { key: "Writeyourmessage", value: fields.message },
              { key: "SubscribeTo", value: subscribecheck },
              { key: "SubscribetoMediaQuest", value: mediaquest },
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
              this.setState({ addClass2: true });
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

              fields["message"] = "";

              this.setState({ fields: fields });
            })
            .catch((error) => {
              console.log("error", error);
              console.log(error);
              this.setState({ addClass6: true });
              console.log("Error");
            });

          // fetch(url, {
          //   method: 'POST',

          //   body: JSON.stringify({
          //       EmailAddress:fields.emailid,
          //       name:fields.username+' '+fields.lastname,
          //       CustomFields:[{"key":"LastName","value":fields.lastname},
          //       {"key":"SubjectofInquiry","value":fields.inquiry},
          //       {"key":"Company","value":fields.company},
          //       {"key":"Country","value":fields.country},
          //       {"key":"MobileNumber","value":MobileNumber},
          //       {"key":"Title","value":fields.title},
          //       {"key":"Industry","value":fields.industry},
          //       {"key":"Writeyourmessage","value":fields.message},
          //       {"key":"SubscribeTo","value":subscribecheck},
          //       {"key":"SubscribetoMediaQuest","value":mediaquest}
          //       ],

          //       Resubscribe:true,
          //       RestartSubscriptionBasedAutoresponders:true,
          //       ConsentToTrack:"Yes"
          //   }),
          //   credentials: 'include',
          //   mode: 'no-cors',
          //   headers: {
          //     "Content-type": "application/json; charset=UTF-8",
          //     "Authorization":"Basic " + btoa('username:password'),
          //     "Access-Control-Allow-Headers":"Content-Type",
          //       "Accept":"application/json","Access-Control-Allow-Origin":"*",
          //       "Cache-Control": "no-cache",
          //       "Access-Control-Allow-Methods": 'GET,POST'
          //   }
          // }).then(response => {
          //     this.setState({ addClass2: true });
          //     let fields = {};

          //     fields["inquiry"] = "";

          //     fields["emailid"] = "";

          //     fields["username"] = "";

          //     fields["lastname"] = "";

          //     fields["company"] = "";

          //     fields["title"] = "";

          //     fields["industry"] = "";

          //     fields["country"] = "";

          //     fields["mobileno"] = "";

          //     fields["message"] = "";

          //     this.setState({ fields: fields });
          //   }).catch(error => {
          //     console.log(error);
          //     this.setState({ addClass6: true });
          //     console.log("Error");
          //   });
          /*Contact form (http://3.20.69.77:3000/contact) end*/
          /* code for store data in cms end */
        })

        .catch((err) => {
          console.log(err);
          this.setState({ addClass6: true });
          console.log("Error");
        });
    }
  }

  validateForm() {
    let fields = this.state.fields;

    this.setState({ errors: [], classn: [] });

    let errors = [];

    let classn = [];

    let formIsValid = true;

    if (!fields["inquiry"]) {
      formIsValid = false;

      errors["inquiry"] = "*Select Inquiry";

      classn["inquiry"] = "error";
    }

    if (!fields["username"]) {
      formIsValid = false;

      errors["username"] = "Enter your First Name.";

      classn["username"] = "error";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["username"] = "Enter alphabet characters only.";

        classn["username"] = "error";
      }
    }

    if (!fields["emailid"]) {
      formIsValid = false;

      errors["emailid"] = "Enter your email-ID";

      classn["emailid"] = "error";
    }

    if (typeof fields["emailid"] !== "undefined") {
      //regular exUpion for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fields["emailid"])) {
        formIsValid = false;

        errors["emailid"] = "Enter valid email-ID";

        classn["emailid"] = "error";
      }
    }

    if (!fields["mobileno"]) {
      formIsValid = false;

      errors["mobileno"] = "Enter your mobile no.";

      classn["mobileno"] = "error";
    }

    if (typeof fields["mobileno"] !== "undefined") {
      if (isValidPhoneNumber(fields["mobileno"]) === false) {
        formIsValid = false;

        errors["mobileno"] = "Invalid Mobile Number";

        classn["mobileno"] = "error";
      }
    }

    if (!fields["message"]) {
      formIsValid = false;

      errors["message"] = "Enter your message";

      classn["message"] = "error";
    }

    this.setState({
      errors: errors,

      classn: classn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  checkbox() {
    this.setState({ checkd: !this.state.checkd });
  }

  render() {
    if ((document.title = "Contact - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }

    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }
    if (this.state.addClass2) {
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Contact") {
                return (
                  <Helmet>
                    <title>Top CEO </title>
                    <meta name="description" content={item.Description} />
                    <meta name="keywords" content={item.keywords} />
                    <meta
                      name="title"
                      property="og:title"
                      content={item.Title}
                    />
                    <meta
                      name="image"
                      property="og:image"
                      content={item.Image}
                    />
                    <meta
                      name="description"
                      property="og:description"
                      content={item.Description}
                    />
                    <meta
                      name="url"
                      property="og:url"
                      content={siteurl + "/contact"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.ContactPost.length > 0
            ? this.state.ContactPost.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section contact_banner_section">
                    <img src={GLOBAL.SITE_URL + item.Image.url} />

                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.Title}</h1>
                      </div>
                    </div>
                  </section>
                );
              }
            })
            : null}

          <section className="theme_selection_section planyourtrip_main_section">
            <div className="theme_selection_bg" id="contact_scroll">
              <div className="container">
                {this.state.ContactPost.length > 0
                  ? this.state.ContactPost.map((item, index) => {
                    if (item.SelectSection == "Section2") {
                      return (
                        <div>
                          <h2>
                            <span>{item.SubTitle}</span>
                            {item.Title}
                          </h2>

                          <p className="top_text_content" />
                        </div>
                      );
                    }
                  })
                  : null}

                <form
                  method="post"
                  name="userContactForm"
                  onSubmit={this.submituserContactForm}
                  className="contact_from"
                  id="contact_us"
                >
                  <div className="row">
                    <div className="column col-6">
                      <FloatingLabel
                        id="inquiry"
                        name="inquiry"
                        placeholder="Subject of Inquiry*"
                        type="text"
                        maxLength="255"
                        value={this.state.fields.inquiry}
                        className={this.state.classn.username}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />

                      <div className="errorMsg">
                        {this.state.errors.inquiry}
                      </div>
                    </div>

                    <div className="column col-6">
                      <FloatingLabel
                        id="email"
                        name="emailid"
                        placeholder="Email Address*"
                        type="email"
                        maxLength="255"
                        value={this.state.fields.emailid}
                        className={this.state.classn.emailid}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />

                      <div className="errorMsg">
                        {this.state.errors.emailid}
                      </div>
                    </div>

                    <div className="column col-6">
                      <FloatingLabel
                        id="username"
                        name="username"
                        placeholder="First Name*"
                        type="text"
                        maxLength="255"
                        value={this.state.fields.username}
                        className={this.state.classn.username}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
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
                        maxLength="255"
                        value={this.state.fields.lastname}
                        className={this.state.classn.lastname}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />

                      <div className="errorMsg">
                        {this.state.errors.lastname}
                      </div>
                    </div>

                    <div className="column col-6">
                      <FloatingLabel
                        id="company"
                        name="company"
                        placeholder="Company"
                        type="text"
                        maxLength="255"
                        value={this.state.fields.company}
                        className={this.state.classn.company}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />
                      <div className="errorMsg">
                        {this.state.errors.company}
                      </div>
                    </div>

                    <div className="column col-6">
                      <FloatingLabel
                        id="title"
                        name="title"
                        placeholder="Title"
                        type="text"
                        maxLength="255"
                        value={this.state.fields.title}
                        className={this.state.classn.title}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />
                      <div className="errorMsg">{this.state.errors.title}</div>
                    </div>

                    <div className="column col-6">
                      <select
                        name="industry"
                        value={this.state.fields.industry}
                        onChange={this.handleChange}
                      >
                        <option>Industry</option>
                        {this.state.IndustryName.length > 0
                          ? this.state.IndustryName.map((item, index) => {
                            return <option>{item.IndustryName}</option>;
                          })
                          : null}
                      </select>
                    </div>

                    <div className="column col-6">
                      <select
                        name="country"
                        value={this.state.fields.country}
                        onChange={this.handleChange}
                      >
                        <option>Country</option>
                        {OptionData.length > 0
                          ? OptionData.map((item, index) => {
                            return (
                              <option val={item.label}>{item.label}</option>
                            );
                          })
                          : null}
                      </select>
                    </div>

                    <div className="column col-12 contact_phone">
                      <PhoneInput
                        id="mobileno"
                        name="mobileno"
                        value={this.state.fields.mobileno}
                        className={this.state.classn.mobileno}
                        placeholder="Mobile Number*"
                        maxLength="20"
                        onChange={(e) => (this.state.fields.mobileno = e)}
                        onKeyUp={this.handleKeyUpChange}
                      />

                      <div className="errorMsg">
                        {this.state.errors.mobileno}
                      </div>
                    </div>

                    <div className="column col-12">
                      <TextField
                        id="message"
                        name="message"
                        label="Write your message*"
                        placeholder="Write your message*"
                        multiline
                        rows={2}
                        value={this.state.fields.message}
                        className={this.state.classn.message}
                        onChange={(evt) =>
                          this.setState(() => ({
                            value: evt.currentTarget.value,
                          }))
                        }
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUpChange}
                      />

                      <div className="errorMsg">
                        {this.state.errors.message}
                      </div>
                    </div>

                    <div className="column col-12">
                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id="checkbox"
                          name="subscribecheck"
                          value={this.state.fields.subscribecheck}
                          onChange={(e) => {
                            this.handleChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            });
                          }}
                        />

                        <label for="checkbox">
                          Subscribe to get updates on upcoming guest speakers,
                          workshops and more!
                        </label>
                      </div>

                      <div className="checkbox">
                        <input
                          type="checkbox"
                          id="mediaquest"
                          name="mediaquest"
                          value={this.state.fields.mediaquest}
                          onChange={(e) => {
                            this.handleChange({
                              target: {
                                name: e.target.name,
                                value: e.target.checked,
                              },
                            });
                          }}
                          onClick={this.checkbox.bind(this)}
                        />

                        <label for="mediaquest">
                          Subscribe to receive updates from Special Edition partners
                        </label>
                      </div>

                      {/* <input type="submit" className="btn" value="Submit Message" /> */}

                      <button type="submit" className="btn">
                        <span>Submit Message</span>
                      </button>
                    </div>
                  </div>
                </form>

                <div className="contact_information_section">
                  <div className="row">
                    {this.state.ContactPost.length > 0
                      ? this.state.ContactPost.map((item, index) => {
                        if (item.SelectSection == "Section3") {
                          return (
                            <div className="column col-3">
                              <h5>{item.Title}</h5>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.Content,
                                }}
                              />
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

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
                                <div
                                  className="thankyou_txt"
                                  dangerouslySetInnerHTML={{
                                    __html: item.Contant,
                                  }}
                                />
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
                                    __html: item.Contant,
                                  }}
                                />
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
        </div>
      </div>
    );
  }
}

export default Contact;
