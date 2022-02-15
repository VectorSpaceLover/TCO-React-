import React, { Component } from "react";
import TimeRangeSlider from "react-time-range-slider";

import "../App.css";

import { Helmet } from "react-helmet";

import pin from "../images/pin.png";
import search_close from "../images/close.svg";

import user from "../images/user.png";

import sponsor_img1 from "../images/sponsor_img1.png";

import GLOBAL from "../Global";

const axios = require("axios");

const MODAL_OPEN_CLASS = "body--popup--open";

class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seo: [],
      siteurl: "",

      addClass: false,

      detailindex: "",

      ByThemeSHow: false,

      TimeValue: {
        start: "08:00 am",
        end: "11:59 pm",
      },

      visibleHighlightPost: 12,

      HighlightPost: [],
      HighlightPostSelected: [],
      HighlightPostFilter: [],
      ActiveTheme: 0,

      ByThemeSelected: "All",

      AgendaPost: [],
      AgendaAct: [],
      AgendaTheme: [],
      AgendaActFilter: [],
      ActiveActivity: 0,
      ByActivitySelected: "All",

      ByTimeSelected: "All",

      Videotitle: "",

      Videosubtitle: "",

      Videoiframelink: "",

      Videobuttontext: "",

      Videobuttonlink: "",

      ByActivitySHow: false,

      RangeSHow: false,

      TimeSet: "",
    };
  }

  state = { didMount: false };
  componentDidMount() {
    document.title = "Agenda";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup() {
    this.setState({ addClass: !this.state.addClass });
  }

  toggletheme() {
    this.setState({
      ByThemeSHow: !this.state.ByThemeSHow,
      RangeSHow: false,
      ByActivitySHow: false,
    });
  }

  toggleactivity() {
    this.setState({
      ByActivitySHow: !this.state.ByActivitySHow,
      RangeSHow: false,
      ByThemeSHow: false,
    });
  }

  togglerange() {
    this.setState({
      RangeSHow: !this.state.RangeSHow,
      ByThemeSHow: false,
      ByActivitySHow: false,
    });
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

    // agenda-page

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/agenda-pages",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var AgendaPost = [];

        Data.map((item, index) => {
          AgendaPost.push(item);
        });

        this.setState({ AgendaPost: AgendaPost });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error qsdq");
      });

    // Highlights

    fetch(GLOBAL.SITE_URL + "/highlights-posts")
      .then((res) => res.json())
      .then((response) => {
        var Data = response;

        // this.AgendaPostData(response);

        var HighlightPost = [];
        var HighlightPostFilter = [];
        var TempHighlightPostFilter = [];

        Data.map((item, index) => {
          HighlightPost.push(item);

          HighlightPost[index].AgendaThemeData = [];
          if (item.agenda_themes.length > 0) {
            item.agenda_themes.map((itm, inx) => {
              HighlightPost[index].AgendaThemeData.push(itm.Name);
            });
          }
          HighlightPost[index].ActivityIn = [];
          if (item.agenda_acts.length > 0)
            item.agenda_acts.map((itm, inx) => {
              HighlightPost[index].ActivityIn.push(itm.Name);
            });

          HighlightPost[index].index = index;
          if (HighlightPostFilter.length > 0) {
            if (HighlightPostFilter.includes(item.Title)) {
            } else {
              HighlightPostFilter.push(item.Title);
              TempHighlightPostFilter.push(item);
            }
          } else {
            HighlightPostFilter.push(item.Title);
            TempHighlightPostFilter.push(item);
          }
        });

        this.setState({
          HighlightPost: HighlightPost,
          HighlightPostFilter: TempHighlightPostFilter,
          HighlightPostSelected: HighlightPost,
        });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/agenda-acts",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var AgendaAct = [];
        var AgendaActFilter = [];
        var TempAgendaActFilter = [];

        Data.map((item, index) => {
          AgendaAct.push(item);
          AgendaAct[index].index = index;

          if (AgendaActFilter.length > 0) {
            if (AgendaActFilter.includes(item.Name)) {
            } else {
              AgendaActFilter.push(item.Name);
              TempAgendaActFilter.push(item);
            }
          } else {
            AgendaActFilter.push(item.Name);
            TempAgendaActFilter.push(item);
          }
        });

        this.setState({
          AgendaAct: AgendaAct,
          AgendaActFilter: TempAgendaActFilter,
        });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/agenda-themes",

      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;

        var AgendaTheme = [];

        Data.map((item, index) => {
          AgendaTheme.push(item);
        });
        this.setState({ AgendaTheme: AgendaTheme });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // Video

    axios({
      method: "get",

      url: GLOBAL.SITE_URL + "/video-sections",

      responseType: "json",
    })
      .then((response) => {
        if (response.status) {
          var Data = response.data;

          Data.map((item, index) => {
            this.setState({ Videotitle: item.Title });

            this.setState({ Videosubtitle: item.SubTitle });

            this.setState({ Videoiframelink: item.IframeLink });

            this.setState({ Videobuttontext: item.ButtonText });

            this.setState({ Videobuttonlink: item.ButtonLink });
          });
        }
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }

  loadMore = () => {
    this.setState((prev) => {
      return { visibleHighlightPost: prev.visibleHighlightPost + 4 };
    });
  };
  convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return { hrs: parseInt(hours), min: parseInt(minutes) };
  };
  stripHtml(html) {
    // Create a new div element

    var temporalDivElement = document.createElement("div");

    // Set the HTML content with the providen

    temporalDivElement.innerHTML = html;

    // Retrieve the text property of the element (cross-browser support)

    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  }

  HighlightsPostRender = (item, index) => {
    return (
      <div className="column col-4">
        <div
          className="nominees_content"
          onClick={() => {
            this.setState({ detailindex: index, addClass: true });
          }}
          id={index}
        >
          <small className="date">
            {item.StartTime.toLowerCase()} {item.StartTime != "" ? "to" : null}{" "}
            {item.EndTime.toLowerCase()}
          </small>

          <h5>{item.Title}</h5>

          <span className="address_text">
            <img src={pin} />
            <small>{item.Addresstext}</small>
          </span>

          <img src={GLOBAL.SITE_URL + item.Image.url} />

          <div className="high_truncate_text">
            {this.stripHtml(item.Content)}
          </div>
        </div>
      </div>
    );
  };

  OnHandlerDropDown = () => {
    var Index = 0;

    var StartTime = this.convertTime12to24(this.state.TimeValue.start);
    var EndTime = this.convertTime12to24(this.state.TimeValue.end);

    var Time =
      this.state.TimeValue.start.toLowerCase() +
      " to " +
      this.state.TimeValue.end.toLowerCase();
    var HighlightPostSelected = [];
    var HighlightPost = this.state.HighlightPost;

    if (
      this.state.ByThemeSelected == "All" &&
      this.state.ByActivitySelected == "All" &&
      this.state.ByTimeSelected == "All"
    ) {
      HighlightPostSelected = HighlightPost;
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected == "All" &&
      this.state.ByTimeSelected == "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          //Index = Index + 1;
          HighlightPostSelected.push(item);
          //  HighlightPostSelected[index].index = Index;
        }
      });
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected != "All" &&
      this.state.ByTimeSelected == "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          if (item.ActivityIn.includes(this.state.ByActivitySelected))
            HighlightPostSelected.push(item);
        }
      });
    } else if (
      this.state.ByThemeSelected == "All" &&
      this.state.ByActivitySelected != "All" &&
      this.state.ByTimeSelected == "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.ActivityIn.includes(this.state.ByActivitySelected))
          HighlightPostSelected.push(item);
      });
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected == "All" &&
      this.state.ByTimeSelected != "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          if (item.StartTime != null) {
            var DataStart = this.convertTime12to24(item.StartTime);
            var DataEnd = this.convertTime12to24(item.EndTime);
            if (StartTime.hrs <= DataStart.hrs && EndTime.hrs >= DataEnd.hrs) {
              HighlightPostSelected.push(item);
            }
          }
        }
      });
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected != "All" &&
      this.state.ByTimeSelected == "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          if (item.ActivityIn.includes(this.state.ByActivitySelected)) {
            HighlightPostSelected.push(item);
          }
        }
      });
    } else if (
      this.state.ByThemeSelected == "All" &&
      this.state.ByActivitySelected != "All" &&
      this.state.ByTimeSelected != "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.ActivityIn.includes(this.state.ByActivitySelected)) {
          if (item.StartTime != null) {
            var DataStart = this.convertTime12to24(item.StartTime);
            var DataEnd = this.convertTime12to24(item.EndTime);
            if (StartTime.hrs <= DataStart.hrs && EndTime.hrs >= DataEnd.hrs) {
              HighlightPostSelected.push(item);
            }
          }
        }
      });
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected == "All" &&
      this.state.ByTimeSelected != "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          if (item.StartTime != null) {
            var DataStart = this.convertTime12to24(item.StartTime);
            var DataEnd = this.convertTime12to24(item.EndTime);
            if (StartTime.hrs <= DataStart.hrs && EndTime.hrs >= DataEnd.hrs) {
              HighlightPostSelected.push(item);
            }
          }
        }
      });
    } else if (
      this.state.ByThemeSelected == "All" &&
      this.state.ByActivitySelected == "All" &&
      this.state.ByTimeSelected != "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.StartTime != null) {
          var DataStart = this.convertTime12to24(item.StartTime);
          var DataEnd = this.convertTime12to24(item.EndTime);
          if (StartTime.hrs <= DataStart.hrs && EndTime.hrs >= DataEnd.hrs) {
            HighlightPostSelected.push(item);
          }
        }
      });
    } else if (
      this.state.ByThemeSelected != "All" &&
      this.state.ByActivitySelected != "All" &&
      this.state.ByTimeSelected != "All"
    ) {
      HighlightPost.map((item, index) => {
        if (item.AgendaThemeData.includes(this.state.ByThemeSelected)) {
          if (item.ActivityIn.includes(this.state.ByActivitySelected)) {
            if (item.StartTime != null) {
              var DataStart = this.convertTime12to24(item.StartTime);
              var DataEnd = this.convertTime12to24(item.EndTime);
              if (
                StartTime.hrs <= DataStart.hrs &&
                EndTime.hrs >= DataEnd.hrs
              ) {
                HighlightPostSelected.push(item);
              }
            }
          }
        }
      });
    }

    this.setState({ HighlightPostSelected: HighlightPostSelected });
  };

  changeStartHandler = (time) => {
    console.log("Start Handler Called", time);
  };

  timeChangeHandler = (time) => {
    this.setState({
      TimeValue: time,
      RangeSHow: false,
    });
  };

  changeCompleteHandler = (time) => {
    this.setState({ TimeSet: time, ByTimeSelected: "SelectTime" });

    this.OnHandlerDropDown();
  };

  render() {
    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if ((document.title = "Agenda")) {
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
              if (item.Selectpage == "Agenda") {
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
                      content={siteurl + "/Agenda-CEO-2020-Bahrain-GCC"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.AgendaPost.length > 0
            ? this.state.AgendaPost.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section speaker_banner_section agenda_banner_section">
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

          <section className="theme_selection_section event_main_section  agenda_main_section ">
            <div className="theme_selection_bg">
              <div className="container">
                {this.state.AgendaPost.length > 0
                  ? this.state.AgendaPost.map((item, index) => {
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

                <div className="row filter_row">
                  <div className=" column col-4">
                    <p className="show_text">
                      Showing{" "}
                      <strong>{this.state.HighlightPostSelected.length}</strong>{" "}
                      results
                    </p>
                  </div>

                  <div className=" column col-8">
                    <div className="filter_drodown">
                      <a
                        className="btn"
                        onClick={() => {
                          this.state.ByThemeSelected = "All";
                          this.state.ActiveTheme = "All";
                          this.state.ByActivitySelected = "All";
                          this.state.ActiveActivity = "All";
                          this.state.ByTimeSelected = "All";
                          this.state.ByThemeSHow = false;
                          this.state.ByActivitySHow = false;
                          this.state.RangeSHow = false;
                          this.OnHandlerDropDown();
                        }}
                      >
                        <span>All</span>
                      </a>

                      <a
                        className="border_btn"
                        onClick={this.toggletheme.bind(this)}
                      >
                        <span>By Theme</span>
                      </a>

                      {this.state.ByThemeSHow ? (
                        <ul id="ThemeSelect" className="select_menu ByTheme">
                          <div className="item_select">
                            <span>
                              {this.state.ByThemeSelected == "All" ? 0 : 1} item
                              selected
                            </span>
                            <strong>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.state.ByThemeSelected = "All";
                                  this.state.ByThemeSHow = false;
                                  this.state.ActiveTheme = "All";

                                  this.OnHandlerDropDown();
                                }}
                              >
                                Clear
                              </a>
                            </strong>
                          </div>

                          {/*  {this.state.HighlightPostFilter.map((item, index) => {
                          return (
                            <li
                              class={
                                item.id == this.state.ActiveTheme
                                  ? "active"
                                  : ""
                              }
                              onClick={() => {
                                this.state.ByThemeSelected = item.Name;
                                this.state.ActiveTheme = item.id;
                                this.OnHandlerDropDown();
                              }}
                            >
                              {item.Title}
                            </li>
                          );
                        })}
*/}

                          {this.state.AgendaTheme.map((item, index) => {
                            return (
                              <li
                                value={item.id}
                                class={
                                  item.id == this.state.ActiveTheme
                                    ? "active"
                                    : ""
                                }
                                onClick={() => {
                                  this.state.ByThemeSHow = false;
                                  this.state.ByThemeSelected = item.Name;
                                  this.state.ActiveTheme = item.id;
                                  this.OnHandlerDropDown();
                                  this.setState({ ByThemeSHow: false });
                                }}
                              >
                                {item.Name}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      <a
                        className="border_btn"
                        onClick={this.toggleactivity.bind(this)}
                      >
                        <span>By Activity</span>
                      </a>

                      {this.state.ByActivitySHow ? (
                        <ul id="ThemeSelect" className="select_menu activity">
                          <div className="item_select">
                            <span>
                              {this.state.ByActivitySelected == "All" ? 0 : 1}{" "}
                              item selected
                            </span>
                            <strong>
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  this.state.ByActivitySelected = "All";
                                  this.state.ByActivitySHow = false;
                                  this.state.ActiveActivity = "All";
                                  this.OnHandlerDropDown();
                                }}
                              >
                                Clear
                              </a>
                            </strong>
                          </div>

                          {this.state.AgendaActFilter.map((item, index) => {
                            return (
                              <li
                                value={item.id}
                                class={
                                  item.id == this.state.ActiveActivity
                                    ? "active"
                                    : ""
                                }
                                onClick={() => {
                                  this.setState({ ByActivitySHow: false });

                                  this.state.ActiveActivity = item.id;
                                  this.OnHandlerDropDown();
                                }}
                              >
                                {item.Name}
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}

                      <a
                        className="border_btn"
                        onClick={this.togglerange.bind(this)}
                      >
                        <span>By Time</span>
                      </a>
                      {this.state.RangeSHow ? (
                        <ul className="select_menu range_menu">
                          <p>
                            {this.state.TimeValue.start} to{" "}
                            {this.state.TimeValue.end}
                          </p>
                          <a
                            href="javascript:void(0);"
                            onClick={() => {
                              this.state.TimeValue = {
                                start: "08:00 am",
                                end: "11:59 pm",
                              };
                              this.state.ByTimeSelected = "All";
                              this.OnHandlerDropDown();
                            }}
                          >
                            Clear
                          </a>
                          <TimeRangeSlider
                            disabled={false}
                            format={12}
                            maxValue={"11:59 pm"}
                            minValue={"08:00 am"}
                            name={"time_range"}
                            onChangeStart={this.changeStartHandler}
                            onChangeComplete={this.changeCompleteHandler}
                            onChange={this.timeChangeHandler}
                            step={15}
                            value={this.state.TimeValue}
                          />
                          <p>
                            <span className="left_time">8h00 am</span>
                            <span className="right_time">12h00 pm</span>
                          </p>
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="event_ceo_content">
                  <div className="row">
                    {this.state.HighlightPostSelected.length > 0 ? (
                      this.state.HighlightPostSelected.slice(
                        0,
                        this.state.visibleHighlightPost
                      ).map((item, index) => {
                        return this.HighlightsPostRender(item, index);
                      })
                    ) : (
                      <p>Not Found</p>
                    )}
                  </div>
                </div>

                {this.state.addClass ? (
                  <div
                    className="details_popup agenda_detail_popup"
                    id={this.state.detailindex}
                  >
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

                        <div className="container">
                          <div className="row">
                            <div className="column col-6">
                              <div className="detail_popup_img">
                                <img
                                  src={
                                    GLOBAL.SITE_URL +
                                    this.state.HighlightPostSelected[
                                      this.state.detailindex
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
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
                                        ].UserImage.url
                                    }
                                  />

                                  <span>
                                    <small>Speaker:</small>
                                    {
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
                                        ].UserName
                                    }
                                  </span>

                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].RightLogoLink == null ? null : (
                                    <a
                                      href={
                                        this.state.HighlightPostSelected[
                                          this.state.detailindex
                                          ].RightLogoLink
                                      }
                                      target="_blank"
                                    >
                                      <img
                                        src={
                                          GLOBAL.SITE_URL +
                                          this.state.HighlightPostSelected[
                                            this.state.detailindex
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
                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].StartTime.toLowerCase()}
                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].StartTime != ""
                                    ? " to "
                                    : null}
                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].EndTime.toLowerCase()}
                                </small>

                                <h3>
                                  {
                                    this.state.HighlightPostSelected[
                                      this.state.detailindex
                                      ].Title
                                  }
                                </h3>

                                <span className="address_text">
                                  <img src={pin} />

                                  <small>
                                    {
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
                                        ].Addresstext
                                    }
                                  </small>
                                </span>

                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                    this.state.HighlightPostSelected[
                                      this.state.detailindex
                                      ].Content,
                                  }}
                                />

                                {}

                                <ul>
                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].agenda_themes.length > 0
                                    ? this.state.HighlightPostSelected[
                                      this.state.detailindex
                                      ].agenda_themes.map((aitem, aindex) => {
                                      return <li>{aitem.Name}</li>;
                                    })
                                    : null}
                                  {this.state.HighlightPostSelected[
                                    this.state.detailindex
                                    ].agenda_acts.length > 0
                                    ? this.state.HighlightPostSelected[
                                      this.state.detailindex
                                      ].agenda_acts.map((avitem, avindex) => {
                                      return <li>{avitem.Name}</li>;
                                    })
                                    : null}
                                </ul>

                                <div className="line_div">
                                  <a
                                    href={
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
                                        ].ButtonLink1
                                    }
                                    className="btn"
                                  >
                                    <span>
                                      {
                                        this.state.HighlightPostSelected[
                                          this.state.detailindex
                                          ].ButtonText1
                                      }
                                    </span>
                                  </a>

                                  <a
                                    href={
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
                                        ].ButtonLink2
                                    }
                                    className="border-bottom_link"
                                  >
                                    {
                                      this.state.HighlightPostSelected[
                                        this.state.detailindex
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

                <div className="column col-12">
                  {this.state.visibleHighlightPost <
                  this.state.HighlightPostSelected.length && (
                    <a className="border-bottom_link" onClick={this.loadMore}>
                      Load more
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="speakers_past_section agenda_past_section">
            <div className="container">
              <h2>
                <span>{this.state.Videosubtitle}</span>
                {this.state.Videotitle}
              </h2>

              <iframe
                width="1280"
                height="600"
                src={this.state.Videoiframelink}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />

              <a
                href={this.state.Videobuttonlink}
                className="border-bottom_link"
              >
                {this.state.Videobuttontext}
              </a>
            </div>
          </section>

          <section className="theme_ticket_section">
            <div className="container">
              <div className="theme_ticket_content">
                {this.state.AgendaPost.length > 0
                  ? this.state.AgendaPost.map((item, index) => {
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

export default Agenda;
