import { combineReducers } from "redux";
import Auth from "./auth";
import Cart from "./cart";

const AllReducer = combineReducers({
	isLogged: Auth,
	Cart: Cart,
});

export default AllReducer;
