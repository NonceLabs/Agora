import { combineReducers } from 'redux'
import user from './user'
import home from './home'
import op from './op'
const rootReducer = combineReducers({
  user,
  home,
  op
})

export default rootReducer