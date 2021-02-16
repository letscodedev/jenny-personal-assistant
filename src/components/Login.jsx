import React, { useState } from 'react';
import firebase from '../config'
import { SIGN_IN } from '../reducers/auth';
import './Login.css';
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function Login() {
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.isLogged)

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        }
    }

    const loginUserWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user)
            dispatch(SIGN_IN())
        })
        .catch((error) => {
			console.log(error)
		});
    }

	return (
		<div className="Login">
			{
           		isLogged ? <Redirect to='/' /> : 
				<>
				<div className="box">
					<form>
						<h3 class="box__title">Login</h3>
						<div className="form-group">
							<label>Email address</label>
							<input type="email" className="form-control" placeholder="devarsh@gmail.com" onChange={event => onChangeHandler(event)}/>
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" placeholder="*******" onChange={event => onChangeHandler(event)}/>
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customCheck1" />
								<label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
							</div>
						</div>
						<button type="submit" className="btn btn-primary btn-block" onClick={event => {loginUserWithEmailAndPasswordHandler(event, email, password);}}>Login</button>
						<p className="forgot-password text-right" style={{marginTop: '.5rem'}}>
							Don't have an account? <Link to='/signup'><b>Sign up</b></Link>
						</p>
					</form>
				</div>
				</>
			}
		</div>
	);
}

export default Login;
