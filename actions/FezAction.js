import {
  FETCH_USER,
  LOCATE_FEZ,
  UPDATE_FEZ,
  FETCH_NOTICE,
  READ_NOTICE
} from '../config/ActionTypes'
import axios from 'axios'
import { io } from '../store/io'

export function updateFez(uid,obj){
  return (dispatch)=>{
    dispatch(fezUpdated(obj))
    axios.post(`http://192.168.1.100:3000/user/${uid}`,obj).then((response) => {
        
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
    io.on('notices',(data)=>{
      const notices = data.notices.map((t)=>{
        const fezfrom = data.fezs.filter((f)=> f._id==t.fromId)
        if (fezfrom.length==1) {
          return {
            nid: t._id,
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
            topicId: t.topicId
          }
        }
      })
      console.log(notices);
      dispatch(noticeFetched(notices))
    })
    // axios.get(`http://192.168.1.100:3000/enter/${id}`)
    //   .then((response) => {
    //     dispatch(userFetched(response.data))
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
  io.emit('readNotice',{
    nids
  })
  return (dispatch)=>{
    dispatch(noticeRead())
  }
}

function noticeRead(){
  return {
    type: READ_NOTICE
  }
}