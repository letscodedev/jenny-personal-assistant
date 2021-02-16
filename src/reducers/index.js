import { combineReducers } from 'redux'
import Auth from './auth'

const AllReducer = combineReducers({
    isLogged: Auth,
})

export default AllReducer;