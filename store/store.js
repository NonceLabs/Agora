import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const initial={
  fez:{},
  home:{},
  op:{}
}

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
)
store.subscribe(() => {  
  console.log(store.getState());
})
