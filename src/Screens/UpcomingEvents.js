import React, { Component } from "react";
import "../App.css";

import pin from "../images/pin.png";

import GLOBAL from "../Global";
const axios = require("axios");

class UpcomingEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			EventPost: [],
		};
	}

	componentWillMount() {
		// upcoming-events-page
		axios({
			method: "get",
			url: GLOBAL.SITE_URL + "/upcoming-events-pages",
			responseType: "json",
		})
			.then((response) => {
				var Data = response.data;
				var EventPost = [];
				Data.map((item, index) => {
					EventPost.push(item);
				});
				this.setState({ EventPost: EventPost });
			})
			.catch((err) => {
				console.log(err);
				console.log("Error");
			});
	}

	state = { didMount: false };
	componentDidMount() {
		document.title = "UpcomingEvents - Top CEO";

		setTimeout(() => {
			this.setState({ didMount: true });
		}, 2000);
	}

	render() {
		if ((document.title = "UpcomingEvents - Top CEO")) {
			document.body.classList.add("transparent_body");
		} else {
			document.body.classList.remove("transparent_body");
		}
		const { didMount } = this.state;
		return (
			<div className={`fade-in ${didMount && "visible"}`}>
				<div className="main_content">
					<section className="theme_selection_section event_main_section">
						<div className="theme_selection_bg">
							<div className="container">
								{this.state.EventPost.length > 0
									? this.state.EventPost.map((item, index) => {
										if (item.SelectPosition == "Top") {
											return (
												<div>
													<h1>
														<span>{item.SubTitle}</span>
														{item.Title}
													</h1>
													<p className="top_text_content">{item.Content}</p>
												</div>
											);
										}
									})
									: null}
								<div className="event_ceo_content">
									<div className="row">
										{this.state.EventPost.length > 0
											? this.state.EventPost.map((item, index) => {
												if (item.SelectPosition == "Bottom") {
													return (
														<div className="column col-4">
															<div className="nominees_content">
																<small className="date">
																	{item.SubTitle}
																</small>
																<h5>{item.Title}</h5>
																<span className="address_text">
                                    <img src={pin} />
                                    <small>{item.SmallTitle}</small>
                                  </span>
																<img src={GLOBAL.SITE_URL + item.Image.url} />
																<p>{item.Content}</p>
															</div>
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

export default UpcomingEvents;
