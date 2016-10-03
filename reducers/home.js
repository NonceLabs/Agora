import {
  FETCH_TOPICS,
  NEW_COZE,
  FETCH_COZES
} from '../config/ActionTypes'

const initial = {
  topics:[],
  cozes: []
}
export default function home(state=initial,action){
  switch(action.type){
    case NEW_COZE:
      return Object.assign({},state,{
        cozes: [...state.cozes,action.coze]
      })
    case FETCH_COZES:
      return Object.assign({},state,{
        cozes: action.cozes
      })
    case FETCH_TOPICS:
      return Object.assign({},state,{
        topics: action.topics
      })
    default:
      return state
  }
}