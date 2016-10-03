import { combineReducers } from 'redux'
import fez from './fez'
import home from './home'
import op from './op'
const rootReducer = combineReducers({
  fez,
  home,
  op
})

export default rootReducer