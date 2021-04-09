import React, { useState } from "react";
import firebase from "../config";
import { SIGN_IN } from "../reducers/auth";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "react-bootstrap";

function Login() {
	const [error, setError] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const isLogged = useSelector((state) => state.isLogged);

	const onChangeHandler = (event) => {
		const { name, value } = event.currentTarget;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const loginUserWithEmailAndPasswordHandler = (event, email, password) => {
		event.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;
				console.log(user);
				const userData = {
					userID: user.uid,
					username: user.displayName,
					email: user.email,
				};
				localStorage.setItem("user", JSON.stringify(userData));
				dispatch(SIGN_IN(userData));
			})
			.catch((error) => {
				setError(true);
				console.log(error.message);
			});
	};

	return (
		<div className="Login">
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
					The email address or password is incorrect. Please retry...
				</Toast.Body>
			</Toast>
			{isLogged ? (
				<Redirect to="/" />
			) : (
				<>
					<div className="box">
						<form autoComplete="off">
							<h3 className="box__title">Login</h3>
							<div className="form-group">
								<label>Email address</label>
								<input
									required
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
									required
									type="password"
									name="password"
									className="form-control"
									placeholder="*******"
									onChange={(event) => onChangeHandler(event)}
								/>
							</div>
							<div className="form-group">
								<div className="custom-control custom-checkbox">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customCheck1"
									/>
									<label
										className="custom-control-label"
										htmlFor="customCheck1"
									>
										Remember me
									</label>
								</div>
							</div>
							<button
								type="submit"
								className="btn btn-primary btn-block"
								onClick={(event) => {
									loginUserWithEmailAndPasswordHandler(
										event,
										email,
										password
									);
								}}
							>
								Login
							</button>
							<p
								className="forgot-password text-right"
								style={{ marginTop: ".5rem" }}
							>
								Don't have an account?{" "}
								<Link to="/signup">
									<b>Sign up</b>
								</Link>
							</p>
						</form>
					</div>
				</>
			)}
		</div>
	);
}

export default Login;
