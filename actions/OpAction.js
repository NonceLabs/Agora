import {
  OPEN_MENU,
  SELECT_MENUITEM
} from '../config/ActionTypes'

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