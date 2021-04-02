import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Cube } from "react-preloaders2";

import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./components/Home";

function App() {
	return (
		<>
			<Router>
				<div>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/" component={Home} />
					</Switch>
				</div>
			</Router>
			<Cube
				background="white"
				time={5000}
				color="#0040ff"
				customLoading={false}
			/>
		</>
	);
}

export default App;
