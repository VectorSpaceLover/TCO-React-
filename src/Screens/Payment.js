import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../App.css";
import GLOBAL from "../Global";
// import express from "express";
const axios = require("axios");
let sessionId;
const access_token = "null";
const paymentResponse = "null";
class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Payment: "",
    };
  }
  componentDidMount() {
    document.title = "Payment";
    window.NI.mountCardInput("mount-id", {
      apiKey:
        "YWJjMjQyZDEtZWJlMC00NDc1LTlkMmItMWY3Y2ZmYWY0MGFkOjFmMmRlNWY2LTM1NTYtNDU3Yi05ZDVhLTExMGQ4MTU5M2ViNg==", // API Key for WEB SDK from the portal
      outletRef: "e209b88c-9fb6-4be8-ab4b-e4b977ad0e0d", // outlet reference from the portal
      onSuccess: "http://3.20.69.77/payment/", // Success callback if apiKey validation succeeds
      onChangeValidStatus: ({
                              isCVVValid,
                              isExpiryValid,
                              isNameValid,
                              isPanValid,
                            }) => {
        console.log(isCVVValid, isExpiryValid, isNameValid, isPanValid);
      },
    });
  }

  async createSession() {
    const response = await window.NI.generateSessionId();
    const sessionId = response.session_id;

    // Access Token code start
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url =
      "https://identity-uat.ngenius-payments.com/auth/realms/ni/protocol/openid-connect/token";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      "Basic NDVlNzFjOTAtYjk1ZS00YmE4LWJlZGMtOWI2YjlhMTBhYmE1OmMwODc2OTBjLTM4ZmQtNGZlMS04YjFiLWUzOWQ1ODdiMDhjYg=="
    );

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
        var raw =
          '{\n  "action": "SALE",\n  "amount": { "currencyCode": "AED", "value":100 }\n}';
        var requestOptions = {
          method: "POST",
          headers: myHeaderspayment,
          body: raw,
          redirect: "follow",
        };
        console.log("PAymnet Hosetyed Session");
        console.log(myHeaderspayment);
        console.log(requestOptions);
        console.log(raw);
        console.log(sessionId);

        fetch(
          "https://api-gateway-uat.ngenius-payments.com/transactions/outlets/e209b88c-9fb6-4be8-ab4b-e4b977ad0e0d/payment/hosted-session/" +
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
                height: 500,
              },
            })
              .then(function (response) {
                console.log(response);
                console.log(response.status, response.error);
              })
              .catch((error) => console.log("error 3d", error));
          })
          .catch((error) => console.log("error 3d", error));
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    if ((document.title = "Payment")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }
    return (
      <div
        className="main_content"
        style={{
          backgroundColor: "white",
        }}
      >
        <div id="mount-id" />
        <button onClick={this.createSession} className="checkoutButton">
          Check out
        </button>
        <div id="3ds_iframe" />
      </div>
    );
  }
}
export default Payment;
