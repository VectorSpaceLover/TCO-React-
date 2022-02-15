import React, { Component } from "react";

import "../App.css";

import { Helmet } from "react-helmet";

import Slider from "react-slick";

import GLOBAL from "../Global";

const axios = require("axios");

class AboutTopCEO extends Component {
	constructor(props) {
		super(props);

		this.state = {
			seo: [],
			siteurl: "",

			TopCEOConference2020: [],

			HistoryPosts: [],

			LeadershipPosts: [],
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

			url: GLOBAL.SITE_URL + "/top-ceo-conference-2020-s",

			responseType: "json",
		})
			.then((response) => {
				var Data = response.data;

				var TopCEOConference2020 = [];

				Data.map((item, index) => {
					TopCEOConference2020.push(item);
				});

				this.setState({ TopCEOConference2020: TopCEOConference2020 });
			})

			.catch((err) => {
				console.log(err);

				console.log("Error");
			});

		//top-ceo-conference-leadership

		axios({
			method: "get",

			url: GLOBAL.SITE_URL + "/top-ceo-conference-leadership-sections",

			responseType: "json",
		})
			.then((response) => {
				var Data = response.data;

				var LeadershipPosts = [];

				Data.map((item, index) => {
					LeadershipPosts.push(item);
				});

				this.setState({ LeadershipPosts: LeadershipPosts });
			})

			.catch((err) => {
				console.log(err);

				console.log("Error");
			});

		//history-posts

		axios({
			method: "get",

			url: GLOBAL.SITE_URL + "/history-posts",

			responseType: "json",
		})
			.then((response) => {
				var Data = response.data;

				var HistoryPosts = [];

				Data.map((item, index) => {
					HistoryPosts.push(item);
				});

				this.setState({ HistoryPosts: HistoryPosts });
			})

			.catch((err) => {
				console.log(err);

				console.log("Error");
			});
	}

	state = { didMount: false };
	componentDidMount() {
		document.title = "About - Top CEO";
		setTimeout(() => {
			this.setState({ didMount: true });
		}, 2000);
	}

	render() {
		const settings = {
			dots: false,

			arrows: true,

			infinite: false,

			draggable: false,

			speed: 500,

			slidesToShow: 6,

			slidesToScroll: 1,

			responsive: [
				{
					breakpoint: 1199,

					settings: {
						slidesToShow: 5,

						slidesToScroll: 1,
					},
				},

				{
					breakpoint: 991,

					settings: {
						slidesToShow: 4,

						slidesToScroll: 1,
					},
				},

				{
					breakpoint: 767,

					settings: {
						slidesToShow: 3,

						slidesToScroll: 1,
					},
				},

				{
					breakpoint: 540,

					settings: {
						slidesToShow: 2,

						slidesToScroll: 1,
					},
				},

				{
					breakpoint: 460,

					settings: {
						slidesToShow: 1,

						slidesToScroll: 1,
					},
				},
			],
		};

		if ((document.title = "About - Top CEO")) {
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
							if (item.Selectpage == "About") {
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
											content={siteurl + "/about-Top-CEO"}
										/>
									</Helmet>
								);
							}
						})
						: null}

					{this.state.TopCEOConference2020.length > 0
						? this.state.TopCEOConference2020.map((item, index) => {
							if (item.SelectSection == "Section1") {
								return (
									<section className="theme_banner_section topceo_banner_section">
										<img src={GLOBAL.SITE_URL + item.Image[0].url} />

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

					<section className="theme_selection_section topceo_main_section">
						<div className="theme_selection_bg">
							{this.state.TopCEOConference2020.length > 0
								? this.state.TopCEOConference2020.map((item, index) => {
									if (item.SelectSection == "Section2") {
										return (
											<div id="section1" className="container">
												<h2>
													<span>{item.SubTitle}</span>
													{item.Title}
												</h2>

												<div
													className="top_text_content topceo_top_text_content"
													dangerouslySetInnerHTML={{ __html: item.Content }}
												></div>
											</div>
										);
									}
								})
								: null}

							<div id="section2" className="topceo_leader_section">
								<div className="container">
									{this.state.TopCEOConference2020.length > 0
										? this.state.TopCEOConference2020.map((item, index) => {
											if (item.SelectSection == "Section3") {
												return (
													<h2>
														<span>{item.SubTitle}</span>
														{item.Title}
													</h2>
												);
											}
										})
										: null}

									<div className="row">
										{this.state.LeadershipPosts.length > 0
											? this.state.LeadershipPosts.map((item, index) => {
												return (
													<div className="column col-4">
														<div className="best_award_img">
															<img src={GLOBAL.SITE_URL + item.Image.url} />
														</div>

														<h5>{item.Title}</h5>
													</div>
												);
											})
											: null}
									</div>
								</div>
							</div>

							<div id="section3" className="topceo_mission_section">
								<div className="container">
									<div className="row row-reverse">
										<div className="column col-6">
											<div className="mission_img">
												{this.state.TopCEOConference2020.length > 0
													? this.state.TopCEOConference2020.map(
														(item, index) => {
															if (item.SelectSection == "Section4") {
																return (
																	<img
																		src={GLOBAL.SITE_URL + item.Image[0].url}
																	/>
																);
															}
														}
													)
													: null}
											</div>
										</div>

										<div className="column col-6">
											{this.state.TopCEOConference2020.length > 0
												? this.state.TopCEOConference2020.map((item, index) => {
													if (item.SelectSection == "Section4") {
														return (
															<div className="theme_selection_block">
																<h3>
																	<span>{item.SubTitle}</span>
																	{item.Title}
																</h3>

																<div
																	dangerouslySetInnerHTML={{
																		__html: item.Content,
																	}}
																></div>

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
								</div>
							</div>

							<div
								id="section4"
								className="topceo_leader_section topceo_history_section"
							>
								<div className="container">
									{this.state.TopCEOConference2020.length > 0
										? this.state.TopCEOConference2020.map((item, index) => {
											if (item.SelectSection == "Section5") {
												return (
													<div>
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

									<Slider {...settings}>
										{this.state.HistoryPosts.length > 0
											? this.state.HistoryPosts.map((item, index) => {
												return (
													<div>
														<span className="dark_bg">{item.SubTitle}</span>

														<div className="white_dot">.</div>

														<div
															dangerouslySetInnerHTML={{ __html: item.Text }}
														></div>
													</div>
												);
											})
											: null}
									</Slider>
								</div>
							</div>

							<div id="section5" className="topceo_venue_section">
								<div className="container">
									{this.state.TopCEOConference2020.length > 0
										? this.state.TopCEOConference2020.map((item, index) => {
											if (item.SelectSection == "Section6") {
												return (
													<div className="row">
														<div className="column col-6">
															<div className="mission_img">
																<img
																	src={GLOBAL.SITE_URL + item.Image[1].url}
																/>
															</div>

															<div className="venue_content">
																<div
																	dangerouslySetInnerHTML={{
																		__html: item.Content,
																	}}
																></div>
															</div>
														</div>

														<div className="column col-6">
															<div className="venue_content">
																<h2>
																	<span>{item.SubTitle}</span>
																	{item.Title}
																</h2>
															</div>

															<div className="mission_img">
																<img
																	src={GLOBAL.SITE_URL + item.Image[0].url}
																/>
															</div>
														</div>
													</div>
												);
											}
										})
										: null}
								</div>
							</div>

							<div id="section6" className="topceo_mediaquest_section">
								{this.state.TopCEOConference2020.length > 0
									? this.state.TopCEOConference2020.map((item, index) => {
										if (item.SelectSection == "Section7") {
											return (
												<div className="container">
													<div className="topceo_mediaquest_border"></div>

													<img src={GLOBAL.SITE_URL + item.Image[0].url} />

													<div className="topceo_mediaquest_content">
														<h2>
															<span>{item.SubTitle}</span>
															{item.Title}
														</h2>

														<div
															dangerouslySetInnerHTML={{
																__html: item.Content,
															}}
														></div>

														<img src={GLOBAL.SITE_URL + item.Image[1].url} />
													</div>
												</div>
											);
										}
									})
									: null}
							</div>
						</div>
					</section>

					<section id="section7" className="theme_ticket_section">
						<div className="container">
							<div className="theme_ticket_content">
								{this.state.TopCEOConference2020.length > 0
									? this.state.TopCEOConference2020.map((item, index) => {
										if (item.SelectSection == "Section8") {
											return (
												<div className="row">
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
					</section>
				</div>
			</div>
		);
	}
}

export default AboutTopCEO;
