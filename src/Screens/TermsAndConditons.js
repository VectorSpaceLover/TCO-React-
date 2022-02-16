import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import GLOBAL from "../Global";
const axios = require("axios");

class TermsAndConditons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seo: [],
      siteurl: "",
      TermsAndConditonsPost: [],
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
      url: GLOBAL.SITE_URL + "/terms-condition-pages",
      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        var TermsAndConditonsPost = [];
        Data.map((item, index) => {
          TermsAndConditonsPost.push(item);
        });
        this.setState({ TermsAndConditonsPost: TermsAndConditonsPost });
      })
      .catch((err) => {
        console.log(err);
        console.log("Error");
      });
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "TermsAndConditons - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  render() {
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {this.state.seo.length > 0
            ? this.state.seo.map((item, index) => {
              if (item.Selectpage == "Termsandconditons") {
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
                      content={siteurl + "/terms-and-conditions"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="theme_selection_section sitemap_main_section TermsAndConditons_main_section">
            <div className="theme_selection_bg">
              {this.state.TermsAndConditonsPost.length > 0
                ? this.state.TermsAndConditonsPost.map((item, index) => (
                  <div className="container">
                    <h1>{item.Title}</h1>

                    <div
                      dangerouslySetInnerHTML={{ __html: item.Content }}
                    ></div>
                  </div>
                ))
                : null}
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default TermsAndConditons;
