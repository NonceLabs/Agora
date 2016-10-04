import {
  OPEN_MENU,
  SELECT_MENUITEM,
  FEEDBACK
} from '../config/ActionTypes'
import axios from 'axios'

export function openMenu(){
  return {
    type: OPEN_MENU
  }
}

export function selectMenuitem(item){
  return {
    type: SELECT_MENUITEM,
    item
  }
}

export function feedback(one){
  axios.put(`http://localhost:3000/feedback`, one)
    .then((response) => {
      
    })
    .catch((error) => {
      console.log(error);
    });
}