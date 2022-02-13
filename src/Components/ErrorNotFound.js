import React, { Component } from 'react';

export default class ErrorNotFound extends Component {

      componentDidMount(){
       document.title = "Page not found - Top CEO"  
        }
    render() {
        return (

            <div id='error' className="main_content error_page">
                <section className="theme_selection_section sitemap_main_section">
                    <div className="theme_selection_bg">
                    <div className="site_section">
                    <div className="container">
                        <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
                        <p className="notFoundDesc">
                            It looks like nothing was found at this location.
                            Maybe try one of the links in the menu or press back to go to the previous page.
                        </p>
                        <a href={"/"} className="btn"><span>Back to Home</span></a>
                    </div>
                    </div>
                    </div>
                </section>
            </div>           
        );
    }
}