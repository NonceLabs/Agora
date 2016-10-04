import {
  FETCH_USER,
  LOCATE_FEZ
} from '../config/ActionTypes'
import axios from 'axios'

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