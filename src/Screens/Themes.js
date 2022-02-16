import React, { Component } from "react";

import "../App.css";

import { Helmet } from "react-helmet";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";

class Themes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      addClass: false,

      themdetailindex: "",

      Bannerimage: "",

      Bannertitle: "",

      Bannersubtitle: "",

      Bannerbuttontext: "",

      Bannerbuttonlink: "",

      Tikettitle: "",

      Tiketsubtitle: "",

      Tiketbuttontext: "",

      Tiketbuttonlink: "",

      Themetitle: "",

      Themesubtitle: "",

      ThemePost: [],
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

    // Banner

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/theme-pages",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            var LOGO = item.Image;

            this.setState({ Bannerimage: GLOBAL.SITE_URL + LOGO.url });

            this.setState({ Bannertitle: item.Title });

            this.setState({ Bannersubtitle: item.SubTitle });

            this.setState({ Bannerbuttontext: item.ButtonText });

            this.setState({ Bannerbuttonlink: item.ButtonLink });

            this.setState({ Themetitle: item.ThemeTitle });

            this.setState({ Themesubtitle: item.ThemeSubTitle });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // Theme

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
    document.title = "Themes - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup = () => {
    this.setState({ addClass: !this.state.addClass });
  };

  stripHtml(html) {
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  render() {
    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if ((document.title = "Themes - Top CEO")) {
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
              if (item.Selectpage == "Themes") {
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
                      content={siteurl + "/Top-CEO-2020-Conference-themes"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="theme_banner_section">
            <img src={this.state.Bannerimage} />

            <div className="theme_banner_content">
              <div className="container">
                <h1>{this.state.Bannertitle}</h1>

                <p>{this.state.Bannersubtitle}</p>

                <a href={this.state.Bannerbuttonlink} className="btn">
                  <span>{this.state.Bannerbuttontext}</span>
                </a>
              </div>
            </div>
          </section>

          <section className="theme_selection_section">
            <div className="theme_selection_bg">
              <div className="container">
                <h2>
                  <span>{this.state.Themesubtitle}</span>
                  {this.state.Themetitle}
                </h2>

                <div className="theme_selection_row">
                  {this.state.ThemePost.length > 0
                    ? this.state.ThemePost.map((item, index) => {
                      return (
                        <div
                          className="theme_selection_content"
                          onClick={() => {
                            this.setState({
                              themdetailindex: index,
                              addClass: true,
                            });
                          }}
                          id={index}
                        >
                          <img src={GLOBAL.SITE_URL + item.Image.url} />

                          <div className="theme_selection_block">
                            <h3>{item.Title}</h3>

                            <small>{item.Subtitle}</small>

                            <p className="truncate__text">
                              {this.stripHtml(item.Description)}
                            </p>

                            <a className="border-bottom_link">
                              {item.Buttontext}
                            </a>
                          </div>
                        </div>
                      );
                    })
                    : null}

                  {this.state.addClass ? (
                    <div
                      className="details_popup"
                      id={this.state.themdetailindex}
                    >
                      <div className="all_popup">
                        <div className="details_popup_content">
                          <button
                            onClick={() => {
                              this.setState({
                                themdetailindex: "",
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
                                      this.state.ThemePost[
                                        this.state.themdetailindex
                                        ].Image.url
                                    }
                                  />
                                </div>
                              </div>

                              <div className="column col-6">
                                <div className="theme_selection_block">
                                  <h3>
                                    {
                                      this.state.ThemePost[
                                        this.state.themdetailindex
                                        ].Title
                                    }
                                  </h3>

                                  <small>
                                    {
                                      this.state.ThemePost[
                                        this.state.themdetailindex
                                        ].Subtitle
                                    }
                                  </small>

                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                      this.state.ThemePost[
                                        this.state.themdetailindex
                                        ].Description,
                                    }}
                                  ></div>
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
            </div>
          </section>

          <section className="theme_ticket_section">
            <div className="container">
              <div className="theme_ticket_content">
                <div className="row">
                  <div className="column col-8">
                    <h3>{this.state.Tikettitle}</h3>

                    <p>{this.state.Tiketsubtitle}</p>
                  </div>

                  <div className="column col-4">
                    <a href={this.state.Tiketbuttonlink} className="btn">
                      <span>{this.state.Tiketbuttontext}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Themes;
