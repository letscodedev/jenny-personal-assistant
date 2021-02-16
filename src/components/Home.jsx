import React from 'react';
import firebase from '../config'
import './Home.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom";

function Home() {
    const dispatch = useDispatch();
    // const isLogged = useSelector(state => state.isLogged)
    const isLogged = true
    const SignOut = () => {
        console.log('Sign Out')
        firebase.auth().signOut()
        dispatch(SIGN_OUT())
    }
	return (
		<div className="Home">
			{
                isLogged ? 
                <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="box box__blue">
                                <h3>Devarsh Panchal</h3>
                            </div>
                            <div className="box box__blue" style={{marginTop: '1rem'}}>
                                <h3>Devarsh Panchal</h3>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="box"></div>
                        </div>
                        <div className="col-md-4">
                            <div className="box">
                                <button className="btn btn-primary" onClick={() => SignOut()}>Logout</button>
                            </div>
                            <div className="box" style={{marginTop: '1rem'}}></div>
                            <div className="box" style={{marginTop: '1rem'}}></div>
                            <div className="box" style={{marginTop: '1rem'}}></div>
                        </div>
                    </div>
                </div>
                </>
                : <Redirect to='/login' />
            }
		</div>
	);
}

export default Home;
