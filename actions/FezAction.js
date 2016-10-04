import {
  FETCH_USER,
  LOCATE_FEZ,
  UPDATE_FEZ
} from '../config/ActionTypes'
import axios from 'axios'

export function updateFez(obj){
  return (dispatch)=>{
    dispatch(fezUpdated(obj))

    axios.post(`http://localhost:3000/user/${obj._id}`,obj).then((response) => {
        
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
  return (dispatch)=>{
    axios.get(`http://localhost:3000/enter/${id}`)
      .then((response) => {
        dispatch(userFetched(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function userFetched(user){
  console.log(user);
  return {
    type: FETCH_USER,
    user
  }
}