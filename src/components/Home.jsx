import React, { useEffect, useState } from "react";
import firebase from "../config";
import { v4 as uuidv4 } from "uuid";
import { SIGN_IN, SIGN_OUT } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
import {
	Modal,
	Button,
	InputGroup,
	FormControl,
	Accordion,
	Card,
	Form,
} from "react-bootstrap";
import "./Home.css";

import Login from "./Login";

import Chatbot from "./Chatbot/Chatbot";
import TwitterTrends from "./Tweets/TwitterTrends";
import Weather from "./Weather/Weather";
import News from "./News/News";
import LiveScore from "./LiveScore/LiveScore";
import Covid from "./Covid/Covid";

const db = firebase.firestore();

function Home() {
	const [show, setShow] = useState(false);
	const [developer, setDeveloper] = useState(false);
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
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				dispatch(SIGN_IN(user));
				console.log("Login");
			} else {
				dispatch(SIGN_OUT(user));
				console.log("Logout");
			}
		});
		return unsubscribe;
	}, []);

	const handleClose = () => {
		setShow(false);
		setPin("");
		setPinCorrect(false);
	};

	const handleShow = () => {
		db.collection("users")
			.doc(isLogged.payload.uid)
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
			.doc(isLogged.payload.uid)
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
			id: uuidv4(),
			company: company,
			email: companyEmail,
			password: companyPassword,
		};
		db.collection("users")
			.doc(isLogged.payload.uid)
			.get()
			.then((doc) => {
				var accountsArray = doc.data().accounts;
				console.log(accountsArray);
				accountsArray.push(companyDetails);
				console.log(accountsArray);
				db.collection("users")
					.doc(isLogged.payload.uid)
					.set({ accounts: accountsArray }, { merge: true })
					.catch((error) => {
						console.log(error);
					});
				setCompanyDetail(accountsArray);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const deleteAccount = (id) => {
		db.collection("users")
			.doc(isLogged.payload.uid)
			.get()
			.then((doc) => {
				var accountsArray = doc.data().accounts;
				var newArr = accountsArray.filter((ele) => ele.id !== id);
				db.collection("users")
					.doc(isLogged.payload.uid)
					.set({ accounts: newArr }, { merge: true })
					.catch((error) => {
						console.log(error);
					});
				setCompanyDetail(newArr);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleCloseDev = () => setDeveloper(false);
	const handleShowDev = () => setDeveloper(true);

	return (
		<div className="Home">
			<Modal size="lg" show={developer} onHide={handleCloseDev} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-code"></i> Developers
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md-4">
							<div className="dev">
								<img
									style={{ width: "100%", height: "100%" }}
									src="./developers/meet.png"
									alt="Meet"
								/>
								<h4>Meet Bhavsar</h4>
							</div>
						</div>
						<div className="col-md-4">
							<div className="dev">
								<img
									style={{ width: "100%", height: "100%" }}
									src="./developers/dev.png"
									alt="Devarsh"
								/>
								<h4>Devarsh Panchal</h4>
							</div>
						</div>
						<div className="col-md-4">
							<div className="dev">
								<img
									style={{ width: "100%", height: "100%" }}
									src="./developers/harsh.png"
									alt="Harsh"
								/>
								<h4>Harsh Mauny</h4>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			{isLogged ? (
				<>
					<div className="home">
						<div className="container">
							<div className="row">
								<div className="col-md-4">
									<div
										className="box box__blue"
										style={{ padding: "1.4rem" }}
									>
										<h3>
											{isLogged.payload.displayName}
										</h3>
										{/* <h3>Devarsh Panchal</h3> */}
									</div>
									<div
										className="box"
										style={{
											marginTop: "1rem",
											paddingBottom: "16px",
										}}
									>
										<div className="twitter__title">
											<h4>
												<i className="far fa-newspaper"></i>{" "}
												News
											</h4>
											<News />
										</div>
									</div>
									<div
										className="box"
										style={{
											marginTop: "1rem",
											paddingBottom: "16px",
										}}
									>
										<div className="twitter__title">
											<h4>
												<i class="fas fa-virus"></i>{" "}
												COVID19 Stats
											</h4>
											<Covid />
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
														<i className="fas fa-cog"></i>
													</button>
												</div>
											</div>
											<div className="col-md-4">
												<div className="smallBox__blue">
													<button
														className="buttons"
														onClick={() =>
															handleShowDev()
														}
													>
														<i className="fas fa-code"></i>
													</button>
												</div>
											</div>
											<div className="col-md-4">
												<div className="smallBox__blue">
													<button
														className="buttons"
														onClick={() =>
															SignOut()
														}
													>
														<i className="fas fa-sign-out-alt"></i>
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
									<div
										className="box"
										style={{ padding: "16px" }}
									>
										<Weather />
									</div>
									<div
										className="box"
										style={{ marginTop: "1rem" }}
									>
										<div className="twitter__title">
											<h4>
												<i className="fab fa-twitter"></i>{" "}
												Twitter Trending
											</h4>
										</div>
										<TwitterTrends />
									</div>
									<div
										className="box"
										style={{
											marginTop: "1rem",
											paddingBottom: "16px",
										}}
									>
										<div className="twitter__title">
											<h4>
												<i className="fas fa-trophy"></i>{" "}
												Live Score
											</h4>
										</div>
										<LiveScore />
									</div>
								</div>
							</div>
						</div>

						<Modal
							show={show}
							onHide={handleClose}
							backdrop="static"
							keyboard={false}
							centered
							scrollable={true}
							className="settings-model"
						>
							<Modal.Header closeButton>
								<Modal.Title>
									<i className="fas fa-cog"></i> Settings
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="settings-model-body">
								{pinCorrect ? (
									<div className="website-details">
										<div className="add-new">
											<h4>
												<i className="fas fa-plus-circle"></i>{" "}
												Add Account
											</h4>
											<hr></hr>
											<div className="container">
												<Form.Group>
													<input
														className="form-control"
														type="text"
														name="company"
														placeholder="Enter Website Name"
														onChange={(event) =>
															onChangeHandler(
																event
															)
														}
													/>
												</Form.Group>
												<Form.Group>
													<input
														className="form-control"
														type="email"
														name="company-email"
														placeholder="Enter email"
														onChange={(event) =>
															onChangeHandler(
																event
															)
														}
													/>
												</Form.Group>
												<Form.Group>
													<input
														className="form-control"
														type="password"
														name="company-password"
														placeholder="Enter password"
														onChange={(event) =>
															onChangeHandler(
																event
															)
														}
													/>
												</Form.Group>
												<Form.Group>
													<Button
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
													</Button>
												</Form.Group>
											</div>
										</div>
										<h4>
											<i className="far fa-list-alt"></i>{" "}
											Saved Account(s)
										</h4>
										<hr></hr>
										{companyDetail.length === 0 ? (
											<p>No Accounts added!</p>
										) : (
											<div className="added-details">
												<Accordion>
													{companyDetail.map(
														(each) => {
															return (
																<Card>
																	<Accordion.Toggle
																		as={
																			Card.Header
																		}
																		eventKey={`"${each.id}"`}
																	>
																		{
																			each.company
																		}
																	</Accordion.Toggle>
																	<Accordion.Collapse
																		eventKey={`"${each.id}"`}
																	>
																		<Card.Body>
																			<InputGroup className="mb-3">
																				<InputGroup.Prepend>
																					<InputGroup.Text id="basic-addon1">
																						<i className="fas fa-at"></i>
																					</InputGroup.Text>
																				</InputGroup.Prepend>
																				<FormControl
																					value={
																						each.email
																					}
																					disabled
																					placeholder="Username"
																					aria-label="Username"
																					aria-describedby="basic-addon1"
																				/>
																			</InputGroup>
																			<InputGroup className="mb-3">
																				<InputGroup.Prepend>
																					<InputGroup.Text id="basic-addon1">
																						<i className="fas fa-key"></i>
																					</InputGroup.Text>
																				</InputGroup.Prepend>
																				<FormControl
																					value={
																						each.password
																					}
																					disabled
																					type="password"
																					placeholder="Password"
																					aria-label="Password"
																					aria-describedby="basic-addon1"
																				/>
																			</InputGroup>
																			<Button
																				variant="danger"
																				onClick={() =>
																					deleteAccount(
																						each.id
																					)
																				}
																			>
																				Delete
																			</Button>
																		</Card.Body>
																	</Accordion.Collapse>
																</Card>
															);
														}
													)}
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
									<Button
										variant="primary"
										onClick={() => handlePin()}
									>
										Check
									</Button>
								</Modal.Footer>
							)}
						</Modal>
					</div>
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default Home;
