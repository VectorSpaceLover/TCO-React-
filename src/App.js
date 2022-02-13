import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch,Route, Link, Redirect  } from "react-router-dom";

//Pages
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Themes from "./Screens/Themes";
import Awards from "./Screens/Awards";
import Home from "./Screens/Home";
import Speakers from "./Screens/Speakers";
import Agenda from "./Screens/Agenda";
import Business from "./Screens/Business";
import Attend from "./Screens/Attend";
import Blog from "./Screens/Blog";
import BlogDetail from "./Screens/BlogDetail";
import Contact from "./Screens/Contact";
import UpcomingEvents from "./Screens/UpcomingEvents";
import AboutTopCEO from "./Screens/AboutTopCEO";
import PlanyourTrip from "./Screens/PlanyourTrip";
import Sitemap from "./Screens/Sitemap";
import TopCEOConferences from "./Screens/TopCEOConferences";
import Partnerwithus from "./Screens/Partnerwithus";
import Payment from "./Screens/Payment";
import TermsAndConditons from "./Screens/TermsAndConditons";

import ErrorNotFound from "./Components/ErrorNotFound";

import "./App.css";

import { render } from "@testing-library/react";

import GLOBAL from "./Global";
import Gallery from "./Screens/Gallery";

const axios = require("axios");

class App extends React.Component {

constructor(props) {

    super(props);

    this.state = { 
      url:[]      
    }
  }
  componentWillMount() {   
    
    axios({

      method: "get",

      url: GLOBAL.SITE_URL + "/301-redirects",

      responseType: "json"

    })

    .then(response => {         

          var Data = response.data;

          var url = [];

          Data.map((item, index) => {

             url.push(item); 

          });

          this.setState({ url: url }); 

      })

      .catch(err => {

        console.log(err);

        console.log("Error");

      }); 


    }

  render() {                        
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            {this.state.url.map((item, index) => {
                return (  <Redirect from={item.oldurl} to={item.newurl} key = {index}/> );
            })}
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/Awards-CEO-GCC-2019-Winners" component={Awards} />
            <Route path="/Top-CEO-2020-Conference-themes" component={Themes} />
            <Route path="/Top-CEO-Conference-Bahrain-2020-Speakers" component={Speakers} />
            <Route path="/Agenda-CEO-2020-Bahrain-GCC" component={Agenda} />
            <Route path="/Business-Top-CEO-sponsors-partners" component={Business} />
            <Route path="/Attend-Bahrain-GCC-Top-CEO-2020" component={Attend} />
            <Route path="/Gallery" component={Gallery} />
            <Route path="/Blog" component={Blog} />
            <Route
              exact
              path="/blogs/:blogId"
              render={props => {
                let idPost = props.location.pathname.replace("/blogs/", "");             
                return <BlogDetail blog={idPost} />;
              }}
            />
            <Route path="/Contact" component={Contact} />
            <Route path="/upcoming-events" component={UpcomingEvents} />
            <Route path="/about-Top-CEO" component={AboutTopCEO} />
            <Route path="/plan-your-trip-Bahrain-Top-CEO-2020" component={PlanyourTrip} />
            <Route path="/Sitemap" component={Sitemap} />
            <Route path="/top-ceo-conferences" component={TopCEOConferences} />
            <Route path="/Top-CEO-GCC-2020-partner-with-us" component={Partnerwithus} />
            <Route path="/terms-and-conditions" component={TermsAndConditons} />
            <Route path="/payment" component={Payment} />
            <Route path="*" component={ErrorNotFound} />

          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
