import React, { useEffect, useState } from "react";
import firebase from "../config";
import { SIGN_IN, SIGN_OUT } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import {
	Modal,
	Button,
	InputGroup,
	FormControl,
	Accordion,
	Card,
} from "react-bootstrap";
import "./Home.css";

import Chatbot from "./Chatbot/Chatbot";
import TwitterTrends from "./Tweets/TwitterTrends";
import Weather from "./Weather/Weather";
import News from "./News/News";

const db = firebase.firestore();

function Home() {
	const [auth, setAuth] = useState(false);
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	const [pinCorrect, setPinCorrect] = useState(false);
	const [pin, setPin] = useState("");
	const [company, setCompany] = useState("");
	const [companyEmail, setCompanyEmail] = useState("");
	const [companyPassword, setCompanyPassword] = useState("");
	const [companyDetail, setCompanyDetail] = useState([]);
	// const isLogged = true
	const SignOut = () => {
		console.log("Sign Out");
		localStorage.removeItem("user");
		firebase.auth().signOut();
		dispatch(SIGN_OUT());
	};

	useEffect(() => {
		try {
			if (isLogged === null || isLogged.payload === null) {
				var checkAuth = localStorage.getItem("user");
				if (checkAuth !== undefined) {
					dispatch(SIGN_IN(JSON.parse(checkAuth)));
				}
			}
		} catch (err) {
			console.log("Error");
		}
	}, []);

	const handleClose = () => {
		setShow(false);
		setPin("");
		setPinCorrect(false);
	};

	const handleShow = () => {
		db.collection("users")
			.doc(isLogged.payload.userID)
			.get()
			.then((doc) => {
				if (doc.data()) {
					setCompanyDetail(doc.data().accounts);
				}
			})
			.catch((error) => {
				console.log(error);
			});
		setShow(true);
	};

	const handlePin = () => {
		db.collection("users")
			.doc(isLogged.payload.userID)
			.get()
			.then((doc) => {
				if (pin === doc.data().pin) {
					setPinCorrect(true);
				} else {
					setShow(false);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onChangeHandler = (e) => {
		const { name, value } = e.currentTarget;
		if (name === "company") {
			setCompany(value);
		} else if (name === "company-email") {
			setCompanyEmail(value);
		} else {
			setCompanyPassword(value);
		}
	};

	const onSubmitHandler = (e, company, companyEmail, companyPassword) => {
		e.preventDefault();
		const companyDetails = {
			companyName: company,
			companyEmail: companyEmail,
			companyPassword: companyPassword,
		};
		db.collection("users")
			.doc(isLogged.payload.userID)
			.get()
			.then((doc) => {
				var accountsArray = doc.data().accounts;
				console.log(accountsArray);
				accountsArray.push(companyDetails);
				console.log(accountsArray);
				db.collection("users")
					.doc(isLogged.payload.userID)
					.set({ accounts: accountsArray }, { merge: true })
					.catch((error) => {
						console.log(error);
					});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="Home">
			{isLogged ? (
				<>
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								<div className="box box__blue">
									<h3>{isLogged.payload.username}</h3>
									{/* <h3>Devarsh Panchal</h3> */}
								</div>
								<div
									className="box"
									style={{ marginTop: "1rem" }}
								>
									<div className="twitter__title">
										<h4>
											<i class="far fa-newspaper"></i>{" "}
											News
										</h4>
										<News />
									</div>
								</div>
								<div style={{ marginTop: "1rem" }}>
									<div className="row">
										<div className="col-md-4">
											<div
												className="smallBox__blue"
												onClick={handleShow}
											>
												<button className="buttons">
													<i class="fas fa-cog"></i>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="smallBox__blue">
												<button
													className="buttons"
													onClick={() => SignOut()}
												>
													<i class="fas fa-cog"></i>
												</button>
											</div>
										</div>
										<div className="col-md-4">
											<div className="smallBox__blue">
												<button
													className="buttons"
													onClick={() => SignOut()}
												>
													<i class="fas fa-sign-out-alt"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-4">
								<div className="box block">
									<Chatbot />
								</div>
							</div>
							<div className="col-md-4">
								<div className="box">
									<Weather />
								</div>
								<div
									className="box"
									style={{ marginTop: "1rem" }}
								>
									<div className="twitter__title">
										<h4>
											<i class="fab fa-twitter"></i>{" "}
											Twitter Trending
										</h4>
									</div>
									<TwitterTrends />
								</div>
							</div>
						</div>
					</div>

					<Modal
						size="lg"
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false}
						centered
						scrollable={true}
						className="settings-model"
					>
						<Modal.Header closeButton>
							<Modal.Title>Settings</Modal.Title>
						</Modal.Header>
						<Modal.Body className="settings-model-body">
							{pinCorrect ? (
								<div className="website-details">
									<div className="add-new">
										<h4>
											<i class="fas fa-plus-circle"></i>{" "}
											Add
										</h4>
										<hr></hr>
										<div className="row">
											<div className="col-md-4">
												<input
													className="form-control"
													type="text"
													name="company"
													placeholder="Enter Website Name"
													onChange={(event) =>
														onChangeHandler(event)
													}
												/>
											</div>
											<div className="col-md-4">
												<input
													className="form-control"
													type="email"
													name="company-email"
													placeholder="Enter email"
													onChange={(event) =>
														onChangeHandler(event)
													}
												/>
											</div>
											<div className="col-md-4">
												<input
													className="form-control"
													type="password"
													name="company-password"
													placeholder="Enter password"
													onChange={(event) =>
														onChangeHandler(event)
													}
												/>
											</div>
										</div>
										<button
											type="button"
											class="btn btn-primary add-new-submit"
											onClick={(event) =>
												onSubmitHandler(
													event,
													company,
													companyEmail,
													companyPassword
												)
											}
										>
											Add
										</button>
									</div>
									<h4>
										<i class="far fa-list-alt"></i> Saved
										Details
									</h4>
									<hr></hr>
									{companyDetail.length === 0 ? (
										<p>No Accounts added!</p>
									) : (
										<div className="added-details">
											<Accordion>
												{companyDetail.map((each) => {
													return (
														<Card>
															<Accordion.Toggle
																as={Card.Header}
																eventKey={`"${each.companyName}"`}
															>
																{
																	each.companyName
																}
															</Accordion.Toggle>
															<Accordion.Collapse
																eventKey={`"${each.companyName}"`}
															>
																<Card.Body>
																	<h6>
																		Email:{" "}
																		{
																			each.companyEmail
																		}
																	</h6>
																	<h6>
																		Password:{" "}
																		{
																			each.companyPassword
																		}
																	</h6>
																</Card.Body>
															</Accordion.Collapse>
														</Card>
													);
												})}
											</Accordion>
										</div>
									)}
								</div>
							) : (
								<InputGroup className="mb-3">
									<FormControl
										type="password"
										placeholder="Pin"
										aria-label="Pin"
										aria-describedby="basic-addon1"
										onChange={(event) => {
											setPin(event.target.value);
										}}
									/>
								</InputGroup>
							)}
						</Modal.Body>
						{pinCorrect ? null : (
							<Modal.Footer>
								<Button variant="primary" onClick={handlePin}>
									Check
								</Button>
							</Modal.Footer>
						)}
					</Modal>
				</>
			) : (
				<Redirect to="/login" />
			)}
		</div>
	);
}

export default Home;
