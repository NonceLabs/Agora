import {
  FETCH_TOPICS,
  NEW_COZE,
  FETCH_COZES,
  FETCH_FEZ_JOINED,
  FETCH_FEZ_CREATED,
  FETCH_FEZ_VIEWED
} from '../config/ActionTypes'

const initial = {
  topics:[],
  cozes: [],
  joined: [],
  viewed: [],
  created: []
}
export default function home(state=initial,action){
  switch(action.type){
    case FETCH_FEZ_CREATED:
      return Object.assign({},state,{
        created: action.topics
      })
    case FETCH_FEZ_JOINED:
      return Object.assign({},state,{
        joined: action.topics
      })
    case FETCH_FEZ_VIEWED:
      return Object.assign({},state,{
        viewed: action.topics
      })
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