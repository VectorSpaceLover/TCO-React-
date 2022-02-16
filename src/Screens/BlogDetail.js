import React, { Component } from "react";

import Truncate from "react-truncate";

import { Helmet } from "react-helmet";

import "../App.css";

import search_close from "../images/close.svg";

import fb from "../images/fb.svg";

import { Link } from "react-router-dom";

import GLOBAL from "../Global";

const axios = require("axios");

class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      Blogimage: "",

      Blogtitle: "",

      Blogsubtitle: "",

      Blogtext: "",

      Blogcontent: "",

      BlogbuttonLink: "",

      BlogPost: [],

      FooterSocialicons: [],

      Blog_p_image: "",
      Blog_p_Title: "",
      Blog_p_SubTitle: "",
      Blog_p_content: "",
      blog_link: "",
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

    if (!this.props.blog) return null;

    const blogName = this.props.blog.replace(/-/g, " ");

    console.log(blogName);

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/blog-pages",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;
          console.log(Data);
          Data.map((item, index) => {
            var LOGO = item.Image;

            this.setState({ Blog_p_image: GLOBAL.SITE_URL + LOGO.url });

            this.setState({ Blog_p_Title: item.PostTitle });

            this.setState({ Blog_p_SubTitle: item.PostSubTitle });

            this.setState({ Blog_p_content: item.Content });
          });
        }
      })

      .catch((err) => {
        console.log(err);
        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/blog-posts/?Title=" + blogName,

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var BlogPost = response.data[0];

          var LOGO = BlogPost.Image;

          this.setState({ Blogimage: GLOBAL.SITE_URL + LOGO.url });

          this.setState({ Blogtitle: BlogPost.Title });

          this.setState({ Blogsubtitle: BlogPost.Subtitle });

          this.setState({ Blogtext: BlogPost.Buttontext });

          this.setState({ Blogcontent: BlogPost.Content });

          this.setState({ BlogbuttonLink: BlogPost.Buttonlink });

          this.setState({ BlogPostTitle: BlogPost.PostTitle });

          this.setState({ BlogPostSubTitle: BlogPost.PostSubTitle });

          this.setState({ BlogDescription: BlogPost.MetaDescription });

          this.setState({ BlogKeyword: BlogPost.MetaKeywords });

          this.setState({ BlogTitle: BlogPost.MetaTitle });

          this.setState({ BlogImage: BlogPost.MetaImage });
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
    document.title = "Blog Detail - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  render() {
    const { didMount } = this.state;
    const siteurl = window.location.origin;
    const blog_link = window.location.pathname.split("/")[2].replace(/-/g, " ");

    const t_rue = blog_link == this.state.Blog_p_Title;
    console.log(t_rue);

    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          <Helmet>
            <title>Top CEO </title>
            <meta name="description" content={this.state.BlogDescription} />
            <meta name="keywords" content={this.state.BlogKeyword} />
            <meta
              name="title"
              property="og:title"
              content={this.state.BlogTitle}
            />
            <meta
              name="image"
              property="og:image"
              content={this.state.BlogImage}
            />
            <meta
              name="description"
              property="og:description"
              content={this.state.BlogDescription}
            />
            <meta
              name="url"
              property="og:url"
              content={
                siteurl + "/blog/" + this.state.Blogtitle.replace(/ /g, "-")
              }
            />
          </Helmet>

          <section className="theme_selection_section sitemap_main_section TermsAndConditons_main_section BlogDetail_main_section">
            <div className="theme_selection_bg">
              <div className="container">
                <div className="BlogDetail_min_content">
                  {t_rue == true ? (
                    <div>
                      <h1>{this.state.Blog_p_Title}</h1>
                      <small>{this.state.Blog_p_SubTitle}</small>
                      <img
                        src={this.state.Blog_p_image}
                        className="main_image"
                      />

                      <div
                        className="blog_right_text"
                        dangerouslySetInnerHTML={{
                          __html: this.state.Blog_p_content,
                        }}
                      ></div>
                    </div>
                  ) : null}
                  <h1>{this.state.Blogtitle}</h1>

                  <small>{this.state.BlogPostSubTitle}</small>

                  <img src={this.state.Blogimage} className="main_image" />

                  <div
                    className="blog_right_text"
                    dangerouslySetInnerHTML={{
                      __html: this.state.Blogcontent,
                    }}
                  ></div>

                  <ul className="social_icons">
                    {this.state.FooterSocialicons.map((item, index) => {
                      return (
                        <li>
                          <a href={item.LInk} target="_blank">
                            {item.Title == "Facebook" ? (
                              <img src={fb} height="15px" width="7px" />
                            ) : item.Title == "Twitter" ? (
                              <img
                                src={siteurl + "/twitter.svg"}
                                height="15px"
                                width="18px"
                              />
                            ) : item.Title == "Instagram" ? (
                              <img
                                src={siteurl + "/instagram.svg"}
                                height="15px"
                                width="18px"
                              />
                            ) : (
                              <img
                                src={siteurl + "/linkedin.svg"}
                                height="15px"
                                width="15px"
                              />
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default BlogDetail;
