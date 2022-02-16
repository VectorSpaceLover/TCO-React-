import React, { Component } from "react";

import "../App.css";

import play from "../images/play.svg";

import search_close from "../images/close.svg";

import GLOBAL from "../Global";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";

class TopCEOConferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addClass: false,

      detailindex: "",

      visiblePost: 9,

      TopPost: [],

      Videotitle: "",

      Videosubtitle: "",

      Videoiframelink: "",

      Videotext1: "",

      Videotext2: "",

      VideoContent: "",
    };

    this.loadMore = this.loadMore.bind(this);
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "TopCEOConferences - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  componentWillMount() {
    // Video

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/video-pages",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Videotitle: item.Title });

            this.setState({ Videosubtitle: item.SubTitle });

            this.setState({ VideoContent: item.Content });

            this.setState({ Videoiframelink: item.IrameLink });

            this.setState({ Videotext1: item.LeftText });

            this.setState({ Videotext2: item.RightText });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/video-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var TopPost = [];

        Data.map((item, index) => {
          TopPost.push(item);
        });

        this.setState({ TopPost: TopPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  loadMore() {
    this.setState((prev) => {
      return { visiblePost: prev.visiblePost + 3 };
    });
  }

  togglePopup() {
    this.setState({ addClass: !this.state.addClass });
  }

  render() {
    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if ((document.title = "TopCEOConferences - Top CEO")) {
      document.body.classList.add("transparent_body");
    } else {
      document.body.classList.remove("transparent_body");
    }
    const { didMount } = this.state;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          <section className="theme_selection_section event_main_section video_page_main_section top_ceo_main_section">
            <div className="theme_selection_bg">
              <div className="container">
                <h2>
                  <span>{this.state.Videosubtitle}</span>
                  {this.state.Videotitle}
                </h2>

                <p className="top_text_content">{this.state.VideoContent}</p>

                <iframe
                  width="1280"
                  height="680"
                  src={this.state.Videoiframelink}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>

                <div className="row video_text">
                  <div className="column col-6">
                    <p>{this.state.Videotext1}</p>
                  </div>

                  <div className="column col-6">
                    <p className="right">{this.state.Videotext2}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="blog_article_section topceoconferences_section">
            <div className="container">
              <div className="row">
                {this.state.TopPost.slice(0, this.state.visiblePost).map(
                  (item, index) => {
                    return (
                      <div className="column col-3">
                        <div className="video_img">
                          <img src={GLOBAL.SITE_URL + item.Videoimage.url} />

                          <img
                            src={play}
                            className="play_btn"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          />
                        </div>

                        <div className="nominees_content">
                          <h5>{item.Title}</h5>

                          <small>{item.Subtitle}</small>

                          <p>{item.Content}</p>
                        </div>
                      </div>
                    );
                  }
                )}

                {this.state.addClass ? (
                  <div className="details_popup video_details_popup">
                    <div className="all_popup">
                      <div className="details_popup_content container">
                        <button
                          onClick={() => {
                            this.setState({ detailindex: "", addClass: false });
                          }}
                          className="details_popup_close"
                        >
                          <img src={search_close} />
                        </button>

                        <iframe
                          width="1280"
                          height="580"
                          src={
                            this.state.TopPost[this.state.detailindex]
                              .Buttonlink
                          }
                          frameborder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="column col-12">
                  {this.state.visiblePost < this.state.TopPost.length && (
                    <a
                      href="#"
                      className="border-bottom_link"
                      onClick={this.loadMore}
                    >
                      Load more
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default TopCEOConferences;
