import {
  FETCH_USER,
  NEW_TOPIC
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
  joined:[]
}

export default function user(state=initial,action){
  switch(action.type){
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