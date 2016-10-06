import './UserAgent'
import socket from 'socket.io-client/socket.io'

let status = "connecting"

export const io = socket('ws://192.168.1.100:3001',{
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


