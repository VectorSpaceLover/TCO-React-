import React, { Component } from "react";
import { Helmet } from "react-helmet";
import FsLightbox from 'fslightbox-react';
import Masonry from 'react-masonry-css'
import "floating-label-react/styles.css";
import GLOBAL from "../Global";
import "../App.css";
import "react-phone-number-input/style.css";

const axios = require("axios");

const MANSORY_HEIGHTS = [300, 250, 200, 150];
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seo: [],
      toggler: false,
      sources: [],
      slide: 1,
      selected: 'all',
      siteurl: "",
      galleryPosts: [],
      years: [],
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

    // Gallery

    axios({
      method: "get",
      url: GLOBAL.SITE_URL + "/Galleries?_sort=year:desc",
      responseType: "json",
    })
      .then((response) => {
        const { data } = response;

        const galleryPosts = [];

        data.forEach(item => {
          item.Image.forEach(element => {
            galleryPosts.push({
              year: item.Year,
              url: element.url,
              height: MANSORY_HEIGHTS[this.random(0, 3)],
            })
          })
        });

        let years = galleryPosts.map(item => item.year);
        years = [...new Set(years)];
        years = years.sort().reverse();

        const sources = galleryPosts.map(item => GLOBAL.SITE_URL + item.url);

        this.setState({ galleryPosts, years, sources });
      })

      .catch((err) => {
        console.log(err);

        console.log("Error");
      });
  }


  componentDidMount() {
    document.title = "Gallery - Top CEO";

    setTimeout(() => {
      this.setState({ didMount: true });
    }, 2000);
  }

  togglePopup = () => {
    this.setState({ addClass: !this.state.addClass });
  };

  random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  handleClickYear = name => {
    const galleries = this.state.galleryPosts;
    const filters = name === 'all' ? undefined : galleries.filter(item => item.year === name);
    this.setState({ selected: name, filters })
  }

  render() {
    if ((document.title = "Gallery - Top CEO")) {
      document.body.classList.remove("transparent_body");
    } else {
      document.body.classList.add("transparent_body");
    }

    const { didMount, seo, galleryPosts, years, selected, filters, toggler, sources, slide } = this.state;
    const siteurl = window.location.origin;
    return (
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="main_content">
          {seo.length > 0
            ? seo.map((item, index) => {
              if (item.Selectpage == "Gallery") {
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
                      property="og:url"
                      content={
                        siteurl + "/Top-CEO-Conference-Bahrain-2020-Gallery"
                      }
                    />
                  </Helmet>
                );
              }
            })
            : null}

          <section className="theme_selection_section home_gallery_section">
            <div className="theme_selection_bg">
              <div className="container">
                <div className="row container-filters">
                  <button className={selected === 'all' && 'active'} onClick={() => this.handleClickYear('all')}>All</button>
                  {years.map(item => (
                    <button
                      className={selected === item && 'active'}
                      onClick={() => this.handleClickYear(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="row">
                  <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {(filters || galleryPosts).map(item => (
                      <img
                        style={{
                          height: item.height,
                          cursor: 'pointer'
                        }}
                        src={GLOBAL.SITE_URL + item.url}
                        onClick={() => {
                          console.log(sources.findIndex(element => element === GLOBAL.SITE_URL + item.url));
                          this.setState(prevState => ({
                            toggler: !prevState.toggler,
                            slide: sources.findIndex(element => element === GLOBAL.SITE_URL + item.url)
                          }));
                        }}
                      />
                    ))}
                  </Masonry>
                </div>
              </div>
            </div>
          </section>
        </div>
        <FsLightbox
          toggler={toggler}
          sources={sources}
          slide={slide}
        />
      </div>
    );
  }
}

export default Gallery;
