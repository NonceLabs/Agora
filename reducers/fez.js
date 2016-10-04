import {
  FETCH_USER,
  NEW_TOPIC,
  LOCATE_FEZ
} from '../config/ActionTypes'

const initial = {
  avatarUrl: require('../assets/avatar.png'),
  nickname: '逍遥',
  gender: 2,
  province: '北京',
  city: '朝阳',
  country: '中国',
  viewed:[],
  created:[],
  joined:[],
  location: {"longitude":-122.0312186,"latitude":37.33233141}
}

export default function user(state=initial,action){
  switch(action.type){
    case LOCATE_FEZ:
      return Object.assign({},state,{
        location: action.location
      })
    case NEW_TOPIC:
      return Object.assign({},state,{
        created: state.created==undefined?[action.topicId]:[...state.created,action.topicId]
      })
    case FETCH_USER:
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}