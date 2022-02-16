import React, { Component } from "react";

import "../App.css";
import { Helmet } from "react-helmet";

import GLOBAL from "../Global";

const axios = require("axios");

class Sitemap extends Component {
  state = { didMount: false };
  componentDidMount() {
    document.title = "Sitemap - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  constructor() {
    super();

    this.state = { seo: [], siteurl: "", SitemapPost: [] };
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

    // sitemap-pages

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/sitemap-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SitemapPost = [];

        Data.map((item, index) => {
          SitemapPost.push(item);
        });

        this.setState({ SitemapPost: SitemapPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  render() {
    if ((document.title = "Sitemap - Top CEO")) {
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
              if (item.Selectpage == "Sitemap") {
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
                      content={siteurl + "/sitemap"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="theme_selection_section sitemap_main_section">
            <div className="theme_selection_bg">
              <div className="site_section">
                <div className="container">
                  {this.state.SitemapPost.length > 0
                    ? this.state.SitemapPost.map((item, index) => {
                      if (item.SelectPositon == "Top") {
                        return (
                          <h1>
                            <span>{item.SubTitle}</span>
                            {item.Title}
                          </h1>
                        );
                      }
                    })
                    : null}

                  <div className="row">
                    {this.state.SitemapPost.length > 0
                      ? this.state.SitemapPost.map((item, index) => {
                        if (item.SelectPositon == "Bottom") {
                          return (
                            <div className="column col-4">
                              <a href={item.Link}>
                                <h6>{item.Title}</h6>
                              </a>

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

export default Sitemap;
