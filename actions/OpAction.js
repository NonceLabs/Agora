import {
  OPEN_MENU,
  SELECT_MENUITEM,
  FEEDBACK
} from '../config/ActionTypes'
import axios from 'axios'
import { SIP } from '../config/index'

export function openMenu(open){
  return {
    type: OPEN_MENU,
    open
  }
}

export function selectMenuitem(item){
  return {
    type: SELECT_MENUITEM,
    item
  }
}

export function feedback(one){
  axios.put(`${SIP}feedback`, one)
    .then((response) => {
      
    })
    .catch((error) => {
      console.log(error);
    });
}