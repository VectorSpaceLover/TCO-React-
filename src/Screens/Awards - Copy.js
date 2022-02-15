import React, { Component } from "react";
import "../App.css";
import { Helmet } from "react-helmet";
import search_close from "../images/close.svg";
import sponsor_img1 from "../images/sponsor_img1.png";
import fb from "../images/fb.svg";

import GLOBAL from "../Global";

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

import Papa from 'papaparse';

const axios = require("axios");
var SelectValueIndex = "";
const MODAL_OPEN_CLASS = "body--popup--open";
const MODAL_OPEN_CLASS1 = "body--popup--open1";

// const headName = ['Ranking', 'Company Name', 'Name'];

// const dataList = [
//   { ranking: 1, company: 'a', name: 'a@name.com'},
//   { ranking: 2, company: 'b', name: 'b@name.com'},
//   { ranking: 3, company: 'c', name: 'c@email.com'}
// ];

class Awards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seo: [],
      siteurl: "",

      addClass: false,
      detailindex: "",
      visibleAwardPost: 8,
      AwardContent: [],
      AwardPost: [],
      AwardPostSelected: [],
      AwardCategories: [],
      AwardYears: [],
      FooterSocialicons: [],
      TempArray: [],
      SponsorPost: [],
      sdetailindex: "",
      saddClass: false,

      value: "All",
      years: "All",

      csvArray:{},
    };
    this.loadMore = this.loadMore.bind(this);
  }

  fetchCsv = (url) => {
    return fetch(url).then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }

  async getCsvData(url) {
    let csvData = await this.fetchCsv(url);
    let results = Papa.parse(csvData, { header: true })
    this.setState({csvArray: results});
    console.log(results);

  }

  componentWillMount() {
    // awards-past winners
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/past-winners",
      responseType: "json",
      })
      
      .then((response) => {
      var Data = response.data;
      var AwardYears = [];
      Data.map((item, index) => {
        AwardYears.push(item);
      });

      this.setState({ AwardYears: AwardYears });
      })

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
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });

    // awards-page
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/awards-pages",
      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        var AwardContent = [];
        Data.map((item, index) => {
          AwardContent.push(item);
        });
        this.setState({ AwardContent: AwardContent });
      })

      .catch((err) => {
        console.log(err);
        console.log("Error");
      });

    // Awardpost
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/awards-posts",
      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        var AwardPost = [];
        var Temp = [];
        Data.map((item, index) => {
          AwardPost.push(item);
          AwardPost[index].AwardCategoryTitle = [];
          item.award_categories.map((itm, inx) => {
            AwardPost[index].AwardCategoryTitle.push(itm.name);
          });
        });

        // console.log(AwardPost);
        this.setState({ AwardPost: AwardPost, AwardPostSelected: AwardPost });
      })

      .catch((err) => {
        console.log(err);
        console.log("Error");
      });

    // /award-categories

    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/award-categories",
      responseType: "json",
    })
      .then((response) => {
        var Data = response.data;
        var AwardCategories = [];
        Data.map((item, index) => {
          AwardCategories.push(item);
          AwardCategories[index].awards_posts = item.awards_posts.length;
        });

        this.setState({ AwardCategories: AwardCategories });
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

  loadMore() {
    this.setState((prev) => {
      return { visibleAwardPost: prev.visibleAwardPost + 4 };
    });
  }
  state = { didMount: false };
  componentDidMount() {
    document.title = "Awards - Top CEO";
    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup() {
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

  // processCSV = (str, delim=',') => {
  //   const headers = str.slice(0,str.indexOf('\n')).split(delim);
  //   const rows = str.slice(str.indexOf('\n')+1).split('\n');

  //   const newArray = rows.map( row => {
  //       const values = row.split(delim);
  //       const eachObject = headers.reduce((obj, header, i) => {
  //           obj[header] = values[i];
  //           return obj;
  //       }, {})
  //       return eachObject;
  //   })

  //   console.log(newArray);

  //   // setCsvArray(newArray)
  // }

  handleYear = (event) =>{
    let selectedIndex = -1;
    if(event.target.value === 'All'){
      return;
    }
    
    this.setState({
      years: event.target.value,
    });

    this.state.AwardYears.map((itm, index) => {
      if (itm.Year == event.target.value) {
        selectedIndex = index;
      }
    });

    this.getCsvData(GLOBAL.SITE_URL + this.state.AwardYears[selectedIndex].CSVFile.url);

    // const reader = new FileReader();
    // reader.onload = function(e) {
    //   const text = e.target.result;
    //   console.log(text);
    //   this.processCSV(text)
    // }
    // console.log(GLOBAL.SITE_URL + this.state.AwardYears[selectedIndex].CSVFile.url);

    // reader.readAsText(GLOBAL.SITE_URL + this.state.AwardYears[selectedIndex].CSVFile.url);

  }

  handleChange = (event) => {
    SelectValueIndex = "";
    this.state.AwardCategories.map((itm, index) => {
      if (itm.name == event.target.value) {
        SelectValueIndex = index;
      }
    });

    console.log(event.target.value);
    console.log(event.target.value != "All");
    var Temp = this.state.AwardPost;
    if (event.target.value != "All") {
      Temp = [];
      this.state.AwardPost.map((item, index) => {
        if (item.AwardCategoryTitle.includes(event.target.value)) {
          Temp.push(item);
        }
      });
    }

    console.log("TEMP");
    console.log(Temp);
    this.setState({ AwardPostSelected: Temp });
    this.setState({
      value: event.target.value,
      AwardPost: this.state.AwardPost,
    });

    if (this.state.AwardPost.length > 8) {
      this.setState({ visibleAwardPost: 8 });
    } else {
      this.setState({ visibleAwardPost: this.state.AwardPost.length });
      console.log("false");
    }
  };

  render() {
    const { options, value, years } = this.state;

    if (this.state.addClass) {
      document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    }

    if (this.state.saddClass) {
      document.body.classList.add(MODAL_OPEN_CLASS1);
    } else {
      document.body.classList.remove(MODAL_OPEN_CLASS1);
    }

    if ((document.title = "Awards - Top CEO")) {
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
              if (item.Selectpage == "Awards") {
                return (
                  <Helmet key = {index}>
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
                      content={siteurl + "/Awards-CEO-GCC-2019-Winners"}
                    />
                  </Helmet>
                );
              }
            })
            : null}

          {this.state.AwardContent.length > 0
            ? this.state.AwardContent.map((item, index) => {
              if (item.SelectSection == "Section1") {
                return (
                  <section className="theme_banner_section award_banner_section" key = {index}>
                    <img src={GLOBAL.SITE_URL + item.Image.url} />

                    <div className="theme_banner_content">
                      <div className="container">
                        <h1>{item.Title}</h1>

                        <p>{item.SubTitle}</p>

                        <a target="_blank" href={item.ButtonLink} className="btn">
                          <span>{item.ButtonText}</span>
                        </a>
                      </div>
                    </div>
                  </section>
                );
              }
            })
            : null}

          
          

          <section className="theme_selection_section award_main_section">
            <div className="theme_selection_bg">
              <div id="award1" className="award_achievement_section">
                <div className="container">
                  <div className="row">
                    {this.state.AwardContent.length > 0
                      ? this.state.AwardContent.map((item, index) => {
                        if (item.SelectSection == "Section2") {
                          return (
                            <div className="column col-12" key = {index}>
                              <h2>
                                <span>{item.SubTitle}</span>
                                {item.Title}
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

                    <div className="column col-8 col-1">
                      <div className="row">
                        {this.state.AwardContent.length > 0
                          ? this.state.AwardContent.map((item, index) => {
                            if (item.SelectSection == "Section3") {
                              return (
                                <div className="column col-4" key = {index}>
                                  <div className="best_award_img">
                                    <img
                                      src={GLOBAL.SITE_URL + item.Image.url}
                                    />
                                  </div>

                                  <h5>{item.Title}</h5>
                                </div>
                              );
                            }
                          })
                          : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="award2" className="award_nominees_section nominee_cur">
                <div className="container">
                  {this.state.AwardContent.length > 0
                    ? this.state.AwardContent.map((item, index) => {
                      if (item.SelectSection == "Section4") {
                        return (
                          <div  key = {index}>
                            <h2>{item.Title}</h2>

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

                  <select
                    className="nominees_select"
                    onChange={this.handleChange}
                    value={value}
                  >
                    <option value="All" key="All">
                      Select a Category
                    </option>

                    {this.state.AwardCategories.map((item, key) => (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <div className="row">
                    {this.state.AwardPostSelected.slice(
                      0,
                      this.state.visibleAwardPost
                    ).map((item, index) => {
                      if (
                        item.AwardCategoryTitle.includes(value) ||
                        this.state.value == "All"
                      ) {
                        return (
                          <div className="column col-4" key = {index}>
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

                              <p>{item.Subtitle}</p>

                              {item.award_categories.map((itm, inx) => (
                                <small key = {inx}>{itm.name}</small>
                              ))}
                            </div>
                          </div>
                        );
                      }
                    })}
                    {this.state.addClass ? (
                      <div
                        className="details_popup speaker_details_popup award_details_popup"
                        id={this.state.detailindex}
                      >
                        <div className="all_popup">
                          <div className="details_popup_content container">
                            <button
                              onClick={() => {
                                this.setState({
                                  detailindex: "",
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
                                        this.state.AwardPostSelected[
                                          this.state.detailindex
                                          ].Image.url
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="column col-6">
                                  <div className="theme_selection_block">
                                    <a
                                      href={
                                        this.state.AwardPostSelected[
                                          this.state.detailindex
                                          ].WebsiteLink
                                      }
                                      target="_blank"
                                    >
                                      <img
                                        src={
                                          GLOBAL.SITE_URL +
                                          this.state.AwardPostSelected[
                                            this.state.detailindex
                                            ].Logo.url
                                        }
                                        className="right_img"
                                        width="76px"
                                        height="25px"
                                      />
                                    </a>

                                    <h3>
                                      {
                                        this.state.AwardPostSelected[
                                          this.state.detailindex
                                          ].Title
                                      }
                                    </h3>

                                    <small>
                                      {
                                        this.state.AwardPostSelected[
                                          this.state.detailindex
                                          ].Subtitle
                                      }
                                    </small>

                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html:
                                        this.state.AwardPostSelected[
                                          this.state.detailindex
                                          ].Content,
                                      }}
                                    ></div>

                                    <ul className="social_icons">
                                      {this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].FackbookLink == null ||
                                      this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].FackbookLink == "" ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.AwardPostSelected[
                                                this.state.detailindex
                                                ].FacebookLink
                                            }
                                            target="_blank"
                                          >
                                            <img
                                              src="facebook.svg"
                                              height="20px"
                                              width="24px"
                                              className="fb_icon"
                                            />
                                          </a>
                                        </li>
                                      )}

                                      {this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].TwitterLink == null ||
                                      this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].TwitterLink == "" ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.AwardPostSelected[
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

                                      {this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].LinkedinLink == null ||
                                      this.state.AwardPostSelected[
                                        this.state.detailindex
                                        ].LinkedinLink == "" ? null : (
                                        <li>
                                          <a
                                            href={
                                              this.state.AwardPostSelected[
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

                    <div className="column col-12">
                      {this.state.visibleAwardPost <
                      this.state.AwardPostSelected.length && (
                        <a
                          className="border-bottom_link loadMore"
                          onClick={this.loadMore}
                        >
                          Load more
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {years.length > 0?
                <div id="pastwinner" className="award_nominees_section nominee_cur">
                  <div className="container">
                    <h2>Past Winner</h2>
                    <select
                      className="nominees_select"
                      onChange={this.handleYear}
                      value={years}
                    >
                      <option value="All" key="All">
                        Select a Year
                      </option>

                      {this.state.AwardYears.map((item, key) => (
                        <option value={item.Year} key={key}>
                          {item.Year}
                        </option>
                      ))}
                    </select>
                    {Object.keys(this.state.csvArray).length > 0?
                      <Table data={this.state.csvArray.data} height = {500}>
                        {this.state.csvArray?.meta?.fields.map((val, index) => {
                          return (
                            <Column width={(index === 0)?200:600} key = {index} sortable fixed resizable>
                              <HeaderCell>{val}</HeaderCell>
                              <Cell dataKey={val} />
                            </Column>
                          )
                        })}
                      </Table>:null
                    }
                    
                  </div>
                </div>:null
              }
              


              <div id="award3" className="award_knowledge_section">
                <div className="container">
                  {this.state.AwardContent.length > 0
                    ? this.state.AwardContent.map((item, index) => {
                      if (item.SelectSection == "Section5") {
                        return (
                          <div key = {index}>
                            <h2>{item.Title}</h2>

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

                  <div className="row">
                    {this.state.SponsorPost.length > 0
                      ? this.state.SponsorPost.map((item, index) => {
                        if (item.Selectoptions == "Knowledgepartners") {
                          return (
                            <div className="column col-4" key = {index}>
                              <div
                                className="knowledge_img"
                                onClick={() => {
                                  this.setState({
                                    sdetailindex: index,
                                    saddClass: true,
                                  });
                                }}
                                id={index}
                              >
                                <img
                                  src={
                                    GLOBAL.SITE_URL + item.SmallLogoImage.url
                                  }
                                />
                              </div>

                              <p>{item.Title}</p>
                            </div>
                          );
                        }
                      })
                      : null}
                  </div>
                </div>
              </div>

              <div
                id="award4"
                className="speakers_past_section award_ceremony_section"
              >
                {this.state.AwardContent.length > 0
                  ? this.state.AwardContent.map((item, index) => {
                    if (item.SelectSection == "Section7") {
                      return (
                        <div className="container" key = {index}>
                          <h2>
                            <span>{item.SubTitle}</span>
                            {item.Title}
                          </h2>

                          <iframe
                            width="1280"
                            height="600"
                            src={this.stripHtml(item.Content)}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          ></iframe>

                          <a
                            href={item.ButtonLink}
                            className="border-bottom_link"
                          >
                            {item.ButtonText}
                          </a>
                        </div>
                      );
                    }
                  })
                  : null}
              </div>
            </div>
          </section>
          <section className="theme_ticket_section">
            <div className="container">
              <div className="theme_ticket_content">
                {this.state.AwardContent.length > 0
                  ? this.state.AwardContent.map((item, index) => {
                    if (item.SelectSection == "Section8") {
                      return (
                        <div className="row" key = {index}>
                          <div className="column col-8">
                            <h3>{item.Title}</h3>

                            <p>{item.SubTitle}</p>
                          </div>

                          <div className="column col-4">
                            <a target="_blank" href={item.ButtonLink} className="btn">
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

            {this.state.saddClass ? (
              <div
                className="details_popup speaker_details_popup business_details_popup"
                id={this.state.sdetailindex}
              >
                <div className="all_popup">
                  <div className="details_popup_content container">
                    <button
                      onClick={() => {
                        this.setState({ sdetailindex: "", saddClass: false });
                      }}
                      className="details_popup_close"
                    >
                      <img src={search_close} />
                    </button>

                    <div className="container">
                      <div className="row">
                        <div className="column col-6">
                          <div className="detail_popup_img">
                            {this.state.SponsorPost[this.state.sdetailindex]
                              .BigLogoImage == null ? (
                              <img
                                src={
                                  GLOBAL.SITE_URL +
                                  this.state.SponsorPost[
                                    this.state.sdetailindex
                                    ].SmallLogoImage.url
                                }
                              />
                            ) : (
                              <img
                                src={
                                  GLOBAL.SITE_URL +
                                  this.state.SponsorPost[
                                    this.state.sdetailindex
                                    ].BigLogoImage.url
                                }
                              />
                            )}
                          </div>
                        </div>

                        <div className="column col-6">
                          <div className="theme_selection_block">
                            <h3>
                              {
                                this.state.SponsorPost[this.state.sdetailindex]
                                  .Title
                              }
                            </h3>

                            <small>
                              {
                                this.state.SponsorPost[this.state.sdetailindex]
                                  .SubTitle
                              }
                            </small>

                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                this.state.SponsorPost[
                                  this.state.sdetailindex
                                  ].Text,
                              }}
                            ></div>

                            <a
                              href={
                                this.state.SponsorPost[this.state.sdetailindex]
                                  .ButtonLink
                              }
                              className="btn"
                              target="_blank"
                            >
                              <span>
                                {
                                  this.state.SponsorPost[
                                    this.state.sdetailindex
                                    ].ButtonText
                                }
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    );
  }
}

export default Awards;
