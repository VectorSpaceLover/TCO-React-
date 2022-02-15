import React, { Component } from "react";

import "../App.css";

import { Helmet } from "react-helmet";

import FloatingLabel from "floating-label-react";

import "floating-label-react/styles.css";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";

import payimg_img1 from "../images/payimg_img1.png";
import payimg_img2 from "../images/payimg_img2.png";
import payimg_img3 from "../images/payimg_img3.png";
import payimg_img4 from "../images/payimg_img4.png";

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
const MODAL_OPEN_CLASS1 = "body--popup--open1";
const MODAL_OPEN_CLASS2 = "body--popup--open2";
const MODAL_OPEN_CLASS3 = "body--popup--open3";
const MODAL_OPEN_CLASS4 = "body--popup--open4";
const MODAL_OPEN_CLASS5 = "body--popup--open5";
const MODAL_OPEN_CLASS6 = "body--popup--open6";
const divStyle = {
  marginTop: "0px",
};
var OptionData = [];
var PaymentSettings = [];
var USDToAED = "";
var PackageName = "";
var PackagePrice = "";
var countryCode = "";
var firstName = "";
var lastName = "";
var address1 = "";
var Event_Id = "";
var submitDisabled: false;
var submitDisabledText: "";

var rclassn = [];
var rerrors = [];

var aclassn = [];
var aerrors = [];

let sessionId;
const access_token = "null";
const paymentResponse = "null";
class Attend extends Component {
  state = { didMount: false };
  componentDidMount() {
    document.title = "Attend - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      fields: {},

      afields: {},

      rfields: {},

      cfields: {},

      efields: {},

      afields: {},

      ufields: {},

      errors: {},

      eerrors: {},

      rerrors: {},

      cerrors: {},

      aerrors: {},

      uerrors: {},

      classn: {},

      classu: {},

      classe: {},

      rclassn: {},

      cclassn: {},

      aclassn: {},

      checkd: false,

      addClass: false,

      addClass1: false,

      addClass2: false,

      addClass3: false,

      addClass4: false,

      addClass5: false,
      addClass6: false,

      formerror: "",

      eformerror: "",

      uformerror: "",

      attended: "",

      other_interested: "",
      other_position: "",
      other_hear: "",

      AttendPost: [],
      ErrorPost: [],

      ThankyouPost: [],

      SAttendPost: [],

      IndustryName: [],

      AffiliateName: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.rhandleChange = this.rhandleChange.bind(this);
    this.ehandleChange = this.ehandleChange.bind(this);
    this.ahandleChange = this.ahandleChange.bind(this);
    this.uhandleChange = this.uhandleChange.bind(this);
    this.rhandleKeyUpChange = this.rhandleKeyUpChange.bind(this);

    this.ahandleKeyUpChange = this.ahandleKeyUpChange.bind(this);
    this.cardhandleChange = this.cardhandleChange.bind(this);
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

    let search = window.location.search;
    let params = new URLSearchParams(search);
    let EventId = params.get("event_id");
    let PaymentStatus = params.get("status");

    document.location.hash = "";

    if (EventId != "" && EventId != null) {
      const requestBody = {
        Invite_Code_Used: true,
      };

      axios({
        method: "PUT",

        url: GLOBAL.SITE_URL + "/event-attendees/" + EventId,

        responseType: "json",
        data: requestBody,
      })
        .then((response) => {
          this.setState({ addClass5: true });
        })

        .catch((err) => {
          console.log(err);
          this.setState({ addClass6: true });
          console.log("Error");
        });
    }

    if (PaymentStatus == "error") this.setState({ addClass6: true });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/payment-settings",

      responseType: "json",
    }).then((response) => {
      PaymentSettings = response.data;
      USDToAED = PaymentSettings[0].USDToAED;

      window.NI.mountCardInput("payment_fields", {
        apiKey: PaymentSettings[0].HostedSession, // API Key for WEB SDK from the portal
        outletRef: PaymentSettings[0].OutletRef, // outlet reference from the portal
        onSuccess: GLOBAL.SITE_URL + "/Attend/", // Success callback if apiKey validation succeeds
        onChangeValidStatus: ({
                                isCVVValid,
                                isExpiryValid,
                                isNameValid,
                                isPanValid,
                              }) => {
          console.log(isCVVValid, isExpiryValid, isNameValid, isPanValid);
        },
      });
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

    // Theme
    OptionData = countryList().getData();
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/positions",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var positions = [];

        Data.map((item, index) => {
          positions.push(item);
        });

        this.setState({ positions: positions });
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

      url: GLOBAL.SITE_URL + "/affiliate-names",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        console.log(Data);
        var AffiliateName = [];

        Data.map((item, index) => {
          AffiliateName.push(item);
        });

        this.setState({ AffiliateName: AffiliateName });
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

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async createSession() {
    if (this.button.disabled == true) return false;

    const response = await window.NI.generateSessionId();
    const sessionId = response.session_id;

    this.button.disabled = true;
    this.button.nextElementSibling.textContent =
      "please wait, payment is being processed";
    submitDisabled = true;
    submitDisabledText = "please wait, payment is being processed";

    // Access Token code start
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://identity-uat.ngenius-payments.com/auth/realms/ni/protocol/openid-connect/token";

    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic " + PaymentSettings[0].APIKEY);

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(proxyurl + url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("Access Token");
        console.log(result.access_token);
        const access_token = result.access_token;
        // Access Token code end
        //Once you get accesstoken run paymnet
        var myHeaderspayment = new Headers();
        myHeaderspayment.append("Authorization", "Bearer " + access_token);
        myHeaderspayment.append(
          "Content-Type",
          "application/vnd.ni-payment.v2+json"
        );
        myHeaderspayment.append("Accept", "application/vnd.ni-payment.v2+json");
        var price =
          PackagePrice.replace("$", "") * PaymentSettings[0].USDToAED * 100;

        var raw =
          '{"action":"AUTH","amount":{ "currencyCode":"AED", "value": ' +
          price +
          ' },"billingAddress":{"firstName":"' +
          firstName +
          '","lastName":"' +
          lastName +
          '","address1":"' +
          address1 +
          '","countryCode":"' +
          countryCode +
          '"}}';

        var requestOptions = {
          method: "POST",
          headers: myHeaderspayment,
          body: raw,
          redirect: "follow",
        };
        console.log("Paymnet Hosetyed Session");
        console.log(requestOptions);
        console.log(raw);
        console.log(sessionId);

        fetch(
          "https://api-gateway-uat.ngenius-payments.com/transactions/outlets/" +
          PaymentSettings[0].OutletRef +
          "/payment/hosted-session/" +
          sessionId,
          requestOptions
        )
          .then((response) => response.json())
          .then((result1) => {
            console.log(result1);
            //Pay end

            // On success of payment pass reponse in 3ds payment
            window.NI.handlePaymentResponse(result1, {
              mountId: "3ds_iframe",
              style: {
                width: 500,
                height: 300,
              },
            })
              .then(function (response) {
                console.log(response);
                if (
                  response.status == "CAPTURED" ||
                  response.status == "AUTHORISED"
                ) {
                  window.location =
                    "/Attend-Bahrain-GCC-Top-CEO-2020?event_id=" +
                    Event_Id +
                    "&status=success";
                } else {
                  console.log(response.status, response.error);
                  window.location =
                    "/Attend-Bahrain-GCC-Top-CEO-2020?status=error";
                }
              })
              .catch((error) => {
                console.log(error);
                window.location =
                  "/Attend-Bahrain-GCC-Top-CEO-2020?status=error";
                console.log("error");
              });
          })
          .catch((error) => {
            console.log(error);
            window.location = "/Attend-Bahrain-GCC-Top-CEO-2020?status=error";
            console.log("error");
          });
      })
      .catch((error) => {
        console.log(error);
        window.location = "/Attend-Bahrain-GCC-Top-CEO-2020?status=error";
        console.log("error");
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

  togglePopup3(e) {
    this.setState({ addClass3: !this.state.addClass3 });
  }

  togglePopup4(e) {
    this.setState({ addClass4: !this.state.addClass4 });
  }
  togglePopup5(e) {
    this.setState({ addClass5: !this.state.addClass5 });
  }

  togglePopup6() {
    this.setState({ addClass6: !this.state.addClass6 });
  }

  handleChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.validationue;

    this.setState({
      fields,
    });
  }

  ahandleKeyUpChange(e) {
    var name = e.target.name;
    var maxLength = e.target.maxLength;
    if (e.target.type == "textarea") maxLength = 1000;

    var var_len = e.target.value.length;

    if (maxLength != "-1" && var_len != 0 && maxLength <= var_len) {
      aerrors[name] =
        "Please reduce the text to under " + maxLength + " characters";

      aclassn[name] = "error";
    } else {
      aerrors[name] = "";

      aclassn[name] = "";
    }
    this.setState({ aerrors: aerrors, aclassn: aclassn });
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

  rhandleChange(e) {
    let rfields = this.state.rfields;

    rfields[e.target.name] = e.target.value;

    this.setState({
      rfields,
    });
  }

  ehandleChange(e) {
    let efields = this.state.efields;

    efields[e.target.name] = e.target.value;

    this.setState({
      efields,
    });
  }

  ahandleChange(e) {
    let afields = this.state.afields;
    afields[e.target.name] = e.target.value;

    this.setState({
      afields,
    });

    if (afields.aboutus == "Other") this.state.other_hear = true;
    else this.state.other_hear = false;

    if (afields.interested == "Other") this.state.other_interested = true;
    else this.state.other_interested = false;

    if (afields.company_list == "Other") this.state.other_position = true;
    else this.state.other_position = false;

    if (afields.attended_ceo == "Yes") this.state.attended = true;
    else this.state.attended = false;
  }

  uhandleChange(e) {
    let ufields = this.state.ufields;

    ufields[e.target.name] = e.target.value;

    this.setState({
      ufields,
    });
  }

  SubmitInviteCodeForm = (e) => {
    e.preventDefault();

    if (this.evalidateForm()) {
      let efields = this.state.efields;
      axios({
        method: "get",

        url:
          GLOBAL.SITE_URL +
          "/event-attendees?InviteCode=" +
          efields.invitecode +
          "&_limit=1&Invite_Code_Used=false",

        responseType: "json",
      })
        .then((response) => {
          var Data = response.data;

          if (Data.length == 0) {
            this.setState({ eformerror: "Invalid Invite Code." });
          } else {
            var MobileNumber = "";

            if (Data[0].MobileNumber != null) {
              MobileNumber = Data[0].MobileNumber;
              if (MobileNumber.indexOf("+") < 0) {
                MobileNumber = "+" + MobileNumber;
              }
            }
            this.state.afields.event_id = Data[0].id != null ? Data[0].id : "";
            this.state.afields.InviteCodeType =
              Data[0].InviteCodeType != null
                ? Data[0].InviteCodeType
                : "FreeTicket";
            this.state.afields.username =
              Data[0].First_Name != null ? Data[0].First_Name : "";
            this.state.afields.lastname =
              Data[0].LastName != null ? Data[0].LastName : "";
            this.state.afields.emailid =
              Data[0].Email != null ? Data[0].Email : "";
            this.state.afields.linkedin =
              Data[0].LinkedinprofileorlinktoCV != null
                ? Data[0].LinkedinprofileorlinktoCV
                : "";
            this.state.afields.company =
              Data[0].Company != null ? Data[0].Company : "";
            this.state.afields.Positions =
              Data[0].Positions != null ? Data[0].Positions : "";
            this.state.afields.title =
              Data[0].Title != null ? Data[0].Title : "";
            this.state.afields.industry =
              Data[0].Industry != null ? Data[0].Industry : "";
            this.state.afields.country =
              Data[0].Country != null ? Data[0].Country : "";
            this.state.afields.Affiliate =
              Data[0].Affiliate != null ? Data[0].Affiliate : "";
            this.state.afields.mobileno = MobileNumber;
            this.state.afields.subscribecheck =
              Data[0].SubscribetoUpdates != null
                ? Data[0].SubscribetoUpdates
                : false;
            this.state.afields.mediaquest =
              Data[0].SubscribetoMediaQuest != null
                ? Data[0].SubscribetoMediaQuest
                : false;
            this.state.afields.ttitle = Data[0].ticket_type.Title;
            this.state.afields.tsubtitle = Data[0].ticket_type.SubTitle;
            this.state.afields.address = Data[0].ticket_type.address;

            this.setState({ eformerror: "" });
            this.setState({ addClass1: true });
          }
        })

        .catch((err) => {
          this.setState({ addClass6: true });
          console.log(err);

          console.log("Error");
        });
    }
  };

  submituserRegisterForm = (e) => {
    e.preventDefault();

    if (this.rvalidateForm()) {
      let rfields = this.state.rfields;

      this.setState({ rfields: rfields });

      var subscribecheck = rfields.subscribecheck == true ? true : false;
      var mediaquest = rfields.mediaquest == true ? true : false;
      var TicketTypeID = rfields.TicketType;

      var MobileNumber = rfields.mobileno;
      if (MobileNumber.indexOf("+") < 0) {
        MobileNumber = "+" + MobileNumber;
      }

      const requestBody = {
        First_Name: rfields.username,
        LastName: rfields.lastname,
        Email: rfields.emailid,
        Company: rfields.company,
        Title: rfields.title,
        Industry: rfields.industry,
        Country: rfields.country,
        MobileNumber: MobileNumber,
        SubscribetoUpdates: subscribecheck,
        SubscribetoMediaQuest: mediaquest,
        Invite_Code_Used: false,
        ticket_type: TicketTypeID,
        Affiliate: rfields.affiliate,
      };

      axios({
        method: "POST",

        url: GLOBAL.SITE_URL + "/event-attendees",

        responseType: "json",
        data: requestBody,
      })
        .then((response) => {
          let url =
            GLOBAL.CRMAPIDATA.APIURL +
            "subscribers/3835901b290b3679b94124447287329e.json";
          console.log(url);
          const proxyurl = "https://cors-anywhere.herokuapp.com/";
          var username = GLOBAL.CRMAPIDATA.APIKey;
          var password = GLOBAL.CRMAPIDATA.APIPassword;
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
          );
          myHeaders.append("Content-type", "application/json; charset=UTF-8");
          var Data = {
            EmailAddress: rfields.emailid,
            name: rfields.username + " " + rfields.lastname,
            CustomFields: [
              { key: "LastName", value: rfields.lastname },
              { key: "CompanyName", value: rfields.company },
              { key: "CountryOfOrigin", value: rfields.country },
              { key: "PhoneNumber", value: MobileNumber },
              { key: "Position", value: rfields.title },
              { key: "Industry", value: rfields.industry },
              { key: "Affiliate", value: rfields.affiliate },
              { key: "TicketCodeUsed", value: false },
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

          fetch(proxyurl + url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(result);
              this.setState({ addClass: false });
              this.setState({ addClass2: true });
              let rfields = {};

              this.setState({ rfields: rfields });
            })
            .catch((error) => {
              console.log(error);
              this.setState({ addClass6: true });
              console.log("error");
            });

          /* list id : 3835901b290b3679b94124447287329e */

          /* code for store data in cms end */
          /*attendee form (http://3.20.69.77:3000/contact) end*/
        })

        .catch((err) => {
          console.log(err);
          this.setState({ addClass6: true });
          console.log("Error");
        });
    }
  };

  SubmitAttendForm = (e) => {
    e.preventDefault();

    var whattheme = [];
    var themes = document.forms["finish_registration"].elements["whattheme[]"];

    for (var i = 0, len = themes.length; i < len; i++) {
      if (themes[i].checked) {
        whattheme.push(themes[i].value);
      }
    }

    if (this.avalidateForm()) {
      let afields = this.state.afields;

      console.log("afields");
      console.log(afields);

      this.setState({ afields: afields });

      // alert("Form submitted");

      var subscribecheck = afields.subscribecheck == true ? true : false;
      var mediaquest = afields.mediaquest == true ? true : false;

      var TicketCodeUsed =
        afields.InviteCodeType == "FreeTicket" ? true : false;

      var MobileNumber = afields.mobileno;
      if (MobileNumber.indexOf("+") < 0) {
        MobileNumber = "+" + MobileNumber;
      }

      const requestBody = {
        First_Name: afields.username,
        LastName: afields.lastname,
        Email: afields.emailid,
        Company: afields.company,
        Title: afields.title,
        Industry: afields.industry,
        MobileNumber: MobileNumber,
        SubscribetoUpdates: subscribecheck,
        SubscribetoMediaQuest: mediaquest,
        Positions: afields.company_list,
        LinkedinprofileorlinktoCV: afields.linkedin,
        Address: afields.address,
        Youareinterestedin: afields.interested,
        Whatthemesareyoumostinterestedin: afields.whattheme,
        HaveyoupreviouslyattendedTopCEO: afields.other_interested,
        hearaboutusOther: afields.other_hear,
        OtherPosition: afields.other_position,
        Howdidyouhearaboutus: afields.aboutus,
        HaveyoupreviouslyattendedTopCEO: afields.attended_ceo,
        WhatYear: afields.whatyear,
        Country: afields.country,
        CompannominatedfortheAwardceremony: afields.nominated,
        WhatYear: afields.whatyear,
        Invite_Code_Used: TicketCodeUsed,
        TicketCodeUsed: TicketCodeUsed,
        themes_posts: whattheme,
        Affiliate: afields.affiliate,
      };

      axios({
        method: "PUT",

        url: GLOBAL.SITE_URL + "/event-attendees/" + afields.event_id,

        responseType: "json",
        data: requestBody,
      })
        .then((response) => {
          requestBody.TicketCode = response.data.InviteCode;

          var raw = JSON.stringify(requestBody);
          let url =
            GLOBAL.CRMAPIDATA.APIURL +
            "subscribers/3835901b290b3679b94124447287329e.json";
          var username = GLOBAL.CRMAPIDATA.APIKey;
          var password = GLOBAL.CRMAPIDATA.APIPassword;
          var myHeaders = new Headers();
          myHeaders.append(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
          );
          myHeaders.append("Content-type", "application/json; charset=UTF-8");
          var Data = {
            EmailAddress: afields.emailid,
            name: afields.username + " " + afields.lastname,
            CustomFields: [
              { key: "FirstName1", value: afields.username },
              { key: "LastName1", value: afields.lastname },
              { key: "CompanyName", value: afields.company },
              { key: "CountryOfOrigin", value: afields.country },
              { key: "PhoneNumber", value: MobileNumber },
              { key: "Position", value: afields.title },
              { key: "Industry", value: afields.industry },
              { key: "TicketCode", value: requestBody.TicketCode },
              { key: "TicketCodeUsed", value: TicketCodeUsed },
              { key: "Affiliate", value: afields.affiliate },
              { key: "Address", value: afields.address },
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

              let priceAfterDiscount = afields.tsubtitle.substring(
                1,
                afields.tsubtitle.length
              );

              if (afields.InviteCodeType == "FreeTicket") {
                this.setState({ addClass5: true });
              } else if (afields.InviteCodeType == "Discount400") {
                if (priceAfterDiscount <= 400) {
                  // PackagePrice = "$" + 0;
                  this.setState({ addClass5: true });
                } else {
                  priceAfterDiscount = priceAfterDiscount - 400;
                  PackagePrice = "$" + priceAfterDiscount;
                  PackageName = afields.ttitle;
                  firstName = afields.username;
                  lastName = afields.lastname;
                  address1 = afields.address;
                  Event_Id = afields.event_id;
                  countryCode = OptionData.filter(function (OptionData) {
                    return OptionData.label == afields.country;
                  });
                  countryCode = countryCode[0].value;
                  this.setState({ addClass4: true });
                }
              } else if (afields.InviteCodeType == "Discount700") {
                if (priceAfterDiscount <= 700) {
                  // PackagePrice = "$" + 0;
                  this.setState({ addClass5: true });
                } else {
                  priceAfterDiscount = priceAfterDiscount - 700;
                  PackagePrice = "$" + priceAfterDiscount;
                  PackageName = afields.ttitle;
                  firstName = afields.username;
                  lastName = afields.lastname;
                  address1 = afields.address;
                  Event_Id = afields.event_id;
                  countryCode = OptionData.filter(function (OptionData) {
                    return OptionData.label == afields.country;
                  });
                  countryCode = countryCode[0].value;
                  this.setState({ addClass4: true });
                }
              } else {
                // PackageName = response.data.ticket_type.Title;
                // PackagePrice = response.data.ticket_type.SubTitle;
                PackageName = afields.ttitle;
                PackagePrice = afields.tsubtitle;
                firstName = afields.username;
                lastName = afields.lastname;
                address1 = afields.address;
                Event_Id = afields.event_id;
                countryCode = OptionData.filter(function (OptionData) {
                  return OptionData.label == afields.country;
                });
                countryCode = countryCode[0].value;
                this.setState({ addClass4: true });
              }
            })
            .catch((error) => {
              this.setState({ addClass6: true });
              console.log(error);
            });

          /* code for store data in cms start */
          /*update attendee form (http://3.20.69.77:3000/contact) start*/
          /* list id : 3835901b290b3679b94124447287329e */
          // let url = 'https://api.createsend.com/api/v3.2/subscribers/3835901b290b3679b94124447287329e.json';
          // var username = 'keJ5CdWCEJQc+b50C/joUTRN6JSOJtn9kzyRcZBTpqiDylLIF7FVAWuTv1T/CO5nAu7gq/7mI83kRWC2omQ52hU5LrxdWmupHV+lWHysMaH4EpMuDSIK+VVsKxabs5alhGgvGeW6I/+nw/rcTLdZFQ==';
          // var password = 'x';

          // fetch(url, {
          //   method: 'POST',

          //   body: JSON.stringify(),
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
          //   // if (response.data.InviteCodeType == "FreeTicket") {
          //     if (afields.InviteCodeType == "FreeTicket") {
          //       this.setState({ addClass5: true });
          //     } else {
          //       // PackageName = response.data.ticket_type.Title;
          //       // PackagePrice = response.data.ticket_type.SubTitle;
          //       PackageName = afields.ttitle;
          //       PackagePrice = afields.tsubtitle;
          //       this.setState({ addClass4: true });
          //     }
          //   })
          //   .then(result => console.log(result))
          //   .catch(error => {
          //     this.setState({ addClass6: true });
          //     console.log(error);
          //   });
          /* code for store data in cms end */
          /*update attendee form (http://3.20.69.77:3000/contact) end*/
        })

        .catch((err) => {
          console.log(err);
          this.setState({ addClass6: true });
          console.log("Error");
        });
    }
  };

  SubmitUserForm = (e) => {
    e.preventDefault();

    if (this.uvalidateForm()) {
      let ufields = this.state.ufields;

      this.setState({ ufields: ufields });

      var subscribecheck = ufields.subscribecheck == true ? true : false;
      var mediaquest = ufields.mediaquest == true ? true : false;
      var TicketTypeID = ufields.TicketType;

      axios({
        method: "GET",

        url: GLOBAL.SITE_URL + "/attend-selection-sections/" + TicketTypeID,

        responseType: "json",
      })
        .then((response) => {
          var Data = response.data;

          this.setState({ TicketTypes: Data });

          var MobileNumber = ufields.mobileno;
          if (MobileNumber.indexOf("+") < 0) {
            MobileNumber = "+" + MobileNumber;
          }

          const requestBody = {
            First_Name: ufields.username,
            LastName: ufields.lastname,
            Email: ufields.emailid,
            Company: ufields.company,
            Title: ufields.title,
            Industry: ufields.industry,
            Country: ufields.country,
            MobileNumber: MobileNumber,
            SubscribetoUpdates: subscribecheck,
            SubscribetoMediaQuest: mediaquest,
            Invite_Code_Used: false,
            ticket_type: this.state.TicketTypes,
          };

          axios({
            method: "POST",

            url: GLOBAL.SITE_URL + "/event-attendees",

            responseType: "json",
            data: requestBody,
          })
            .then((response) => {})

            .catch((err) => {
              console.log(err);
              this.setState({ addClass6: true });
              console.log("Error");
            });
        })

        .catch((err) => {
          this.setState({ addClass6: true });
          console.log(err);

          console.log("Error");
        });
    }
  };

  submituserContactForm(e) {
    e.preventDefault();

    alert("Form submitted");

    // if (this.cardvalidateForm()) {

    //     let cfields = {};

    //     cfields["cardnumber"] = "";

    //     cfields["expirymonth"] = "";

    //     cfields["expiryyear"] = "";

    //     cfields["securitycode"] = "";

    //      cfields["nameoncard"] = "";

    //     this.setState({ cfields: cfields });

    //     alert("Form submitted");

    // }
  }

  cardhandleChange(e) {
    let cfields = this.state.cfields;

    cfields[e.target.name] = e.target.value;

    this.setState({
      cfields,
    });
  }

  cardvalidateForm() {
    let cfields = this.state.cfields;

    let cerrors = {};

    let cclassn = {};

    let formIsValid = true;

    if (!cfields["cardnumber"]) {
      formIsValid = false;

      cerrors["cardnumber"] = "Enter your Card Number";

      cclassn["cardnumber"] = "error";
    }

    if (!cfields["expirymonth"]) {
      formIsValid = false;

      cerrors["expirymonth"] = "Select Expiry Month";

      cclassn["expirymonth"] = "error";
    }

    if (!cfields["expiryyear"]) {
      formIsValid = false;

      cerrors["expiryyear"] = "Select Expiry Year";

      cclassn["expiryyear"] = "error";
    }

    if (!cfields["securitycode"]) {
      formIsValid = false;

      cerrors["securitycode"] = "Enter your Security Code";

      cclassn["securitycode"] = "error";
    }

    if (!cfields["nameoncard"]) {
      formIsValid = false;

      cerrors["nameoncard"] = "Enter your Name on Card";

      cclassn["nameoncard"] = "error";
    }

    this.setState({
      cerrors: cerrors,

      cclassn: cclassn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  uvalidateForm() {
    let ufields = this.state.ufields;

    let uerrors = {};

    let classu = {};

    let formIsValid = true;

    if (!ufields["username"]) {
      formIsValid = false;

      uerrors["username"] = "Enter your username.";

      classu["username"] = "error";
    }

    if (typeof ufields["username"] !== "undefined") {
      if (!ufields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        uerrors["username"] = "Enter alphabet characters only.";

        classu["username"] = "error";
      }
    }

    if (!ufields["emailid"]) {
      formIsValid = false;

      uerrors["emailid"] = "Enter your email-ID";

      classu["emailid"] = "error";
    }

    if (typeof ufields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(ufields["emailid"])) {
        formIsValid = false;

        uerrors["emailid"] = "Enter valid email-ID";

        classu["emailid"] = "error";
      }
    }

    if (!ufields["mobileno"]) {
      formIsValid = false;

      uerrors["mobileno"] = "Enter your mobile no.";

      classu["mobileno"] = "error";
    }

    if (typeof ufields["mobileno"] !== "undefined") {
      if (isValidPhoneNumber(ufields["mobileno"]) === false) {
        formIsValid = false;

        uerrors["mobileno"] = "Invalid Mobile Number";

        classu["mobileno"] = "error";
      }
    }

    this.setState({
      uerrors: uerrors,

      classu: classu,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  evalidateForm() {
    let efields = this.state.efields;

    let eerrors = {};

    let classe = {};

    let formIsValid = true;

    if (!efields["invitecode"]) {
      formIsValid = false;

      eerrors["invitecode"] = "Enter Invite Code.";

      classe["invitecode"] = "error";
    }

    this.setState({
      eerrors: eerrors,

      classe: classe,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  validateForm() {
    let fields = this.state.fields;

    let errors = {};

    let classn = {};

    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;

      errors["username"] = "Enter your username.";

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
      //regular expression for email validation

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

    if (!rfields["username"]) {
      formIsValid = false;

      rerrors["username"] = "Enter your username.";

      rclassn["username"] = "error";
    }

    if (typeof rfields["username"] !== "undefined") {
      if (!rfields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        rerrors["username"] = "Enter alphabet characters only.";

        rclassn["username"] = "error";
      }
    }

    if (!rfields["emailid"]) {
      formIsValid = false;

      rerrors["emailid"] = "Enter your email-ID";

      rclassn["emailid"] = "error";
    }

    if (typeof rfields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(rfields["emailid"])) {
        formIsValid = false;

        rerrors["emailid"] = "Enter valid email-ID";

        rclassn["emailid"] = "error";
      }
    }

    if (!rfields["mobileno"]) {
      formIsValid = false;

      rerrors["mobileno"] = "Enter your mobile no.";

      rclassn["mobileno"] = "error";
    }

    if (typeof rfields["mobileno"] !== "undefined") {
      if (isValidPhoneNumber(rfields["mobileno"]) === false) {
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

  avalidateForm() {
    let afields = this.state.afields;

    this.setState({ aerrors: [], aclassn: [] });

    let aerrors = [];

    let aclassn = [];

    let formIsValid = true;

    if (!afields["username"]) {
      formIsValid = false;

      aerrors["username"] = "Enter your name.";

      aclassn["username"] = "error";
    }

    if (typeof afields["username"] !== "undefined") {
      if (!afields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        aerrors["username"] = "Enter alphabet characters only.";

        aclassn["username"] = "error";
      }
    }

    if (!afields["lastname"]) {
      formIsValid = false;

      aerrors["lastname"] = "Enter your lastname.";

      aclassn["lastname"] = "error";
    }

    if (typeof afields["lastname"] !== "undefined") {
      if (!afields["lastname"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;

        aerrors["lastname"] = "Enter alphabet characters only.";

        aclassn["lastname"] = "error";
      }
    }

    if (!afields["country"]) {
      formIsValid = false;

      aerrors["country"] = "Enter your Country of origin.";

      aclassn["country"] = "error";
    }

    if (!afields["company"]) {
      formIsValid = false;

      afields["company"] = "Enter your company.";

      aclassn["company"] = "error";
    }

    if (!afields["address"]) {
      formIsValid = false;

      aerrors["address"] = "Enter your address.";

      aclassn["address"] = "error";
    }

    if (!afields["industry"]) {
      formIsValid = false;

      aerrors["industry"] = "Enter your industry.";

      aclassn["industry"] = "error";
    }

    if (!afields["linkedin"]) {
      formIsValid = false;

      aerrors["linkedin"] = "Enter your linkedin.";

      aclassn["linkedin"] = "error";
    }

    if (typeof afields["linkedin"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      );

      if (!pattern.test(afields["linkedin"])) {
        formIsValid = false;

        aerrors["linkedin"] = "Enter valid linkedin link";

        aclassn["linkedin"] = "error";
      }
    }

    if (!afields["emailid"]) {
      formIsValid = false;

      aerrors["emailid"] = "Enter your email-ID";

      aclassn["emailid"] = "error";
    }

    if (typeof afields["emailid"] !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(afields["emailid"])) {
        formIsValid = false;

        aerrors["emailid"] = "Enter valid email-ID";

        aclassn["emailid"] = "error";
      }
    }

    if (!afields["mobileno"]) {
      formIsValid = false;

      aerrors["mobileno"] = "Enter your mobile no.";

      aclassn["mobileno"] = "error";
    }

    if (typeof afields["mobileno"] !== "undefined") {
      if (isValidPhoneNumber(afields["mobileno"]) === false) {
        formIsValid = false;

        aerrors["mobileno"] = "Invalid Mobile Number";

        aclassn["mobileno"] = "error";
      }
    }

    this.setState({
      aerrors: aerrors,

      aclassn: aclassn,

      //    this.setState.classList.add('error');
    });

    return formIsValid;
  }

  checkbox() {
    this.setState({ checkd: !this.state.checkd });
  }

  render() {
    let rows = [];
    for (let i = 1; i <= 12; i++) {
      rows.push(<option val={i}>{i}</option>);
    }
    let years = [];
    for (
      let i = new Date().getFullYear();
      i <= new Date().getFullYear() + 10;
      i++
    ) {
      years.push(<option val={i}>{i}</option>);
    }
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

    if ((document.title = "Attend - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }

    if (this.state.addClass2) {
      document.body.classList.remove(MODAL_OPEN_CLASS);
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if (this.state.addClass3) {
      document.body.classList.add(MODAL_OPEN_CLASS3);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS3);
    }

    if (this.state.addClass4) {
      document.body.classList.add(MODAL_OPEN_CLASS4);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS4);
    }
    if (this.state.addClass5) {
      document.body.classList.add(MODAL_OPEN_CLASS5);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS5);
    }
    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS6);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
    }
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Attend") {
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
                      content={siteurl + "/Attend-Bahrain-GCC-Top-CEO-2020"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.AttendPost.length > 0
            ? this.state.AttendPost.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section attend_banner_section">
                    <img src={GLOBAL.SITE_URL + item.Image.url} />

                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.Title}</h1>

                        <p>{item.SubTitle}</p>
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
                            className={
                              item.id == 2 ? "featured plan" : "plan"
                            }
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
                              <li
                                class={
                                  item.Info1Select == "True"
                                    ? "right"
                                    : "wrong"
                                }
                              >
                                {item.InfoText1}
                              </li>
                              <li
                                class={
                                  item.Info2Select == "True"
                                    ? "right"
                                    : "wrong"
                                }
                              >
                                {item.InfoText2}
                              </li>
                              <li
                                class={
                                  item.Info3select == "True"
                                    ? "right"
                                    : "wrong"
                                }
                              >
                                {item.InfoText3}
                              </li>
                              <li
                                class={
                                  item.Info4select == "True"
                                    ? "right"
                                    : "wrong"
                                }
                              >
                                {item.InfoText4}
                              </li>
                              <li
                                class={
                                  item.Info5select == "True"
                                    ? "right"
                                    : "wrong"
                                }
                              >
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
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
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
                  onSubmit={this.SubmitInviteCodeForm}
                  className="contact_from"
                  id="invitecode_from"
                >
                  <div className="container">
                    <h2>Already Have a Ticket Invite Code?</h2>

                    <p className="top_text_content">
                      If you’ve been invited, you will need to register to
                      receive your e-ticket.
                    </p>

                    <div className="form_section text_center">
                      <div className="row">
                        <div className="column col-12">
                          <FloatingLabel
                            id="invitecode"
                            name="invitecode"
                            placeholder="Invite Code*"
                            type="text"
                            maxLength="50"
                            value={this.state.efields.invitecode}
                            className={this.state.classe.invitecode}
                            onChange={(evt) =>
                              this.setState(() => ({
                                value: evt.currentTarget.value,
                              }))
                            }
                            onChange={this.ehandleChange}
                          />
                          <div className="errorMsg">
                            {this.state.eerrors.invitecode}
                          </div>
                        </div>

                        <div className="column col-12">
                          <div className="errorMsg">
                            {this.state.eformerror}
                          </div>

                          <button type="submit" className="btn">
                            <span>Register & Get your Ticket</span>
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
            <div className="details_popup attend_details_popup">
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
                            onSubmit={this.submituserRegisterForm}
                            className="contact_from"
                            id="request_ticket"
                          >
                            <div className="container">
                              <h3>Request a Ticket</h3>

                              <p>
                                Finalize the registration and wait for approval
                                as soon as possible.
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
                                    placeholder="First Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.username}
                                    className={this.state.rclassn.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
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
                                    maxLength="255"
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
                                    id="email"
                                    name="emailid"
                                    placeholder="Email Address*"
                                    type="email"
                                    maxLength="255"
                                    value={this.state.rfields.emailid}
                                    className={this.state.rclassn.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
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
                                    maxLength="255"
                                    value={this.state.rfields.company}
                                    className={this.state.rclassn.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.company}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.title}
                                    className={this.state.rclassn.title}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.title}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.rfields.industry}
                                    onChange={this.rhandleChange}
                                    placeholder="Industry"
                                  >
                                    <option>Industry</option>
                                    {this.state.IndustryName.length > 0
                                      ? this.state.IndustryName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.IndustryName}>
                                              {item.IndustryName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
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
                                    {OptionData.length > 0
                                      ? OptionData.map((item, index) => {
                                        return (
                                          <option val={item.label}>
                                            {item.label}
                                          </option>
                                        );
                                      })
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    value={this.state.rfields.mobileno}
                                    className={this.state.rclassn.mobileno}
                                    placeholder="Mobile Number*"
                                    maxLength="20"
                                    onChange={(e) =>
                                      (this.state.rfields.mobileno = e)
                                    }
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <select
                                    name="affiliate"
                                    value={this.state.rfields.affiliate}
                                    onChange={this.rhandleChange}
                                    placeholder="Affiliate Name"
                                  >
                                    <option>Affiliate Name</option>
                                    {this.state.AffiliateName.length > 0
                                      ? this.state.AffiliateName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.AffiliateName}>
                                              {item.AffiliateName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
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

                                  {/* <input type="submit" className="btn" value="Submit" /> */}
                                  <div className="errorMsg">
                                    {this.state.formerror}
                                  </div>
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
            </div>
          ) : null}

          {this.state.addClass1 ? (
            <div className="details_popup attand_popup attend_details_popup popup_wrap">
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
                            onSubmit={this.SubmitAttendForm}
                            className="contact_from"
                            id="finish_registration"
                          >
                            <div className="container">
                              <h3>Finalize Registration</h3>

                              <input
                                type="hidden"
                                id="event_id"
                                value={this.state.afields.event_id}
                                name="event_id"
                              />
                              <input
                                type="hidden"
                                id="InviteCodeType"
                                value={this.state.afields.InviteCodeType}
                                name="InviteCodeType"
                              />
                              <p>
                                Finalize the registration and wait for approval
                                as soon as possible.
                              </p>
                              <p>
                                Are you interested in attending Top CEO 2020
                                event?Fill in the following information:
                              </p>
                              <div className="row">
                                <div className="column col-6">
                                  <select
                                    name="company_list"
                                    value={this.state.afields.company_list}
                                    onChange={this.ahandleChange}
                                    placeholder="CEO Listed company"
                                  >
                                    <option val="">-- Please Select --</option>
                                    {this.state.positions.length > 0
                                      ? this.state.positions.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.PositionName}>
                                              {item.PositionName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="username"
                                    name="username"
                                    placeholder="Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.username}
                                    className={this.state.aclassn.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.username}
                                  </div>
                                </div>

                                {this.state.other_position ? (
                                  <div className="column col-12">
                                    <FloatingLabel
                                      id="other_position"
                                      name="other_position"
                                      placeholder="Other Position"
                                      type="text"
                                      maxLength="255"
                                      value={this.state.afields.other_position}
                                      className={
                                        this.state.aclassn.other_position
                                      }
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_position}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    maxLength="255"
                                    placeholder="Last Name*"
                                    type="text"
                                    value={this.state.afields.lastname}
                                    className={this.state.aclassn.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.lastname}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <select
                                    name="country"
                                    value={this.state.afields.country}
                                    className={this.state.aclassn.country}
                                    onChange={this.ahandleChange}
                                    placeholder="Country of origin"
                                  >
                                    <option>Country of origin</option>
                                    {OptionData.length > 0
                                      ? OptionData.map((item, index) => {
                                        return (
                                          <option val={item.label}>
                                            {item.label}
                                          </option>
                                        );
                                      })
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.country}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="company"
                                    name="company"
                                    placeholder="Company Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.company}
                                    className={this.state.aclassn.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.aerrors.company}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.afields.industry}
                                    className={this.state.aclassn.industry}
                                    onChange={this.ahandleChange}
                                    placeholder="Company Industry"
                                  >
                                    <option>Company Industry</option>
                                    {this.state.IndustryName.length > 0
                                      ? this.state.IndustryName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.IndustryName}>
                                              {item.IndustryName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="nominated"
                                    value={this.state.afields.nominated}
                                    className={this.state.aclassn.nominated}
                                    onChange={this.ahandleChange}
                                  >
                                    <option>
                                      Is your company nominated for the Award
                                      ceremony
                                    </option>
                                    <option val="Yes">Yes</option>
                                    <option val="No">No</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="emailid"
                                    placeholder="Email*"
                                    type="email"
                                    maxLength="255"
                                    value={this.state.afields.emailid}
                                    className={this.state.aclassn.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.email}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    maxLength="20"
                                    value={this.state.afields.mobileno}
                                    className={this.state.aclassn.mobileno}
                                    placeholder="Mobile Number*"
                                    onChange={(e) =>
                                      (this.state.afields.mobileno = e)
                                    }
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="Linkedin profile or link to CV*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.linkedin}
                                    className={this.state.aclassn.linkedin}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.aerrors.linkedin}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <select
                                    name="affiliate"
                                    value={this.state.afields.affiliate}
                                    className={this.state.aclassn.affiliate}
                                    onChange={this.ahandleChange}
                                    placeholder="Affiliate Name"
                                  >
                                    <option>Affiliate Name</option>
                                    {this.state.AffiliateName.length > 0
                                      ? this.state.AffiliateName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.AffiliateName}>
                                              {item.AffiliateName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.affiliate}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <TextField
                                    id="address"
                                    name="address"
                                    label="Address*"
                                    placeholder="Write your address*"
                                    multiline
                                    rows={2}
                                    value={this.state.afields.address}
                                    className={this.state.aclassn.address}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.address}
                                  </div>
                                </div>
                                <div className="column col-12">
                                  <p>
                                    Tell us more about your interest in
                                    attending Top CEO:
                                  </p>
                                </div>
                                <div className="column col-6">
                                  <select
                                    name="interested"
                                    value={this.state.afields.interested}
                                    className={this.state.aclassn.interested}
                                    onChange={this.ahandleChange}
                                    placeholder="You are interested in "
                                  >
                                    <option>You are interested in </option>
                                    <option val="Networking opportunities">
                                      Networking opportunities
                                    </option>
                                    <option val="Learning opportunities & Exposure to content provided">
                                      Learning opportunities & Exposure to
                                      content provided
                                    </option>
                                    <option val="Other">Other</option>
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    id="aboutus"
                                    name="aboutus"
                                    value={this.state.afields.aboutus}
                                    className={this.state.aclassn.aboutus}
                                    onChange={this.ahandleChange}
                                    placeholder="How did you hear about us?"
                                  >
                                    <option>How did you hear about us? </option>
                                    <option val="Website">Website</option>
                                    <option val="Social Media">
                                      Social Media
                                    </option>
                                    <option val="Print Media">
                                      Print Media
                                    </option>
                                    <option val="TVC">TVC</option>
                                    <option val="Friend referral">
                                      Friend referral
                                    </option>
                                    <option val="GFH Sponsor referral">
                                      GFH Sponsor referral
                                    </option>
                                    <option val="Other Sponsor referral">
                                      Other Sponsor referral
                                    </option>
                                    <option val="Other">Other</option>
                                  </select>
                                </div>

                                {this.state.other_interested ? (
                                  <div className="column col-6">
                                    <FloatingLabel
                                      id="other_interested"
                                      name="other_interested"
                                      placeholder="Other interest"
                                      type="text"
                                      maxLength="255"
                                      value={
                                        this.state.afields.other_interested
                                      }
                                      className={
                                        this.state.aclassn.other_interested
                                      }
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_interested}
                                    </div>
                                  </div>
                                ) : null}

                                {this.state.other_hear ? (
                                  <div
                                    class={
                                      this.state.other_interested
                                        ? "column col-6"
                                        : "column col-12"
                                    }
                                  >
                                    <FloatingLabel
                                      id="other_hear"
                                      name="other_hear"
                                      maxLength="255"
                                      placeholder="Hear about us from other"
                                      type="text"
                                      value={this.state.afields.other_hear}
                                      className={this.state.aclassn.other_hear}
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_hear}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-12">
                                  <div className="checkbox multi_checkbox">
                                    <span>
                                      What themes are you most interested in?
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
                                                onChange={this.ahandleChange}
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
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="attended_ceo"
                                    value={this.state.afields.attended_ceo}
                                    className={this.state.aclassn.attended_ceo}
                                    onChange={this.ahandleChange}
                                  >
                                    <option>
                                      Have you previously attended Top CEO?
                                    </option>
                                    <option val="Yes">Yes</option>
                                    <option val="No">No</option>
                                  </select>
                                </div>
                                {this.state.attended ? (
                                  <div className="column col-6">
                                    <FloatingLabel
                                      id="attended"
                                      name="whatyear"
                                      placeholder="what year"
                                      type="text"
                                      maxLength="255"
                                      value={this.state.afields.whatyear}
                                      className={this.state.aclassn.whatyear}
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.whatyear}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="subscribecheck"
                                      name="subscribecheck"
                                      value={this.state.afields.subscribecheck}
                                      checked={
                                        this.state.afields.subscribecheck
                                      }
                                      onChange={(e) => {
                                        this.ahandleChange({
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
                                      value={this.state.afields.mediaquest}
                                      checked={this.state.afields.mediaquest}
                                      onChange={(e) => {
                                        this.ahandleChange({
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
            <div className="details_popup  attend_details_popup edit_user_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup3.bind(this)}
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
                            name="update_user"
                            onSubmit={this.SubmitUserForm}
                            className="contact_from"
                          >
                            <div className="container">
                              <input
                                type="hidden"
                                id="event_id"
                                value={this.state.event_id}
                                name="event_id"
                              />
                              <div className="row">
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="username"
                                    name="username"
                                    placeholder="First Name"
                                    type="text"
                                    value={this.state.ufields.username}
                                    className={this.state.classu.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.username}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name"
                                    type="text"
                                    value={this.state.ufields.lastname}
                                    className={this.state.classu.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.lastname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="emailid"
                                    placeholder="Email Address"
                                    type="email"
                                    value={this.state.ufields.emailid}
                                    className={this.state.classu.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.emailid}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="company"
                                    name="company"
                                    placeholder="Company"
                                    type="text"
                                    value={this.state.ufields.company}
                                    className={this.state.classu.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    type="text"
                                    value={this.state.ufields.title}
                                    className={this.state.classu.title}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.ufields.industry}
                                    onChange={this.uhandleChange}
                                    placeholder="Industry"
                                  >
                                    <option>Industry</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="country"
                                    value={this.state.ufields.country}
                                    onChange={this.uhandleChange}
                                    placeholder="Country"
                                  >
                                    <option>Country</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    value={this.state.ufields.mobileno}
                                    className={this.state.classu.mobileno}
                                    placeholder="Mobile Number*"
                                    onChange={(e) =>
                                      (this.state.ufields.mobileno = e)
                                    }
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox"
                                      name="subscribecheck"
                                      value={this.state.ufields.subscribecheck}
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
                                      Subscribe to get updates on upcoming guest
                                      speakers, workshops and more!
                                    </label>
                                  </div>

                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="mediaquest"
                                      name="mediaquest"
                                      value={this.state.ufields.mediaquest}
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

                                  {/* <input type="submit" className="btn" value="Register & Get your Ticket" /> */}
                                  <div className="errorMsg">
                                    {this.state.uformerror}
                                  </div>
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
            </div>
          ) : null}

          <div className="details_popup  payment_popup">
            <div className="all_popup">
              <div className="details_popup_content container">
                <button
                  onClick={this.togglePopup4.bind(this)}
                  className="details_popup_close"
                >
                  <img src={search_close} />
                </button>

                <div className="container attend_form_section">
                  <div className="row">
                    <div className="column col-7">
                      <div className="theme_selection_block">
                        <div id="payment_form" className="contact_from">
                          <div className="container">
                            <div className="row">
                              <div className="column col-12">
                                <h3>Payment</h3>
                              </div>
                              <div className="column col-12">
                                <div
                                  id="payment_fields"
                                  style={{ height: "200px" }}
                                />
                              </div>
                              <div className="column col-12">
                                <button
                                  type="submit"
                                  disabled={submitDisabled}
                                  className="btn checkoutButton"
                                  onClick={this.createSession.bind(this)}
                                  ref={(button) => (this.button = button)}
                                >
                                  <span>Pay Now</span>
                                </button>
                                <div
                                  className="errorMsg submit_err"
                                  style={divStyle}
                                >
                                  {submitDisabledText}
                                </div>
                              </div>

                              <div id="3ds_iframe" />

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
                              <div className="column col-12">
                                <div className="errorMsg payment_warning">
                                  Please note that payment will be processed in
                                  AED. 1 USD = {USDToAED} AED
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column col-5">
                      <div className="order_content">
                        <h5>Order Summary</h5>
                        <h6>{PackageName}</h6>
                        <p>
                          Quantity x <span>1</span>
                        </p>
                        <div className="total">
                          <div className="total_text">Total</div>
                          <div className="total_price">{PackagePrice}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.addClass5 ? (
            <div className="details_popup thank_you_popup attend_details_popup ">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup5.bind(this)}
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
                                  <h3>
                                    Thank you for registering! you will
                                    receive your ticket by mail soon
                                  </h3>
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

export default Attend;
