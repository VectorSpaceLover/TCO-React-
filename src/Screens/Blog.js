import React, { Component } from "react";

import Truncate from "react-truncate";

import { Helmet } from "react-helmet";

import "../App.css";

import search_close from "../images/close.svg";

import fb from "../images/fb.svg";

import { Link } from "react-router-dom";

import GLOBAL from "../Global";

const axios = require("axios");

class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      detailindex: "",
      detailindex1: "",

      Blogimage: "",

      Blogtitle: "",

      Blogsubtitle: "",

      Blogtext: "",

      Blogcontent: "",

      BlogbuttonLink: "",

      BlogPost: [],

      FooterSocialicons: [],

      BlogPostTitle: "",

      BlogPostSubTitle: "",

      Tikettitle: "",

      Tiketsubtitle: "",

      Tiketbuttontext: "",

      Tiketbuttonlink: "",
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

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/blog-pages",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            var LOGO = item.Image;

            this.setState({ Blogimage: GLOBAL.SITE_URL + LOGO.url });

            this.setState({ Blogtitle: item.Title });

            this.setState({ Blogsubtitle: item.Subtitle });

            this.setState({ Blogtext: item.Buttontext });

            this.setState({ Blogcontent: item.Content });

            this.setState({ BlogbuttonLink: item.Buttonlink });

            this.setState({ BlogPostTitle: item.PostTitle });

            this.setState({ BlogPostSubTitle: item.PostSubTitle });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/blog-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var BlogPost = [];

        Data.map((item, index) => {
          BlogPost.push(item);
        });

        this.setState({ BlogPost: BlogPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

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
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "Blog - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  stripHtml(html) {
    // Create a new div element

    var temporalDivElement = document.createElement("div");

    // Set the HTML content with the providen

    temporalDivElement.innerHTML = html;

    // Retrieve the text property of the element (cross-browser support)

    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  render() {
    if ((document.title = "Blog - Top CEO")) {
      document.body.classList.add("transparent_body");
    } else {
      document.body.classList.remove("transparent_body");
    }
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Blog") {
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
                      content={siteurl + "/blog"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="theme_selection_section blog_our_section">
            <div className="theme_selection_bg">
              <div className="container">
                <h1>
                  <span>{this.state.Blogsubtitle}</span>
                  {this.state.Blogtitle}
                </h1>

                <div id="blog1" className="theme_selection_row">
                  <a
                    href={
                      "/blogs/" + this.state.BlogPostTitle.replace(/ /g, "-")
                    }
                    className="theme_selection_content"
                  >
                    <img src={this.state.Blogimage} />

                    <div className="theme_selection_block">
                      <h3>{this.state.BlogPostTitle}</h3>

                      <span>{this.state.BlogPostSubTitle}</span>

                      <p className="stripHtml">
                        {this.stripHtml(this.state.Blogcontent)}
                      </p>

                      <a href="#" className="border-bottom_link">
                        {this.state.Blogtext}
                      </a>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="blog2" className="blog_article_section">
            <div className="container">
              <div className="row">
                {this.state.BlogPost.length > 0
                  ? this.state.BlogPost.map((item, index) => {
                    return (
                      <div className="column col-3">
                        <Link
                          to={{
                            pathname:
                              "/blogs/" + item.Title.replace(/ /g, "-"),
                            state: { item },
                          }}
                        >
                          <img
                            src={GLOBAL.SITE_URL + item.Image.url}
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          />

                          <div
                            className="nominees_content"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          >
                            <h5>{item.Title}</h5>

                            <small>{item.Subtitle}</small>

                            <p>{this.stripHtml(item.Content)}</p>

                            <a href="#" className="border-bottom_link">
                              {item.Text}
                            </a>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                  : null}
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

export default Blog;
