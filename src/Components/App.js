import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Pages
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Screens/Home";
import Events from "./Screens/Events";
import Coupons from "./Screens/Coupons";
import Accommodations from "./Screens/Accommodations";
import AdvertisewithUs from "./Screens/AdvertisewithUs";
import Gallery from "./Screens/Gallery";
import AboutPlaces from "./Screens/AboutPlaces";
import ErrorNotFound from "./Components/ErrorNotFound";

import "./App.css";
import "./App_responsive.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Home" component={Home} /> 
            <Route path="/Events" component={Events} />            
            <Route path="/Coupons" component={Coupons} />  
            <Route path="/Accommodations" component={Accommodations}/>    
            <Route path="/AdvertisewithUs" component={AdvertisewithUs}/>   
            <Route path="/Gallery" component={Gallery}/>   
            <Route path="/AboutPlaces" component={AboutPlaces}/>  

            <Route path="*" component={ErrorNotFound}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
