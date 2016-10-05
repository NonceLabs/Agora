import {
  FETCH_USER,
  VIEW_TOPIC,
  NEW_TOPIC,
  LOCATE_FEZ,
  UPDATE_FEZ,
  JOIN_TOPIC
} from '../config/ActionTypes'

const initial = {
  avatarUrl: '../assets/avatar.png',
  nickname: '逍遥',
  gender: 2,
  province: '北京',
  city: '朝阳',
  country: '中国',
  viewed:[],
  created:[],
  joined:[],
  location: {"longitude":-122.0312186,"latitude":37.33233141},
  repliedNoti: true,
  updatedNoti: true
}

export default function user(state=initial,action){
  switch(action.type){
    case JOIN_TOPIC:
      return Object.assign({},state,{
        joined: [...state.viewed, action.tid]
      })
    case VIEW_TOPIC:
      return Object.assign({},state,{
        viewed: [...state.viewed, action.tid]
      })
    case UPDATE_FEZ:
      return Object.assign({}, state, action.obj)
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