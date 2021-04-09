import React, { useState } from "react";
import firebase from "../config";
import { SIGN_IN } from "../reducers/auth";
import "./Signup.css";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";

function Signup() {
	const [error, setError] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pin, setPin] = useState("");

	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);
	// const isLogged = false

	const onChangeHandler = (event) => {
		const { name, value } = event.currentTarget;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		} else if (name === "name") {
			setName(value);
		} else if (name === "pin") {
			setPin(value);
		}
	};

	const createUserWithEmailAndPasswordHandler = (
		event,
		email,
		password,
		name,
		pin
	) => {
		event.preventDefault();
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((credential) => {
				if (credential) {
					credential.user.updateProfile({
						displayName: name,
					});
					console.log(credential);
					const user = {
						userID: credential.user.uid,
						name: name,
						pin: pin,
						accounts: [],
					};
					const db = firebase.firestore();
					db.settings({
						timestampsInSnapshots: true,
					});
					const user_data = credential.user;
					const userData = {
						userID: user_data.uid,
						username: name,
						email: user_data.email,
					};
					db.collection("users")
						.doc(credential.user.uid)
						.set(user)
						.then((res) => console.log(res));
					localStorage.setItem("user", JSON.stringify(userData));
					dispatch(SIGN_IN(userData));
				}
			})
			.catch((error) => {
				setError(true);
				console.log(error.message);
			});
	};

	return (
		<div className="Signup">
			<Toast
				onClose={() => setError(false)}
				show={error}
				delay={3000}
				autohide
				style={{
					position: "fixed",
					bottom: 15,
					right: 15,
					backgroundColor: "#c82333",
					zIndex: 3,
					color: "white",
					padding: "0.5rem 1rem",
				}}
			>
				<Toast.Body>
					Error while registeration. Please retry...
				</Toast.Body>
			</Toast>
			{isLogged ? (
				<Redirect to="/" />
			) : (
				<>
					<div className="box">
						<form autoComplete="off">
							<h3 className="box__title">Sign Up</h3>
							<div className="form-group">
								<label>Name</label>
								<input
									type="text"
									name="name"
									className="form-control"
									placeholder="Devarsh"
									onChange={(event) => onChangeHandler(event)}
								/>
							</div>
							<div className="form-group">
								<label>Email address</label>
								<input
									type="email"
									name="email"
									className="form-control"
									placeholder="devarsh@gmail.com"
									onChange={(event) => onChangeHandler(event)}
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									name="password"
									className="form-control"
									placeholder="*******"
									onChange={(event) => onChangeHandler(event)}
								/>
							</div>
							<div className="form-group">
								<label>PIN (6-digits)</label>
								<input
									type="password"
									name="pin"
									className="form-control"
									placeholder="123456"
									onChange={(event) => onChangeHandler(event)}
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary btn-block"
								onClick={(event) => {
									createUserWithEmailAndPasswordHandler(
										event,
										email,
										password,
										name,
										pin
									);
								}}
							>
								Sign Up
							</button>
							<p
								className="forgot-password text-right"
								style={{ marginTop: ".5rem" }}
							>
								Already have an account?{" "}
								<Link to="/login">
									<b>Sign In</b>
								</Link>
							</p>
						</form>
					</div>
				</>
			)}
		</div>
	);
}

export default Signup;
