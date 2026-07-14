import { io } from "socket.io-client";

export const socket = io(
  "https://main-nobis-c2c-chat.i71ekl.easypanel.host",
  {
    auth: {
      token: localStorage.getItem("authToken"),
    },
    transports: ["websocket"],
  }
);