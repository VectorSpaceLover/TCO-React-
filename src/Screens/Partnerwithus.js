import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import write_check from "../images/write_check.png";

import financial from "../images/financial.png";

import search_close from "../images/close.svg";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import GLOBAL from "../Global";

import AnchorLink from "react-anchor-link-smooth-scroll";

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
const MODAL_OPEN_CLASS3 = "body--popup--open3";
const MODAL_OPEN_CLASS6 = "body--popup--open6";

const divStyle = {
  marginTop: "0px",
};
var classn = [];
var errors = [];
var rclassn = [];
var rerrors = [];
var pclassn = [];
var perrors = [];

class Partnerwithus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      addClass: false,
      addClass1: false,
      addClass2: false,
      addClass3: false,

      detailindex: "",
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

      addClass6: false,

      PartnerwithusContent: [],

      ThemeName: [],
      ErrorPost: [],
      ThankyouPost: [],
      IndustryName: [],
      submitDisabled: false,
      submitDisabledText: "",
      psubmitDisabled: false,
      psubmitDisabledText: "",
      rsubmitDisabled: false,
      rsubmitDisabledText: "",
    };

    this.handleChange = this.handleChange.bind(this);

    this.rhandleChange = this.rhandleChange.bind(this);

    this.phandleChange = this.phandleChange.bind(this);

    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);

    this.rhandleKeyUpChange = this.rhandleKeyUpChange.bind(this);

    this.phandleKeyUpChange = this.phandleKeyUpChange.bind(this);
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

    // PartnerwithusContent

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/partnerwithus-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var PartnerwithusContent = [];

        Data.map((item, index) => {
          PartnerwithusContent.push(item);
        });

        this.setState({ PartnerwithusContent: PartnerwithusContent });
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

      url: GLOBAL.SITE_URL + "/themes-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var ThemeName = [];

        Data.map((item, index) => {
          ThemeName.push(item);
        });

        this.setState({ ThemeName: ThemeName });
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

  togglePopup() {
    this.setState({ addClass: !this.state.addClass });
  }

  togglePopup1() {
    this.setState({ addClass1: !this.state.addClass1 });
  }
  togglePopup2(e) {
    this.setState({ addClass2: !this.state.addClass2 });
  }

  togglePopup3() {
    this.setState({ addClass3: !this.state.addClass3 });
  }

  togglePopup6() {
    this.setState({ addClass6: !this.state.addClass6 });
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

  phandleChange(e) {
    let pfields = this.state.pfields;

    pfields[e.target.name] = e.target.value;

    this.setState({
      pfields,
    });
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

  SubmithemeSponsorForm = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      if (this.state.fields.files != "" && this.state.fields.files != null) {
        this.setState({
          submitDisabled: true,
          submitDisabledText: "Files are being uploaded, please wait...",
        });
      }

      const formElement = document.querySelector("#theme_sponsor");
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

          this.state.fields.Complementaryinformationattachments = Data[0];
          let fields = this.state.fields;

          console.log("fields");
          console.log(fields);

          this.setState({ fields: fields });

          // alert("Form submitted");

          var experientialcheck =
            fields.experientialcheck == true ? true : false;
          var productcheck = fields.productcheck == true ? true : false;
          var othercheck = fields.othercheck == true ? true : false;
          var awardcheck = fields.awardcheck == true ? true : false;

          var subscribecheck = fields.subscribecheck == true ? true : false;
          var mediaquest = fields.mediaquest == true ? true : false;

          var MobileNumber = fields.phonenumber;
          if (MobileNumber.indexOf("+") < 0) {
            MobileNumber = "+" + MobileNumber;
          }

          const requestBody = {
            CompanyName: fields.companyname,
            Industry: fields.industry,
            ContactpointName: fields.contactpointname,
            LastName: fields.lastname,
            Position: fields.position,
            Email: fields.email,
            Phonenumber: MobileNumber,
            Experientiallearning: experientialcheck,
            Productdemo: productcheck,
            Other: othercheck,
            Awardceremony: awardcheck,
            SubscribetoUpdates: subscribecheck,
            SubscribetoMediaQuest: mediaquest,
            Selectthemeofinterest: fields.selectthemeofinterest,
            aboutyourinterests: fields.tellus,
            Complementaryinformationattachments:
            fields.Complementaryinformationattachments,
          };

          axios({
            method: "POST",

            url: GLOBAL.SITE_URL + "/sponsor-attendees",

            responseType: "json",
            data: requestBody,
          })
            .then((response) => {
              delete requestBody["Complementaryinformationattachments"];

              let url =
                GLOBAL.CRMAPIDATA.APIURL +
                "subscribers/3234fd240b3b448d702b3075f943a4dc.json";
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
                EmailAddress: fields.email,
                CustomFields: [
                  { key: "LastName", value: fields.lastname },
                  { key: "PhoneNumber", value: MobileNumber },
                  { key: "Position", value: fields.position },
                  { key: "Industry", value: fields.industry },
                  {
                    key: "themeofinterest",
                    value: fields.selectthemeofinterest,
                  },
                  { key: "Experiential learning", value: experientialcheck },
                  { key: "Product demo", value: productcheck },
                  { key: "Award ceremony", value: awardcheck },
                  { key: "Other", value: othercheck },
                  { key: "about your interests", value: fields.tellus },
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

  SubmitActivitySponsorForm = (e) => {
    e.preventDefault();

    if (this.rvalidateForm()) {
      if (this.state.rfields.files != "" && this.state.rfields.files != null) {
        this.setState({
          rsubmitDisabled: true,
          rsubmitDisabledText: "Files are being uploaded, please wait...",
        });
      }

      const formElement = document.querySelector("#activity_sponsor");
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

          console.log("rfields");
          console.log(rfields);

          this.setState({ rfields: rfields });

          // alert("Form submitted");

          var PanelDiscussion = rfields.pannelcheck == true ? true : false;
          var VIPdinner = rfields.vipdinnercheck == true ? true : false;
          var VIPlounge = rfields.viploungecheck == true ? true : false;
          var Ongroundexperiences = rfields.othercheck == true ? true : false;
          var Awardceremony = rfields.awardcheck == true ? true : false;
          var Other = rfields.othercheck == true ? true : false;

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
            PanelDiscussion: PanelDiscussion,
            VIPdinner: VIPdinner,
            VIPlounge: VIPlounge,
            Ongroundexperiences: Ongroundexperiences,
            Awardceremony: Awardceremony,
            Other: Other,
            SubscribetoUpdates: subscribecheck,
            SubscribetoMediaQuest: mediaquest,
            Selectthemeofinterest: rfields.selectthemeofinterest,
            aboutyourinterests: rfields.tellus,
            Complementaryinformationattachments:
            rfields.Complementaryinformationattachments,
          };

          axios({
            method: "POST",

            url: GLOBAL.SITE_URL + "/activity-attendees",

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
                CustomFields: [
                  { key: "LastName", value: rfields.lastname },
                  { key: "CompanyName", value: rfields.companyname },
                  { key: "PhoneNumber", value: MobileNumber },
                  { key: "Position", value: rfields.position },
                  { key: "Industry", value: rfields.industry },
                  { key: "VIPdinner", value: VIPdinner },
                  { key: "VIPlounge", value: VIPlounge },
                  { key: "On ground experiences", value: Ongroundexperiences },
                  { key: "Award ceremony", value: Awardceremony },
                  { key: "Other", value: Other },
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
                });

              this.setState({
                submitDisabled: false,
                submitDisabledText: "",
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

      errors["companyname"] = "Enter your companyname.";

      classn["companyname"] = "error";
    }

    if (!fields["industry"]) {
      formIsValid = false;

      errors["industry"] = "Enter your industry.";

      classn["industry"] = "error";
    }

    if (!fields["lastname"]) {
      formIsValid = false;

      errors["lastname"] = "Enter your lastname.";

      classn["lastname"] = "error";
    }

    if (typeof fields["lastname"] !== "undefined") {
      if (!fields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["lastname"] = "Enter alphabet characters only.";

        classn["lastname"] = "error";
      }
    }

    if (!fields["contactpointname"]) {
      formIsValid = false;

      errors["contactpointname"] = "Enter your contact point name.";

      classn["contactpointname"] = "error";
    }

    if (!fields["position"]) {
      formIsValid = false;

      errors["position"] = "Enter your position.";

      classn["position"] = "error";
    }

    if (typeof fields["position"] !== "undefined") {
      if (!fields["position"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["position"] = "Enter alphabet characters only.";

        classn["position"] = "error";
      }
    }

    if (!fields["email"]) {
      formIsValid = false;

      errors["email"] = "Enter your email-ID";

      classn["email"] = "error";
    }

    if (typeof fields["email"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(fields["email"])) {
        formIsValid = false;

        errors["email"] = "Enter valid email-ID";

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

    this.setState({ rerrorsrerrors: [], rclassn: [] });

    let rerrors = [];

    let rclassn = [];

    let formIsValid = true;

    if (!rfields["companyname"]) {
      formIsValid = false;

      rerrors["companyname"] = "Enter your companyname.";

      rclassn["companyname"] = "error";
    }

    if (!rfields["industry"]) {
      formIsValid = false;

      rerrors["industry"] = "Enter your industry.";

      rclassn["industry"] = "error";
    }

    if (!rfields["lastname"]) {
      formIsValid = false;

      rerrors["lastname"] = "Enter your lastname.";

      rclassn["lastname"] = "error";
    }

    if (typeof rfields["lastname"] !== "undefined") {
      if (!rfields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["lastname"] = "Enter alphabet characters only.";

        rclassn["lastname"] = "error";
      }
    }

    if (!rfields["position"]) {
      formIsValid = false;

      rerrors["position"] = "Enter your position.";

      rclassn["position"] = "error";
    }

    if (!rfields["contactpointname"]) {
      formIsValid = false;

      rerrors["contactpointname"] = "Enter your contact point name.";

      rclassn["contactpointname"] = "error";
    }
    if (typeof rfields["position"] !== "undefined") {
      if (!rfields["position"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["position"] = "Enter alphabet characters only.";

        rclassn["position"] = "error";
      }
    }

    if (!rfields["email"]) {
      formIsValid = false;

      rerrors["email"] = "Enter your email-ID";

      rclassn["email"] = "error";
    }

    if (typeof rfields["email"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(rfields["email"])) {
        formIsValid = false;

        rerrors["email"] = "Enter valid email-ID";

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

  pvalidateForm() {
    let pfields = this.state.pfields;

    this.setState({ perrors: [], pclassn: [] });

    let perrors = [];

    let pclassn = [];

    let formIsValid = true;

    if (!pfields["companyname"]) {
      formIsValid = false;

      perrors["companyname"] = "Enter your companyname.";

      pclassn["companyname"] = "error";
    }

    if (!pfields["lastname"]) {
      formIsValid = false;

      perrors["lastname"] = "Enter your lastname.";

      pclassn["lastname"] = "error";
    }

    if (typeof pfields["lastname"] !== "undefined") {
      if (!pfields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        perrors["lastname"] = "Enter alphabet characters only.";

        pclassn["lastname"] = "error";
      }
    }

    if (!pfields["position"]) {
      formIsValid = false;

      perrors["position"] = "Enter your position.";

      pclassn["position"] = "error";
    }

    if (typeof pfields["position"] !== "undefined") {
      if (!pfields["position"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        perrors["position"] = "Enter alphabet characters only.";

        pclassn["position"] = "error";
      }
    }
    if (!pfields["contactpointname"]) {
      formIsValid = false;

      perrors["contactpointname"] = "Enter your contact point name.";

      pclassn["contactpointname"] = "error";
    }

    if (!pfields["email"]) {
      formIsValid = false;

      perrors["email"] = "Enter your email-ID";

      pclassn["email"] = "error";
    }

    if (typeof pfields["email"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(pfields["email"])) {
        formIsValid = false;

        perrors["email"] = "Enter valid email-ID";

        pclassn["email"] = "error";
      }
    }

    if (!pfields["phonenumber"]) {
      formIsValid = false;

      perrors["phonenumber"] = "Enter your mobile no.";

      pclassn["phonenumber"] = "error";
    }

    if (typeof pfields["phonenumber"] !== "undefined") {
      if (isValidPhoneNumber(pfields["phonenumber"]) === false) {
        formIsValid = false;

        perrors["phonenumber"] = "Invalid Mobile Number";

        pclassn["phonenumber"] = "error";
      }
    }

    this.setState({
      perrors: perrors,

      pclassn: pclassn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  checkbox() {
    this.setState({ checkd: !this.state.checkd });
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "Partnerwithus - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  render() {
    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS6);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
    }

    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if (this.state.addClass2) {
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if (this.state.addClass1) {
      document.body.classList.add(MODAL_OPEN_CLASS1);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS1);
    }

    if (this.state.addClass3) {
      document.body.classList.add(MODAL_OPEN_CLASS3);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS3);
    }

    if ((document.title = "Partnerwithus - Top CEO")) {
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
              if (item.Selectpage == "Partnerwithus") {
                return (
                  <Helmet>
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
                      content={siteurl + "/Top-CEO-GCC-2020-partner-with-us"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.PartnerwithusContent.length > 0
            ? this.state.PartnerwithusContent.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section attend_banner_section">
                    <img src={GLOBAL.SITE_URL + item.Image.url} />

                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.Title}</h1>

                        <p>{item.SubTitle}</p>

                        <a
                          href={item.ButtonLink}
                          className="btn"
                          onClick={this.togglePopup3.bind(this)}
                        >
                          <span>{item.ButtonText}</span>
                        </a>

                        {/*<AnchorLink href='#activity' className="btn">activity</AnchorLink>   */}
                      </div>
                    </div>
                  </section>
                );
              }
            })
            : null}

          <section className="theme_selection_section partner_main_section">
            <div className="theme_selection_bg">
              <div className="attend_top_section">
                <div className="container">
                  <div className="row">
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section2") {
                          return (
                            <div className="column col-12">
                              <h2>
                                <span>{item.SubTitle}</span>
                                {item.Title}
                              </h2>
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>

              <div className="attend_table_section partner_sponser_benefit_section">
                <div className="container">
                  <div className="snip1214">
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section3") {
                          return (
                            <div
                              className={
                                item.id == 4 ? "featured plan" : "plan"
                              }
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.Content,
                                }}
                              ></div>
                            </div>
                          );
                        }
                      })
                      : null}
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section3") {
                          return (
                            <div>
                              {item.id == 5 ? (
                                <div className="plan-select">
                                  <a
                                    href={
                                      GLOBAL.SITE_URL + item.AddPdf[0].url
                                    }
                                    className="btn"
                                    target="_blank"
                                  >
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="22"
                                          viewBox="0 0 18 22"
                                        >
                                          <path
                                            fill="#272B37"
                                            fill-rule="evenodd"
                                            stroke="#272B37"
                                            stroke-width=".5"
                                            d="M13.856 14.048c-.244.072-.602.08-.987.025a4.715 4.715 0 0 1-1.246-.371c.737-.107 1.31-.074 1.798.099.116.04.307.15.435.247zm-4.113-.675l-.09.024c-.198.054-.39.107-.577.153l-.25.064c-.505.128-1.021.258-1.53.413.193-.467.373-.938.55-1.399.13-.34.263-.69.4-1.033.07.115.143.23.22.346.345.526.78 1.012 1.277 1.432zM8.459 8.116c.033.576-.092 1.129-.274 1.66-.224-.657-.33-1.381-.048-1.967.072-.15.13-.23.169-.272.059.091.137.295.153.58zm-2.634 7.287a9.902 9.902 0 0 1-.387.636c-.319.479-.84.992-1.108.992-.026 0-.058-.004-.104-.053-.03-.031-.035-.054-.034-.085.01-.176.243-.49.582-.78a5.725 5.725 0 0 1 1.051-.71zm8.884-1.33c-.04-.587-1.031-.964-1.04-.967a3.757 3.757 0 0 0-1.272-.201c-.506 0-1.05.073-1.751.236a6.09 6.09 0 0 1-1.564-1.604 9.81 9.81 0 0 1-.476-.803c.34-.811.645-1.683.59-2.66-.045-.783-.399-1.31-.88-1.31-.33 0-.614.245-.845.727-.412.859-.304 1.957.322 3.268a45.44 45.44 0 0 0-.638 1.607c-.252.66-.512 1.34-.804 1.986-.822.325-1.496.718-2.058 1.201-.369.316-.812.799-.838 1.302a.832.832 0 0 0 .235.63.868.868 0 0 0 .64.283c.803 0 1.576-1.102 1.722-1.323.296-.443.572-.939.842-1.51.682-.246 1.408-.43 2.112-.607l.252-.064c.19-.048.387-.101.589-.156.214-.058.434-.118.657-.175.723.46 1.5.759 2.259.869.638.092 1.206.038 1.59-.161.345-.18.364-.457.356-.568zm1.555 5.048c0 1.076-.95 1.142-1.14 1.144H2.875c-1.073 0-1.138-.954-1.14-1.144V2.88c0-1.077.95-1.142 1.14-1.144h8.273l.005.004v3.223c0 .647.391 1.872 1.875 1.872h3.208l.027.027v12.26zM15.504 6.1h-2.475c-1.073 0-1.138-.949-1.139-1.137V2.477l3.614 3.622zM17 19.12V6.558l-5.11-5.123v-.023h-.024L11.456 1h-8.58C2.226 1 1 1.393 1 2.879v16.243C1 19.772 1.392 21 2.876 21h12.248c.65 0 1.876-.393 1.876-1.879z"
                                          />
                                        </svg>
                                        {item.ButtonText}
                                      </span>
                                  </a>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>

              <div className="award_achievement_section partner_sponser_section">
                <div className="container">
                  {this.state.PartnerwithusContent.length > 0
                    ? this.state.PartnerwithusContent.map((item, index) => {
                      if (item.SelectSection == "Section4") {
                        return <h2>{item.Title}</h2>;
                      }
                    })
                    : null}
                  <div className="row">
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section4") {
                          return (
                            <div className="column col-4">
                              <div className="best_award_img">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                              </div>
                              <h5>{item.SubTitle}</h5>
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>

              <div className="partner_sponsorship_section" id="sponsor">
                <div className="container">
                  {this.state.PartnerwithusContent.length > 0
                    ? this.state.PartnerwithusContent.map((item, index) => {
                      if (item.SelectSection == "Section5") {
                        return <h4>{item.Title}</h4>;
                      }
                    })
                    : null}
                  <div className="row">
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section5") {
                          return (
                            <div className="column col-6">
                              <img src={GLOBAL.SITE_URL + item.Image.url} />
                              <h5>{item.SubTitle}</h5>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.Content,
                                }}
                              ></div>
                            </div>
                          );
                        }
                      })
                      : null}

                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section5") {
                          return (
                            <div className="column col-12">
                              {item.id == 17 ? (
                                <a
                                  href={item.ButtonLink}
                                  className="btn"
                                  onClick={this.togglePopup.bind(this)}
                                >
                                  <span>{item.ButtonText}</span>
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>
              <div
                className="partner_sponsorship_section partner_activity_section"
                id="activity"
              >
                <div className="container">
                  {this.state.PartnerwithusContent.length > 0
                    ? this.state.PartnerwithusContent.map((item, index) => {
                      if (item.SelectSection == "Section6") {
                        return <h4>{item.Title}</h4>;
                      }
                    })
                    : null}
                  <div className="row">
                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section6") {
                          return (
                            <div className="column col-6">
                              <img src={GLOBAL.SITE_URL + item.Image.url} />
                              <h5>{item.SubTitle}</h5>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.Content,
                                }}
                              ></div>
                            </div>
                          );
                        }
                      })
                      : null}

                    {this.state.PartnerwithusContent.length > 0
                      ? this.state.PartnerwithusContent.map((item, index) => {
                        if (item.SelectSection == "Section6") {
                          return (
                            <div className="column col-12">
                              {item.id == 23 ? (
                                <a
                                  href={item.ButtonLink}
                                  className="btn"
                                  onClick={this.togglePopup1.bind(this)}
                                >
                                  <span>{item.ButtonText}</span>
                                </a>
                              ) : (
                                ""
                              )}
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
          <section className="theme_ticket_section partner_ticket_section">
            <div className="container">
              <div className="theme_ticket_content">
                {this.state.PartnerwithusContent.length > 0
                  ? this.state.PartnerwithusContent.map((item, index) => {
                    if (item.SelectSection == "Section7") {
                      return (
                        <div className="row">
                          <div className="column col-8">
                            <h3>{item.Title}</h3>
                            <p>{item.SubTitle}</p>
                          </div>
                          <div className="column col-4">
                            <a href={item.ButtonLink} className="btn">
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}
              </div>
            </div>
          </section>

          {this.state.addClass ? (
            <div className="details_popup sponsor_details_popup  attend_details_popup">
              <div className="all_popup">
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
                            id="theme_sponsor"
                            onSubmit={this.SubmithemeSponsorForm}
                            className="contact_from"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="column col-12">
                                  <p>
                                    Are you interested in sponsoring one of Top
                                    CEO’s vertical "theme" throughout the event?
                                    Fill in the following information:
                                  </p>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="companyname"
                                    name="companyname"
                                    placeholder="Company Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.fields.companyname}
                                    className={this.state.classn.companyname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.errors.companyname}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <select
                                    id="industry"
                                    name="industry"
                                    value={this.state.fields.industry}
                                    className={this.state.classn.industry}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
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

                                  <div className="errorMsg">
                                    {this.state.errors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="contactpointname"
                                    name="contactpointname"
                                    placeholder="Contact point Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.fields.contactpointname}
                                    className={
                                      this.state.classn.contactpointname
                                    }
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.errors.contactpointname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name*"
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
                                    id="position"
                                    name="position"
                                    maxLength="255"
                                    placeholder="Position*"
                                    type="text"
                                    value={this.state.fields.position}
                                    className={this.state.classn.position}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.errors.position}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="email"
                                    placeholder="Email*"
                                    type="email"
                                    maxLength="255"
                                    value={this.state.fields.email}
                                    className={this.state.classn.email}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.errors.email}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="phonenumber"
                                    maxLength="20"
                                    name="phonenumber"
                                    value={this.state.fields.phonenumber}
                                    className={this.state.classn.phonenumber}
                                    placeholder="Phone number*"
                                    onChange={(e) =>
                                      (this.state.fields.phonenumber = e)
                                    }
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.errors.phonenumber}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="selectthemeofinterest"
                                    value={
                                      this.state.fields.selectthemeofinterest
                                    }
                                    onChange={this.handleChange}
                                  >
                                    <option>Select theme of interest</option>
                                    {this.state.ThemeName.length > 0
                                      ? this.state.ThemeName.map(
                                        (item, index) => {
                                          return (
                                            <option>{item.Title}</option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-12">
                                  <p>
                                    Tell us more about your interest in
                                    sponsoring Top CEO:
                                  </p>
                                </div>

                                <div className="column col-12">
                                  <div className="checkbox multi_checkbox">
                                    <span>
                                      You are interested in
                                      sponsoring/co-hosting the following
                                      engagement experience(s):
                                    </span>

                                    <input
                                      type="checkbox"
                                      id="checkbox12"
                                      name="experientialcheck"
                                      value={
                                        this.state.fields.experientialcheck
                                      }
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox12">
                                      Experiential learning
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="checkbox13"
                                      name="productcheck"
                                      value={this.state.fields.productcheck}
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox13">Product demo</label>
                                    <input
                                      type="checkbox"
                                      id="checkbox14"
                                      name="awardcheck"
                                      value={this.state.fields.awardcheck}
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox14">
                                      Awards Ceremony
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="checkbox15"
                                      name="othercheck"
                                      value={this.state.fields.othercheck}
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox15">Other</label>
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="tellus"
                                    name="tellus"
                                    placeholder="Tell us more about your interests"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.fields.tellus}
                                    className={this.state.classn.tellus}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.handleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.errors.tellus}
                                  </div>
                                </div>

                                <div className="column col-6 file_upload">
                                  <FloatingLabel
                                    id="complementary"
                                    name="files"
                                    placeholder="Complementary information & attachments"
                                    type="file"
                                    value={this.state.fields.complementary}
                                    className={this.state.classn.complementary}
                                    onChange={(evt) => {
                                      this.handleChange(evt);
                                    }}
                                  />
                                </div>
                                <div className="errorMsg">
                                  {this.state.formerror}
                                </div>
                                <div className="column col-12 partner_check">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox1"
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
                                      value={this.state.fields.mediaquest}
                                      onChange={(e) => {
                                        this.handleChange({
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

          {this.state.addClass1 ? (
            <div className="details_popup  sponsor_details_popup activity_sponsor_popup attend_details_popup">
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
                            id="activity_sponsor"
                            name="userRegisterForm"
                            onSubmit={this.SubmitActivitySponsorForm}
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
                                    onKeyUp={this.rhandleKeyUpChange}
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

                                  <div className="errorMsg">
                                    {this.state.rerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="contactpointname"
                                    name="contactpointname"
                                    placeholder="Contact point Name*"
                                    type="text"
                                    maxLength="255"
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
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.contactpointname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    maxLength="255"
                                    placeholder="Last Name*"
                                    type="text"
                                    value={this.state.rfields.lastname}
                                    className={this.state.rclassn.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
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
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.position}
                                    className={this.state.rclassn.position}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.position}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="email"
                                    maxLength="255"
                                    placeholder="Email*"
                                    type="email"
                                    value={this.state.rfields.email}
                                    className={this.state.rclassn.email}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.email}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <PhoneInput
                                    id="phonenumber"
                                    maxLength="20"
                                    name="phonenumber"
                                    value={this.state.rfields.phonenumber}
                                    className={this.state.rclassn.phonenumber}
                                    placeholder="Phone Number*"
                                    onChange={(e) =>
                                      (this.state.rfields.phonenumber = e)
                                    }
                                    onKeyUp={this.rhandleKeyUpChange}
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

                                  <div className="checkbox multi_checkbox">
                                    <span>
                                      You are interested in
                                      sponsoring/co-hosting the following
                                      activity:
                                    </span>

                                    <input
                                      type="checkbox"
                                      id="checkbox11"
                                      name="pannelcheck"
                                      value={this.state.rfields.pannelcheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox11">
                                      Panel Discussion
                                    </label>

                                    <input
                                      type="checkbox"
                                      id="checkbox12"
                                      name="vipdinnercheck"
                                      value={this.state.rfields.vipdinnercheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox12">VIP dinner</label>
                                    <input
                                      type="checkbox"
                                      id="checkbox13"
                                      name="viploungecheck"
                                      value={this.state.rfields.viploungecheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox13">VIP lounge</label>
                                    <input
                                      type="checkbox"
                                      id="checkbox14"
                                      name="ongroundcheck"
                                      value={this.state.rfields.ongroundcheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox14">
                                      Onground experiences
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="checkbox16"
                                      name="awardcheck"
                                      value={this.state.rfields.awardcheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox15">
                                      Awards Ceremony
                                    </label>
                                    <input
                                      type="checkbox"
                                      id="checkbox16"
                                      name="othercheck"
                                      value={this.state.rfields.othercheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />
                                    <label for="checkbox16">Other</label>
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="tellus"
                                    name="tellus"
                                    maxLength="255"
                                    placeholder="Tell us more about your interests"
                                    type="text"
                                    value={this.state.rfields.tellus}
                                    className={this.state.rclassn.tellus}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
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
                                    onChange={(evt) => {
                                      this.rhandleChange(evt);
                                    }}
                                  />
                                </div>
                                <div className="column col-12 partner_check">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="subscribecheck"
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

                                    <label for="subscribecheck">
                                      Subscribe to get updates on upcoming guest
                                      speakers, workshops and more!
                                    </label>
                                  </div>

                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="mediaquesta"
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

                                    <label for="mediaquesta">
                                      Subscribe to receive updates from
                                      Mediaquest partners
                                    </label>
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <button
                                    type="submit"
                                    className="btn"
                                    disabled={this.state.rsubmitDisabled}
                                  >
                                    <span>Submit</span>
                                  </button>
                                  <div
                                    className="errorMsg submit_err"
                                    style={divStyle}
                                  >
                                    {this.state.rsubmitDisabledText}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.phandleChange}
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
        </div>
      </div>
    );
  }
}

export default Partnerwithus;
