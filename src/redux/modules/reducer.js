import { combineReducers } from "redux"
import todos from "./todos"
import filter from "./filter"
import users from './users'
import { connectRouter } from "connected-react-router"
import history from "../../history"

//하위리덕스를 합치는 역활: combineReducers
const reducer = combineReducers({
  todos,
  filter,
  users,
  router:connectRouter(history)
})

export default reducer
