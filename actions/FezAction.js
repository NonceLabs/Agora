import {
  FETCH_USER
} from '../config/ActionTypes'
import axios from 'axios'

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