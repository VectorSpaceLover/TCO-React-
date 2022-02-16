import React, { Component } from "react";
import { Row, Col } from 'react-grid-system';
import { Helmet } from "react-helmet";
import search_close from "../images/close.svg";

import fb from "../images/fb.svg";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import GLOBAL from "../Global";
import TextField from "@material-ui/core/TextField";

import "../App.css";

import "react-phone-number-input/style.css";

import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import pin from "../images/pin.png";

const axios = require("axios");

const MODAL_OPEN_CLASS2 = "body--popup--open2";

const MODAL_OPEN_CLASS = "body--popup--open";
const MODAL_OPEN_CLASS1 = "body--popup--form--open";

const divStyle = {
  marginTop: "0px",
};

var rerrors = [];
var rclassn = [];

class Speakers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",
      speaker: {},

      addClass: false,

      detailindex: "",

      fields: {},

      rfields: {},

      errors: {},

      rerrors: {},

      classn: {},

      rclassn: {},

      checkd: false,

      addClass6: false,
      visibleSpeakerPost: 13,
      speakerCategories: [],
      SpeakerPost: [],

      SpeakersContent: [],

      FooterSocialicons: [],

      IndustryName: [],
      ThankyouPost: [],
      ErrorPost: [],
      agendaPosts: [],

      Videotitle: "",
      relevant_theme: false,

      Videosubtitle: "",

      Videoiframelink: "",

      Videobuttontext: "",

      Videobuttonlink: "",

      addClass2: false,

      OtherRelevantTheme: false,
      ThemesPosts: false,
      submitDisabled: false,
      submitDisabledText: "",
    };

    this.loadMore = this.loadMore.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.handleKeyUpChange = this.handleKeyUpChange.bind(this);

    this.rhandleChange = this.rhandleChange.bind(this);
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

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/themes-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var ThemePost = [];

        Data.map((item, index) => {
          ThemePost.push(item);
        });

        this.setState({ ThemePost: ThemePost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // speakers-page

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/speakers-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SpeakersContent = [];

        Data.map((item, index) => {
          SpeakersContent.push(item);
        });

        this.setState({ SpeakersContent: SpeakersContent });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // Speaker

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/speakers-posts?_sort=Order:asc",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SpeakerPost = [];

        Data.map((item, index) => {
          SpeakerPost.push(item);
        });

        this.setState({ SpeakerPost: SpeakerPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/speaker-categories",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var speakerCategories = [];

        Data.map((item, index) => {
          speakerCategories.push(item);
        });

        this.setState({
          speakerCategories: speakerCategories.filter(item => (item.speakers_posts || []).length > 0)
        });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/highlights-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var agendaPosts = [];

        Data.map((item, index) => {
          agendaPosts.push(item);
        });

        this.setState({ agendaPosts });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // Video

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/video-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Videotitle: item.Title });

            this.setState({ Videosubtitle: item.Subtitle });

            this.setState({ Videoiframelink: item.IframeLink });

            this.setState({ Videobuttontext: item.ButtonText });

            this.setState({ Videobuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/footer-social-icons",

      responseType: "json",
    })
      .then((response) => {
        if (response.status == 200) {
          var Data = response.data;

          var FooterSocialicons = [];

          Data.map((item, index) => {
            FooterSocialicons.push(item);
          });

          this.setState({ FooterSocialicons: FooterSocialicons });
        }
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

  loadMore() {
    this.setState((prev) => {
      return { visibleSpeakerPost: prev.visibleSpeakerPost + 4 };
    });
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "Speakers - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup6() {
    this.setState({ addClass6: !this.state.addClass6 });
  }

  togglePopup = () => {
    this.setState({ addClass: !this.state.addClass });
  };
  togglePopup2(e) {
    this.setState({ addClass2: !this.state.addClass2 });
  }

  togglePopup1() {
    this.setState({ addClass1: !this.state.addClass1 });
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

    if (rfields.selectthemetopic == "Other") {
      this.state.ThemesPosts = false;
      this.state.OtherRelevantTheme = true;
      this.state.relevant_theme = true;
    } else if (rfields.selectthemetopic == "Yes") {
      this.state.relevant_theme = true;
      this.state.ThemesPosts = true;
      this.state.OtherRelevantTheme = false;
    } else {
      this.state.relevant_theme = false;
      this.state.OtherRelevantTheme = false;
      this.state.ThemesPosts = false;
    }
  }

  submituserContactForm = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      let fields = {};
      fields["name"] = "";
      fields["lastname"] = "";
      fields["title"] = "";
      fields["companyname"] = "";
      fields["industry"] = "";
      fields["email"] = "";
      fields["phonenumber"] = "";
      fields["selectthemetopic"] = "";

      fields["linkedin"] = "";

      fields["provide"] = "";
      fields["audience"] = "";
      fields["tell_us"] = "";
      fields["how_about"] = "";

      fields["feelpdf"] = "";

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

      var whattheme = [];
      var themes = document.forms["become_speaker"].elements["whattheme[]"];
      if (themes) {
        for (var i = 0, len = themes.length; i < len; i++) {
          if (themes[i].checked) {
            whattheme.push(themes[i].value);
          }
        }
      }

      const formElement = document.querySelector("#become_speaker");
      var formdata = new FormData(formElement);

      axios({
        method: "post",
        data: formdata,
        url: GLOBAL.SITE_URL + "/upload",

        responseType: "json",
      }).then((response) => {
        var Data = response.data;

        this.state.rfields.Complementaryinformationattachments = Data[0];
        let rfields = this.state.rfields;

        console.log("rfields");
        console.log(rfields);

        this.setState({ rfields: rfields });

        // alert("Form submitted");

        var subscribecheck = rfields.subscribecheck == true ? true : false;
        var mediaquest = rfields.mediaquest == true ? true : false;

        var MobileNumber = rfields.phonenumber;
        if (MobileNumber.indexOf("+") < 0) {
          MobileNumber = "+" + MobileNumber;
        }

        const requestBody = {
          name: rfields.name,
          Lastname: rfields.lastname,
          Title: rfields.title,
          CompanyName: rfields.companyname,
          Industry: rfields.industry,
          email: rfields.email,
          Phonenumber: MobileNumber,
          LinkedinprofileorlinktoCV: rfields.linkedin,
          Isyourtopicofdiscussionrelevanttooneofthethemes:
          rfields.selectthemetopic,
          Provideinformationon: rfields.provide,
          Whoisyourtargetaudience: rfields.audience,
          yourexperienceandhowitmayberelevanttoTopCEO2020: rfields.tell_us,
          Howdidyouhearaboutus: rfields.how_about,
          OtherRelevantTheme: rfields.OtherRelevantTheme,
          SubscribetoUpdates: subscribecheck,
          SubscribetoMediaQuest: mediaquest,
          themes_posts: whattheme,
          additionalinformationasattachments:
          rfields.Complementaryinformationattachments,
        };

        axios({
          method: "POST",

          url: GLOBAL.SITE_URL + "/speaker-attendees",

          responseType: "json",
          data: requestBody,
        })
          .then((response) => {
            delete requestBody["Complementaryinformationattachments"];

            let url =
              GLOBAL.CRMAPIDATA.APIURL +
              "subscribers/478edd19c737d3d4593ec6c778b49dfe.json";
            var username = GLOBAL.CRMAPIDATA.APIKey;
            var password = GLOBAL.CRMAPIDATA.APIPassword;
            var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              "Basic " + btoa(username + ":" + password)
            );
            myHeaders.append("Content-type", "application/json; charset=UTF-8");
            var Data = {
              EmailAddress: rfields.email,
              name: rfields.name + " " + rfields.lastname,
              CustomFields: [
                { key: "LastName", value: rfields.lastname },
                { key: "Position", value: rfields.title },
                { key: "CompanyName", value: rfields.companyname },
                { key: "Industry", value: rfields.industry },
                { key: "PhoneNumber", value: MobileNumber },
                { key: "LinkedinprofileorlinktoCV", value: rfields.linkedin },
                { key: "Provideinformationon", value: rfields.provide },
                {
                  key: "Isyourtopicofdiscussionrelevanttooneofthethemes",
                  value: rfields.selectthemetopic,
                },
                {
                  key: "whatyouwouldliketopresent",
                  value: rfields.selectthemetopic,
                },
                { key: "Whoisyourtargetaudience", value: rfields.audience },
                {
                  key: "yourexperienceandhowitmayberelevanttoTopCEO2020",
                  value: rfields.tell_us,
                },
                { key: "Howdidyouhearaboutus", value: rfields.how_about },
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
                console.log("Error");
                console.log(error);
                this.setState({ addClass6: true });
                this.setState({
                  submitDisabled: false,
                  submitDisabledText: "",
                });
              });
          })

          .catch((err) => {
            console.log("Error");
            console.log(err);
            this.setState({ addClass6: true });
            this.setState({
              submitDisabled: false,
              submitDisabledText: "",
            });
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
    if (!fields["title"]) {
      formIsValid = false;

      errors["title"] = "Enter your title.";

      classn["title"] = "error";
    }

    if (typeof fields["title"] !== "undefined") {
      if (!fields["title"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["title"] = "Enter alphabet characters only.";

        classn["title"] = "error";
      }
    }

    // if (!fields["companyname"]) {

    //   formIsValid = false;

    //   errors["companyname"] = "Enter your companyname.";

    //   classn["companyname"] = "error";

    // }

    // if (typeof fields["companyname"] !== "undefined") {

    //   if (!fields["companyname"].match(/^[a-zA-Z ]*$/)) {

    //     formIsValid = false;

    //     errors["companyname"] = "Enter alphabet characters only.";

    //     classn["companyname"] = "error";

    //   }

    // }
    if (!fields["industry"]) {
      formIsValid = false;

      errors["industry"] = "Enter your industry.";

      classn["industry"] = "error";
    }

    if (typeof fields["industry"] !== "undefined") {
      if (!fields["industry"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        errors["industry"] = "Enter alphabet characters only.";

        classn["industry"] = "error";
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

    // if (!fields["position"]) {

    //   formIsValid = false;

    //   errors["position"] = "Enter your position.";

    //   classn["position"] = "error";

    // }

    // if (typeof fields["position"] !== "undefined") {

    //   if (!fields["position"].match(/^[a-zA-Z ]*$/)) {

    //     formIsValid = false;

    //     errors["position"] = "Enter alphabet characters only.";

    //     classn["position"] = "error";

    //   }

    // }

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

    if (!rfields["name"]) {
      formIsValid = false;

      rerrors["name"] = "Enter your name.";

      rclassn["name"] = "error";
    }

    if (typeof rfields["name"] !== "undefined") {
      if (!rfields["name"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["name"] = "Enter alphabet characters only.";

        rclassn["name"] = "error";
      }
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
    if (!rfields["title"]) {
      formIsValid = false;

      rerrors["title"] = "Enter your title.";

      rclassn["title"] = "error";
    }

    if (typeof rfields["title"] !== "undefined") {
      if (!rfields["title"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["title"] = "Enter alphabet characters only.";

        rclassn["title"] = "error";
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

    // if (!rfields["companyname"]) {

    //   formIsValid = false;

    //   rerrors["companyname"] = "Enter your companyname.";

    //   rclassn["companyname"] = "error";

    // }

    // if (typeof rfields["companyname"] !== "undefined") {

    //   if (!rfields["companyname"].match(/^[a-zA-Z ]*$/)) {

    //     formIsValid = false;

    //     rerrors["companyname"] = "Enter alphabet characters only.";

    //     rclassn["companyname"] = "error";

    //   }

    // }

    // if (!rfields["selectthemetopic"]) {

    //   formIsValid = false;

    //   rerrors["selectthemetopic"] = "Enter your selectthemetopic.";

    //   rclassn["selectthemetopic"] = "error";

    // }

    // if (typeof rfields["selectthemetopic"] !== "undefined") {

    //   if (!rfields["selectthemetopic"].match(/^[a-zA-Z ]*$/)) {

    //     formIsValid = false;

    //     rerrors["selectthemetopic"] = "Enter alphabet characters only.";

    //     rclassn["selectthemetopic"] = "error";

    //   }

    // }

    // if (!rfields["position"]) {

    //   formIsValid = false;

    //   rerrors["position"] = "Enter your position.";

    //   rclassn["position"] = "error";

    // }

    // if (typeof rfields["position"] !== "undefined") {

    //   if (!rfields["position"].match(/^[a-zA-Z ]*$/)) {

    //     formIsValid = false;

    //     rerrors["position"] = "Enter alphabet characters only.";

    //     rclassn["position"] = "error";

    //   }

    // }

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
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if ((document.title = "Speakers - Top CEO")) {
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
              if (item.Selectpage == "Speakers") {
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
                    name="url"
                    <meta
                      property="og:url"
                      content={
                        siteurl + "/Top-CEO-Conference-Bahrain-2020-Speakers"
                      }
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.SpeakersContent.length > 0
            ? this.state.SpeakersContent.map((item, index) => {
              if (item.Selectposition == "Top") {
                return (
                  <section className="theme_banner_section speaker_banner_section">
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

          <section className="theme_selection_section home_speaker_section  speaker_main_section ">
            <div className="theme_selection_bg">
              <div className="container">
                {this.state.speakerCategories.map((category, index) => (
                  <>
                    <h2 id={`category-${index}`}>{category.name}</h2>
                    <div className="container">
                      <div className="row">
                        {category.speakers_posts.map((item, position) => (
                          <div
                            className="column col-12"
                            style={{ paddingLeft: '12rem', paddingRight: '12rem' }}
                            onClick={() => {
                              this.setState({
                                speaker: this.state.SpeakerPost.find(element => element.id === item.id),
                                addClass: true
                              });
                            }}
                            id={position}
                          >
                            <div className="row">
                              <div className="column col-8">
                                <h4>{item.Title}</h4>
                                <div dangerouslySetInnerHTML={{ __html: item.Autorname }} />
                              </div>
                              <div className="column col-4">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ))}
                <div className="container">
                  <div className="row">
                    {this.state.addClass ? (
                      <div
                        className="details_popup speaker_details_popup"
                        id={this.state.speaker.id}
                      >
                        <div className="all_popup">
                          <div className="details_popup_content">
                            <button
                              onClick={() => {
                                this.setState({
                                  speaker: {},
                                  addClass: false,
                                });
                              }}
                              className="details_popup_close"
                            >
                              <img src={search_close} />
                            </button>

                            <div className="container">
                              <div className="row">
                                <div className="column col-6">
                                  <div className="detail_popup_img">
                                    <img
                                      src={
                                        GLOBAL.SITE_URL +
                                        this.state.speaker.Image.url
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <div className="theme_selection_block">
                                    <h3>
                                      {
                                        this.state.speaker.Title
                                      }
                                    </h3>

                                    <small
                                      dangerouslySetInnerHTML={{
                                        __html:
                                        this.state.speaker.Autorname,
                                      }}
                                    ></small>

                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                        this.state.speaker.Description,
                                      }}
                                    ></div>

                                    <ul className="social_icons">
                                      {this.state.speaker.FackbookLink == null ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.speaker.FackbookLink
                                            }
                                            target="_blank"
                                          >
                                            <img
                                              src={fb}
                                              height="20px"
                                              width="9px"
                                              className="fb_icon"
                                            />
                                          </a>
                                        </li>
                                      )}

                                      {this.state.speaker.TwitterLink == null ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.speaker.TwitterLink
                                            }
                                            target="_blank"
                                          >
                                            <img
                                              src="twitter.svg"
                                              height="20px"
                                              width="24px"
                                              className="twr_icon"
                                            />
                                          </a>
                                        </li>
                                      )}

                                      {this.state.speaker.LinkedinLink == null ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.speaker.LinkedinLink
                                            }
                                            target="_blank"
                                          >
                                            <img
                                              src="linkedin.svg"
                                              height="20px"
                                              width="20px"
                                              className="lin_icon"
                                            />
                                          </a>
                                        </li>
                                      )}
                                    </ul>

                                    {(this.state.speaker?.agenda_posts || []).length > 0 && (
                                      <div className="speaker_agenda_posts">
                                        <h3 className="title">Agenda</h3>
                                        <Row>
                                          {(this.state.speaker?.agenda_posts || []).map(item => (
                                            <Col
                                              md={6}
                                              style={{
                                                marginBottom: '1.5rem',
                                                cursor: 'pointer'
                                              }}
                                              onClick={() => this.setState({
                                                addClass3: true,
                                                agenda: this.state.agendaPosts.find(agenda => agenda.id === item.id)
                                              })}
                                            >
                                              <img src={GLOBAL.SITE_URL + item.Image?.url} />
                                              <span>{item.Title}</span>
                                            </Col>
                                          ))}
                                        </Row>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="column col-12">
                      {this.state.visibleSpeakerPost <
                      this.state.SpeakerPost.length && (
                        <a className="border-bottom_link" onClick={this.loadMore}>
                          Load more
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="speakers_past_section">
            <div className="container">
              <h2>
                <span>{this.state.Videosubtitle}</span>
                {this.state.Videotitle}
              </h2>

              <iframe
                width="1280"
                height="600"
                src={this.state.Videoiframelink}
              ></iframe>

              <a
                href={this.state.Videobuttonlink}
                className="border-bottom_link"
              >
                {this.state.Videobuttontext}
              </a>
            </div>
          </section>

          {this.state.SpeakersContent.length > 0
            ? this.state.SpeakersContent.map((item, index) => {
              if (item.Selectposition == "Bottom") {
                return (
                  <section className="theme_ticket_section speakers_partner_section">
                    <div className="container">
                      <div className="theme_ticket_content">
                        <div className="row">
                          <div className="column col-8">
                            <h3>{item.Title}</h3>

                            <p>{item.SubTitle}</p>
                          </div>

                          <div className="column col-4">
                            <a
                              href={item.ButtonLink}
                              className="btn"
                              onClick={this.togglePopup1.bind(this)}
                            >
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }
            })
            : null}

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
                        <p>
                          Are you interested in sharing your expertise &
                          speaking during Top CEO 2020 event?
                        </p>

                        <div className="theme_selection_block">
                          <form
                            method="post"
                            name="userRegisterForm"
                            id="become_speaker"
                            onSubmit={this.submituserRegisterForm}
                            className="contact_from"
                          >
                            <div className="container">
                              <div className="row">
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="name"
                                    name="name"
                                    maxLength="255"
                                    placeholder="Name*"
                                    type="text"
                                    value={this.state.rfields.name}
                                    className={this.state.rclassn.name}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.name}
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
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.lastname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="title"
                                    name="title"
                                    maxLength="255"
                                    placeholder="Title*"
                                    type="text"
                                    value={this.state.rfields.title}
                                    className={this.state.rclassn.title}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.title}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="companyname"
                                    name="companyname"
                                    maxLength="255"
                                    placeholder="Company Name"
                                    type="text"
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
                                    type="text"
                                    value={this.state.rfields.industry}
                                    className={this.state.rclassn.industry}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
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
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.email}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="phonenumber"
                                    name="phonenumber"
                                    maxLength="20"
                                    placeholder="Phone number*"
                                    value={this.state.rfields.phonenumber}
                                    className={this.state.rfields.phonenumber}
                                    onChange={(e) =>
                                      (this.state.rfields.phonenumber = e)
                                    }
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.phonenumber}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="Linkedin profile or link to CV"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.linkedin}
                                    className={this.state.rclassn.linkedin}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.linkedin}
                                  </div>
                                </div>

                                <p>
                                  Tell us more about your interest in speaking
                                  at Top CEO:
                                </p>

                                <div className="column col-6">
                                  <select
                                    name="selectthemetopic"
                                    value={this.state.rfields.selectthemetopic}
                                    onChange={this.rhandleChange}
                                    placeholder="Is your topic of discussion relevant to one of the themes?"
                                  >
                                    <option>
                                      Is your topic of discussion relevant to
                                      one of the themes?
                                    </option>
                                    <option val="Yes">Yes</option>
                                    <option val="Other">Other</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="audience"
                                    name="audience"
                                    maxLength="255"
                                    placeholder="Who is your target audience"
                                    type="text"
                                    value={this.state.rfields.audience}
                                    className={this.state.rclassn.audience}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.audience}
                                  </div>
                                </div>

                                {this.state.relevant_theme ? (
                                  <div className="column col-12">
                                    {this.state.OtherRelevantTheme ? (
                                      <FloatingLabel
                                        id="OtherRelevantTheme"
                                        name="OtherRelevantTheme"
                                        maxLength="255"
                                        placeholder="Other relevant theme"
                                        type="text"
                                        value={
                                          this.state.rfields.OtherRelevantTheme
                                        }
                                        className={
                                          this.state.rclassn.OtherRelevantTheme
                                        }
                                        onChange={(evt) =>
                                          this.setState(() => ({
                                            value: evt.currentTarget.value,
                                          }))
                                        }
                                        onChange={this.rhandleChange}
                                        onKeyUp={this.handleKeyUpChange}
                                      />
                                    ) : null}{" "}
                                    {this.state.ThemesPosts ? (
                                      <div className="checkbox multi_checkbox">
                                        <span>
                                          What themes are you most interested
                                          in?
                                        </span>

                                        {this.state.ThemePost.length > 0
                                          ? this.state.ThemePost.map(
                                            (item, index) => {
                                              return (
                                                <div>
                                                  <input
                                                    type="checkbox"
                                                    id={item.id}
                                                    name="whattheme[]"
                                                    className="whattheme"
                                                    value={item.id}
                                                    onChange={
                                                      this.rhandleChange
                                                    }
                                                    onClick={this.checkbox.bind(
                                                      this
                                                    )}
                                                  />
                                                  <label for={item.id}>
                                                    {item.Title}
                                                  </label>
                                                </div>
                                              );
                                            }
                                          )
                                          : null}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}

                                <div className="column col-6">
                                  <TextField
                                    id="provide"
                                    name="provide"
                                    label="Provide information on what you would like to present"
                                    multiline
                                    rows={2}
                                    value={this.state.rfields.provide}
                                    className={this.state.rclassn.provide}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.provide}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <TextField
                                    id="tell_us"
                                    label="Tell us briefly about your experience and how it may be relevant to Top CEO 202"
                                    name="tell_us"
                                    hintText="Message Field"
                                    // variant="outlined"
                                    multiline
                                    rows={2}
                                    value={this.state.rfields.tell_us}
                                    className={this.state.rclassn.tell_us}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.tell_us}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="how_about"
                                    name="how_about"
                                    placeholder="How did you hear about us?"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.how_about}
                                    className={this.state.rclassn.how_about}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.handleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.how_about}
                                  </div>
                                </div>

                                <div className="column col-6 file_upload">
                                  <FloatingLabel
                                    id="feelpdf"
                                    name="files"
                                    placeholder="Attach a sample of your work here:"
                                    type="file"
                                    value={this.state.rfields.feelpdf}
                                    className={this.state.rclassn.feelpdf}
                                    onChange={(evt) => {
                                      this.rhandleChange(evt);
                                    }}
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

          {this.state.addClass3 ? (
            <div
              className="details_popup agenda_detail_popup"
              id={this.state.agenda}
            >
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={() => {
                      this.setState({
                        agenda: {},
                        addClass3: false
                      });
                    }}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-6">
                        <div className="detail_popup_img">
                          <img src={GLOBAL.SITE_URL + this.state.agenda.Image.url}/>{" "}
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block nominees_content">
                          <div className="user_detail">
                            <img src={GLOBAL.SITE_URL + this.state.agenda.UserImage.url}/>

                            <span><small>Speaker:</small>{this.state.agenda.UserName}</span>

                            {this.state.agenda.RightLogoLink == null ? null : (
                              <a href={this.state.agenda.RightLogoLink} target="_blank">
                                <img
                                  src={GLOBAL.SITE_URL + this.state.agenda.RightLogo.url}
                                  className="right_img"
                                  width="76px"
                                  height="25px"
                                />
                              </a>
                            )}
                          </div>

                          <small className="date">
                            {this.state.agenda.StartTime.toLowerCase()}
                            {this.state.agenda.StartTime != ""
                              ? " to "
                              : null}
                            {this.state.agenda.EndTime.toLowerCase()}
                          </small>

                          <h3>{this.state.agenda.Title}</h3>

                          <span className="address_text">
                            <img src={pin} />
                            <small>
                              {this.state.agenda.Addresstext}
                            </small>
                          </span>

                          <div dangerouslySetInnerHTML={{ __html: this.state.agenda.Content }}/>

                          <ul>
                            {this.state.agenda.agenda_themes.length > 0
                              ? this.state.agenda.agenda_themes.map((aitem, aindex) => {
                                return <li>{aitem.Name}</li>;
                              })
                              : null}
                            {this.state.agenda.agenda_acts.length > 0
                              ? this.state.agenda.agenda_acts.map((avitem, avindex) => {
                                return <li>{avitem.Name}</li>;
                              })
                              : null}
                          </ul>

                          <div className="line_div">
                            <a href={this.state.agenda.ButtonLink1} className="btn">
                              <span>
                                {this.state.agenda.ButtonText1}
                              </span>
                            </a>

                            <a href={this.state.agenda.ButtonLink2} className="border-bottom_link">
                              {this.state.agenda.ButtonText2}
                            </a>
                          </div>
                        </div>
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

export default Speakers;
