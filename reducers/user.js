import {

} from '../config/ActionTypes'

const initial = {
  avatarUrl: require('../assets/avatar.png'),
  nickname: '逍遥',
  gender: 2,
  province: '北京',
  city: '朝阳',
  country: '中国'
}

export default function user(state=initial,action){
  switch(action.type){
    default:
      return state
  }
}