import {
  FETCH_USER,
  LOCATE_FEZ,
  UPDATE_FEZ
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