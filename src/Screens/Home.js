import React, { Component } from "react";

import "../App.css";

import { Helmet } from "react-helmet";

import pin from "../images/pin.svg";

import Slider from "react-slick";

import search_close from "../images/close.svg";

import fb from "../images/fb.svg";

import user from "../images/user.png";

import sponsor_img1 from "../images/sponsor_img1.png";

import GLOBAL from "../Global";
import FloatingLabel from "floating-label-react";
import PhoneInput from "react-phone-number-input";
import TextField from "@material-ui/core/TextField";
import payimg_img1 from "../images/payimg_img1.png";
import payimg_img2 from "../images/payimg_img2.png";
import payimg_img3 from "../images/payimg_img3.png";
import payimg_img4 from "../images/payimg_img4.png";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";

const MODAL_OPEN_CLASS1 = "body--theme--popup--open";

const MODAL_OPEN_CLASS2 = "body--speaker--popup--open";

const MODAL_OPEN_CLASS3 = "body--agena--popup--open";

const MODAL_OPEN_CLASS4 = "body--sponsor--popup--open";

const MODAL_OPEN_CLASS5 = "body--partner--popup--open";

const MODAL_OPEN_CLASS6 = "body--popup--open";
const MODAL_OPEN_CLASS7 = "body--popup--open1";
const MODAL_OPEN_CLASS8 = "body--popup--open2";
const MODAL_OPEN_CLASS9 = "body--popup--open3";
const MODAL_OPEN_CLASS10 = "body--popup--open4";
const MODAL_OPEN_CLASS11 = "body--popup--open5";
const MODAL_OPEN_CLASS12 = "body--popup--open6";
const divStyle = { marginTop: "0px" };
var OptionData = [];
var PaymentSettings = [];
var USDToAED = "";
var PackageName = "";
var PackagePrice = "";
var countryCode = "";
var firstName = "";
var lastName = "";
var address1 = "";
var Event_Id = "";
var submitDisabled: false;
var submitDisabledText: "";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      fields: {},

      afields: {},

      rfields: {},

      cfields: {},

      efields: {},

      ufields: {},

      errors: {},

      eerrors: {},

      rerrors: {},

      cerrors: {},

      aerrors: {},

      uerrors: {},

      classn: {},

      classu: {},

      classe: {},

      rclassn: {},

      cclassn: {},

      aclassn: {},

      checkd: false,

      addClass: false,

      addClass1: false,

      addClass2: false,

      addClass3: false,

      addClass4: false,

      addClass5: false,

      addClass6: false,

      addClass7: false,

      addClass8: false,

      addClass9: false,

      addClass10: false,

      addClass11: false,

      addClass12: false,

      Bannerimage: "",

      Bannertitle: "",

      Bannersubtitle: "",

      Bannersquaretitle: "",

      Bannerbuttontext: "",

      Bannerbuttonlink: "",

      Abouttitle: "",

      Aboutsubtitle: "",

      Aboutbuttontext1: "",

      Aboutbuttonlink1: "",

      Aboutbuttontext2: "",

      Aboutbuttonlink2: "",

      Aboutifametext: "",

      AboutText: "",

      Themetitle: "",

      ThemeText: "",

      Themebuttontext: "",

      Themebuttonlink: "",

      Speakersstitle: "",

      Speakersbuttontext: "",

      Speakersbuttonlink: "",

      Highlightstitle: "",

      Highlightssubtitle: "",

      Highlightsbuttontext: "",

      Highlightsbuttonlink: "",

      ThemePost: [],

      SpeakerPost: [],
      BusinessPost: [],
      SponsorPost: [],

      Total: [],
      SAttendPost: [],
      AttendPost: [],

      LogoBlock: [],

      PLogoBlock: [],

      HighlightPost: [],

      themdetailindex: "",

      detailindex: "",

      FooterSocialicons: [],

      Agendadetailindex: "",

      detailindex4: "",

      detailindex5: "",

      ErrorPost: [],

      ThankyouPost: [],

      IndustryName: [],

      AffiliateName: [],
    };
  }

  state = { didMount: false };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  componentWillMount() {
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/attend-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var AttendPost = [];

        Data.map((item, index) => {
          AttendPost.push(item);
        });

        this.setState({ AttendPost: AttendPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/attend-selection-sections",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SAttendPost = [];

        Data.map((item, index) => {
          SAttendPost.push(item);
        });

        this.setState({ SAttendPost: SAttendPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

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

      url: GLOBAL.SITE_URL + "/home-banner-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            var LOGO = item.Image;

            this.setState({ Bannerimage: GLOBAL.SITE_URL + LOGO.url });

            this.setState({ Bannertitle: item.Title });

            this.setState({ Bannersubtitle: item.Subtitle });

            this.setState({ Bannersquaretitle: item.SquareTitle });

            this.setState({ Bannerbuttontext: item.ButtonText });

            this.setState({ Bannerbuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // About

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-top-ceo-2020-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Abouttitle: item.Title });

            this.setState({ Aboutsubtitle: item.SubTitle });

            this.setState({ Aboutbuttontext1: item.LeftButtonText });

            this.setState({ Aboutbuttonlink1: item.LeftButtonLink });

            this.setState({ Aboutbuttontext2: item.RightButtonText });

            this.setState({ Aboutbuttonlink2: item.RightButtonLink });

            this.setState({ AboutText: item.Text });

            this.setState({ Aboutifametext: item.IfameText });
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

      url: GLOBAL.SITE_URL + "/home-theme-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Themetitle: item.Title });

            this.setState({ ThemeText: item.Content });

            this.setState({ Themebuttontext: item.ButtonText });

            this.setState({ Themebuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

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

    // Speaker

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-speakers-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Speakersstitle: item.Title });

            this.setState({ Speakersbuttontext: item.ButtonText });

            this.setState({ Speakersbuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/speakers-posts?_sort=Order:asc",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SpeakerPost = [];

        Data.map((item, index) => {
          SpeakerPost.push(item);
        });

        this.setState({ SpeakerPost: SpeakerPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/footer-social-icons",

      responseType: "json",
    }).then((response) => {
      if (response.status == 200) {
        var Data = response.data;

        var FooterSocialicons = [];

        Data.map((item, index) => {
          FooterSocialicons.push(item);
        });

        this.setState({ FooterSocialicons: FooterSocialicons });
      }
    });

    // Total

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-theme-total-sections",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var Total = [];

        Data.map((item, index) => {
          Total.push(item);
        });

        this.setState({ Total: Total });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // Highlights

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-highlight-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Highlightstitle: item.Title });

            this.setState({ Highlightssubtitle: item.SubTitle });

            this.setState({ Highlightsbuttontext: item.ButtonText });

            this.setState({ Highlightsbuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/highlights-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var HighlightPost = [];

        Data.map((item, index) => {
          HighlightPost.push(item);
        });

        this.setState({ HighlightPost: HighlightPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // LogoBlock

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-sponsor-sections",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var LogoBlock = [];

        Data.map((item, index) => {
          LogoBlock.push(item);
        });

        this.setState({ LogoBlock: LogoBlock });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/business-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var BusinessPost = [];

        Data.map((item, index) => {
          BusinessPost.push(item);
        });

        this.setState({ BusinessPost: BusinessPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // business-page

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/business-posts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var SponsorPost = [];

        Data.map((item, index) => {
          SponsorPost.push(item);
        });

        this.setState({ SponsorPost: SponsorPost });
        // console.log("SponsorPost item")
        // console.log(SponsorPost)
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/home-partners-sections",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var PLogoBlock = [];

        Data.map((item, index) => {
          PLogoBlock.push(item);
        });

        this.setState({ PLogoBlock: PLogoBlock });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  togglePopup(e) {
    var list_id = e.currentTarget.dataset.id;
    this.state.rfields.TicketType = list_id;
    this.setState({ TicketType: list_id });
    this.setState({ addClass: !this.state.addClass });
  }
  stripHtml(html) {
    // Create a new div element

    var temporalDivElement = document.createElement("div");

    // Set the HTML content with the providen

    temporalDivElement.innerHTML = html;

    // Retrieve the text property of the element (cross-browser support)

    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  togglePopup1 = () => {
    this.setState({ addClass1: !this.state.addClass1 });
  };

  togglePopup2 = () => {
    this.setState({ addClass2: !this.state.addClass2 });
  };

  togglePopup3 = () => {
    this.setState({ addClass3: !this.state.addClass3 });
  };

  togglePopup4 = () => {
    this.setState({ addClass4: !this.state.addClass4 });
  };

  togglePopup5 = () => {
    this.setState({ addClass5: !this.state.addClass5 });
  };

  togglePopup6(e) {
    var list_id = e.currentTarget.dataset.id;
    this.state.rfields.TicketType = list_id;
    this.setState({ TicketType: list_id });
    this.setState({ addClass6: !this.state.addClass6 });
  }

  togglePopup7(e) {
    this.setState({ addClass7: !this.state.addClass7 });
  }

  togglePopup8(e) {
    this.setState({ addClass8: !this.state.addClass8 });
  }

  togglePopup9(e) {
    this.setState({ addClass9: !this.state.addClass9 });
  }

  togglePopup10(e) {
    this.setState({ addClass10: !this.state.addClass10 });
  }
  togglePopup11(e) {
    this.setState({ addClass11: !this.state.addClass11 });
  }

  togglePopup12() {
    this.setState({ addClass12: !this.state.addClass12 });
  }

  render() {
    if (this.state.addClass1) {
      document.body.classList.add(MODAL_OPEN_CLASS1);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS1);
    }

    if (this.state.addClass2) {
      document.body.classList.add(MODAL_OPEN_CLASS2);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS2);
    }

    if (this.state.addClass3) {
      document.body.classList.add(MODAL_OPEN_CLASS3);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS3);
    }

    if (this.state.addClass4) {
      document.body.classList.add(MODAL_OPEN_CLASS4);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS4);
    }

    if (this.state.addClass5) {
      document.body.classList.add(MODAL_OPEN_CLASS5);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS5);
    }

    if (this.state.addClass6) {
      document.body.classList.add(MODAL_OPEN_CLASS6);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
    }

    if (this.state.addClass7) {
      document.body.classList.add(MODAL_OPEN_CLASS7);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS7);
    }

    if ((document.title = "Attend - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }

    if (this.state.addClass8) {
      document.body.classList.remove(MODAL_OPEN_CLASS6);
      document.body.classList.add(MODAL_OPEN_CLASS8);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS8);
    }

    if (this.state.addClass9) {
      document.body.classList.add(MODAL_OPEN_CLASS9);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS9);
    }

    if (this.state.addClass10) {
      document.body.classList.add(MODAL_OPEN_CLASS10);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS10);
    }
    if (this.state.addClass11) {
      document.body.classList.add(MODAL_OPEN_CLASS11);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS11);
    }
    if (this.state.addClass12) {
      document.body.classList.add(MODAL_OPEN_CLASS12);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS12);
    }

    const settings = {
      dots: true,

      arrows: false,

      infinite: true,

      centerMode: true,

      centerPadding: "40px",

      draggable: false,

      speed: 500,

      slidesToShow: 2,

      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 520,

          settings: {
            slidesToShow: 1,

            slidesToScroll: 1,
          },
        },
      ],
    };

    if ((document.title = "Top CEO")) {
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
              if (item.Selectpage == "Home") {
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
                    <meta name="url" property="og:url" content={siteurl} />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="home_banner_section">
            <div className="container">
              <div className="banner_content">
                <h1 className="small_font">{this.state.Bannersubtitle}</h1>
                <h2>{this.state.Bannertitle}</h2>

                <div className="bottom_right_text">
                  <p>{this.state.Bannersquaretitle}</p>
                </div>

                <a target="_blank" href={this.state.Bannerbuttonlink} className="btn">
                  <span>{this.state.Bannerbuttontext}</span>
                </a>
              </div>

              <div className="banner_image">
                <div className="bottom_right_text">
                  <p>{this.state.Bannersquaretitle}</p>
                </div>

                <img src={this.state.Bannerimage} />
              </div>
            </div>
          </section>

          <section className="home_video_section">
            <div className="home_video_bg">
              <div className="container">
                <div className="video_content column">
                  <h2>
                    <span>{this.state.Aboutsubtitle}</span>
                    {this.state.Abouttitle}
                  </h2>

                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.AboutText }}
                  ></div>

                  <a
                    href={this.state.Aboutbuttonlink1}
                    className="border-bottom_link"
                  >
                    {this.state.Aboutbuttontext1}
                  </a>
                </div>

                <div className="video_image column">
                  <div className="video_image_block">
                    <iframe
                      width="817"
                      height="524"
                      src={this.state.Aboutifametext}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>

                  <a
                    href={this.state.Aboutbuttonlink2}
                    className="border-bottom_link"
                  >
                    {this.state.Aboutbuttontext2}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="home_theme_section">
            <div className="container">
              <h2>{this.state.Themetitle}</h2>

              <div className="row">
                <div className="column col-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: this.state.ThemeText }}
                  ></div>

                  <a
                    href={this.state.Themebuttonlink}
                    className="dekstop_show border-bottom_link"
                  >
                    {this.state.Themebuttontext}
                  </a>
                </div>
              </div>
            </div>

            <div className="column col-8">
              <div className="theme_block dekstop_show">
                {this.state.ThemePost.length > 0
                  ? this.state.ThemePost.map((item, index) => {
                    return (
                      <div
                        className="theme_content"
                        onClick={() => {
                          this.setState({
                            themdetailindex: index,
                            addClass1: true,
                          });
                        }}
                        id={index}
                      >
                        <img src={GLOBAL.SITE_URL + item.Image.url} />

                        <p>{item.Title}</p>
                      </div>
                    );
                  })
                  : null}
              </div>

              <Slider {...settings}>
                {this.state.ThemePost.length > 0
                  ? this.state.ThemePost.map((item, index) => {
                    return (
                      <div>
                        <div
                          className="theme_content"
                          onClick={() => {
                            this.setState({
                              themdetailindex: index,
                              addClass1: true,
                            });
                          }}
                          id={index}
                        >
                          <img src={GLOBAL.SITE_URL + item.Image.url} />

                          <p>{item.Title}</p>
                        </div>
                      </div>
                    );
                  })
                  : null}
              </Slider>

              <a
                href={this.state.Themebuttonlink}
                className="dekstop_show border-bottom_link"
              >
                {this.state.Themebuttontext}
              </a>
            </div>
          </section>

          <section className="home_speaker_section">
            <div className="container">
              <h2>{this.state.Speakersstitle}</h2>

              <div className="row">
                {this.state.SpeakerPost.length > 0
                  ? this.state.SpeakerPost.map((item, index) => {
                    if (item.BigSmall == true) {
                      return (
                        <div className="column col-6">
                          <div
                            className="speaker_block"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass2: true,
                              });
                            }}
                            id={index}
                          >
                            <img src={GLOBAL.SITE_URL + item.Image.url} />

                            <div className="speaker_overlay">
                              <h4>{item.Title}</h4>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: item.Autorname,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                  : null}

                {this.state.SpeakerPost.length > 0
                  ? this.state.SpeakerPost.map((item, index) => {
                    if (item.BigSmall == true) {
                      if (index < 9) {
                        return (
                          <div
                            class={
                              item.BigSmall == null || item.BigSmall == false
                                ? "column col-4"
                                : "column_hide"
                            }
                          >
                            <div
                              className="speaker_block"
                              onClick={() => {
                                this.setState({
                                  detailindex: index,
                                  addClass2: true,
                                });
                              }}
                              id={index}
                            >
                              <img src={GLOBAL.SITE_URL + item.Image.url} />

                              <div className="speaker_overlay">
                                <h4>{item.Title}</h4>

                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.Autorname,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    } else {
                      if (index < 8) {
                        return (
                          <div
                            class={
                              item.BigSmall == null || item.BigSmall == false
                                ? "column col-4"
                                : "column_hide"
                            }
                          >
                            <div
                              className="speaker_block"
                              onClick={() => {
                                this.setState({
                                  detailindex: index,
                                  addClass2: true,
                                });
                              }}
                              id={index}
                            >
                              <img src={GLOBAL.SITE_URL + item.Image.url} />

                              <div className="speaker_overlay">
                                <h4>{item.Title}</h4>

                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: item.Autorname,
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    }
                  })
                  : null}

                <div className="column col-12">
                  <a
                    href={this.state.Speakersbuttonlink}
                    className="border-bottom_link"
                  >
                    {this.state.Speakersbuttontext}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="home_highlight_section">
            <div className="container">
              <h2>
                <span>{this.state.Highlightssubtitle}</span>
                {this.state.Highlightstitle}
              </h2>

              <div className="row">
                {this.state.HighlightPost.map((item, index) => {
                  if (index < 5) {
                    return (
                      <div className="column col-3">
                        <div
                          className="home_highlight_content"
                          onClick={() => {
                            this.setState({
                              Agendadetailindex: index,
                              addClass3: true,
                            });
                          }}
                          id={index}
                        >
                          <small className="date">
                            {item.StartTime.toLowerCase()}{" "}
                            {item.StartTime != "" ? "to" : null}{" "}
                            {item.EndTime.toLowerCase()}
                          </small>

                          <h4>{item.Title}</h4>

                          <div className="pin_text">
                            <img src={pin} />
                            <p>{item.Addresstext}</p>
                          </div>

                          <div className="high_truncate_text">
                            {this.stripHtml(item.Content)}
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>

              <a
                href={this.state.Highlightsbuttonlink}
                className="border-bottom_link"
              >
                {this.state.Highlightsbuttontext}
              </a>
            </div>
          </section>

          <section className="home_theme_total_section">
            <div className="container">
              <div className="row">
                {this.state.Total.map((item, index) => {
                  return (
                    <div className="column col-4">
                      <div className="total_block">
                        <h2>{item.Title}</h2>

                        <h4>{item.SubTitle}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
     <section className="attend_table_section">
            <div className="container">
              <div className="snip1214">
                {this.state.SAttendPost.length > 0
                  ? this.state.SAttendPost.map((item, index) => {
                    return (
                      <div className={item.id === 2 ? "featured plan" : "plan"}>
                        {item.id === 2 && <h3 className="plan-title">Most Popular</h3>}

                        <div className="plan-cost">
                          <span className="plan-type">{item.Title}</span>
                          <span className="plan-price">{item.SubTitle}</span>
                        </div>

                        <ul className="plan-features">
                          <li className={item.Info1Select === "True" ? "right" : "wrong"}>
                            {item.InfoText1}
                          </li>
                          <li className={item.Info2Select === "True" ? "right" : "wrong"}>
                            {item.InfoText2}
                          </li>
                          <li className={item.Info3select === "True" ? "right" : "wrong"}>
                            {item.InfoText3}
                          </li>
                          <li className={item.Info4select === "True" ? "right" : "wrong"}>
                            {item.InfoText4}
                          </li>
                          <li className={item.Info5select === "True" ? "right" : "wrong"}>
                            {item.InfoText5}
                          </li>
                        </ul>

                        <div className="plan-select">
                          <a
                            data-id={item.id}
                            onClick={this.togglePopup6.bind(this)}
                            className="btn"
                          >
                            <span>{item.ButtonText}</span>
                          </a>
                        </div>
                      </div>
                    );
                  })
                  : null}

                {this.state.AttendPost.length > 0
                  ? this.state.AttendPost.map((item, index) => {
                    if (item.Title == "Selection Bottom Text") {
                      return (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.Content,
                          }}
                        ></div>
                      );
                    }
                  })
                  : null}
              </div>
            </div>
          </section>

          <section className="home_sponsor_section ">
            <div className="container">
              {this.state.LogoBlock.map((item, index) => {
                if (index < 1) {
                  return <h2>{item.SetionTilte}</h2>;
                }
              })}

              <div className="sponsor_images ">
                {this.state.LogoBlock.map((item, index) => {
                  if (item.Selectoption == "Big") {
                    return (
                      <a
                        onClick={() => {
                          this.setState({
                            detailindex4: index,
                            addClass4: true,
                          });
                        }}
                        id={index}
                      >
                        {item.SmallLogoImage == null ? null : (
                          <img
                            src={GLOBAL.SITE_URL + item.SmallLogoImage.url}
                          />
                        )}
                      </a>
                    );
                  }
                })}
              </div>

              <div className="sponsor_logo_section">
                {this.state.LogoBlock.map((item, index) => {
                  if (
                    item.Selectoption == "Small" ||
                    item.Selectoption == null
                  ) {
                    return (
                      <div
                        className="logo_block"
                        onClick={() => {
                          this.setState({
                            detailindex4: index,
                            addClass4: true,
                          });
                        }}
                        id={index}
                      >
                        {item.SmallLogoImage == null ? null : (
                          <img
                            src={GLOBAL.SITE_URL + item.SmallLogoImage.url}
                          />
                        )}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </section>

     
          <section className="home_sponsor_section home_partners_section">
            <div className="container">
              {this.state.BusinessPost.length > 0
                ? this.state.BusinessPost.map((item, index) => {
                  if (item.SelectSection == "Section6") {
                    return (
                      <div>
                        <h2>
                          <span>{item.SubTitle}</span>
                          {item.TItle}
                        </h2>

                        <div
                          className="top_text_content"
                          dangerouslySetInnerHTML={{
                            __html: item.Content,
                          }}
                        ></div>
                      </div>
                    );
                  }
                })
                : null}

              {this.state.BusinessPost.length > 0
                ? this.state.BusinessPost.map((item, index) => {
                  if (item.SelectSection == "Section7") {
                    if (item.TItle == "Knowledge Partners") {
                      return <h4 className="border-top">{item.TItle}</h4>;
                    }
                  }
                })
                : null}

              <div className="row">
                {this.state.SponsorPost.length > 0
                  ? this.state.SponsorPost.map((item, index) => {
                    if (item.Selectoptions == "Knowledgepartners") {
                      return (
                        <div className="column col-4 col-xs-6">
                          <div
                            className="knowledge_img"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          >
                            {item.SmallLogoImage == null ? null : (
                              <img
                                src={
                                  GLOBAL.SITE_URL +
                                  item.SmallLogoImage.url
                                }
                              />
                            )}
                          </div>

                          <p>{item.Title}</p>
                        </div>
                      );
                    }
                  })
                  : null}

                <div className="column col-12">
                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section8") {
                        return (
                          <h4 className="border-top">{item.TItle}</h4>
                        );
                      }
                    })
                    : null}
                </div>

                {this.state.SponsorPost.length > 0
                  ? this.state.SponsorPost.map((item, index) => {
                    if (item.Selectoptions == "Mediapartners") {
                      return (
                        <div className="column col-4 col-xs-6">
                          <div
                            className="knowledge_img"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          >
                            {item.SmallLogoImage == null ? null : (
                              <img
                                src={
                                  GLOBAL.SITE_URL +
                                  item.SmallLogoImage.url
                                }
                              />
                            )}
                          </div>

                          <p>{item.Title}</p>
                        </div>
                      );
                    }
                  })
                  : null}

                <div className="column col-12">
                  {this.state.BusinessPost.length > 0
                    ? this.state.BusinessPost.map((item, index) => {
                      if (item.SelectSection == "Section9") {
                        return (
                          <h4 className="border-top">{item.TItle}</h4>
                        );
                      }
                    })
                    : null}
                </div>

                {this.state.BusinessPost.length > 0
                  ? this.state.BusinessPost.map((item, index) => {
                    if (item.SelectSection == "Section7") {
                      if (item.TItle == "Ecosystem Partners") {
                        return (
                          <div className="column col-12">
                            <h4 className="border-top">{item.TItle}</h4>
                          </div>
                        );
                      }
                    }
                  })
                  : null}

                {this.state.SponsorPost.length > 0
                  ? this.state.SponsorPost.map((item, index) => {
                    if (item.Selectoptions == "Ecosystempartners") {
                      return (
                        <div className="column col-4 col-xs-6">
                          <div
                            className="knowledge_img"
                            onClick={() => {
                              this.setState({
                                detailindex: index,
                                addClass: true,
                              });
                            }}
                            id={index}
                          >
                            {item.SmallLogoImage == null ? null : (
                              <img
                                src={
                                  GLOBAL.SITE_URL +
                                  item.SmallLogoImage.url
                                }
                              />
                            )}
                          </div>

                          <p>{item.Title}</p>
                        </div>
                      );
                    }
                  })
                  : null}

              </div>
            </div>
          </section>

          {this.state.addClass1 ? (
            <div
              className="details_popup theme_details_popup"
              id={this.state.themdetailindex}
            >
              <div className="all_popup">
                <div className="details_popup_content">
                  <button
                    onClick={() => {
                      this.setState({ themdetailindex: "", addClass1: false });
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
                              this.state.ThemePost[this.state.themdetailindex]
                                .Image.url
                            }
                          />
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block">
                          <h3>
                            {
                              this.state.ThemePost[this.state.themdetailindex]
                                .Title
                            }
                          </h3>

                          <small>
                            {
                              this.state.ThemePost[this.state.themdetailindex]
                                .Subtitle
                            }
                          </small>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.ThemePost[this.state.themdetailindex]
                                .Description,
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

          {this.state.detailindex}

          {this.state.addClass2 ? (
            <div
              className="details_popup speaker_details_popup"
              id={this.state.detailindex}
            >
              <div className="all_popup">
                <div className="details_popup_content">
                  <button
                    onClick={() => {
                      this.setState({ detailindex: "", addClass2: false });
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
                              this.state.SpeakerPost[this.state.detailindex]
                                .Image.url
                            }
                          />
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block">
                          <h3>
                            {
                              this.state.SpeakerPost[this.state.detailindex]
                                .Title
                            }
                          </h3>

                          <small
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.SpeakerPost[this.state.detailindex]
                                .Autorname,
                            }}
                          ></small>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.SpeakerPost[this.state.detailindex]
                                .Description,
                            }}
                          ></div>

                          <ul className="social_icons">
                            {this.state.SpeakerPost[this.state.detailindex]
                              .FackbookLink == null ? null : (
                              <li>
                                <a
                                  href={
                                    this.state.SpeakerPost[
                                      this.state.detailindex
                                      ].FackbookLink
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src={fb}
                                    height="20px"
                                    width="9px"
                                    className="fb_icon"
                                  />
                                </a>
                              </li>
                            )}

                            {this.state.SpeakerPost[this.state.detailindex]
                              .TwitterLink == null ? null : (
                              <li>
                                <a
                                  href={
                                    this.state.SpeakerPost[
                                      this.state.detailindex
                                      ].TwitterLink
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src="twitter.svg"
                                    height="20px"
                                    width="24px"
                                    className="twr_icon"
                                  />
                                </a>
                              </li>
                            )}

                            {this.state.SpeakerPost[this.state.detailindex]
                              .LinkedinLink == null ? null : (
                              <li>
                                <a
                                  href={
                                    this.state.SpeakerPost[
                                      this.state.detailindex
                                      ].LinkedinLink
                                  }
                                  target="_blank"
                                >
                                  <img
                                    src="linkedin.svg"
                                    height="20px"
                                    width="20px"
                                    className="lin_icon"
                                  />
                                </a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass3 ? (
            <div
              className="details_popup agenda_detail_popup"
              id={this.state.Agendadetailindex}
            >
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={() => {
                      this.setState({
                        Agendadetailindex: "",
                        addClass3: false,
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
                              this.state.HighlightPost[
                                this.state.Agendadetailindex
                                ].Image.url
                            }
                          />{" "}
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block nominees_content">
                          <div className="user_detail">
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].UserImage.url
                              }
                            />

                            <span>
                              <small>Speaker:</small>
                              {
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].UserName
                              }
                            </span>

                            {this.state.HighlightPost[
                              this.state.Agendadetailindex
                              ].RightLogoLink == null ? null : (
                              <a
                                href={
                                  this.state.HighlightPost[
                                    this.state.Agendadetailindex
                                    ].RightLogoLink
                                }
                                target="_blank"
                              >
                                <img
                                  src={
                                    GLOBAL.SITE_URL +
                                    this.state.HighlightPost[
                                      this.state.Agendadetailindex
                                      ].RightLogo.url
                                  }
                                  className="right_img"
                                  width="76px"
                                  height="25px"
                                />
                              </a>
                            )}
                          </div>

                          <small className="date">
                            {this.state.HighlightPost[
                              this.state.Agendadetailindex
                              ].StartTime.toLowerCase()}
                            {this.state.HighlightPost[
                              this.state.Agendadetailindex
                              ].StartTime != ""
                              ? " to "
                              : null}
                            {this.state.HighlightPost[
                              this.state.Agendadetailindex
                              ].EndTime.toLowerCase()}
                          </small>

                          <h3>
                            {
                              this.state.HighlightPost[
                                this.state.Agendadetailindex
                                ].Title
                            }
                          </h3>

                          <span className="address_text">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="14"
                              viewBox="0 0 11 14"
                            >
                              <path
                                fill="#4E566E"
                                fill-rule="evenodd"
                                d="M5.5 0C8.519 0 11 2.34 11 5.275 10.917 8.17 7.568 12.096 5.5 14 3.432 12.255.083 8.051 0 5.275 0 2.34 2.44 0 5.5 0zm0 3.133c1.2 0 2.192.952 2.192 2.142 0 1.15-.993 2.102-2.192 2.102-1.24 0-2.233-.952-2.233-2.102 0-1.19.992-2.142 2.233-2.142z"
                              />
                            </svg>

                            <small>
                              {
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].Addresstext
                              }
                            </small>
                          </span>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.HighlightPost[
                                this.state.Agendadetailindex
                                ].Content,
                            }}
                          ></div>

                          <div className="line_div">
                            <a
                              href={
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].ButtonLink1
                              }
                              className="btn"
                            >
                              <span>
                                {
                                  this.state.HighlightPost[
                                    this.state.Agendadetailindex
                                    ].ButtonText1
                                }
                              </span>
                            </a>

                            <a
                              href={
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].ButtonLink2
                              }
                              className="border-bottom_link"
                            >
                              {
                                this.state.HighlightPost[
                                  this.state.Agendadetailindex
                                  ].ButtonText2
                              }
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass4 ? (
            <div
              className="details_popup speaker_details_popup logoblock_popup business_details_popup"
              id={this.state.detailindex4}
            >
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={() => {
                      this.setState({ detailindex4: "", addClass4: false });
                    }}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-6">
                        <div className="detail_popup_img">
                          {this.state.LogoBlock[this.state.detailindex4]
                            .BigLogoImage == null ? (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.LogoBlock[this.state.detailindex4]
                                  .SmallLogoImage.url
                              }
                            />
                          ) : (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.LogoBlock[this.state.detailindex4]
                                  .BigLogoImage.url
                              }
                            />
                          )}
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block">
                          <h3>
                            {
                              this.state.LogoBlock[this.state.detailindex4]
                                .Title
                            }
                          </h3>

                          <small>
                            {
                              this.state.LogoBlock[this.state.detailindex4]
                                .SubTitle
                            }
                          </small>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.LogoBlock[this.state.detailindex4]
                                .Content,
                            }}
                          ></div>

                          {this.state.LogoBlock[this.state.detailindex4]
                            .ButtonText == null ? null : (
                            <a
                              href={
                                this.state.LogoBlock[this.state.detailindex4]
                                  .ButtonLink
                              }
                              className="btn"
                              target="_blank"
                            >
                              <span>
                                {
                                  this.state.LogoBlock[this.state.detailindex4]
                                    .ButtonText
                                }
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass5 ? (
            <div
              className="details_popup speaker_details_popup Plogoblock_popup business_details_popup"
              id={this.state.detailindex5}
            >
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={() => {
                      this.setState({ detailindex5: "", addClass5: false });
                    }}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-6">
                        <div className="detail_popup_img">
                          {this.state.PLogoBlock[this.state.detailindex5]
                            .BigLogoImage == null ? (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.PLogoBlock[this.state.detailindex5]
                                  .SmallLogoImage.url
                              }
                            />
                          ) : (
                            <img
                              src={
                                GLOBAL.SITE_URL +
                                this.state.PLogoBlock[this.state.detailindex5]
                                  .BigLogoImage.url
                              }
                            />
                          )}
                        </div>
                      </div>

                      <div className="column col-6">
                        <div className="theme_selection_block">
                          <h3>
                            {
                              this.state.PLogoBlock[this.state.detailindex5]
                                .Title
                            }
                          </h3>

                          <small>
                            {
                              this.state.PLogoBlock[this.state.detailindex5]
                                .SubTitle
                            }
                          </small>

                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                              this.state.PLogoBlock[this.state.detailindex5]
                                .Content,
                            }}
                          ></div>

                          {this.state.PLogoBlock[this.state.detailindex5]
                            .ButtonText == null ? null : (
                            <a
                              href={
                                this.state.PLogoBlock[this.state.detailindex5]
                                  .ButtonLink
                              }
                              className="btn"
                              target="_blank"
                            >
                              <span>
                                {
                                  this.state.PLogoBlock[this.state.detailindex5]
                                    .ButtonText
                                }
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass6 ? (
            <div className="details_popup attend_details_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup6.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-12">
                        <div className="theme_selection_block">
                          <form
                            method="post"
                            name="userRegisterForm"
                            onSubmit={this.submituserRegisterForm}
                            className="contact_from"
                            id="request_ticket"
                          >
                            <div className="container">
                              <h3>Request a Ticket</h3>

                              <p>
                                Finalize the registration and wait for approval
                                as soon as possible.
                              </p>
                              <input
                                type="hidden"
                                id="TicketType"
                                value={this.state.TicketType}
                                name="TicketType"
                              />
                              <div className="row">
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="username"
                                    name="username"
                                    placeholder="First Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.username}
                                    className={this.state.rclassn.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.username}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.lastname}
                                    className={this.state.rclassn.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.lastname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="emailid"
                                    placeholder="Email Address*"
                                    type="email"
                                    maxLength="255"
                                    value={this.state.rfields.emailid}
                                    className={this.state.rclassn.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.emailid}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="company"
                                    name="company"
                                    placeholder="Company"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.company}
                                    className={this.state.rclassn.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.company}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.rfields.title}
                                    className={this.state.rclassn.title}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.rhandleChange}
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.rerrors.title}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.rfields.industry}
                                    onChange={this.rhandleChange}
                                    placeholder="Industry"
                                  >
                                    <option>Industry</option>
                                    {this.state.IndustryName.length > 0
                                      ? this.state.IndustryName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.IndustryName}>
                                              {item.IndustryName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="country"
                                    value={this.state.rfields.country}
                                    onChange={this.rhandleChange}
                                    placeholder="Country"
                                  >
                                    <option>Country</option>
                                    {OptionData.length > 0
                                      ? OptionData.map((item, index) => {
                                        return (
                                          <option val={item.label}>
                                            {item.label}
                                          </option>
                                        );
                                      })
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    value={this.state.rfields.mobileno}
                                    className={this.state.rclassn.mobileno}
                                    placeholder="Mobile Number*"
                                    maxLength="20"
                                    onChange={(e) =>
                                      (this.state.rfields.mobileno = e)
                                    }
                                    onKeyUp={this.rhandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.rerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <select
                                    name="affiliate"
                                    value={this.state.rfields.affiliate}
                                    onChange={this.rhandleChange}
                                    placeholder="Affiliate Name"
                                  >
                                    <option>Affiliate Name</option>
                                    {this.state.AffiliateName.length > 0
                                      ? this.state.AffiliateName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.AffiliateName}>
                                              {item.AffiliateName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox1"
                                      name="subscribecheck"
                                      value={this.state.rfields.subscribecheck}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="checkbox1">
                                      Subscribe to get updates on upcoming guest
                                      speakers, workshops and more!
                                    </label>
                                  </div>

                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="mediaquest"
                                      name="mediaquest"
                                      value={this.state.rfields.mediaquest}
                                      onChange={(e) => {
                                        this.rhandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="mediaquest">
                                      Subscribe to receive updates from
                                      Mediaquest partners
                                    </label>
                                  </div>

                                  {/* <input type="submit" className="btn" value="Submit" /> */}
                                  <div className="errorMsg">
                                    {this.state.formerror}
                                  </div>
                                  <button type="submit" className="btn">
                                    <span>Submit</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass7 ? (
            <div className="details_popup attand_popup attend_details_popup popup_wrap">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup7.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container">
                    <div className="row">
                      <div className="column col-12">
                        <div className="theme_selection_block">
                          <form
                            method="post"
                            name="userRegisterForm"
                            onSubmit={this.SubmitAttendForm}
                            className="contact_from"
                            id="finish_registration"
                          >
                            <div className="container">
                              <h3>Finalize Registration</h3>

                              <input
                                type="hidden"
                                id="event_id"
                                value={this.state.afields.event_id}
                                name="event_id"
                              />
                              <input
                                type="hidden"
                                id="InviteCodeType"
                                value={this.state.afields.InviteCodeType}
                                name="InviteCodeType"
                              />
                              <p>
                                Finalize the registration and wait for approval
                                as soon as possible.
                              </p>
                              <p>
                                Are you interested in attending Top CEO 2020
                                event?Fill in the following information:
                              </p>
                              <div className="row">
                                <div className="column col-6">
                                  <select
                                    name="company_list"
                                    value={this.state.afields.company_list}
                                    onChange={this.ahandleChange}
                                    placeholder="CEO Listed company"
                                  >
                                    <option val="">-- Please Select --</option>
                                    {this.state.positions.length > 0
                                      ? this.state.positions.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.PositionName}>
                                              {item.PositionName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="username"
                                    name="username"
                                    placeholder="Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.username}
                                    className={this.state.aclassn.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.username}
                                  </div>
                                </div>

                                {this.state.other_position ? (
                                  <div className="column col-12">
                                    <FloatingLabel
                                      id="other_position"
                                      name="other_position"
                                      placeholder="Other Position"
                                      type="text"
                                      maxLength="255"
                                      value={this.state.afields.other_position}
                                      className={
                                        this.state.aclassn.other_position
                                      }
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_position}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    maxLength="255"
                                    placeholder="Last Name*"
                                    type="text"
                                    value={this.state.afields.lastname}
                                    className={this.state.aclassn.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.lastname}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <select
                                    name="country"
                                    value={this.state.afields.country}
                                    className={this.state.aclassn.country}
                                    onChange={this.ahandleChange}
                                    placeholder="Country of origin"
                                  >
                                    <option>Country of origin</option>
                                    {OptionData.length > 0
                                      ? OptionData.map((item, index) => {
                                        return (
                                          <option val={item.label}>
                                            {item.label}
                                          </option>
                                        );
                                      })
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.country}
                                  </div>
                                </div>
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="company"
                                    name="company"
                                    placeholder="Company Name*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.company}
                                    className={this.state.aclassn.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.aerrors.company}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.afields.industry}
                                    className={this.state.aclassn.industry}
                                    onChange={this.ahandleChange}
                                    placeholder="Company Industry"
                                  >
                                    <option>Company Industry</option>
                                    {this.state.IndustryName.length > 0
                                      ? this.state.IndustryName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.IndustryName}>
                                              {item.IndustryName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="nominated"
                                    value={this.state.afields.nominated}
                                    className={this.state.aclassn.nominated}
                                    onChange={this.ahandleChange}
                                  >
                                    <option>
                                      Is your company nominated for the Award
                                      ceremony
                                    </option>
                                    <option val="Yes">Yes</option>
                                    <option val="No">No</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="emailid"
                                    placeholder="Email*"
                                    type="email"
                                    maxLength="255"
                                    value={this.state.afields.emailid}
                                    className={this.state.aclassn.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.email}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    maxLength="20"
                                    value={this.state.afields.mobileno}
                                    className={this.state.aclassn.mobileno}
                                    placeholder="Mobile Number*"
                                    onChange={(e) =>
                                      (this.state.afields.mobileno = e)
                                    }
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="Linkedin profile or link to CV*"
                                    type="text"
                                    maxLength="255"
                                    value={this.state.afields.linkedin}
                                    className={this.state.aclassn.linkedin}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />
                                  <div className="errorMsg">
                                    {this.state.aerrors.linkedin}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <select
                                    name="affiliate"
                                    value={this.state.afields.affiliate}
                                    className={this.state.aclassn.affiliate}
                                    onChange={this.ahandleChange}
                                    placeholder="Affiliate Name"
                                  >
                                    <option>Affiliate Name</option>
                                    {this.state.AffiliateName.length > 0
                                      ? this.state.AffiliateName.map(
                                        (item, index) => {
                                          return (
                                            <option val={item.AffiliateName}>
                                              {item.AffiliateName}
                                            </option>
                                          );
                                        }
                                      )
                                      : null}
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.affiliate}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <TextField
                                    id="address"
                                    name="address"
                                    label="Address*"
                                    placeholder="Write your address*"
                                    multiline
                                    rows={2}
                                    value={this.state.afields.address}
                                    className={this.state.aclassn.address}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.ahandleChange}
                                    onKeyUp={this.ahandleKeyUpChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.aerrors.address}
                                  </div>
                                </div>
                                <div className="column col-12">
                                  <p>
                                    Tell us more about your interest in
                                    attending Top CEO:
                                  </p>
                                </div>
                                <div className="column col-6">
                                  <select
                                    name="interested"
                                    value={this.state.afields.interested}
                                    className={this.state.aclassn.interested}
                                    onChange={this.ahandleChange}
                                    placeholder="You are interested in "
                                  >
                                    <option>You are interested in </option>
                                    <option val="Networking opportunities">
                                      Networking opportunities
                                    </option>
                                    <option val="Learning opportunities & Exposure to content provided">
                                      Learning opportunities & Exposure to
                                      content provided
                                    </option>
                                    <option val="Other">Other</option>
                                  </select>
                                  <div className="errorMsg">
                                    {this.state.aerrors.industry}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    id="aboutus"
                                    name="aboutus"
                                    value={this.state.afields.aboutus}
                                    className={this.state.aclassn.aboutus}
                                    onChange={this.ahandleChange}
                                    placeholder="How did you hear about us?"
                                  >
                                    <option>How did you hear about us? </option>
                                    <option val="Website">Website</option>
                                    <option val="Social Media">
                                      Social Media
                                    </option>
                                    <option val="Print Media">
                                      Print Media
                                    </option>
                                    <option val="TVC">TVC</option>
                                    <option val="Friend referral">
                                      Friend referral
                                    </option>
                                    <option val="GFH Sponsor referral">
                                      GFH Sponsor referral
                                    </option>
                                    <option val="Other Sponsor referral">
                                      Other Sponsor referral
                                    </option>
                                    <option val="Other">Other</option>
                                  </select>
                                </div>

                                {this.state.other_interested ? (
                                  <div className="column col-6">
                                    <FloatingLabel
                                      id="other_interested"
                                      name="other_interested"
                                      placeholder="Other interest"
                                      type="text"
                                      maxLength="255"
                                      value={
                                        this.state.afields.other_interested
                                      }
                                      className={
                                        this.state.aclassn.other_interested
                                      }
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_interested}
                                    </div>
                                  </div>
                                ) : null}

                                {this.state.other_hear ? (
                                  <div
                                    class={
                                      this.state.other_interested
                                        ? "column col-6"
                                        : "column col-12"
                                    }
                                  >
                                    <FloatingLabel
                                      id="other_hear"
                                      name="other_hear"
                                      maxLength="255"
                                      placeholder="Hear about us from other"
                                      type="text"
                                      value={this.state.afields.other_hear}
                                      className={this.state.aclassn.other_hear}
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.other_hear}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-12">
                                  <div className="checkbox multi_checkbox">
                                    <span>
                                      What themes are you most interested in?
                                    </span>

                                    {this.state.ThemePost.length > 0
                                      ? this.state.ThemePost.map(
                                        (item, index) => {
                                          return (
                                            <div>
                                              <input
                                                type="checkbox"
                                                id={item.id}
                                                name="whattheme[]"
                                                className="whattheme"
                                                value={item.id}
                                                onChange={this.ahandleChange}
                                                onClick={this.checkbox.bind(
                                                  this
                                                )}
                                              />
                                              <label for={item.id}>
                                                {item.Title}
                                              </label>
                                            </div>
                                          );
                                        }
                                      )
                                      : null}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="attended_ceo"
                                    value={this.state.afields.attended_ceo}
                                    className={this.state.aclassn.attended_ceo}
                                    onChange={this.ahandleChange}
                                  >
                                    <option>
                                      Have you previously attended Top CEO?
                                    </option>
                                    <option val="Yes">Yes</option>
                                    <option val="No">No</option>
                                  </select>
                                </div>
                                {this.state.attended ? (
                                  <div className="column col-6">
                                    <FloatingLabel
                                      id="attended"
                                      name="whatyear"
                                      placeholder="what year"
                                      type="text"
                                      maxLength="255"
                                      value={this.state.afields.whatyear}
                                      className={this.state.aclassn.whatyear}
                                      onChange={(evt) =>
                                        this.setState(() => ({
                                          value: evt.currentTarget.value,
                                        }))
                                      }
                                      onChange={this.ahandleChange}
                                      onKeyUp={this.ahandleKeyUpChange}
                                    />

                                    <div className="errorMsg">
                                      {this.state.aerrors.whatyear}
                                    </div>
                                  </div>
                                ) : null}

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="subscribecheck"
                                      name="subscribecheck"
                                      value={this.state.afields.subscribecheck}
                                      checked={
                                        this.state.afields.subscribecheck
                                      }
                                      onChange={(e) => {
                                        this.ahandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="subscribecheck">
                                      Subscribe to get updates on upcoming guest
                                      speakers, workshops and more!
                                    </label>
                                  </div>

                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="mediaquesta"
                                      name="mediaquest"
                                      value={this.state.afields.mediaquest}
                                      checked={this.state.afields.mediaquest}
                                      onChange={(e) => {
                                        this.ahandleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="mediaquesta">
                                      Subscribe to receive updates from
                                      Mediaquest partners
                                    </label>
                                  </div>
                                </div>
                                <div className="column col-12">
                                  <button type="submit" className="btn">
                                    <span>Submit</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass8 ? (
            <div className="details_popup thank_you_popup attend_details_popup ">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup8.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container attend_form_section">
                    <div className="row">
                      <div className="column col-12">
                        {this.state.ThankyouPost.length > 0
                          ? this.state.ThankyouPost.map((item, index) => {
                            return (
                              <div className="theme_selection_block">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                                <div
                                  className="thankyou_txt"
                                  dangerouslySetInnerHTML={{
                                    __html: item.Contant,
                                  }}
                                ></div>
                                <a href={item.ButtonLink} className="btn">
                                  <span>{item.ButtonText}</span>
                                </a>
                              </div>
                            );
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass9 ? (
            <div className="details_popup  attend_details_popup edit_user_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup9.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container attend_form_section">
                    <div className="row">
                      <div className="column col-12">
                        <div className="theme_selection_block">
                          <form
                            method="post"
                            name="update_user"
                            onSubmit={this.SubmitUserForm}
                            className="contact_from"
                          >
                            <div className="container">
                              <input
                                type="hidden"
                                id="event_id"
                                value={this.state.event_id}
                                name="event_id"
                              />
                              <div className="row">
                                <div className="column col-6">
                                  <FloatingLabel
                                    id="username"
                                    name="username"
                                    placeholder="First Name"
                                    type="text"
                                    value={this.state.ufields.username}
                                    className={this.state.classu.username}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.username}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="lastname"
                                    name="lastname"
                                    placeholder="Last Name"
                                    type="text"
                                    value={this.state.ufields.lastname}
                                    className={this.state.classu.lastname}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.lastname}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="email"
                                    name="emailid"
                                    placeholder="Email Address"
                                    type="email"
                                    value={this.state.ufields.emailid}
                                    className={this.state.classu.emailid}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.emailid}
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="company"
                                    name="company"
                                    placeholder="Company"
                                    type="text"
                                    value={this.state.ufields.company}
                                    className={this.state.classu.company}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />
                                </div>

                                <div className="column col-6">
                                  <FloatingLabel
                                    id="title"
                                    name="title"
                                    placeholder="Title"
                                    type="text"
                                    value={this.state.ufields.title}
                                    className={this.state.classu.title}
                                    onChange={(evt) =>
                                      this.setState(() => ({
                                        value: evt.currentTarget.value,
                                      }))
                                    }
                                    onChange={this.uhandleChange}
                                  />
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="industry"
                                    value={this.state.ufields.industry}
                                    onChange={this.uhandleChange}
                                    placeholder="Industry"
                                  >
                                    <option>Industry</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <select
                                    name="country"
                                    value={this.state.ufields.country}
                                    onChange={this.uhandleChange}
                                    placeholder="Country"
                                  >
                                    <option>Country</option>
                                  </select>
                                </div>

                                <div className="column col-6">
                                  <PhoneInput
                                    id="mobileno"
                                    name="mobileno"
                                    value={this.state.ufields.mobileno}
                                    className={this.state.classu.mobileno}
                                    placeholder="Mobile Number*"
                                    onChange={(e) =>
                                      (this.state.ufields.mobileno = e)
                                    }
                                  />

                                  <div className="errorMsg">
                                    {this.state.uerrors.mobileno}
                                  </div>
                                </div>

                                <div className="column col-12">
                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox"
                                      name="subscribecheck"
                                      value={this.state.ufields.subscribecheck}
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="checkbox">
                                      Subscribe to get updates on upcoming guest
                                      speakers, workshops and more!
                                    </label>
                                  </div>

                                  <div className="checkbox">
                                    <input
                                      type="checkbox"
                                      id="mediaquest"
                                      name="mediaquest"
                                      value={this.state.ufields.mediaquest}
                                      onChange={(e) => {
                                        this.handleChange({
                                          target: {
                                            name: e.target.name,
                                            value: e.target.checked,
                                          },
                                        });
                                      }}
                                    />

                                    <label for="mediaquest">
                                      Subscribe to receive updates from
                                      Mediaquest partners
                                    </label>
                                  </div>

                                  {/* <input type="submit" className="btn" value="Register & Get your Ticket" /> */}
                                  <div className="errorMsg">
                                    {this.state.uformerror}
                                  </div>
                                  <button type="submit" className="btn">
                                    <span>Register & Get your Ticket</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass10 ? (
            <div className="details_popup  payment_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup10.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container attend_form_section">
                    <div className="row">
                      <div className="column col-7">
                        <div className="theme_selection_block">
                          <div id="payment_form" className="contact_from">
                            <div className="container">
                              <div className="row">
                                <div className="column col-12">
                                  <h3>Payment</h3>
                                </div>
                                <div className="column col-12">
                                  <div
                                    id="payment_fields"
                                    style={{ height: "200px" }}
                                  />
                                </div>
                                <div className="column col-12">
                                  <button
                                    type="submit"
                                    disabled={submitDisabled}
                                    className="btn checkoutButton"
                                    onClick={this.createSession.bind(this)}
                                    ref={(button) => (this.button = button)}
                                  >
                                    <span>Pay Now</span>
                                  </button>
                                  <div
                                    className="errorMsg submit_err"
                                    style={divStyle}
                                  >
                                    {submitDisabledText}
                                  </div>
                                </div>

                                <div id="3ds_iframe" />

                                <div className="column col-12">
                                  <p>We accept</p>
                                  <ul>
                                    <li>
                                      <img src={payimg_img1} />
                                    </li>
                                    <li>
                                      <img src={payimg_img2} />
                                    </li>
                                    <li>
                                      <img src={payimg_img3} />
                                    </li>
                                    <li>
                                      <img src={payimg_img4} />
                                    </li>
                                  </ul>
                                </div>
                                <div className="column col-12">
                                  <div className="errorMsg payment_warning">
                                    Please note that payment will be processed in
                                    AED. 1 USD = {USDToAED} AED
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="column col-5">
                        <div className="order_content">
                          <h5>Order Summary</h5>
                          <h6>{PackageName}</h6>
                          <p>
                            Quantity x <span>1</span>
                          </p>
                          <div className="total">
                            <div className="total_text">Total</div>
                            <div className="total_price">{PackagePrice}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ): null}

          {this.state.addClass11 ? (
            <div className="details_popup thank_you_popup attend_details_popup ">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup11.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container attend_form_section">
                    <div className="row">
                      <div className="column col-12">
                        {this.state.ThankyouPost.length > 0
                          ? this.state.ThankyouPost.map((item, index) => {
                            return (
                              <div className="theme_selection_block">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                                <div className="thankyou_txt">
                                  <h3>
                                    Thank you for registering! you will
                                    receive your ticket by mail soon
                                  </h3>
                                </div>
                                <a href={item.ButtonLink} className="btn">
                                  <span>{item.ButtonText}</span>
                                </a>
                              </div>
                            );
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {this.state.addClass12 ? (
            <div className="details_popup thank_you_popup attend_details_popup error_popup">
              <div className="all_popup">
                <div className="details_popup_content container">
                  <button
                    onClick={this.togglePopup12.bind(this)}
                    className="details_popup_close"
                  >
                    <img src={search_close} />
                  </button>

                  <div className="container attend_form_section">
                    <div className="row">
                      <div className="column col-12">
                        {this.state.ErrorPost.length > 0
                          ? this.state.ErrorPost.map((item, index) => {
                            return (
                              <div className="theme_selection_block">
                                <img src={GLOBAL.SITE_URL + item.Image.url} />
                                <div
                                  className="thankyou_txt"
                                  dangerouslySetInnerHTML={{
                                    __html: item.Contant,
                                  }}
                                ></div>
                                <a href={item.ButtonLink} className="btn">
                                  <span>{item.ButtonText}</span>
                                </a>
                              </div>
                            );
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Home;
