import React from 'react'
import firebase from '../config'
import './Home.css'
import { SIGN_IN, SIGN_OUT } from '../reducers/auth'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from "react-router-dom"

import Chatbot from './Chatbot/Chatbot'
import TwitterTrends from './Tweets/TwitterTrends'
import Weather from './Weather/Weather'
import News from './News/News'

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
                            <div className="box" style={{marginTop: '1rem'}}>
                                <div className="twitter__title">
                                    <h4><i class="far fa-newspaper"></i> News</h4>
                                    <News />
                                </div>
                            </div>
                            <div style={{marginTop: '1rem'}}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="smallBox__blue">
                                            <button className="buttons" onClick={() => SignOut()}><i class="fas fa-cog"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="smallBox__blue">
                                            <button className="buttons" onClick={() => SignOut()}><i class="fas fa-cog"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="smallBox__blue">
                                            <button className="buttons" onClick={() => SignOut()}><i class="fas fa-sign-out-alt"></i></button>
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
                            <div className="box" style={{marginTop: '1rem'}}>
                                <div className="twitter__title">
                                    <h4><i class="fab fa-twitter"></i> Twitter Trending</h4>
                                </div>
                                <TwitterTrends />
                            </div>
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
