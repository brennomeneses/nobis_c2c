import { io } from "socket.io-client";

export const socket = io("https://api-chat-protocol.nobisapp.com.br", {
  auth: {
    token: localStorage.getItem('authToken')
  },
  transports: ['websocket']
});