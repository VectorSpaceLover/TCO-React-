import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

import hotel_star from "../images/star.svg";

import GLOBAL from "../Global";
const axios = require("axios");

class PlanyourTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seo: [],
      siteurl: "",

      PlanyourTripPost: [],
      Tikettitle: "",
      Tiketsubtitle: "",
      Tiketbuttontext: "",
      Tiketbuttonlink: "",
      OriginLatitude: 0,
      OriginLongitude: 0,
      DestinationLatitude: 0,
      DestinationLongitude: 0,
      ZoomLevel: 0,
    };
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

    // axios({
    //     method: "get",
    //     url: GLOBAL.SITE_URL + "/googlemaps",
    //     responseType: "json"
    // })
    // .then(response => {
    //    if (response.status) {
    //      var Data = response.data;
    //      this.setState({ OriginLatitude: Data[0].OriginLatitude });
    //      this.setState({ OriginLongitude: Data[0].OriginLongitude });
    //      this.setState({ DestinationLatitude: Data[0].DestinationLatitude });
    //      this.setState({ DestinationLongitude: Data[0].DestinationLongitude });
    //      this.setState({ ZoomLevel: Data[0].ZoomLevel });

    //    }
    //  })
    //  .catch(err => {
    //    console.log(err);
    //    console.log("Error");
    // });

    // planyour-trip-pages
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/planyour-trip-pages",
      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        var PlanyourTripPost = [];
        Data.map((item, index) => {
          PlanyourTripPost.push(item);
        });
        this.setState({ PlanyourTripPost: PlanyourTripPost });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });

    // book-a-ticket
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/book-a-ticket-sections",
      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;
          Data.map((item, index) => {
            this.setState({ Tikettitle: item.Title });
            this.setState({ Tiketsubtitle: item.Subtitle });
            this.setState({ Tiketbuttontext: item.ButtonText });
            this.setState({ Tiketbuttonlink: item.ButtonLink });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "PlanyourTrip - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  onGoogleMapLoad = ({ props: { map } }) => {
    // Save google map instance
    // on the parent component
    this._map = map;
  };
  render() {
    if ((document.title = "PlanyourTrip - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }
    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyCAHOAn0QiWSZI57amai2uEmxY7UIKKv_M&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className="map_block" />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new window.google.maps.DirectionsService();
          axios({
            method: "get",
            url: GLOBAL.SITE_URL + "/googlemaps",
            responseType: "json",
          })
            .then((response) => {
              if (response.status) {
                var Data = response.data;

                Data.map((item, index) => {
                  this.setState({ OriginLatitude: item.OriginLatitude });
                  this.setState({ OriginLongitude: item.OriginLongitude });
                  this.setState({ ZoomLevel: item.ZoomLevel });
                });

                console.log("Map Data");

                var OriginLatitude = parseFloat(Data[0].OriginLatitude);
                var OriginLongitude = parseFloat(Data[0].OriginLongitude);
                var DestinationLatitude = parseFloat(
                  Data[0].DestinationLatitude
                );
                var DestinationLongitude = parseFloat(
                  Data[0].DestinationLongitude
                );
                var ZoomLevel = parseInt(Data[0].ZoomLevel);
                console.log(
                  OriginLatitude,
                  OriginLongitude,
                  DestinationLatitude,
                  DestinationLongitude,
                  ZoomLevel
                );

                DirectionsService.route(
                  {
                    origin: new window.google.maps.LatLng(
                      OriginLatitude,
                      OriginLongitude
                    ),
                    destination: new window.google.maps.LatLng(
                      DestinationLatitude,
                      DestinationLongitude
                    ),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                  },
                  (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                      this.setState({
                        directions: result,
                      });
                    } else {
                      console.error(`error fetching directions ${result}`);
                    }
                  }
                );
              }
            })
            .catch((err) => {
              console.log(err);
              console.log("Error");
            });
        },
      })
    )((props) => (
      <GoogleMap
        defaultZoom={this.state.ZoomLevel}
        defaultCenter={{
          lat: this.state.OriginLatitude,
          lng: this.state.OriginLongitude,
        }}
      >
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    ));
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Planyourtrip") {
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
                        siteurl + "/plan-your-trip-Bahrain-Top-CEO-2020"
                      }
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.PlanyourTripPost.length > 0
            ? this.state.PlanyourTripPost.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section speaker_banner_section planyourtrip_banner_section">
                    <img src={GLOBAL.SITE_URL + item.Image.url} />
                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.Title}</h1>
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

          <section className="theme_selection_section planyourtrip_main_section">
            <div className="theme_selection_bg">
              <div className="container">
                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section2") {
                      return (
                        <h2>
                          <span>{item.SubTitle}</span>
                          {item.Title}
                        </h2>
                      );
                    }
                  })
                  : null}

                <div className="trip_border"></div>
                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section2") {
                      return (
                        <div id="trip1" className="row row-reverse">
                          <div className="column col-6">
                            <img src={GLOBAL.SITE_URL + item.Image.url} />
                          </div>
                          <div className="column col-6">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                            <a
                              href={item.ButtonLink}
                              className="btn"
                              target="_blank"
                            >
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}

                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section3") {
                      return (
                        <div id="trip2" className="row airline_btn">
                          <div className="column col-12">
                            <div className="trip_border"></div>
                            <h3>{item.Title}</h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                            <a href={item.ButtonLink} className="btn">
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}

                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section4") {
                      return (
                        <div id="trip3" className="row">
                          <div className="column col-12">
                            <div className="trip_border"></div>
                            <h3>{item.Title}</h3>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                          </div>
                          <div className="column col-8">
                            <img src={GLOBAL.SITE_URL + item.Image.url} />
                            <a
                              href={item.ButtonLink}
                              className="btn"
                              target="_blank"
                            >
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                          <div className="column col-4">
                            <MapWithADirectionsRenderer />
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}

                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section5") {
                      return (
                        <div id="trip4" className="row">
                          <div className="column col-12 logistic_section">
                            <div className="trip_border"></div>
                            <h3>{item.Title}</h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>

                            <a href={item.ButtonLink} className="btn">
                              <span>{item.ButtonText}</span>
                            </a>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}

                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section6") {
                      return (
                        <div id="trip5" className="row">
                          <div className="column col-12">
                            <div className="trip_border"></div>
                            <h3>{item.Title}</h3>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.Content,
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}
                <div className="row hotel_info_section">
                  {this.state.PlanyourTripPost.length > 0
                    ? this.state.PlanyourTripPost.map((item, index) => {
                      if (item.SelectSection == "Section7") {
                        return (
                          <div className="column col-3">
                            <img src={GLOBAL.SITE_URL + item.Image.url} />
                            <div className="hotel_block">
                              <div className="hotel_content">
                                <a href={item.ButtonLink} target="_blank">
                                  <h4>{item.Title}</h4>
                                </a>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.Content,
                                  }}
                                ></div>
                              </div>
                              <div className="hotel_star">
                                <img src={hotel_star} />
                                <span>{item.SubTitle}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                    : null}
                </div>
              </div>
            </div>
          </section>

          <section className="theme_ticket_section">
            <div className="container">
              <div className="theme_ticket_content">
                {this.state.PlanyourTripPost.length > 0
                  ? this.state.PlanyourTripPost.map((item, index) => {
                    if (item.SelectSection == "Section8") {
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
        </div>
      </div>
    );
  }
}

export default PlanyourTrip;
