import {
  FETCH_USER,
  FOLLOW_TOPIC,
  SIGNUP_FEZ,
  LOCATE_FEZ,
  UPDATE_FEZ,
  FETCH_NOTICE,
  READ_NOTICE
} from '../config/ActionTypes'
import {
  AsyncStorage
} from 'react-native'

import axios from 'axios'
import { io } from '../store/io'
import { SIP } from '../config/index'

export function signupFez(one){
  return (dispatch)=>{
    axios.put(`${SIP}user`,one).then((response) => {
      const fez = response.data
      dispatch(fezSigned(fez))
      AsyncStorage.setItem('fezId',fez._id,(error)=>{

      })
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

function fezSigned(fez){
  return {
    type: SIGNUP_FEZ,
    fez
  }
}


export function updateFez(uid,obj){
  return (dispatch)=>{
    dispatch(fezUpdated(obj))
    axios.post(`${SIP}user/${uid}`,obj).then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function fezUpdated(obj){
  return {
    type: UPDATE_FEZ,
    obj
  }
}

export function locateFez(location){
  return {
    type: LOCATE_FEZ,
    location
  }
}

export function fetchUser(id){
  io.emit('identify',{
    id
  })
  return (dispatch)=>{
    io.on('identified',(data)=>{
      dispatch(userFetched(data))
    })
    io.removeListener('notices').on('notices',(data)=>{
      const notices = data.notices.map((t)=>{
        const fezfrom = data.fezs.filter((f)=> f._id==t.fromId)
        if (fezfrom.length==1) {
          return {
            _id: t._id,
            read: false,
            author:{
              id: t.fromId,
              nickname: fezfrom[0].nickname,
              avatarUrl: fezfrom[0].avatarUrl
            },
            to:{
              content: t.toContent
            },
            content: t.fromContent,
            topicId: t.topicId,
            cozeId: t.fromCozeId,
            title: t.title || "",
            date: t.date,
            type: t.type
          }
        }
      })
      dispatch(noticeFetched(notices))
    })
  }
}

function userFetched(user){
  return {
    type: FETCH_USER,
    user
  }
}

export function noticeFetched(notices){
  return {
    type: FETCH_NOTICE,
    notices
  }
}

export function readNotice(nids){
  return (dispatch)=>{
    console.log(nids);
    axios.post(`${SIP}readnotice`,{all: nids})
      .then((response) => {        
        dispatch(noticeRead())
      }).catch((error) => {
        console.log(error);
      });
  }
}

function noticeRead(){
  return {
    type: READ_NOTICE
  }
}

export function followTopic(uid, tid, follow){
  return (dispatch)=>{
    dispatch(topicFollwed(uid, tid, follow))
    axios.post(`${SIP}follow/${tid}`,{fezId: uid,follow}).then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function topicFollwed(uid, tid, follow){
  return {
    type: FOLLOW_TOPIC,
    uid,
    tid,
    follow
  }
}