import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});



io.on('connection', socket => {
  setInterval(() => socket.emit('getData', getCur(0, 100)), 2000)
  // здесь добавить socket.on ивенты для кнопок
})

httpServer.listen(3000)


function getCur(min: number, max: number) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}