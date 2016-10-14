import './UserAgent'
import {
  AppState,
} from 'react-native'

import socket from 'socket.io-client/socket.io'
import { WSIP } from '../config/index'
let status = "connecting"

export const io = socket(WSIP,{
  jsonp: false,
  transports: ['websocket']
})

io.on('connect', function(data){
  status = "connected"
});
io.on('disconnect', (e) => {
  status = "disconnected"
});
io.on('error',(e) => {
  status = "error"
});
io.on('reconnect', () => {
  status = "reconnecting"
})
io.on('reconnect', () => {
  status = "reconnecting"
})

// AppStateIOS.addEventListener('change',() => {
//   switch (AppStateIOS.currentState) {
//     case "inactive":
//       io.disconnect()
//       break;
//     case "active":
//       io.connect()
//       break;
//     default:
//       break;
//   }
// })
