import React, { Component } from "react";
import axios from 'axios'
  var myHeaders = new Headers();

const GLOBAL = {
  // SITE_URL: "http://3.12.6.115:1337",
  SITE_URL: "https://admin.topceo.me",
  // SITE_URL: "http://localhost:1337",
  // API_URL: "http://localhost:3000/api",
  PROXYURL:"https://cors-anywhere.herokuapp.com/",
  CRMAPIDATA: {
    "id": 1,
    "APIKey": "keJ5CdWCEJQc+b50C/joUTRN6JSOJtn9kzyRcZBTpqiDylLIF7FVAWuTv1T/CO5nAu7gq/7mI83kRWC2omQ52hU5LrxdWmupHV+lWHysMaH4EpMuDSIK+VVsKxabs5alhGgvGeW6I/+nw/rcTLdZFQ==",
    "created_at": "2020-01-20T07:35:33.000Z",
    "updated_at": "2020-01-21T10:06:15.000Z",
    "APIURL": "https://api.createsend.com/api/v3.2/",
    "ThemeSponsorListID": "3234fd240b3b448d702b3075f943a4dc",
    "SpeakerFormListID": "478edd19c737d3d4593ec6c778b49dfe",
    "ActivitySponsorListID": "f4f5c676c54c67b3d9af25883677514c",
    "AttendeeFormListID": "3835901b290b3679b94124447287329e",
    "PartnerFormListID": "f4f5c676c54c67b3d9af25883677514c",
    "APIPassword": "x"
  },

};
// const APISetting=()=>{
// 	axios.get('http://topceo.aliansoftware.net:1337/api-settings')
// 	.then(res=>{
// 		console.log("reds")
// 		console.log(res.data)
// 		GLOBAL.CRMAPIDATA=res.data[0]

// 	}).catch(err=>{
// 		console.log(err)
// 	})
// }
// APISetting();

export default GLOBAL;
