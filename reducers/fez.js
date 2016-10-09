import {
  FETCH_USER,
  FOLLOW_TOPIC,
  SIGNUP_FEZ,
  VIEW_TOPIC,
  NEW_TOPIC,
  LOCATE_FEZ,
  UPDATE_FEZ,
  JOIN_TOPIC,
  FETCH_NOTICE,
  READ_NOTICE
} from '../config/ActionTypes'

const initial = {
  avatarUrl: '../assets/avatar.png',
  nickname: '逍遥',
  gender: 2,
  province: '北京',
  city: '朝阳',
  country: '中国',
  followed:[],
  created:[],
  joined:[],
  location: {"longitude":-122.0312186,"latitude":37.33233141},
  repliedNoti: true,
  updatedNoti: true,
  replyToMe: []
}

export default function user(state=initial,action){
  switch(action.type){
    case FOLLOW_TOPIC:
      if (action.follow) {
        return Object.assign({},state,{
          followed: [...state.followed, action.tid]
        })        
      }else{
        return Object.assign({},state,{
          followed: state.followed.filter((t)=> t!=action.tid)
        })
      }
    case SIGNUP_FEZ:
      return Object.assign({},action.fez,{
        replyToMe: [],
        location: {"longitude":-122.0312186,"latitude":37.33233141},
      })
    case READ_NOTICE:
      return Object.assign({},state,{
        replyToMe: state.replyToMe.map((t)=>{
          return Object.assign({},t,{
            read: true
          })
        })
      })
    case FETCH_NOTICE:
      return Object.assign({},state,{
        replyToMe: action.notices.map((t)=>{
          return Object.assign({},t,{
            to:{
              content: t.to.content,
              author:{
                nickname: state.nickname,
                avatarUrl: state.avatarUrl,
                id: state._id
              }
            }
          })
        })
      })
    case JOIN_TOPIC:
      return Object.assign({},state,{
        joined: [...state.joined, action.tid]
      })
    case UPDATE_FEZ:
      return Object.assign({}, state, action.obj)
    case LOCATE_FEZ:
      return Object.assign({},state,{
        location: action.location
      })
    case NEW_TOPIC:
      return Object.assign({},state,{
        created: state.created==undefined?[action.topicId]:[...state.created,action.one._id]
      })
    case FETCH_USER:
      return Object.assign({}, state, action.user)
    default:
      return state
  }
}