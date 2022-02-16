import React, { Component } from "react";

import { Helmet } from "react-helmet";

import "../App.css";

import sponsor_img1 from "../images/sponsor_img1.png";

import financial from "../images/financial.png";

import search_close from "../images/close.svg";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import GLOBAL from "../Global";

import "react-phone-number-input/style.css";

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";
const MODAL_OPEN_CLASS1 = "body--popup--form--open";
const MODAL_OPEN_CLASS2 = "body--popup--open2";

const MODAL_OPEN_CLASS6 = "body--popup--open6";
const divStyle = {
  marginTop: "0px",
};

var rclassn = [];
var rerrors = [];

class Business extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      addClass: false,
      addClass1: false,

      detailindex: "",
      fields: {},

      addClass6: false,
      rfields: {},

      errors: {},

      rerrors: {},

      classn: {},

      rclassn: {},
      ErrorPost: [],

      checkd: false,

      addClass2: false,
      formerror: false,

      BusinessPost: [],
      ThankyouPost: [],

      SponsorPost: [],
      IndustryName: [],
      submitDisabled: false,
      submitDisabledText: "",
    };
    this.handleChange = this.handleChange.bind(this);

    // this.submituserContactForm = this.submituserContactForm.bind(this);

    this.rhandleChange = this.rhandleChange.bind(this);
    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);

    //  this.submituserRegisterForm = this.submituserRegisterForm.bind(this);
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

    // business-page

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/business-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var BusinessPost = [];

        Data.map((item, index) => {
          BusinessPost.push(item);
        });

        this.setState({ BusinessPost: BusinessPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // business-page

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/business-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SponsorPost = [];

        Data.map((item, index) => {
          SponsorPost.push(item);
        });

        this.setState({ SponsorPost: SponsorPost });
        // console.log("SponsorPost item")
        // console.log(SponsorPost)
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
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "Business - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup() {
    this.setState({ addClass: !this.state.addClass });
  }

  togglePopup1() {
    this.setState({ addClass1: !this.state.addClass1 });
  }

  togglePopup2(e) {
    this.setState({ addClass2: !this.state.addClass2 });
  }
  togglePopup6(e) {
    this.setState({ addClass2: !this.state.addClass6 });
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
      rerrors[name] =
        "Please reduce the text to under " + maxLength + " characters";

      rclassn[name] = "error";
    } else {
      rerrors[name] = "";

      rclassn[name] = "";
    }
    this.setState({ rerrors: rerrors, rclassn: rclassn });
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

      fields["companyname"] = "";

      fields["industry"] = "";

      fields["contactpointname"] = "";
      fields["lastname"] = "";
      fields["position"] = "";

      fields["email"] = "";
      fields["phonenumber"] = "";

      fields["tellus"] = "";

      fields["complementary"] = "";

      this.setState({ fields: fields });

      //  alert("Form submitted");
    }
  };

  submituserRegisterForm = (e) => {
    e.preventDefault();

    if (this.rvalidateForm()) {
      if (this.state.rfields.files != "" && this.state.rfields.files != null) {
        this.setState({
          submitDisabled: true,
          submitDisabledText: "Files are being uploaded, please wait...",
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

          this.state.rfields.Complementaryinformationattachments = Data[0];
          let rfields = this.state.rfields;

          this.setState({ rfields: rfields });

          // alert("Form submitted");

          var subscribecheck = rfields.subscribecheck == true ? true : false;
          var mediaquest = rfields.mediaquest == true ? true : false;

          var MobileNumber = rfields.phonenumber;
          if (MobileNumber.indexOf("+") < 0) {
            MobileNumber = "+" + MobileNumber;
          }

          const requestBody = {
            CompanyName: rfields.companyname,
            Industry: rfields.industry,
            ContactpointName: rfields.contactpointname,
            LastName: rfields.lastname,
            Position: rfields.position,
            Email: rfields.email,
            Phonenumber: MobileNumber,
            Selectthemeofinterest: rfields.selectthemeofinterest,
            aboutyourinterests: rfields.tellus,
            SubscribetoUpdates: subscribecheck,
            SubscribetoMediaQuest: mediaquest,
            Complementaryinformationattachments:
            rfields.Complementaryinformationattachments,
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
                EmailAddress: rfields.email,
                name: rfields.username + " " + rfields.lastname,
                CustomFields: [
                  { key: "LastName", value: rfields.lastname },
                  { key: "CompanyName", value: rfields.companyname },
                  { key: "PhoneNumber", value: MobileNumber },
                  { key: "Position", value: rfields.position },
                  { key: "Industry", value: rfields.industry },
                  { key: "about your interests", value: rfields.tellus },
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

          console.log("Error");
          this.setState({
            submitDisabled: false,
            submitDisabledText: "",
          });
        });
    }
  };

  validateForm() {
    let fields = this.state.fields;

    this.setState({ errors: [], classn: [] });

    let errors = [];

    let classn = [];

    let formIsValid = true;

    if (!fields["companyname"]) {
      formIsValid = false;

      errors["companyname"] = "*Enter your company name.";

      classn["companyname"] = "error";
    }

    if (!fields["industry"]) {
      formIsValid = false;

      errors["industry"] = "*Enter your industry.";

      classn["industry"] = "error";
    }

    if (typeof fields["industry"] !== "undefined") {
      if (!fields["industry"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["industry"] = "*Enter alphabet characters only.";

        classn["industry"] = "error";
      }
    }

    if (!fields["lastname"]) {
      formIsValid = false;

      errors["lastname"] = "*Enter your lastname.";

      classn["lastname"] = "error";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["lastname"] = "*Enter alphabet characters only.";

        classn["lastname"] = "error";
      }
    }

    if (!fields["position"]) {
      formIsValid = false;

      errors["position"] = "*Enter your position.";

      classn["position"] = "error";
    }

    if (typeof fields["position"] !== "undefined") {
      if (!fields["position"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["position"] = "*Enter alphabet characters only.";

        classn["position"] = "error";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;

      errors["email"] = "*Enter your email-ID";

      classn["email"] = "error";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fields["email"])) {
        formIsValid = false;

        errors["email"] = "*Enter valid email-ID";

        classn["email"] = "error";
      }
    }

    if (!fields["phonenumber"]) {
      formIsValid = false;

      errors["phonenumber"] = "Enter your mobile no.";

      classn["phonenumber"] = "error";
    }

    if (typeof fields["phonenumber"] !== "undefined") {
      if (isValidPhoneNumber(fields["phonenumber"]) === false) {
        formIsValid = false;

        errors["phonenumber"] = "Invalid Mobile Number";

        classn["phonenumber"] = "error";
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

    this.setState({ rerrors: [], rclassn: [] });

    let rerrors = [];

    let rclassn = [];

    let formIsValid = true;

    if (!rfields["companyname"]) {
      formIsValid = false;

      rerrors["companyname"] = "*Enter your companyname.";

      rclassn["companyname"] = "error";
    }

    // if (typeof rfields["companyname"] !== "undefined") {
    //   if (!rfields["companyname"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;

    //     rerrors["companyname"] = "*Enter alphabet characters only.";

    //     rclassn["companyname"] = "error";
    //   }
    // }

    if (!rfields["lastname"]) {
      formIsValid = false;

      rerrors["lastname"] = "*Enter your lastname.";

      rclassn["lastname"] = "error";
    }

    if (typeof rfields["lastname"] !== "undefined") {
      if (!rfields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["lastname"] = "*Enter alphabet characters only.";

        rclassn["lastname"] = "error";
      }
    }

    if (!rfields["position"]) {
      formIsValid = false;

      rerrors["position"] = "*Enter your position.";

      rclassn["position"] = "error";
    }

    if (typeof rfields["position"] !== "undefined") {
      if (!rfields["position"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["position"] = "*Enter alphabet characters only.";

        rclassn["position"] = "error";
      }
    }

    if (!rfields["email"]) {
      formIsValid = false;

      rerrors["email"] = "*Enter your email-ID";

      rclassn["email"] = "error";
    }

    if (typeof rfields["email"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(rfields["email"])) {
        formIsValid = false;

        rerrors["email"] = "*Enter valid email-ID";

        rclassn["email"] = "error";
      }
    }

    if (!rfields["phonenumber"]) {
      formIsValid = false;

      rerrors["phonenumber"] = "Enter your mobile no.";

      rclassn["phonenumber"] = "error";
    }

    if (typeof rfields["phonenumber"] !== "undefined") {
      if (isValidPhoneNumber(rfields["phonenumber"]) === false) {
        formIsValid = false;

        rerrors["phonenumber"] = "Invalid Mobile Number";

        rclassn["phonenumber"] = "error";
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

    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS6);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
    }

    if (this.state.addClass2) {
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }
    if ((document.title = "Business - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Business") {
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
                      content={
                        siteurl + "/Business-Top-CEO-sponsors-partners"
                      }
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.BusinessPost.length > 0
            ? this.state.BusinessPost.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section business_banner_section">
                    <img src={GLOBAL.SITE_URL + item.Image.url} />

                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.TItle}</h1>

                        <p>{item.SubTitle}</p>

                        <a
                          href={item.ButtonLink}
                          className="btn"
                          onClick={this.togglePopup1.bind(this)}
                        >
                          <span>{item.ButtonText}</span>
                        </a>
                      </div>
                    </div>
                  </section>
                );
              }
            })
            : null}

          <section className="theme_selection_section business_main_section">
            <div className="theme_selection_bg">
              <div className="business_sponsors_section">
                <div className="container">
                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section2") {
                        return (
                          <div>
                            <h2>
                              <span>{item.SubTitle}</span>
                              {item.TItle}
                            </h2>

                            <div
                              className="top_text_content"
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                          </div>
                        );
                      }
                    })
                    : null}

                  {/* Start Sponsors Section */}

                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section3") {
                        return <h4 className="border-top">{item.TItle}</h4>;
                      }
                    })
                    : null}

                  {this.state.SponsorPost.length > 0
                    ? this.state.SponsorPost.map((item, index) => {
                      if (item.Selectoptions == "Hostcountrysponsor") {
                        return (
                          <div className="row align_center">
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            <div className="column col-8">
                              <div
                                className="host_content"
                                dangerouslySetInnerHTML={{
                                  __html: item.Text,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      }
                    })
                    : null}

                  <div className="row">
                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section4") {
                            return (
                              <h4 className="border-top">{item.TItle}</h4>
                            );
                          }
                        })
                        : null}
                    </div>

                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Themesponsors") {
                          return (
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}

                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section5") {
                            return (
                              <h4 className="border-top">{item.TItle}</h4>
                            );
                          }
                        })
                        : null}
                    </div>

                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Activitysponsors") {
                          return (
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}

                    {/* End Sponsors Section */}

                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section5") {
                            return (
                              <a href={item.ButtonLink} className="btn">
                                <span>{item.ButtonText}</span>
                              </a>
                            );
                          }
                        })
                        : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="business_partners_section">
                <div className="container">
                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section6") {
                        return (
                          <div>
                            <h2>
                              <span>{item.SubTitle}</span>
                              {item.TItle}
                            </h2>

                            <div
                              className="top_text_content"
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                          </div>
                        );
                      }
                    })
                    : null}

                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section7") {
                        if (item.TItle == "Knowledge Partners") {
                          return <h4 className="border-top">{item.TItle}</h4>;
                        }
                      }
                    })
                    : null}

                  <div className="row">
                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Knowledgepartners") {
                          return (
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}

                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section8") {
                            return (
                              <h4 className="border-top">{item.TItle}</h4>
                            );
                          }
                        })
                        : null}
                    </div>

                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Mediapartners") {
                          return (
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}

                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section9") {
                            return (
                              <h4 className="border-top">{item.TItle}</h4>
                            );
                          }
                        })
                        : null}
                    </div>

                    {this.state.BusinessPost.length > 0
                      ? this.state.BusinessPost.map((item, index) => {
                        if (item.SelectSection == "Section7") {
                          if (item.TItle == "Ecosystem Partners") {
                            return (
                              <div className="column col-12">
                                <h4 className="border-top">{item.TItle}</h4>
                              </div>
                            );
                          }
                        }
                      })
                      : null}

                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Ecosystempartners") {
                          return (
                            <div className="column col-4">
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    detailindex: index,
                                    addClass: true,
                                  });
                                }}
                                id={index}
                              >
                                {item.SmallLogoImage == null ? null : (
                                  <img
                                    src={
                                      GLOBAL.SITE_URL +
                                      item.SmallLogoImage.url
                                    }
                                  />
                                )}
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}

                    {/* Start Button Div */}
                    <div className="column col-12">
                      {this.state.BusinessPost.length > 0
                        ? this.state.BusinessPost.map((item, index) => {
                          if (item.SelectSection == "Section8") {
                            return (
                              <a
                                href={item.ButtonLink}
                                className="btn"
                                onClick={this.togglePopup1.bind(this)}
                              >
                                <span>{item.ButtonText}</span>
                              </a>
                            );
                          }
                        })
                        : null}
                    </div>
                    {/* End Button Div */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {this.state.addClass ? (
            <div
              className="details_popup speaker_details_popup business_details_popup"
              id={this.state.detailindex}
            >
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={() => {
                      this.setState({ detailindex: "", addClass: false });
                    }}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-6">
                        <div className="detail_popup_img">
                          {this.state.SponsorPost[this.state.detailindex]
                            .BigLogoImage == null ? (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.SponsorPost[this.state.detailindex]
                                  .SmallLogoImage.url
                              }
                            />
                          ) : (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.SponsorPost[this.state.detailindex]
                                  .BigLogoImage.url
                              }
                            />
                          )}
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block">
                          <h3>
                            {
                              this.state.SponsorPost[this.state.detailindex]
                                .Title
                            }
                          </h3>

                          <small>
                            {
                              this.state.SponsorPost[this.state.detailindex]
                                .SubTitle
                            }
                          </small>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.SponsorPost[this.state.detailindex]
                                .Text,
                            }}
                          ></div>

                          {this.state.SponsorPost[this.state.detailindex]
                            .ButtonText == null ? null : (
                            <a
                              href={
                                this.state.SponsorPost[this.state.detailindex]
                                  .ButtonLink
                              }
                              className="btn"
                              target="_blank"
                            >
                              <span>
                                {
                                  this.state.SponsorPost[this.state.detailindex]
                                    .ButtonText
                                }
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass1 ? (
            <div className="details_popup  attend_details_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup1.bind(this)}
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
                                    value={this.state.rfields.companyname}
                                    className={this.state.rclassn.companyname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.companyname}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <select
                                    id="industry"
                                    name="industry"
                                    value={this.state.rfields.industry}
                                    className={this.state.rclassn.industry}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  >
                                    <option>Industry</option>
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

                                  <div className="errorMsg">
                                    {this.state.rerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="contactpointname"
                                    name="contactpointname"
                                    placeholder="Contact point Name"
                                    maxLength="255"
                                    type="text"
                                    value={this.state.rfields.contactpointname}
                                    className={
                                      this.state.rclassn.contactpointname
                                    }
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.contactpointname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name*"
                                    maxLength="255"
                                    type="text"
                                    value={this.state.rfields.lastname}
                                    className={this.state.rclassn.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.lastname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="position"
                                    name="position"
                                    placeholder="Position*"
                                    maxLength="255"
                                    type="text"
                                    value={this.state.rfields.position}
                                    className={this.state.rclassn.position}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.position}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="email"
                                    placeholder="Email*"
                                    maxLength="255"
                                    type="email"
                                    value={this.state.rfields.email}
                                    className={this.state.rclassn.email}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.email}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <PhoneInput
                                    id="phonenumber"
                                    name="phonenumber"
                                    value={this.state.rfields.phonenumber}
                                    className={this.state.rclassn.phonenumber}
                                    placeholder="Mobile Number*"
                                    maxLength="20"
                                    onChange={(e) =>
                                      (this.state.rfields.phonenumber = e)
                                    }
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.phonenumber}
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
                                    value={this.state.rfields.tellus}
                                    className={this.state.rclassn.tellus}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.tellus}
                                  </div>
                                </div>

                                <div className="column col-6 file_upload">
                                  <FloatingLabel
                                    id="complementary"
                                    name="files"
                                    placeholder="Complementary information & attachments"
                                    type="file"
                                    value={this.state.rfields.complementary}
                                    className={this.state.rclassn.complementary}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                </div>

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox1"
                                      name="subscribecheck"
                                      value={this.state.rfields.subscribecheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
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
                                      value={this.state.rfields.mediaquest}
                                      onChange={(e) => {
                                        this.rhandleChange({
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
                                    disabled={this.state.submitDisabled}
                                  >
                                    <span>Submit</span>
                                  </button>
                                  <div
                                    className="errorMsg submit_err"
                                    style={divStyle}
                                  >
                                    {this.state.submitDisabledText}
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
        </div>
      </div>
    );
  }
}

export default Business;
