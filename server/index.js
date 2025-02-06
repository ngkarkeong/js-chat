require("dotenv").config();
const { Server } = require("socket.io");
const { APP_ORIGIN, PORT } = require("./constants/env");

const users = {};

const io = new Server(PORT, {
  cors: {
    origin: "*", // ✅ Allow frontend origin
    methods: ["GET", "POST"],
  },
});

console.log(APP_ORIGIN, PORT);

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });

  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", { message, name: users[socket.id] });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
