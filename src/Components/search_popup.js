import React from "react";
import search_close from "../images/close.svg";
import SearchResults from "react-filter-search";
import axios from "axios";
import GLOBAL from "../Global";
var TempData = [];
var recentsearchindex = 1;
class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [], value: "", ResentSearch: [] };
  }
  componentWillMount() {
    this.APICallFunction();

    var recentsearch = localStorage.getItem("recentsearch");
    var recentsearchindex = localStorage.getItem("recentsearchindex");
    console.log("recentsearchindex");
    console.log(recentsearchindex);
    console.log("recentsearch");
    console.log(JSON.parse(recentsearch));
    if (recentsearch != null) {
      this.setState({ ResentSearch: JSON.parse(recentsearch) });
    }

    // axios({
    //   method: "get",
    //   url: GLOBAL.SITE_URL + "/recent-searches",
    //   responseType: "json"
    // })
    //   .then(response => {
    //     if (response.status == 200) {
    //       if (response.data.length > 0) {
    //         this.setState({ ResentSearch: response.data });
    //       }
    //     }
    //     console.log("Response");
    //     console.log(response);
    //   })
    //   .catch(e => {
    //     console.log("Eerror");
    //     console.log(e);
    //   });
  }
  componentDidMount() {
    localStorage.setItem("alreadySearch", "true");
  }
  async APICallFunction() {
    TempData = [];
    await this.MultipleSearchData(
      "/business-posts",
      "Title",
      "SubTitle",
      "Business"
    );
    await this.MultipleSearchData(
      "/speakers-posts",
      "Title",
      "Description",
      "Speakers"
    );
    await this.MultipleSearchData("/agenda-acts", "Title", "Content", "Agenda");
    await this.MultipleSearchData(
      "/agenda-pages",
      "Title",
      "SubTitle",
      "Agenda"
    );
    await this.MultipleSearchData(
      "/highlights-posts",
      "Title",
      "Content",
      "Agenda"
    );
    await this.MultipleSearchData(
      "/agenda-themes",
      "Title",
      "Content",
      "Agenda"
    );
    await this.MultipleSearchData(
      "/attend-pages",
      "Title",
      "Content",
      "Attend"
    );
    await this.MultipleSearchData(
      "/attend-selection-sections",
      "Title",
      "Attend"
    );
    await this.MultipleSearchData(
      "/award-categories",
      "Title",
      "Content",
      "Awards"
    );
    await this.MultipleSearchData(
      "/awards-pages",
      "Title",
      "Content",
      "Awards"
    );
    await this.MultipleSearchData(
      "/awards-posts",
      "Title",
      "Content",
      "Awards"
    );
    await this.MultipleSearchData(
      "/speaker-attendees",
      "Title",
      "SubTitle",
      "Speakers"
    );
    await this.MultipleSearchData("/blog-pages", "Title", "Content", "Blog");
    await this.MultipleSearchData("/blog-posts", "Title", "Content", "Blog");
    await this.MultipleSearchData(
      "/business-pages",
      "Title",
      "Content",
      "Business"
    );
    await this.MultipleSearchData(
      "/business-posts",
      "Title",
      "SubTitle",
      "Business"
    );
    await this.MultipleSearchData(
      "/contact-pages",
      "Title",
      "Content",
      "Contact"
    );

    await this.MultipleSearchData(
      "/video-sections",
      "Title",
      "SubTitle",
      "TopCEOConferences"
    );
    await this.MultipleSearchData(
      "/home-banner-sections",
      "Title",
      "SubTitle",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-highlight-sections",
      "Title",
      "SubTitle",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-partners-sections",
      "Title",
      "Content",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-speakers-sections",
      "Title",
      " ",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-sponsor-sections",
      "Title",
      "Content ",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-theme-sections",
      "Title",
      "Content",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-theme-total-sections",
      "Title",
      "SubTitle",
      "Home"
    );
    await this.MultipleSearchData(
      "/home-top-ceo-2020-sections",
      "Title",
      "SubTitle",
      "Home"
    );
    await this.MultipleSearchData("/logos", "Title", " ", "Header");
    await this.MultipleSearchData(
      "/partnerwithus-pages",
      "Title",
      "Content",
      "Partnerwithus"
    );
    await this.MultipleSearchData(
      "/planyour-trip-pages",
      "Title",
      "Content",
      "PlanyourTrip"
    );
    await this.MultipleSearchData("/sitemap-pages", "Title", "Content", "Home");
    await this.MultipleSearchData("/speakers-posts", "Title", " ", "Speakers");
    await this.MultipleSearchData(
      "/speakers-pages",
      "Title",
      "SubTitle",
      "Speakers"
    );
    await this.MultipleSearchData(
      "/theme-pages",
      "Title",
      "SubTitle",
      "Themes"
    );
    await this.MultipleSearchData(
      "/themes-posts",
      "Title",
      "SubTitle",
      "Themes"
    );
    await this.MultipleSearchData(
      "/top-ceo-conference-leadership-sections",
      "Title",
      " ",
      "TopCEOConferences"
    );
    await this.MultipleSearchData(
      "/video-posts",
      "Title",
      "Content",
      "TopCEOConferences"
    );
  }
  MultipleSearchData(tablename, title, description, page) {
    axios({
      method: "get",
      url: GLOBAL.SITE_URL + tablename,
      responseType: "json"
    })
      .then(response => {
        var Data = response.data;

        Data.map((item, index) => {
          var Key = Object.keys(item);
          var value = Object.values(item);

          var i, j;
          if (Key.includes(title)) {
            var keyindex = element => element == title;
            i = Key.findIndex(keyindex);
          }
          if (Key.includes(description)) {
            var keyindex = element => element == description;
            j = Key.findIndex(keyindex);
          }

          TempData.push({
            title: value[i],
            Content: value[j],
            tablename: tablename,
            PageName: page
          });
        });

        return true;
      })

      .catch(err => {
        console.log(err);

        console.log("Error");
      });
  }
  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  ResentSearch = item => {
    console.log("item Search");
    console.log(item);
    var Temp = this.state.ResentSearch;

    console.log(Temp);
    Temp.unshift({
      title: item.title,
      Content: item.Content,
      tablename: item.tablename,
      PageName: item.PageName
    });
    if (Temp.length > 5) {
      Temp.pop();
    }
    localStorage.setItem(
      "recentsearch",
      JSON.stringify(this.state.ResentSearch)
    );

    window.location = item.PageName;
  };
  render() {
    const { data, value } = this.state;
    return (
      <div className="search_popup">
        <div className="popup_content container">
          <button onClick={this.props.closePopup} className="search_close">
            <img src={search_close} />
          </button>
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                value={value}
                onChange={this.handleChange}
              />
            </fieldset>
            <div className="search_box_content">
              <h5> Search Data</h5>
              {value != "" ? (
                <SearchResults
                  value={value}
                  data={TempData}
                  renderResults={results => (
                    <div>
                      {results.map(el => (
                        <div>
                          <a onClick={() => this.ResentSearch(el)}>
                            {el.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                />
              ) : null}
              <h5>Recent Search</h5>

              {this.state.ResentSearch.length > 0 ? (
                this.state.ResentSearch.map((item, index) => {
                  console.log(item);
                  return (
                    <a onClick={() => this.ResentSearch(item)}>{item.title}</a>
                  );
                })
              ) : (
                <a>No Recent Search</a>
              )}
            </div>
            {/*<div className="search_box_content">
              <h5>Suggested for you</h5>
              <a href="javascript:void(0);">
                Leadership, Talent and the Future of Work
              </a>
              <a href="javascript:void(0);">Prof. Nouriel Roubini</a>
              <a href="javascript:void(0);">Scaling Digital Transformation</a>
              <a href="javascript:void(0);">Tala Fakhro</a>
              <a href="javascript:void(0);">Scaling Digital Transformation</a>
            </div>*/}
          </form>
        </div>
      </div>
    );
  }
}

export default Popup;
