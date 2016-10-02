import {
  OPEN_MENU,
  SELECT_MENUITEM
} from '../config/ActionTypes'
const initial = {
  menuOpen: false,
  menuItem: '首页',
  gender: 2
}
export default function op(state=initial,action){
  switch(action.type){
    case OPEN_MENU:
      return Object.assign({},state,{
        menuOpen: !state.menuOpen
      })
    case SELECT_MENUITEM:
      return Object.assign({},state,{
        menuItem: action.item,
        menuOpen: false
      })
    default:
      return state
  }
}