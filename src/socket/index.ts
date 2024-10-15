import { io } from "socket.io-client";

export const socket = io("https://brenno-envoriment-chat.1pc5en.easypanel.host", {
  auth: {
    token: localStorage.getItem('authToken')
  },
  transports: ['websocket']
});